import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { compressImage, formatFileSize } from '@/utils/compression';

interface FileWithPreview extends File {
  preview?: string;
}

interface CompressionState {
  isCompressing: boolean;
  originalSize: number | null;
  compressedSize: number | null;
  compressionProgress: number;
}

interface UseImageCompressionReturn extends CompressionState {
  handleFileCompression: (
    file: File,
    type: 'thumbnail'
  ) => Promise<FileWithPreview | null>;
  resetCompressionState: () => void;
}

export const useVideoCompression = (): UseImageCompressionReturn => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const { toast } = useToast();

  const resetCompressionState = () => {
    setIsCompressing(false);
    setCompressionProgress(0);
    setOriginalSize(null);
    setCompressedSize(null);
  };

  const handleFileCompression = async (
    file: File,
    type: 'thumbnail'
  ): Promise<FileWithPreview | null> => {
    setIsCompressing(true);
    setOriginalSize(file.size);
    setCompressionProgress(0);

    try {
      const compressedFile = await compressImage(file, (progress) => {
        setCompressionProgress(progress);
        console.log('Compression progress:', progress);
      });

      setCompressedSize(compressedFile.size);
      const compressionRatio = ((file.size - compressedFile.size) / file.size * 100).toFixed(1);

      const fileWithPreview = Object.assign(compressedFile, {
        preview: URL.createObjectURL(compressedFile)
      });

      toast({
        title: "Compression réussie",
        description: `Taille originale: ${formatFileSize(file.size)}
                     Taille compressée: ${formatFileSize(compressedFile.size)}
                     Réduction: ${compressionRatio}%`
      });

      return fileWithPreview;
    } catch (error: any) {
      console.error('Error compressing file:', error);

      toast({
        variant: "destructive",
        title: "Erreur de compression",
        description: error.message || "Une erreur est survenue lors de la compression. Veuillez réessayer avec un fichier différent ou désactiver la compression.",
        duration: 6000,
      });

      resetCompressionState();
      return null;
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  return {
    isCompressing,
    originalSize,
    compressedSize,
    compressionProgress,
    handleFileCompression,
    resetCompressionState,
  };
};