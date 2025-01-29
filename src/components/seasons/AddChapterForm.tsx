import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { addChapter } from '@/api/seasons';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { fetchSeasons } from '@/api/chapters';

export const AddChapterForm = () => {
  const [name, setName] = useState('');
  const [seasonId, setSeasonId] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: seasonsData } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !seasonId || !photo) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      });
      return;
    }

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const photoData = base64String.split(',')[1];
        
        const response = await addChapter(seasonId, name, photoData);
        if (response.success) {
          toast({
            title: "Succès",
            description: "Chapitre ajouté avec succès"
          });
          setName('');
          setSeasonId('');
          setPhoto(null);
          queryClient.invalidateQueries({ queryKey: ['chapters'] });
        } else {
          throw new Error(response.message);
        }
      };
      reader.readAsDataURL(photo);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Saison</label>
        <Select value={seasonId} onValueChange={setSeasonId}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une saison" />
          </SelectTrigger>
          <SelectContent>
            {seasonsData?.saisons.map((season) => (
              <SelectItem key={season.id_saison} value={season.id_saison}>
                {season.name_saison}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nom du chapitre</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez le nom du chapitre"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Photo du chapitre</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        {isLoading ? 'Ajout en cours...' : 'Ajouter le chapitre'}
      </Button>
    </form>
  );
};