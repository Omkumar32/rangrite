import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Scissors, 
  Check, 
  Award, 
  Sparkles, 
  Clock, 
  ShoppingBag 
} from 'lucide-react';

export const AtelierCustomizerModal: React.FC = () => {
  const {
    isCustomizerOpen,
    setIsCustomizerOpen,
    customizerProduct,
    formatPrice,
    addToCart,
    setIsBookingModalOpen
  } = useStore();

  if (!isCustomizerOpen || !customizerProduct) return null;

  const [selectedNeckline, setSelectedNeckline] = useState('Sweetheart Regal Cut');
  const [selectedSleeve, setSelectedSleeve] = useState('Elbow Length Zardozi (11")');
  const [selectedBackCut, setSelectedBackCut] = useState('Deep U with Latkan Tassels');
  const [isPadded, setIsPadded] = useState(true);
  const [bustSize, setBustSize] = useState('38" (Standard M)');
  const [activeTab, setActiveTab] = useState<'blouse' | 'fabric' | 'styling'>('blouse');

  const necklineOptions = [
    { name: 'Sweetheart Regal Cut', desc: 'Flattering royal sweetheart neckline with micro-piping', extraINR: 0 },
    { name: 'Deep Royal V-Neck', desc: 'Elongating neckline with antique zari borders', extraINR: 500 },
    { name: 'Classic Round Heritage', desc: 'Traditional close neck adorned with dabka embroidery', extraINR: 0 },
    { name: 'Boat Neck Princess Cut', desc: 'Sophisticated wide neck framing the collarbones', extraINR: 750 }
  ];

  const sleeveOptions = [
    { name: 'Elbow Length Zardozi (11")', desc: 'Most popular royal bridal sleeve length' },
    { name: 'Cap Sleeve with Scallops (5")', desc: 'Modern breezy cut for summer and sangeet' },
    { name: 'Full Regal Sleeves (22")', desc: 'Heavy heirloom sleeve coverage with cuff border' },
    { name: 'Sleeveless with Broad Straps', desc: 'Contemporary minimalist silhouette' }
  ];

  const backCutOptions = [
    { name: 'Deep U with Latkan Tassels', desc: 'Traditional handcrafted golden latkans included' },
    { name: 'Sheer Organza Illusion Back', desc: 'Translucent back with delicate buttons' },
    { name: 'Keyhole Regal Jharokha', desc: 'Mughal arched cutout with pearl hook' }
  ];

  const handleAddToCartCustom = () => {
    addToCart({
      product: customizerProduct,
      quantity: 1,
      selectedSize: `Custom Atelier (${bustSize})`,
      customBlouseDetails: {
        neckline: selectedNeckline,
        sleeve: selectedSleeve,
        backCut: selectedBackCut,
        padded: isPadded,
        bustSize: bustSize
      }
    });
    setIsCustomizerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border-2 border-[#C5A059]/50">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#5E1A2C] to-[#3B0E1B] text-white p-5 sm:px-8 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ECC480]/20 flex items-center justify-center text-[#ECC480]">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-cinzel text-[#ECC480] uppercase tracking-widest block">
                Old Delhi Heritage Atelier
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold">
                Bespoke Blouse & Drape Atelier
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-[#FAF7F5] px-6 text-xs font-cinzel font-semibold">
          <button
            onClick={() => setActiveTab('blouse')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'blouse' ? 'border-[#5E1A2C] text-[#5E1A2C]' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            1. Neckline & Sleeve Architecture
          </button>
          <button
            onClick={() => setActiveTab('fabric')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'fabric' ? 'border-[#5E1A2C] text-[#5E1A2C]' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            2. Silk Mark Authentication
          </button>
          <button
            onClick={() => setActiveTab('styling')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'styling' ? 'border-[#5E1A2C] text-[#5E1A2C]' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            3. Live Master Drape Call
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Product Summary Preview Bar */}
          <div className="flex items-center gap-4 p-3.5 bg-[#FAF7F5] rounded-xl border border-[#E8DFD8]">
            <img
              src={customizerProduct.images[0]}
              alt={customizerProduct.name}
              className="w-16 h-16 rounded-lg object-cover border border-[#C5A059]"
            />
            <div className="flex-1">
              <span className="text-[10px] font-cinzel text-[#C5A059] font-bold uppercase">{customizerProduct.craft}</span>
              <h4 className="font-serif font-bold text-[#1A1718] text-sm">{customizerProduct.name}</h4>
              <p className="text-xs font-bold text-[#5E1A2C] mt-0.5">{formatPrice(customizerProduct.priceINR)}</p>
            </div>
            {customizerProduct.silkMarkCertified && (
              <span className="silk-mark-badge hidden sm:inline-flex">Silk Mark Verified</span>
            )}
          </div>

          {activeTab === 'blouse' && (
            <div className="space-y-6 animate-fade-in">
              {/* Neckline Selection */}
              <div className="space-y-2.5">
                <label className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider block">
                  Select Front Neckline Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {necklineOptions.map((opt) => (
                    <div
                      key={opt.name}
                      onClick={() => setSelectedNeckline(opt.name)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedNeckline === opt.name
                          ? 'border-[#5E1A2C] bg-[#5E1A2C]/5 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-gray-900">{opt.name}</span>
                        {selectedNeckline === opt.name && <Check className="w-4 h-4 text-[#5E1A2C]" />}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleeve Style Selection */}
              <div className="space-y-2.5">
                <label className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider block">
                  Select Sleeve Length & Silhouette
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sleeveOptions.map((opt) => (
                    <div
                      key={opt.name}
                      onClick={() => setSelectedSleeve(opt.name)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedSleeve === opt.name
                          ? 'border-[#5E1A2C] bg-[#5E1A2C]/5 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-gray-900">{opt.name}</span>
                        {selectedSleeve === opt.name && <Check className="w-4 h-4 text-[#5E1A2C]" />}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Design & Padding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider block">
                    Back Design & Tassels
                  </label>
                  <select
                    value={selectedBackCut}
                    onChange={(e) => setSelectedBackCut(e.target.value)}
                    className="w-full bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                  >
                    {backCutOptions.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider block">
                    Bust Sizing & Padding
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={bustSize}
                      onChange={(e) => setBustSize(e.target.value)}
                      className="w-full bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                    >
                      <option>34" (XS)</option>
                      <option>36" (S)</option>
                      <option>38" (M)</option>
                      <option>40" (L)</option>
                      <option>42" (XL)</option>
                      <option>44" (XXL)</option>
                      <option>Custom Master Measurements</option>
                    </select>
                    <label className="flex items-center gap-1.5 text-xs shrink-0 cursor-pointer bg-[#FAF7F5] px-3 border border-gray-300 rounded-lg">
                      <input
                        type="checkbox"
                        checked={isPadded}
                        onChange={(e) => setIsPadded(e.target.checked)}
                        className="accent-[#5E1A2C]"
                      />
                      <span>Padded</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-[#FAF7F5] p-5 rounded-xl border border-[#C5A059]/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5E1A2C] text-[#ECC480] flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#5E1A2C]">Silk Mark Official Guarantee</h4>
                    <p className="text-xs text-gray-600">Issued by Silk Mark Organisation of India (Ministry of Textiles)</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  This creation uses {customizerProduct.fabric} hand-interlocked with 100% natural pure silk warp and certified metallic zari. Every garment carries an authentic holographic Silk Mark QR code traceable to the master weaver's loom.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <span className="font-bold text-gray-900 block">Artisan Time</span>
                  <span className="text-gray-600">{customizerProduct.craftDetails}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <span className="font-bold text-gray-900 block">Heirloom Garment Bag</span>
                  <span className="text-gray-600">Complimentary unbleached muslin shroud with cedar sachet.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'styling' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 bg-gradient-to-br from-[#5E1A2C]/10 to-[#C5A059]/15 rounded-xl border border-[#C5A059]/40 space-y-3">
                <div className="flex items-center gap-2 text-[#5E1A2C] font-serif font-bold text-base">
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                  <span>1-on-1 Virtual Stylist Drape Consultation</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Want to see this creation on a live mannequin or discuss custom matching jewelry with our South Extension senior stylist? We offer complimentary 25-minute HD video consultations for global NRI and pan-India patrons.
                </p>
                <button
                  onClick={() => {
                    setIsCustomizerOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                  className="crimson-btn px-5 py-2.5 rounded text-xs font-cinzel uppercase font-semibold flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" /> Book Virtual Video Stylist Session
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / CTA */}
        <div className="bg-[#FAF7F5] p-5 sm:px-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-gray-500 block">Total Investment (Includes Custom Tailoring):</span>
            <span className="text-xl font-bold font-serif text-[#5E1A2C]">
              {formatPrice(customizerProduct.priceINR)}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="px-4 py-2.5 text-xs text-gray-600 hover:text-gray-900 font-cinzel uppercase"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCartCustom}
              className="gold-shimmer-btn px-6 py-2.5 rounded text-xs font-cinzel uppercase tracking-wider font-semibold flex items-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" /> Add Custom Creation to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
