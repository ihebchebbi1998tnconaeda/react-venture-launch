import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Folder, FolderOpen } from 'lucide-react';
import { fetchSeasons, fetchChapters } from '@/api/chapters';

interface ChapterSelectProps {
  selectedChapter: string;
  selectedSubchapter: string;
  onChapterChange: (value: string) => void;
  onSubchapterChange: (value: string) => void;
}

export const ChapterSelect: React.FC<ChapterSelectProps> = ({
  selectedChapter,
  selectedSubchapter,
  onChapterChange,
  onSubchapterChange
}) => {
  const { data: seasonsData } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
  });

  const { data: chaptersData } = useQuery({
    queryKey: ['chapters'],
    queryFn: fetchChapters,
  });

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Saison</label>
        <Select value={selectedChapter} onValueChange={onChapterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner une saison" />
          </SelectTrigger>
          <SelectContent>
            {seasonsData?.saisons.map((season) => (
              <SelectItem key={season.id_saison} value={season.id_saison}>
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <span>{season.name_saison}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Chapitre</label>
        <Select 
          value={selectedSubchapter} 
          onValueChange={onSubchapterChange}
          disabled={!selectedChapter}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner un chapitre" />
          </SelectTrigger>
          <SelectContent>
            {chaptersData?.chapters
              .filter(chapter => chapter.id_saison === selectedChapter)
              .map((chapter) => (
                <SelectItem key={chapter.id_chapter} value={chapter.id_chapter}>
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-primary" />
                    <span>{chapter.name_chapter}</span>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};