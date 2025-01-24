import React from 'react';
import { FileVideo, ImageIcon, X } from 'lucide-react';
import { formatFileSize } from '@/utils/compression';

interface FileUploadBoxProps {
  type: 'video' | 'thumbnail';
  file: File | null;
  isCompressing: boolean;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove?: () => void;
}

export const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  type,
  file,
  isCompressing,
  onFileSelect,
  onFileRemove
}) => {
  const Icon = type === 'video' ? FileVideo : ImageIcon;
  const inputId = `${type}Input`;

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
      {type === 'thumbnail' && file?.preview ? (
        <>
          <img 
            src={file.preview} 
            alt="Aperçu de la miniature" 
            className="w-32 h-32 object-cover mx-auto rounded-lg"
          />
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
        </>
      ) : (
        <>
          <Icon className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isCompressing ? 'Compression en cours...' : `Déposez ${type === 'video' ? 'la vidéo' : 'la miniature'} ici ou cliquez pour parcourir`}
          </p>
          {file && (
            <p className="text-sm text-primary font-medium truncate max-w-[200px] mx-auto mt-2">
              {file.name} ({formatFileSize(file.size)})
            </p>
          )}
        </>
      )}
      <input
        type="file"
        id={inputId}
        onChange={onFileSelect}
        accept={type === 'thumbnail' ? 'image/*' : 'video/*'}
        className="hidden"
        disabled={isCompressing}
      />
    </div>
  );
};