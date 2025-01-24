import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { XCircle } from 'lucide-react';
import Modal from './Modal';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

interface MainContentProps {
  user: {
    id: number;
    [key: string]: any;
  };
}

const MainContent: React.FC<MainContentProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const videosPerPage = 6;
  const connectedUserId = user?.id;

  useEffect(() => {
    if (!user) {
      window.location.href = '/';
    }
  }, [user]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://plateform.draminesaid.com/app/get_videos.php?key=3845755');
      if (response.data.success) {
        const formattedVideos = response.data.data.map((video: any) => ({
          id: video.id_video,
          title: video.name_video,
          description: video.descri_video,
          videoUrl: `https://plateform.draminesaid.com/app/${video.url_video}`,
          thumbnail: `https://plateform.draminesaid.com/app/${video.url_thumbnail}`
        }));
        setVideos(formattedVideos);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error('Error fetching videos:', error);
      setError(error.message || 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleVideoClick = (video: Video) => setSelectedVideo(video);
  const handleCloseVideo = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the video player
    if (e.target === e.currentTarget) {
      setSelectedVideo(null);
    }
  };

  const handleDeleteVideo = async () => {
    if (!videoToDelete) return;
    try {
      const response = await axios.post('https://plateform.draminesaid.com/app/delete_video.php', {
        key: '3845755',
        id_video: videoToDelete
      });
      if (response.data.success) {
        await fetchVideos();
        alert('Vidéo supprimée avec succès !');
      } else {
        alert('Error deleting video: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    } finally {
      setShowModal(false);
      setVideoToDelete(null);
    }
  };

  const openDeleteModal = (id: string) => {
    setVideoToDelete(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setVideoToDelete(null);
  };

  return (
    <div className="p-6 mt-16" dir="rtl">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">تحميل الفيديوهات...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="البحث عن الفيديوهات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg bg-dashboard-card border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary text-black"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.map((video) => (
              <div
                key={video.id}
                className="bg-dashboard-card rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {connectedUserId === 1 && (
                    <button
                      className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(video.id);
                      }}
                      title="حذف الفيديو"
                    >
                      <XCircle className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-black">{video.title}</h3>
                  <p className="text-sm text-black">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-dashboard-card hover:bg-primary/10'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {selectedVideo && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={handleCloseVideo}
            >
              <div 
                className="relative w-full max-w-4xl aspect-video bg-dashboard-card rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <XCircle className="w-6 h-6 text-white" />
                </button>
                <ReactPlayer
                  url={selectedVideo.videoUrl}
                  controls
                  playing
                  width="100%"
                  height="100%"
                  config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                />
              </div>
            </div>
          )}

          {showModal && (
            <Modal
              action="supprimer"
              message="Cette vidéo sera supprimée définitivement. Voulez-vous continuer ?"
              onConfirm={handleDeleteVideo}
              onCancel={closeDeleteModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MainContent;