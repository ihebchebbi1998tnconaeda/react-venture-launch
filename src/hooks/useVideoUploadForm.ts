import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface FileWithPreview extends File {
  preview?: string;
}

export const useVideoUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<FileWithPreview | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSubchapter, setSelectedSubchapter] = useState('');
  const [uploadedSize, setUploadedSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [uploadTimeLeft, setUploadTimeLeft] = useState('Calcul...');
  const [uploadSpeed, setUploadSpeed] = useState('0 MB');
  const { toast } = useToast();

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setVideoFile(null);
    setThumbnailFile(null);
    setUploadProgress(0);
    setSelectedChapter('');
    setSelectedSubchapter('');
    setUploadedSize(0);
    setTotalSize(0);
    setUploadTimeLeft('Calcul...');
    setUploadSpeed('0 MB');
  };

  const calculateTimeLeft = useCallback((loaded: number, total: number, speed: number) => {
    if (speed === 0) return 'Calcul...';
    const remaining = total - loaded;
    const seconds = remaining / speed;
    if (seconds < 60) {
      return `${Math.round(seconds)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  }, []);

  const validateForm = () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Titre requis",
        description: "Veuillez entrer un titre pour la vidéo"
      });
      return false;
    }

    if (!selectedChapter || !selectedSubchapter) {
      toast({
        variant: "destructive",
        title: "Sélection requise",
        description: "Veuillez sélectionner une saison et un chapitre"
      });
      return false;
    }

    if (!videoFile) {
      toast({
        variant: "destructive",
        title: "Vidéo requise",
        description: "Veuillez sélectionner une vidéo à télécharger"
      });
      return false;
    }

    if (!thumbnailFile) {
      toast({
        variant: "destructive",
        title: "Miniature requise",
        description: "Veuillez sélectionner une image miniature"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('id_saison', selectedChapter);
    formData.append('id_chapter', selectedSubchapter);

    const totalSize = (videoFile?.size || 0) + (thumbnailFile?.size || 0);
    setTotalSize(totalSize);

    let startTime = Date.now();
    let lastLoaded = 0;

    try {
      const response = await axios.post(
        'https://plateform.draminesaid.com/app/uploadnew.php',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total || totalSize;
            const progress = (loaded * 100) / total;
            
            // Calculate speed
            const currentTime = Date.now();
            const timeElapsed = (currentTime - startTime) / 1000; // in seconds
            const loadedSinceStart = loaded - lastLoaded;
            const speed = loadedSinceStart / timeElapsed; // bytes per second
            
            // Update last values for next calculation
            startTime = currentTime;
            lastLoaded = loaded;

            setUploadProgress(progress);
            setUploadedSize(loaded);
            setUploadSpeed(`${(speed / (1024 * 1024)).toFixed(2)} MB`);
            setUploadTimeLeft(calculateTimeLeft(loaded, total, speed));

            console.log('Upload progress:', {
              progress: `${progress.toFixed(1)}%`,
              loaded: `${(loaded / (1024 * 1024)).toFixed(2)} MB`,
              total: `${(total / (1024 * 1024)).toFixed(2)} MB`,
              speed: `${(speed / (1024 * 1024)).toFixed(2)} MB/s`,
            });
          }
        }
      );

      if (response.data.success) {
        toast({
          title: "Succès",
          description: "Vidéo téléchargée avec succès"
        });
        resetForm();
      } else {
        throw new Error(response.data.message || 'Échec du téléchargement');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Échec du téléchargement",
        description: error.message || "Une erreur est survenue lors du téléchargement"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    videoFile,
    setVideoFile,
    thumbnailFile,
    setThumbnailFile,
    uploadProgress,
    setUploadProgress,
    isUploading,
    selectedChapter,
    setSelectedChapter,
    selectedSubchapter,
    setSelectedSubchapter,
    uploadedSize,
    totalSize,
    uploadTimeLeft,
    uploadSpeed,
    handleSubmit,
    resetForm
  };
};