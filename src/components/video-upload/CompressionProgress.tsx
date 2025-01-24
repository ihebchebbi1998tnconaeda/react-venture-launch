import React from 'react';
import { Progress } from '@/components/ui/progress';
import { formatFileSize } from '@/utils/compression';

interface CompressionProgressProps {
  isCompressing: boolean;
  compressionProgress: number;
  originalSize: number | null;
  compressedSize: number | null;
}

export const CompressionProgress: React.FC<CompressionProgressProps> = ({
  isCompressing,
  compressionProgress,
  originalSize,
  compressedSize,
}) => {
  if (!isCompressing) return null;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Compression en cours...</span>
        <span>{compressionProgress.toFixed(0)}%</span>
      </div>
      <Progress value={compressionProgress} className="h-2" />
      {originalSize && (
        <p className="text-sm text-muted-foreground">
          Taille originale: {formatFileSize(originalSize)}
          {compressedSize && (
            <>
              <br />
              Taille actuelle: {formatFileSize(compressedSize)}
              <br />
              Réduction: {((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%
            </>
          )}
        </p>
      )}
    </div>
  );
};