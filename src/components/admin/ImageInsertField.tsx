import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, Film, Sparkles, AlertCircle } from 'lucide-react';
import { optimizeImageFile, processVideoFile, isVideoMedia, uploadMediaToServer } from '../../utils/mediaOptimizer';
import type { OptimizationResult } from '../../utils/mediaOptimizer';

interface ImageInsertFieldProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  helperText?: string;
  allowVideo?: boolean;
}

const PRESET_GALLERY: Array<{ name: string; url: string; isVideo?: boolean }> = [
  { name: 'Bridal Twirl Editorial Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', isVideo: true },
  { name: 'Fabric Motion Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', isVideo: true },
  { name: 'Red Saree Archway', url: '/images/categories/cat-sarees-drapes.jpg' },
  { name: 'Purple Bridal Lehenga', url: '/images/categories/cat-lehenga-choli.jpg' },
  { name: 'Emerald Anarkali Suit', url: '/images/categories/cat-suits-sets.jpg' },
  { name: 'Magenta Silk Fabrics', url: '/images/categories/cat-dress-materials.jpg' },
  { name: 'Yellow Kurta Set Courtyard', url: '/images/lookbooks/style-edit-yellow.jpg' },
  { name: 'Purple Saree on Velvet Sofa', url: '/images/lookbooks/purple-saree-drapes.jpg' },
  { name: 'Champagne Bridal Palace', url: '/images/lookbooks/bridal-regalia-palace.jpg' },
  { name: 'Ivory Twirl Model', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0rE-sF1BDYoIfwTHOu4tXMWHeLZ3bRhMkHceV5tlKwcxZvBDU9Ee6nP_yuRKWmS-BZXby1FUQyuigrHrO116ONeiUnEhWXyUO9AU7QXW0PNQfumAvDpO1e5fgy5ExLbNeAXBc4JIxc0TtOFjaISyGCQrC-YM6jHc7YAG89KH1_lIo97Luz7VRQa36q6ERdiKuKB1Hx2sAQO3sOGxqNUm4eVjTKDjmIDY2amAk2MZZyzoP6-6Fw7Q8O0F1iam14uTeNhk' },
  { name: 'Mirror & Zardozi Inset', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnVsBGV-1Y7JMj9pA6lCN7FH8-kRXkdfEw8TYKbfS8OCia4xmnlMzzjGj8Sg4uVLL50bMGyhCMOwKnO1ed7TCHIaHROYVBS2BHoDD5cejG_z-8VWtd1QSS40VVG9-Ez0c79ebKbhtz5LEOHy1K9BXMm3uxdPOyft9gspYKRdoN73mQqt5PsF7-J4r3c-zOeDOuWQp8W4AWu04gIOKZBzFiuViNGf988JgGw8VACORijn5y0k4So9SrFNtxXVDaYLFFtI0' }
];

export const ImageInsertField: React.FC<ImageInsertFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  allowVideo = true
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'upload' | 'preset'>('url');
  const [showPresets, setShowPresets] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optStats, setOptStats] = useState<OptimizationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isVideo = isVideoMedia(value);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsOptimizing(true);

    try {
      if (file.type.startsWith('video/')) {
        // Video file processing with size warning
        const sizeMb = file.size / (1024 * 1024);
        if (sizeMb > 30) {
          setErrorMessage('Video file is over 30MB. For optimal page speed, use a compressed MP4 or external video URL.');
        }
        const result = await processVideoFile(file);
        setOptStats(result);
        
        // Persist video to public/uploads/
        const serverUrl = await uploadMediaToServer(file.name, result.dataUrl);
        onChange(serverUrl);
      } else {
        // Automatic image compression and proportional scaling (1600px max, 0.82 quality to WebP)
        const result = await optimizeImageFile(file, 1600, 0.82);
        setOptStats(result);

        // Persist optimized WebP image to public/uploads/
        const extension = result.dataUrl.startsWith('data:image/webp') ? '.webp' : '.jpg';
        const baseName = file.name.replace(/\.[^/.]+$/, '') + extension;
        const serverUrl = await uploadMediaToServer(baseName, result.dataUrl);
        onChange(serverUrl);
      }
    } catch (err) {
      console.error('Media upload error:', err);
      setErrorMessage('Failed to optimize and store file. Please try a different image or video format.');
    } finally {
      setIsOptimizing(false);
      // Reset input value to allow re-uploading the same file if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#3b080a]">
          {label}
        </label>
        <span className="text-[10px] text-[#997332] font-sans flex items-center gap-1">
          {allowVideo && <Film className="w-3 h-3 text-[#997332]" />}
          <span>{allowVideo ? 'Photos & Videos (Auto-Optimized)' : 'URL / Upload / Presets'}</span>
        </span>
      </div>

      <div className="bg-white border border-[#EBE3D7] rounded p-3 space-y-3 shadow-sm">
        {/* Toggle between URL input and Direct File Upload */}
        <div className="flex items-center space-x-2 border-b border-[#EBE3D7]/70 pb-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1 text-[10px] font-sans uppercase tracking-widest font-semibold rounded flex items-center space-x-1.5 transition-colors cursor-pointer ${
              activeTab === 'url' ? 'bg-[#3b080a] text-white' : 'text-[#6E645E] hover:bg-stone-100'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Media URL</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('upload');
              fileInputRef.current?.click();
            }}
            disabled={isOptimizing}
            className={`px-3 py-1 text-[10px] font-sans uppercase tracking-widest font-semibold rounded flex items-center space-x-1.5 transition-colors cursor-pointer ${
              activeTab === 'upload' ? 'bg-[#3b080a] text-white' : 'text-[#6E645E] hover:bg-stone-100'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>{isOptimizing ? 'Optimizing...' : 'Upload File'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="px-2.5 py-1 text-[10px] font-sans uppercase tracking-widest font-semibold text-[#997332] hover:text-[#3b080a] transition-colors flex items-center space-x-1 ml-auto cursor-pointer"
          >
            <ImageIcon className="w-3 h-3" />
            <span>{showPresets ? 'Hide Gallery' : 'Atelier Gallery'}</span>
          </button>
        </div>

        {/* Hidden File Input supporting both images and videos */}
        <input 
          ref={fileInputRef} 
          type="file" 
          accept={allowVideo ? "image/*,video/mp4,video/webm,video/ogg,video/quicktime" : "image/*"} 
          onChange={handleFileUpload} 
          className="hidden" 
        />

        {/* Optimization loading indicator */}
        {isOptimizing && (
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded flex items-center gap-2 text-xs text-amber-900 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#997332] animate-spin" />
            <span>Compressing &amp; optimizing media for ultra-fast loading...</span>
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* URL Input Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={value.startsWith('data:') ? `[Local ${isVideo ? 'Video' : 'Image'} Uploaded]` : value}
            onChange={(e) => {
              setOptStats(null);
              onChange(e.target.value);
            }}
            placeholder={allowVideo ? "Paste image or video URL (https://...mp4 or image)" : "Paste image URL (https://...)"}
            className="w-full text-xs font-sans px-3 py-2 border border-[#EBE3D7] rounded focus:outline-none focus:border-[#997332] bg-[#FAF7F2] text-[#1A1718]"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                setOptStats(null);
                onChange('');
              }}
              className="p-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer text-xs"
              title="Clear Media"
            >
              ✕
            </button>
          )}
        </div>

        {/* Optimization stats badge if file was compressed */}
        {optStats && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Optimized automatically: {optStats.originalSizeKb} KB → {optStats.optimizedSizeKb} KB</span>
            </div>
            {optStats.reductionPercentage > 0 && (
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                -{optStats.reductionPercentage}% Smaller
              </span>
            )}
          </div>
        )}

        {/* Preloaded Atelier Gallery Drawer */}
        {showPresets && (
          <div className="p-3 bg-[#FAF7F2] border border-[#EBE3D7] rounded space-y-2 animate-fade-in">
            <span className="block text-[10px] font-sans uppercase tracking-wider text-[#997332] font-semibold">
              Select Curated Atelier Photo:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1">
              {PRESET_GALLERY.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onChange(img.url);
                    setShowPresets(false);
                  }}
                  className={`group relative aspect-square rounded overflow-hidden border transition-all cursor-pointer bg-stone-900 ${
                    value === img.url ? 'ring-2 ring-[#3b080a] border-transparent' : 'border-[#EBE3D7] hover:border-[#997332]'
                  }`}
                  title={img.name}
                >
                  {img.isVideo ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-amber-200">
                      <Film className="w-5 h-5 mb-1" />
                      <span className="text-[8px] font-sans uppercase font-bold tracking-wider">Video</span>
                    </div>
                  ) : (
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  )}
                  {value === img.url && (
                    <div className="absolute inset-0 bg-[#3b080a]/40 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Media Preview (supports both Video and Image) */}
        {value ? (
          <div className="flex items-center space-x-3 pt-1">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded border border-[#EBE3D7] overflow-hidden bg-stone-100 flex-shrink-0 shadow-sm flex items-center justify-center">
              {isVideo ? (
                <video
                  src={value}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  ref={(el) => {
                    if (el) {
                      el.muted = true;
                      el.play().catch(() => {});
                    }
                  }}
                />
              ) : (
                <img
                  src={value}
                  alt="Live Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              )}
            </div>
            <div className="text-left space-y-0.5">
              <span className="inline-flex items-center space-x-1 text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <Check className="w-3 h-3" />
                <span>{isVideo ? 'Video Loaded & Ready' : 'Optimized Image Active'}</span>
              </span>
              <p className="text-[10px] text-[#6E645E] font-sans font-light truncate max-w-xs">
                {value.startsWith('data:') ? `Local ${isVideo ? 'video' : 'photo'} file attached` : value}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 border-2 border-dashed border-[#EBE3D7] rounded text-center text-[#6E645E] text-xs font-sans flex flex-col items-center justify-center space-y-1">
            <Upload className="w-5 h-5 text-stone-400" />
            <span>{allowVideo ? 'No photo or video selected. Paste URL or upload file.' : 'No image selected. Paste URL or upload file.'}</span>
          </div>
        )}

        {helperText && (
          <p className="text-[10px] text-stone-500 font-sans font-light">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};
