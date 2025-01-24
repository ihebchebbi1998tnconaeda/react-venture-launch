import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { ChapterSelect } from './ChapterSelect';
import { FileUploadBox } from './FileUploadBox';
import { CompressionProgress } from './CompressionProgress';
import { Progress } from '@/components/ui/progress';

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
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onVideoSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChapterChange: (value: string) => void;
  onSubchapterChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onThumbnailRemove: () => void;
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
  onTitleChange,
  onDescriptionChange,
  onVideoSelect,
  onThumbnailSelect,
  onChapterChange,
  onSubchapterChange,
  onSubmit,
  onThumbnailRemove,
}) => {
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
            className="bg-dashboard-background border-border/40"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Entrez la description de la vidéo"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            required
            className="bg-dashboard-background border-border/40 min-h-[80px]"
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
            onFileSelect={onVideoSelect}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Image miniature</label>
          <FileUploadBox
            type="thumbnail"
            file={thumbnailFile}
            isCompressing={isCompressing}
            onFileSelect={onThumbnailSelect}
            onFileRemove={onThumbnailRemove}
          />
        </div>
      </div>

      <CompressionProgress
        isCompressing={isCompressing}
        compressionProgress={compressionProgress}
        originalSize={originalSize}
        compressedSize={compressedSize}
      />

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Téléchargement en cours... {uploadProgress}%
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
  );
};