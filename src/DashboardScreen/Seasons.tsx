import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeasons, fetchChapters } from '@/api/chapters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Plus } from 'lucide-react';
import { AddSeasonForm } from '@/components/seasons/AddSeasonForm';
import { AddChapterForm } from '@/components/seasons/AddChapterForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const Seasons = () => {
  const { data: seasonsData, isLoading: isLoadingSeasons } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
  });

  const { data: chaptersData, isLoading: isLoadingChapters } = useQuery({
    queryKey: ['chapters'],
    queryFn: fetchChapters,
  });

  if (isLoadingSeasons || isLoadingChapters) {
    return (
      <div className="p-6 mt-16 space-y-6">
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
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
        {seasonsData?.saisons.map((season) => (
          <Card key={`overview-${season.id_saison}`} className="bg-dashboard-card border-border/40">
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
                  <p className="text-sm text-muted-foreground">
                    {chaptersData?.chapters.filter(chapter => chapter.id_saison === season.id_saison).length || 0} chapitres
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Détails des saisons et chapitres</h2>

      {/* Detailed Seasons with Chapters Section */}
      <div className="grid gap-6">
        {seasonsData?.saisons.map((season) => (
          <Card key={season.id_saison} className="bg-dashboard-card border-border/40">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {season.photo_saison ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
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
                    <BookOpen className="h-5 w-5 text-primary" />
                  )}
                  <CardTitle className="text-xl font-semibold">{season.name_saison}</CardTitle>
                </div>
                <span className="text-sm text-muted-foreground">
                  {chaptersData?.chapters.filter(chapter => chapter.id_saison === season.id_saison).length || 0} chapitres
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chaptersData?.chapters
                  .filter((chapter) => chapter.id_saison === season.id_saison)
                  .map((chapter) => (
                    <Card key={chapter.id_chapter} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={`https://draminesaid.com/videos/${chapter.photo_chapter}`}
                          alt={chapter.name_chapter}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{chapter.name_chapter}</h3>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Seasons;