import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { XCircle } from 'lucide-react';
import Modal from './Modal';
import { EditVideoModal } from '@/components/video/EditVideoModal';
import VideoCard from '@/components/video/VideoCard';
import VideoFilter from '@/components/video/VideoFilter';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  seasonId?: string;
  chapterId?: string;
}

interface MainContentProps {
  user: {
    id: number;
    [key: string]: any;
  };
}

const MainContent: React.FC<MainContentProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [videoToEdit, setVideoToEdit] = useState<Video | null>(null);
  const videosPerPage = 6;

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
          thumbnail: `https://plateform.draminesaid.com/app/${video.url_thumbnail}`,
          seasonId: video.id_saison,
          chapterId: video.id_chapter
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

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === 'all' || video.seasonId === selectedSeason;
    const matchesChapter = selectedChapter === 'all' || video.chapterId === selectedChapter;
    return matchesSearch && matchesSeason && matchesChapter;
  });

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

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
          <VideoFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            selectedChapter={selectedChapter}
            onChapterChange={setSelectedChapter}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onVideoClick={setSelectedVideo}
                onDeleteClick={(id) => {
                  setVideoToDelete(id);
                  setShowModal(true);
                }}
                onEditClick={(video, e) => {
                  e.stopPropagation();
                  setVideoToEdit(video);
                }}
              />
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
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
              onClick={() => setSelectedVideo(null)}
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
              onCancel={() => {
                setShowModal(false);
                setVideoToDelete(null);
              }}
            />
          )}

          {videoToEdit && (
            <EditVideoModal
              video={videoToEdit}
              isOpen={true}
              onClose={() => setVideoToEdit(null)}
              onSuccess={fetchVideos}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MainContent;