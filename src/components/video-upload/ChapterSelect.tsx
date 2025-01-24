import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Folder, FolderOpen } from 'lucide-react';

interface ChapterSelectProps {
  selectedChapter: string;
  selectedSubchapter: string;
  onChapterChange: (value: string) => void;
  onSubchapterChange: (value: string) => void;
}

const chapters = [
  {
    id: '1',
    name: 'Chapitre 1: Introduction',
    subchapters: ['1.1 Présentation', '1.2 Objectifs', '1.3 Méthodologie']
  },
  {
    id: '2',
    name: 'Chapitre 2: Fondamentaux',
    subchapters: ['2.1 Concepts de base', '2.2 Principes', '2.3 Applications']
  },
  {
    id: '3',
    name: 'Chapitre 3: Avancé',
    subchapters: ['3.1 Techniques avancées', '3.2 Études de cas', '3.3 Exercices']
  }
];

export const ChapterSelect: React.FC<ChapterSelectProps> = ({
  selectedChapter,
  selectedSubchapter,
  onChapterChange,
  onSubchapterChange
}) => {
  const currentChapter = chapters.find(c => c.id === selectedChapter);

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Chapitre</label>
        <Select value={selectedChapter} onValueChange={onChapterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner un chapitre" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter) => (
              <SelectItem key={chapter.id} value={chapter.id}>
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <span>{chapter.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Sous-chapitre</label>
        <Select 
          value={selectedSubchapter} 
          onValueChange={onSubchapterChange}
          disabled={!currentChapter}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner un sous-chapitre" />
          </SelectTrigger>
          <SelectContent>
            {currentChapter?.subchapters.map((subchapter) => (
              <SelectItem key={subchapter} value={subchapter}>
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  <span>{subchapter}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};