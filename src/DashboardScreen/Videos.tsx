import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChapterManager } from '@/components/video-upload/ChapterManager';
import { VideoUploadForm } from '@/components/video-upload/VideoUploadForm';
import { compressVideo, compressImage, formatFileSize } from '@/utils/compression';

interface VideosProps {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface FileWithPreview extends File {
  preview?: string;
}

const MAX_TOTAL_SIZE = 400 * 1024 * 1024; // 400MB in bytes

const Videos: React.FC<VideosProps> = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<FileWithPreview | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSubchapter, setSelectedSubchapter] = useState('');
  const [enableCompression, setEnableCompression] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const videoSize = videoFile?.size || 0;
    const thumbnailSize = thumbnailFile?.size || 0;
    const newTotalSize = videoSize + thumbnailSize;
    setTotalFileSize(newTotalSize);

    if (newTotalSize > MAX_TOTAL_SIZE && !enableCompression) {
      setEnableCompression(true);
      toast({
        title: "Compression automatique activée",
        description: `La taille totale des fichiers (${formatFileSize(newTotalSize)}) dépasse 400MB. La compression a été activée automatiquement.`,
        duration: 5000,
      });
    }
  }, [videoFile, thumbnailFile]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'video' | 'thumbnail'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'video' && !file.type.startsWith('video/')) {
      toast({
        variant: "destructive",
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner un fichier vidéo"
      });
      return;
    }

    if (type === 'thumbnail' && !file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner une image"
      });
      return;
    }

    const otherFileSize = type === 'video' ? (thumbnailFile?.size || 0) : (videoFile?.size || 0);
    const newTotalSize = file.size + otherFileSize;

    if (newTotalSize > MAX_TOTAL_SIZE && !enableCompression) {
      setEnableCompression(true);
      toast({
        title: "Compression automatique activée",
        description: `La taille totale des fichiers (${formatFileSize(newTotalSize)}) dépasse 400MB. La compression a été activée automatiquement.`,
        duration: 5000,
      });
    }

    if (enableCompression || newTotalSize > MAX_TOTAL_SIZE) {
      setIsCompressing(true);
      setOriginalSize(file.size);
      setCompressionProgress(0);
      
      try {
        const compressFile = type === 'video' ? compressVideo : compressImage;
        const compressedFile = await compressFile(file, (progress) => {
          setCompressionProgress(progress);
          console.log('Compression progress:', progress);
        });
        
        setCompressedSize(compressedFile.size);
        const fileWithPreview = Object.assign(compressedFile, {
          preview: type === 'thumbnail' ? URL.createObjectURL(compressedFile) : undefined
        });

        if (type === 'video') {
          setVideoFile(fileWithPreview);
        } else {
          setThumbnailFile(fileWithPreview);
        }

        const compressionRatio = ((file.size - compressedFile.size) / file.size * 100).toFixed(1);
        toast({
          title: "Compression réussie",
          description: `Taille originale: ${formatFileSize(file.size)}
                       Taille compressée: ${formatFileSize(compressedFile.size)}
                       Réduction: ${compressionRatio}%`
        });
      } catch (error) {
        console.error('Error compressing file:', error);
        toast({
          variant: "destructive",
          title: "Erreur de compression",
          description: "Une erreur est survenue lors de la compression"
        });
      } finally {
        setIsCompressing(false);
        setCompressionProgress(0);
      }
    } else {
      const fileWithPreview = Object.assign(file, {
        preview: type === 'thumbnail' ? URL.createObjectURL(file) : undefined
      });

      if (type === 'video') {
        setVideoFile(fileWithPreview);
      } else {
        setThumbnailFile(fileWithPreview);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) {
      toast({
        variant: "destructive",
        title: "Fichiers manquants",
        description: "Veuillez sélectionner une vidéo et une miniature"
      });
      return;
    }

    if (!selectedChapter || !selectedSubchapter) {
      toast({
        variant: "destructive",
        title: "Sélection incomplète",
        description: "Veuillez sélectionner un chapitre et un sous-chapitre"
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('chapter', selectedChapter);
    formData.append('subchapter', selectedSubchapter);

    try {
      const response = await fetch('https://plateform.draminesaid.com/app/upload.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Succès",
          description: "Vidéo téléchargée avec succès"
        });
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setThumbnailFile(null);
        setUploadProgress(0);
        setSelectedChapter('');
        setSelectedSubchapter('');
      } else {
        throw new Error(data.message || 'Échec du téléchargement');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec du téléchargement",
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 mt-16 max-w-5xl mx-auto space-y-6">
      <ChapterManager />
      
      <Card className="bg-dashboard-card border-border/40">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-semibold">Télécharger une nouvelle vidéo</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Compression</span>
              <Switch
                checked={enableCompression}
                onCheckedChange={setEnableCompression}
                disabled={totalFileSize > MAX_TOTAL_SIZE}
              />
            </div>
          </div>

          {totalFileSize > 0 && (
            <Alert variant={totalFileSize > MAX_TOTAL_SIZE ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Taille totale des fichiers</AlertTitle>
              <AlertDescription>
                {formatFileSize(totalFileSize)}
                {totalFileSize > MAX_TOTAL_SIZE && " - Compression automatique activée"}
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-muted-foreground">
            Partagez votre contenu avec votre audience. Téléchargez des vidéos et personnalisez leurs détails.
          </p>
        </CardHeader>
        <CardContent>
          <VideoUploadForm
            title={title}
            description={description}
            videoFile={videoFile}
            thumbnailFile={thumbnailFile}
            selectedChapter={selectedChapter}
            selectedSubchapter={selectedSubchapter}
            isUploading={isUploading}
            isCompressing={isCompressing}
            uploadProgress={uploadProgress}
            compressionProgress={compressionProgress}
            originalSize={originalSize}
            compressedSize={compressedSize}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onVideoSelect={(e) => handleFileChange(e, 'video')}
            onThumbnailSelect={(e) => handleFileChange(e, 'thumbnail')}
            onChapterChange={setSelectedChapter}
            onSubchapterChange={setSelectedSubchapter}
            onSubmit={handleSubmit}
            onThumbnailRemove={() => setThumbnailFile(null)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Videos;