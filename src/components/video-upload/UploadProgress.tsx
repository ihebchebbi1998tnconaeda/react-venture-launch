import React from 'react';
import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  progress: number;
  uploadedMB: number;
  totalMB: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  uploadedMB,
  totalMB
}) => {
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{progress}% Complete</span>
        <span>{uploadedMB.toFixed(1)} MB / {totalMB.toFixed(1)} MB</span>
      </div>
    </div>
  );
};