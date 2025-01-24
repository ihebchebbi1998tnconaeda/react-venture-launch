import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileVideo, Image as ImageIcon, X, AlertTriangle } from 'lucide-react';
import { ChapterSelect } from '@/components/video-upload/ChapterSelect';
import { compressVideo, compressImage, formatFileSize } from '@/utils/compression';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChapterManager } from '@/components/video-upload/ChapterManager';

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
  const [totalFileSize, setTotalFileSize] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate total size whenever files change
    const videoSize = videoFile?.size || 0;
    const thumbnailSize = thumbnailFile?.size || 0;
    const newTotalSize = videoSize + thumbnailSize;
    setTotalFileSize(newTotalSize);

    // Auto-enable compression if total size exceeds 400MB
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

    // Calculate new total size
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
      try {
        setOriginalSize(file.size);
        const compressedFile = type === 'video' 
          ? await compressVideo(file)
          : await compressImage(file);
        
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
          description: `Taille originale: ${formatFileSize(file.size)}\nTaille compressée: ${formatFileSize(compressedFile.size)}\nRéduction: ${compressionRatio}%`
        });
      } catch (error) {
        console.error('Error compressing file:', error);
        toast({
          variant: "destructive",
          title: "Erreur de compression",
          description: "Une erreur est survenue lors de la compression"
        });
      }
      setIsCompressing(false);
    } else {
      setOriginalSize(file.size);
      setCompressedSize(null);
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
        // Reset form
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
          {originalSize && (
            <div className="text-sm text-muted-foreground">
              <p>Taille originale: {formatFileSize(originalSize)}</p>
              {compressedSize && (
                <>
                  <p>Taille compressée: {formatFileSize(compressedSize)}</p>
                  <p>Réduction: {((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%</p>
                </>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ChapterSelect
              selectedChapter={selectedChapter}
              selectedSubchapter={selectedSubchapter}
              onChapterChange={setSelectedChapter}
              onSubchapterChange={setSelectedSubchapter}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre</label>
                <Input
                  type="text"
                  placeholder="Entrez le titre de la vidéo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-dashboard-background border-border/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Entrez la description de la vidéo"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="bg-dashboard-background border-border/40 min-h-[80px]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Fichier vidéo
                  {videoFile && (
                    <span className="ml-2 text-muted-foreground">
                      ({formatFileSize(videoFile.size)})
                    </span>
                  )}
                </label>
                <div 
                  className={`
                    border-2 border-dashed border-border/40 rounded-lg p-6 text-center 
                    cursor-pointer hover:bg-dashboard-background/50 transition-colors
                    ${videoFile ? 'bg-primary/5 border-primary/40' : ''}
                    ${isCompressing ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={() => !isCompressing && document.getElementById('videoInput')?.click()}
                >
                  <FileVideo className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <input
                    type="file"
                    id="videoInput"
                    onChange={(e) => handleFileChange(e, 'video')}
                    accept="video/*"
                    className="hidden"
                    disabled={isCompressing}
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    {isCompressing ? 'Compression en cours...' : 'Déposez la vidéo ici ou cliquez pour parcourir'}
                  </p>
                  {videoFile && (
                    <p className="text-sm text-primary font-medium truncate max-w-[200px] mx-auto">
                      {videoFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Image miniature
                  {thumbnailFile && (
                    <span className="ml-2 text-muted-foreground">
                      ({formatFileSize(thumbnailFile.size)})
                    </span>
                  )}
                </label>
                <div 
                  className={`
                    border-2 border-dashed border-border/40 rounded-lg p-6 text-center 
                    cursor-pointer hover:bg-dashboard-background/50 transition-colors relative
                    ${thumbnailFile ? 'bg-primary/5 border-primary/40' : ''}
                    ${isCompressing ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={() => !isCompressing && document.getElementById('thumbnailInput')?.click()}
                >
                  {thumbnailFile?.preview ? (
                    <>
                      <img 
                        src={thumbnailFile.preview} 
                        alt="Aperçu de la miniature" 
                        className="w-32 h-32 object-cover mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setThumbnailFile(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                        disabled={isCompressing}
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {isCompressing ? 'Compression en cours...' : 'Déposez la miniature ici ou cliquez pour parcourir'}
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="thumbnailInput"
                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                    accept="image/*"
                    className="hidden"
                    disabled={isCompressing}
                  />
                </div>
              </div>
            </div>

            {(isUploading || isCompressing) && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {isCompressing ? 'Compression en cours...' : `Téléchargement en cours... ${uploadProgress}%`}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isUploading || isCompressing}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Téléchargement...' : 'Télécharger la vidéo'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Videos;
