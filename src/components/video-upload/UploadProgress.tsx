import React from 'react';
import { Progress } from '@/components/ui/progress';
import { formatFileSize } from '@/utils/compression';
import { Upload } from 'lucide-react';

interface UploadProgressProps {
  progress: number;
  uploadedSize: number;
  totalSize: number;
  timeLeft: string;
  speed: string;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  uploadedSize,
  totalSize,
  timeLeft,
  speed
}) => {
  return (
    <div className="mt-4 space-y-2 bg-muted/30 p-4 rounded-lg border border-border/40">
      <div className="flex items-center gap-2">
        <Upload className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-muted-foreground">Téléchargement en cours...</span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground">Progression:</p>
          <p className="text-foreground">{progress.toFixed(1)}%</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground">Temps restant:</p>
          <p className="text-foreground">{timeLeft}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground">Vitesse:</p>
          <p className="text-foreground">{speed}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground">Taille:</p>
          <p className="text-foreground">
            {formatFileSize(uploadedSize)} / {formatFileSize(totalSize)}
          </p>
        </div>
      </div>
    </div>
  );
};