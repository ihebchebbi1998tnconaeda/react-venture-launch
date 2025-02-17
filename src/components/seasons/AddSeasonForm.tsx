import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { addSeason } from '@/api/seasons';
import { Plus, Upload } from 'lucide-react';

export const AddSeasonForm = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('placeholder.jpg');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setPhoto(file.name); // Set the photo name for the API
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir le nom de la saison"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Submitting season:', { name, photo });
      const response = await addSeason(name, photo);
      console.log('Server response:', response);
      
      if (response.success) {
        toast({
          title: "Succès",
          description: "Saison ajoutée avec succès"
        });
        setName('');
        setPhoto('placeholder.jpg');
        setImagePreview(null);
        queryClient.invalidateQueries({ queryKey: ['seasons'] });
      } else {
        throw new Error(response.message || 'Erreur lors de l\'ajout de la saison');
      }
    } catch (error: any) {
      console.error('Error adding season:', error);
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
        <label className="block text-sm font-medium mb-1">Nom de la saison</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez le nom de la saison"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image de la saison</label>
        <div className="mt-2 flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="season-image"
          />
          <label
            htmlFor="season-image"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choisir une image
          </label>
          {imagePreview && (
            <div className="relative w-20 h-20">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        {isLoading ? 'Ajout en cours...' : 'Ajouter la saison'}
      </Button>
    </form>
  );
};