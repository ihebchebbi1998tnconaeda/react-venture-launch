import axios from 'axios';

interface UploadVideoParams {
  videoFile: File;
  thumbnailFile: File;
  title: string;
  description: string;
  userEmail: string;
  onProgress: (progress: number, uploadedMB: number, totalMB: number) => void;
}

export const uploadVideo = async ({
  videoFile,
  thumbnailFile,
  title,
  description,
  userEmail,
  onProgress
}: UploadVideoParams) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('thumbnail', thumbnailFile);
  formData.append('title', title);
  formData.append('description', description);

  await axios.post('https://plateform.draminesaid.com/app/upload.php', formData, {
    onUploadProgress: (progressEvent) => {
      const total = progressEvent.total || 0;
      const current = progressEvent.loaded;
      const percentCompleted = Math.floor((current * 100) / total);
      const uploadedMB = Number((current / (1024 * 1024)).toFixed(2));
      const totalMB = Number((total / (1024 * 1024)).toFixed(2));

      onProgress(percentCompleted, uploadedMB, totalMB);
    },
  });

  await logUploadEvent(title, userEmail);
};

const logUploadEvent = async (videoTitle: string, userEmail: string) => {
  try {
    await axios.post('https://plateform.draminesaid.com/app/data_logs.php', {
      id_log: 'uniqueLogId',
      text_log: 'Vidéo ' + videoTitle + ' téléchargée avec succès',
      date_log: new Date().toISOString(),
      user_log: userEmail,
      type_log: 'téléchargements',
    });
  } catch (err) {
    console.error('Failed to log the event:', err);
  }
};