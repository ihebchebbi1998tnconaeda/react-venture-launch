import React from 'react';
import { Progress } from '@/components/ui/progress';
import { formatFileSize } from '@/utils/compression';
import { AlertCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompressionProgressProps {
  isCompressing: boolean;
  compressionProgress: number;
  originalSize: number | null;
  compressedSize: number | null;
  timeLeft: string;
  speed: string;
  onCancel: () => void;
}

export const CompressionProgress: React.FC<CompressionProgressProps> = ({
  isCompressing,
  compressionProgress,
  originalSize,
  compressedSize,
  timeLeft,
  speed,
  onCancel
}) => {
  if (!isCompressing) return null;

  return (
    <div className="mt-4 space-y-2 bg-muted/30 p-4 rounded-lg border border-border/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />
          <span className="text-muted-foreground">Compression en cours...</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <XCircle className="h-4 w-4 mr-1" />
          Annuler
        </Button>
      </div>
      
      <Progress value={compressionProgress} className="h-2" />
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground">Progression:</p>
          <p className="text-foreground">{compressionProgress.toFixed(1)}%</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground">Temps restant:</p>
          <p className="text-foreground">{timeLeft}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground">Vitesse:</p>
          <p className="text-foreground">{speed}</p>
        </div>
        {originalSize && (
          <div className="space-y-1">
            <p className="font-medium text-muted-foreground">Réduction:</p>
            <p className="text-foreground">
              {compressedSize ? (
                <>
                  {formatFileSize(originalSize)} → {formatFileSize(compressedSize)}
                  <span className="text-green-500 ml-1">
                    (-{((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%)
                  </span>
                </>
              ) : (
                'Calcul en cours...'
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};