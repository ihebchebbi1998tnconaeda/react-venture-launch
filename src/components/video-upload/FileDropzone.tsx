import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FileDropzoneProps {
  type: 'video' | 'thumbnail';
  file: File | null;
  onFileSelect: (file: File) => void;
  maxSize?: number;
  icon: LucideIcon;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  type,
  file,
  onFileSelect,
  maxSize,
  icon: Icon
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleFile = (selectedFile: File) => {
    if (!maxSize || selectedFile.size <= maxSize) {
      onFileSelect(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    handleFile(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const text = type === 'thumbnail' 
    ? 'Drop thumbnail here or click to browse'
    : 'Drop video here or click to browse';

  return (
    <div 
      className={`
        border-2 border-dashed border-border/40 rounded-lg p-6 text-center 
        cursor-pointer hover:bg-dashboard-background/50 transition-colors
        ${file ? 'bg-primary/5 border-primary/40' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById(`${type}Input`)?.click()}
    >
      <Icon className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
      <input
        type="file"
        id={`${type}Input`}
        onChange={handleFileChange}
        accept={type === 'thumbnail' ? 'image/*' : 'video/*'}
        className="hidden"
      />
      <p className="text-sm text-muted-foreground mb-2">{text}</p>
      {file && (
        <p className="text-sm text-primary font-medium truncate max-w-[200px] mx-auto">
          {file.name}
        </p>
      )}
    </div>
  );
};