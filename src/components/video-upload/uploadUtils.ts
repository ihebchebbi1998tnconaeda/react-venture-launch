import axios from 'axios';

interface UploadVideoParams {
  videoFile: File;
  thumbnailFile: File;
  title: string;
  description: string;
  onProgress: (progress: number, uploadedMB: number, totalMB: number) => void;
}

export const uploadVideo = async ({
  videoFile,
  thumbnailFile,
  title,
  description,
  onProgress,
}: UploadVideoParams) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('thumbnail', thumbnailFile);
  formData.append('title', title);
  formData.append('description', description);

  try {
    console.log('Starting video upload...', {
      videoSize: formatFileSize(videoFile.size),
      thumbnailSize: formatFileSize(thumbnailFile.size),
      title,
    });

    const response = await axios.post(
      'https://plateform.draminesaid.com/app/upload.php',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          const loaded = progressEvent.loaded;
          const percentCompleted = total ? Math.round((loaded * 100) / total) : 0;
          const uploadedMB = loaded / (1024 * 1024);
          const totalMB = total / (1024 * 1024);
          console.log('Upload progress:', {
            progress: `${percentCompleted}%`,
            uploaded: `${uploadedMB.toFixed(2)} MB`,
            total: `${totalMB.toFixed(2)} MB`,
          });
          onProgress(percentCompleted, uploadedMB, totalMB);
        },
      }
    );

    console.log('Upload response:', response.data);

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Upload failed');
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    // Handle undefined error.response case
    throw new Error(error.response?.data?.message || error.message || 'An unexpected error occurred during the upload');
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
