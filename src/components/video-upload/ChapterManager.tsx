import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Folder, FolderOpen, List, ArrowDown, ArrowUp, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Chapter {
  id: string;
  name: string;
  subchapters: string[];
}

export const ChapterManager = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [newChapterName, setNewChapterName] = useState('');
  const [newSubchapterName, setNewSubchapterName] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const { toast } = useToast();

  const createChapter = async () => {
    if (!newChapterName.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le nom du chapitre ne peut pas être vide"
      });
      return;
    }

    try {
      // Dummy API call - replace with actual endpoint
      // const response = await fetch('https://your-api/chapters', {
      //   method: 'POST',
      //   body: JSON.stringify({ name: newChapterName }),
      // });
      // const data = await response.json();

      // Simulating API response
      const newChapter: Chapter = {
        id: Date.now().toString(),
        name: newChapterName,
        subchapters: []
      };

      setChapters([...chapters, newChapter]);
      setNewChapterName('');
      
      toast({
        title: "Succès",
        description: "Chapitre créé avec succès"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la création du chapitre"
      });
    }
  };

  const addSubchapter = async (chapterId: string) => {
    if (!newSubchapterName.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le nom du sous-chapitre ne peut pas être vide"
      });
      return;
    }

    try {
      // Dummy API call - replace with actual endpoint
      // const response = await fetch(`https://your-api/chapters/${chapterId}/subchapters`, {
      //   method: 'POST',
      //   body: JSON.stringify({ name: newSubchapterName }),
      // });
      // const data = await response.json();

      setChapters(chapters.map(chapter => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            subchapters: [...chapter.subchapters, newSubchapterName]
          };
        }
        return chapter;
      }));
      
      setNewSubchapterName('');
      toast({
        title: "Succès",
        description: "Sous-chapitre ajouté avec succès"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'ajout du sous-chapitre"
      });
    }
  };

  const deleteChapter = async (chapterId: string) => {
    try {
      // Dummy API call - replace with actual endpoint
      // await fetch(`https://your-api/chapters/${chapterId}`, {
      //   method: 'DELETE'
      // });

      setChapters(chapters.filter(chapter => chapter.id !== chapterId));
      toast({
        title: "Succès",
        description: "Chapitre supprimé avec succès"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la suppression du chapitre"
      });
    }
  };

  const deleteSubchapter = async (chapterId: string, subchapterIndex: number) => {
    try {
      // Dummy API call - replace with actual endpoint
      // await fetch(`https://your-api/chapters/${chapterId}/subchapters/${subchapterIndex}`, {
      //   method: 'DELETE'
      // });

      setChapters(chapters.map(chapter => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            subchapters: chapter.subchapters.filter((_, index) => index !== subchapterIndex)
          };
        }
        return chapter;
      }));
      
      toast({
        title: "Succès",
        description: "Sous-chapitre supprimé avec succès"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la suppression du sous-chapitre"
      });
    }
  };

  return (
    <Card className="w-full bg-card border-border/40">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <List className="h-5 w-5 text-primary" />
          Gestion des chapitres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Nom du nouveau chapitre"
            value={newChapterName}
            onChange={(e) => setNewChapterName(e.target.value)}
            className="bg-background"
          />
          <Button onClick={createChapter} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {chapters.map((chapter) => (
            <AccordionItem
              key={chapter.id}
              value={chapter.id}
              className="border rounded-lg p-2 bg-background/50"
            >
              <div className="flex items-center justify-between">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-primary" />
                    <span>{chapter.name}</span>
                  </div>
                </AccordionTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChapter(chapter.id);
                  }}
                  className="mr-4"
                >
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <AccordionContent className="pt-4">
                <div className="space-y-4 pl-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nom du sous-chapitre"
                      value={newSubchapterName}
                      onChange={(e) => setNewSubchapterName(e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      onClick={() => addSubchapter(chapter.id)}
                      variant="outline"
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {chapter.subchapters.map((subchapter, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md bg-background/80"
                      >
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4 text-primary" />
                          <span>{subchapter}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSubchapter(chapter.id, index)}
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};