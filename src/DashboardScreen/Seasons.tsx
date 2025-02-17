import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeasons, fetchChapters } from '@/api/chapters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Plus, X, Video } from 'lucide-react';
import { AddSeasonForm } from '@/components/seasons/AddSeasonForm';
import { AddChapterForm } from '@/components/seasons/AddChapterForm';
import { useToast } from '@/hooks/use-toast';
import Modal from './Modal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import axios from 'axios';

const Seasons = () => {
  const { toast } = useToast();
  const [seasonToDelete, setSeasonToDelete] = useState<string | null>(null);
  const [chapterToDelete, setChapterToDelete] = useState<string | null>(null);

  const { data: seasonsData, isLoading: isLoadingSeasons, refetch: refetchSeasons } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
  });

  const { data: chaptersData, isLoading: isLoadingChapters, refetch: refetchChapters } = useQuery({
    queryKey: ['chapters'],
    queryFn: fetchChapters,
  });

  const { data: videosData, isLoading: isLoadingVideos } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const response = await axios.get('https://plateform.draminesaid.com/app/get_videos.php?key=3845755');
      return response.data;
    },
  });

  const handleDeleteSeason = async () => {
    if (!seasonToDelete) return;
    
    try {
      const response = await axios.post('https://plateform.draminesaid.com/app/delete_saison.php', {
        key: '3845755',
        id_saison: seasonToDelete
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Season deleted successfully",
        });
        await refetchSeasons();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete season",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete season",
        variant: "destructive",
      });
    } finally {
      setSeasonToDelete(null);
    }
  };

  const handleDeleteChapter = async () => {
    if (!chapterToDelete) return;
    
    try {
      const response = await axios.post('https://plateform.draminesaid.com/app/delete_chapter.php', {
        key: '3845755',
        id_chapter: chapterToDelete
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Chapter deleted successfully",
        });
        await refetchChapters();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete chapter",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete chapter",
        variant: "destructive",
      });
    } finally {
      setChapterToDelete(null);
    }
  };

  if (isLoadingSeasons || isLoadingChapters || isLoadingVideos) {
    return (
      <div className="p-6 mt-16 space-y-6">
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  // Only proceed if we have all the data
  if (!seasonsData?.saisons || !videosData?.data) {
    return null;
  }

  return (
    <div className="p-6 mt-16 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Liste des saisons</h2>
        <div className="flex space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une saison
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle saison</DialogTitle>
              </DialogHeader>
              <AddSeasonForm />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un chapitre
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau chapitre</DialogTitle>
              </DialogHeader>
              <AddChapterForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Seasons Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {seasonsData?.saisons.map((season) => {
          const seasonVideos = videosData.data.filter(video => video.saison === season.id_saison) || [];
          
          return (
            <Card key={`overview-${season.id_saison}`} className="bg-dashboard-card border-border/40 relative">
              <button
                onClick={() => setSeasonToDelete(season.id_saison)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-4">
                  {season.photo_saison ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={`https://draminesaid.com/videos/${season.photo_saison}`}
                        alt={season.name_saison}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  ) : (
                    <BookOpen className="h-16 w-16 text-primary p-4 bg-primary/10 rounded-lg" />
                  )}
                  <div>
                    <CardTitle className="text-xl font-semibold">{season.name_saison}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>


      {/* Confirmation Modals */}
      {seasonToDelete && (
        <Modal
          action="supprimer"
          message="Cette saison sera supprimée définitivement. Voulez-vous continuer ?"
          onConfirm={handleDeleteSeason}
          onCancel={() => setSeasonToDelete(null)}
        />
      )}

      {chapterToDelete && (
        <Modal
          action="supprimer"
          message="Ce chapitre sera supprimé définitivement. Voulez-vous continuer ?"
          onConfirm={handleDeleteChapter}
          onCancel={() => setChapterToDelete(null)}
        />
      )}
    </div>
  );
};

export default Seasons;
