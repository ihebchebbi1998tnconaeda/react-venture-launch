
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

interface Season {
  id_saison: number;
  name_saison: string;
  havechapters_saisons: number;
  photo_saison: string;
}

interface UserSeason {
  id: number;
  id_client: number;
  id_saison: number;
  name_saison: string;
}

interface AllowerModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const AllowerModal: React.FC<AllowerModalProps> = ({ userId, isOpen, onClose }) => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [userSeasons, setUserSeasons] = useState<UserSeason[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedSeasons, setSelectedSeasons] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all seasons
        const allSeasonsResponse = await fetch('https://plateform.draminesaid.com/app/get_saisons.php');
        const allSeasonsData = await allSeasonsResponse.json();

        // Fetch user's seasons
        const userSeasonsResponse = await fetch('https://plateform.draminesaid.com/app/get_users_seasons.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: userId })
        });
        const userSeasonsData = await userSeasonsResponse.json();

        if (allSeasonsData.success && userSeasonsData.success) {
          setSeasons(allSeasonsData.saisons);
          setUserSeasons(userSeasonsData.seasons);
          // Set initial selected seasons based on user's current allocations
          setSelectedSeasons(userSeasonsData.seasons.map((s: UserSeason) => s.id_saison));
        }
      } catch (err) {
        setError('Failed to fetch seasons data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, userId]);

  const handleCheckboxChange = (seasonId: number) => {
    setSelectedSeasons(prev => {
      if (prev.includes(seasonId)) {
        return prev.filter(id => id !== seasonId);
      } else {
        return [...prev, seasonId];
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/allocation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          seasons: selectedSeasons
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Succès",
          description: "Formations allouées avec succès",
        });
        onClose();
      } else {
        throw new Error(data.message || 'Failed to update allocations');
      }
    } catch (err) {
      setError('Échec de l\'allocation des formations');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Allocation des Formations</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ScrollArea className="h-[400px] rounded-md border p-4">
          {seasons.map((season) => (
            <Card key={season.id_saison} className="p-3 mb-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`season-${season.id_saison}`}
                  checked={selectedSeasons.includes(season.id_saison)}
                  onCheckedChange={() => handleCheckboxChange(season.id_saison)}
                />
                <label
                  htmlFor={`season-${season.id_saison}`}
                  className="text-sm font-medium cursor-pointer"
                  dir="rtl"
                  lang="ar"
                >
                  {season.name_saison}
                </label>
              </div>
            </Card>
          ))}
        </ScrollArea>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              'Enregistrer'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllowerModal;

