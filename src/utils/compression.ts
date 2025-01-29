import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

interface CompressionProgress {
  percent: number;
  timeLeft: string;
  currentSize: number;
  targetSize: number;
  speed: string;
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const calculateTimeLeft = (progress: number, elapsedTime: number): string => {
  if (progress === 0) return 'Calculating...';
  const timeLeft = (elapsedTime / progress) * (100 - progress);
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
};

export const compressVideo = async (
  file: File,
  targetSize: number = 200 * 1024 * 1024, // Reduced to 200MB target
  onProgress: (progress: CompressionProgress) => void
): Promise<File> => {
  console.log('Starting video compression...', { originalSize: formatFileSize(file.size) });

  const ff = new FFmpeg();
  const startTime = Date.now();
  let lastProgress = 0;
  let compressionSpeed = '0x';

  try {
    console.log('Loading FFmpeg...');
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    
    ff.on('log', ({ message }) => {
      console.log('FFmpeg Log:', message);
      if (message.includes('speed=')) {
        compressionSpeed = message.split('speed=')[1].split('x')[0].trim() + 'x';
      }
    });

    ff.on('progress', ({ progress, time }) => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progressPercent = Math.round(progress * 100);
      
      if (progressPercent !== lastProgress) {
        lastProgress = progressPercent;
        console.log(`Compression progress: ${progressPercent}%`);
        onProgress({
          percent: progressPercent,
          timeLeft: calculateTimeLeft(progressPercent, elapsedTime),
          currentSize: 0,
          targetSize,
          speed: compressionSpeed
        });
      }
    });

    await ff.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    const inputFileName = 'input.mp4';
    const outputFileName = 'output.mp4';

    console.log('Writing input file...');
    await ff.writeFile(inputFileName, await fetchFile(file));
    
    const duration = await getVideoDuration(file);
    const targetBitrate = Math.floor((targetSize * 8) / duration);
    const videoBitrate = Math.floor(targetBitrate * 0.95);
    const audioBitrate = Math.floor(targetBitrate * 0.05);

    console.log('Starting FFmpeg compression with params:', {
      videoBitrate,
      audioBitrate,
      duration
    });

    // Optimized FFmpeg command for faster compression
    await ff.exec([
      '-i', inputFileName,
      '-c:v', 'libx264',
      '-preset', 'veryfast', // Changed from ultrafast to veryfast for better compression
      '-threads', '0',
      '-crf', '40', // Increased from 18 to 23 for faster compression
      '-vf', 'scale=-2:720', // Scale down to 720p
      '-g', '30', // Keyframe every 30 frames
      '-keyint_min', '30',
      '-b:v', `${videoBitrate}`,
      '-maxrate', `${videoBitrate * 1.5}`,
      '-bufsize', `${videoBitrate * 2}`,
      '-c:a', 'aac',
      '-b:a', `${audioBitrate}`,
      '-movflags', '+faststart',
      '-y',
      outputFileName
    ]);

    console.log('Reading compressed file...');
    const data = await ff.readFile(outputFileName);
    const compressedFile = new File([data], file.name, { type: 'video/mp4' });
    
    console.log('Compression complete:', {
      originalSize: formatFileSize(file.size),
      compressedSize: formatFileSize(compressedFile.size),
      compressionRatio: `${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`
    });

    return compressedFile;
  } catch (error) {
    console.error('Compression error:', error);
    throw error;
  } finally {
    try {
      await ff.terminate();
    } catch (error) {
      console.error('Error terminating FFmpeg:', error);
    }
  }
};

const getVideoDuration = async (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    video.src = URL.createObjectURL(file);
  });
};

export default compressVideo;
