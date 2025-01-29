import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileVideo, Image as ImageIcon } from 'lucide-react';
import { FileDropzone } from './FileDropzone';
import { UploadProgress } from './UploadProgress';
import { uploadVideo } from './uploadUtils';

interface UploadFormProps {
  userEmail?: string;
}

export const UploadForm: React.FC<UploadFormProps> = ({ userEmail }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedMB, setUploadedMB] = useState(0);
  const [totalMB, setTotalMB] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!videoFile || !thumbnailFile) {
      toast({
        variant: "destructive",
        title: "Missing Files",
        description: 'Please select both a video file and a thumbnail image.'
      });
      return;
    }

    setIsUploading(true);
    try {
      await uploadVideo({
        videoFile,
        thumbnailFile,
        title,
        description,
        onProgress: (progress, uploaded, total) => {
          setUploadProgress(progress);
          setUploadedMB(uploaded);
          setTotalMB(total);
        }
      });
      
      toast({
        title: "Success",
        description: 'Video uploaded successfully!'
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
      setUploadProgress(0);
      setUploadedMB(0);
      setTotalMB(0);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: err instanceof Error ? err.message : 'An error occurred during upload'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-dashboard-background border-border/40"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Enter video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="bg-dashboard-background border-border/40 min-h-[80px]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Video File</label>
          <FileDropzone
            type="video"
            file={videoFile}
            onFileSelect={setVideoFile}
            maxSize={2147483648}
            icon={FileVideo}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Thumbnail Image</label>
          <FileDropzone
            type="thumbnail"
            file={thumbnailFile}
            onFileSelect={setThumbnailFile}
            icon={ImageIcon}
          />
        </div>
      </div>

      {isUploading && (
        <UploadProgress
          progress={uploadProgress}
          uploadedMB={uploadedMB}
          totalMB={totalMB}
        />
      )}

      <Button
        type="submit"
        disabled={isUploading}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? 'Uploading...' : 'Upload Video'}
      </Button>
    </form>
  );
};