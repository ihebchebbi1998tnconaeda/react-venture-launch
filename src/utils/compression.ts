import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import imageCompression from 'browser-image-compression';

const ffmpeg = new FFmpeg();

export const compressVideo = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<File> => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
  }

  ffmpeg.on('progress', ({ progress, time }) => {
    if (onProgress) {
      onProgress(progress * 100);
    }
    console.log('Compression progress:', progress * 100);
  });

  await ffmpeg.writeFile('input.mp4', await fetchFile(file));
  await ffmpeg.exec([
    '-i', 'input.mp4',
    '-vcodec', 'libx264',
    '-crf', '28',
    'output.mp4'
  ]);

  const data = await ffmpeg.readFile('output.mp4');
  const compressedFile = new File([data], file.name, { type: 'video/mp4' });
  
  return compressedFile;
};

export const compressImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onProgress: onProgress ? (progress: number) => onProgress(progress * 100) : undefined,
  };
  
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    return file;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};