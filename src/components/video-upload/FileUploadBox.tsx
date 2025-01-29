import React from 'react';
import { FileVideo, ImageIcon, X } from 'lucide-react';
import { formatFileSize } from '@/utils/compression';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploadBoxProps {
  type: 'video' | 'thumbnail';
  file: FileWithPreview | null;
  isCompressing: boolean;
  compressionProgress: number;
  originalSize: number | null;
  compressedSize: number | null;
  timeLeft?: string;
  speed?: string;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove?: () => void;
  onCancel?: () => void;
}

export const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  type,
  file,
  isCompressing,
  compressionProgress,
  originalSize,
  compressedSize,
  timeLeft,
  speed,
  onFileSelect,
  onFileRemove,
  onCancel
}) => {
  const Icon = type === 'video' ? FileVideo : ImageIcon;
  const inputId = `${type}Input`;
  
  const acceptedTypes = type === 'video'
    ? 'video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm'
    : 'image/*';

  const getUploadText = () => {
    if (isCompressing) return 'Compression en cours...';
    if (type === 'video') return 'Déposez la vidéo ici ou cliquez pour parcourir';
    return 'Déposez la miniature ici ou cliquez pour parcourir';
  };

  const getFormatText = () => {
    if (type === 'video') return 'Formats acceptés: MP4, MOV, AVI, MKV, WebM';
    return 'Images uniquement';
  };

  return (
    <div 
      className={`
        border-2 border-dashed border-border/40 rounded-lg p-6 text-center 
        cursor-pointer hover:bg-dashboard-background/50 transition-colors relative
        ${file ? 'bg-primary/5 border-primary/40' : ''}
        ${isCompressing ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={() => !isCompressing && document.getElementById(inputId)?.click()}
    >
      {file && (
        <>
          {type === 'thumbnail' && file.preview ? (
            <img 
              src={file.preview} 
              alt="Aperçu de la miniature" 
              className="w-32 h-32 object-cover mx-auto rounded-lg"
            />
          ) : (
            <video 
              src={URL.createObjectURL(file)}
              className="w-32 h-32 object-cover mx-auto rounded-lg"
              controls
            />
          )}

          {onFileRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFileRemove();
              }}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              disabled={isCompressing}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            <p className="font-medium truncate max-w-[200px] mx-auto">
              {file.name}
            </p>
            {originalSize && (
              <p className="mt-1">
                Taille originale: {formatFileSize(originalSize)}
                {compressedSize && (
                  <>
                    <br />
                    Taille compressée: {formatFileSize(compressedSize)}
                    <br />
                    Réduction: {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                  </>
                )}
              </p>
            )}
          </div>

          {isCompressing && timeLeft && speed && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Compression: {compressionProgress}%</span>
                <span>Vitesse: {speed}</span>
              </div>
              <Progress value={compressionProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Temps restant: {timeLeft}
              </p>
              {onCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                  }}
                  className="mt-2"
                >
                  Annuler la compression
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {!file && (
        <>
          <Icon className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {getUploadText()}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {getFormatText()}
          </p>
        </>
      )}

      <input
        type="file"
        id={inputId}
        onChange={onFileSelect}
        accept={acceptedTypes}
        className="hidden"
        disabled={isCompressing}
      />
    </div>
  );
};