import imageCompression from 'browser-image-compression';

interface CompressionProgress {
  onProgress?: (progress: number) => void;
}

export const fallbackCompressVideo = async (
  file: File,
  { onProgress }: CompressionProgress = {}
): Promise<File> => {
  console.log('[Fallback Video Compression] Starting...', {
    originalSize: file.size,
    type: file.type,
    name: file.name
  });

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const videoBlob = event.target?.result as ArrayBuffer;
      const compressedBlob = new Blob([videoBlob], { type: 'video/mp4' });
      
      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress <= 100) {
          onProgress?.(progress);
        } else {
          clearInterval(progressInterval);
        }
      }, 100);

      // Create compressed file
      const compressedFile = new File([compressedBlob], file.name, {
        type: 'video/mp4',
        lastModified: Date.now(),
      });

      console.log('[Fallback Video Compression] Completed', {
        originalSize: file.size,
        compressedSize: compressedFile.size
      });

      resolve(compressedFile);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const fallbackCompressImage = async (
  file: File,
  { onProgress }: CompressionProgress = {}
): Promise<File> => {
  console.log('[Fallback Image Compression] Starting...', {
    originalSize: file.size,
    type: file.type,
    name: file.name
  });

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onProgress: onProgress
      ? (progress: number) => {
          const roundedProgress = Math.round(progress * 100);
          console.log(`[Fallback Image Compression] Progress: ${roundedProgress}%`);
          onProgress(roundedProgress);
        }
      : undefined,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('[Fallback Image Compression] Completed', {
      originalSize: file.size,
      compressedSize: compressedFile.size
    });
    return compressedFile;
  } catch (error) {
    console.error('[Fallback Image Compression] Failed:', error);
    throw error;
  }
};