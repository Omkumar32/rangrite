/**
 * Client-Side Media Optimizer
 * Provides automatic compression and resizing for photos (via HTML5 Canvas)
 * and validation & handling for video uploads.
 */

export interface OptimizationResult {
  dataUrl: string;
  originalSizeKb: number;
  optimizedSizeKb: number;
  reductionPercentage: number;
  width: number;
  height: number;
  mediaType: 'image' | 'video';
}

/**
 * Automatically optimizes an image file:
 * - Scales down to maximum dimension (e.g. 1600px) preserving aspect ratio
 * - Compresses to JPEG with high visual quality (0.82)
 * - Returns a Base64 data URL and savings statistics
 */
export async function optimizeImageFile(
  file: File,
  maxDimension: number = 1600,
  quality: number = 0.82
): Promise<OptimizationResult> {
  const originalSizeKb = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for optimization.'));
      img.onload = () => {
        let { width, height } = img;

        // Calculate proportional scale if exceeds maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            dataUrl: event.target?.result as string,
            originalSizeKb,
            optimizedSizeKb: originalSizeKb,
            reductionPercentage: 0,
            width: img.width,
            height: img.height,
            mediaType: 'image'
          });
          return;
        }

        // High quality bicubic smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-efficiency WebP data URL with automatic fallback to JPEG
        let optimizedDataUrl = canvas.toDataURL('image/webp', quality);
        if (!optimizedDataUrl.startsWith('data:image/webp')) {
          optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const optimizedSizeKb = Math.round((optimizedDataUrl.length * 3) / 4 / 1024);
        const reductionPercentage = Math.max(
          0,
          Math.round(((originalSizeKb - optimizedSizeKb) / originalSizeKb) * 100)
        );

        resolve({
          dataUrl: optimizedDataUrl,
          originalSizeKb,
          optimizedSizeKb,
          reductionPercentage,
          width,
          height,
          mediaType: 'image'
        });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Reads a video file into a safe Base64 or Blob URL
 */
export async function processVideoFile(file: File): Promise<OptimizationResult> {
  const originalSizeKb = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read video file.'));
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      resolve({
        dataUrl,
        originalSizeKb,
        optimizedSizeKb: originalSizeKb,
        reductionPercentage: 0,
        width: 1080,
        height: 1920,
        mediaType: 'video'
      });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Detects whether a URL or Data URI represents a video
 */
export function isVideoMedia(url?: string | null): boolean {
  if (!url) return false;
  const lower = url.toLowerCase().trim();
  return (
    lower.startsWith('data:video/') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.ogg') ||
    lower.includes('youtube.com') ||
    lower.includes('vimeo.com') ||
    lower.includes('.mp4?') ||
    lower.includes('.webm?')
  );
}

/**
 * Uploads media (base64 data URL) to the dev server to be written permanently
 * into public/uploads/, returning a persistent public URL like /uploads/12345_video.mp4
 */
export async function uploadMediaToServer(
  fileName: string,
  fileData: string
): Promise<string> {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileName, fileData })
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || `Upload failed with status ${response.status}`);
    }

    const json = await response.json();
    return json.url; // e.g. "/uploads/1725512345_video.mp4"
  } catch (err) {
    console.warn('Server upload fallback (will keep dataUrl):', err);
    // If server upload endpoint is unavailable (e.g. in static build), fallback to raw dataUrl
    return fileData;
  }
}

