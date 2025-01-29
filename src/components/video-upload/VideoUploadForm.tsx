import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import { ChapterSelect } from './ChapterSelect';
import { FileUploadBox } from './FileUploadBox';
import { CompressionProgress } from './CompressionProgress';
import { UploadProgress } from './UploadProgress';
import { formatFileSize } from '@/utils/compression';

interface VideoUploadFormProps {
  title: string;
  description: string;
  videoFile: File | null;
  thumbnailFile: File | null;
  selectedChapter: string;
  selectedSubchapter: string;
  isUploading: boolean;
  isCompressing: boolean;
  uploadProgress: number;
  compressionProgress: number;
  originalSize: number | null;
  compressedSize: number | null;
  timeLeft?: string;
  speed?: string;
  uploadedSize: number;
  totalSize: number;
  uploadTimeLeft: string;
  uploadSpeed: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onVideoSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChapterChange: (value: string) => void;
  onSubchapterChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onThumbnailRemove: () => void;
  onCancelCompression?: () => void;
}

export const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  title,
  description,
  videoFile,
  thumbnailFile,
  selectedChapter,
  selectedSubchapter,
  isUploading,
  isCompressing,
  uploadProgress,
  compressionProgress,
  originalSize,
  compressedSize,
  timeLeft = 'Calcul...',
  speed = '0x',
  uploadedSize,
  totalSize,
  uploadTimeLeft,
  uploadSpeed,
  onTitleChange,
  onDescriptionChange,
  onVideoSelect,
  onThumbnailSelect,
  onChapterChange,
  onSubchapterChange,
  onSubmit,
  onThumbnailRemove,
  onCancelCompression,
}) => {
  const videoPreviewUrl = videoFile ? URL.createObjectURL(videoFile) : null;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ChapterSelect
        selectedChapter={selectedChapter}
        selectedSubchapter={selectedSubchapter}
        onChapterChange={onChapterChange}
        onSubchapterChange={onSubchapterChange}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Titre</label>
          <Input
            type="text"
            placeholder="Entrez le titre de la vidéo"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
            className="bg-dashboard-background border-border/40 text-black"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Entrez la description de la vidéo"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            required
            className="bg-dashboard-background border-border/40 min-h-[80px] text-black"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Fichier vidéo</label>
          <FileUploadBox
            type="video"
            file={videoFile}
            isCompressing={isCompressing}
            compressionProgress={compressionProgress}
            originalSize={originalSize}
            compressedSize={compressedSize}
            timeLeft={timeLeft}
            speed={speed}
            onFileSelect={onVideoSelect}
            onCancel={onCancelCompression}
          />
          
          {videoFile && !isCompressing && (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg overflow-hidden border border-border/40">
                <video 
                  src={videoPreviewUrl}
                  controls
                  className="w-full"
                  style={{ maxHeight: '200px' }}
                >
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Taille originale: {originalSize ? formatFileSize(originalSize) : 'N/A'}</span>
                <span>Taille compressée: {compressedSize ? formatFileSize(compressedSize) : 'N/A'}</span>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Image miniature</label>
          <FileUploadBox
            type="thumbnail"
            file={thumbnailFile}
            isCompressing={false}
            compressionProgress={0}
            originalSize={null}
            compressedSize={null}
            onFileSelect={onThumbnailSelect}
            onFileRemove={onThumbnailRemove}
          />
        </div>
      </div>

      {isCompressing && (
        <CompressionProgress
          isCompressing={isCompressing}
          compressionProgress={compressionProgress}
          originalSize={originalSize}
          compressedSize={compressedSize}
          timeLeft={timeLeft}
          speed={speed}
          onCancel={onCancelCompression || (() => {})}
        />
      )}

      {isUploading && (
        <UploadProgress
          progress={uploadProgress}
          uploadedSize={uploadedSize}
          totalSize={totalSize}
          timeLeft={uploadTimeLeft}
          speed={uploadSpeed}
        />
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
  );
};