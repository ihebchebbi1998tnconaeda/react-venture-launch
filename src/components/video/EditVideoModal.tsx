import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchSeasons, fetchChapters } from '@/api/chapters';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

interface EditVideoModalProps {
  video: {
    id: string;
    title: string;
    description: string;
    seasonId?: string;
    chapterId?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  description: string;
  seasonId: string;
  chapterId: string;
}

export function EditVideoModal({ video, isOpen, onClose, onSuccess }: EditVideoModalProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      title: video.title,
      description: video.description,
      seasonId: video.seasonId || '',
      chapterId: video.chapterId || '',
    },
  });

  const { data: seasonsData } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
  });

  const { data: chaptersData } = useQuery({
    queryKey: ['chapters'],
    queryFn: fetchChapters,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append('video_id', video.id);
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('id_saison', values.seasonId);
      formData.append('id_chapter', values.chapterId);

      const response = await axios.post('https://plateform.draminesaid.com/app/modify_video.php', formData);

      if (response.data.success) {
        toast({
          title: "Succès",
          description: "Vidéo mise à jour avec succès",
        });
        onSuccess();
        onClose();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier la vidéo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seasonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saison</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une saison" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {seasonsData?.saisons.map((season) => (
                        <SelectItem key={season.id_saison} value={season.id_saison}>
                          {season.name_saison}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chapterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapitre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un chapitre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {chaptersData?.chapters
                        .filter(chapter => chapter.id_saison === form.watch('seasonId'))
                        .map((chapter) => (
                          <SelectItem key={chapter.id_chapter} value={chapter.id_chapter}>
                            {chapter.name_chapter}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button type="submit">Sauvegarder</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}