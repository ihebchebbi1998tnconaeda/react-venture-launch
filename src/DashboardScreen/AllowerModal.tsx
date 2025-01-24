import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const chapters = [
  { id: 1, name: 'Chapitre 1' },
  { id: 2, name: 'Chapitre 2' },
  { id: 3, name: 'Chapitre 3' },
];

interface AllowerModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}

const AllowerModal: React.FC<AllowerModalProps> = ({ userId, isOpen, onClose }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);

  const handleChapterSelection = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleAllocation = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://plateform.draminesaid.com/app/allocation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          chapters: selectedChapters,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setAlertMessage('Utilisateur a été alloué avec succès!');
      } else {
        setAlertMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error("Error during allocation:", error);
      setAlertMessage("Erreur lors de l'allocation. Veuillez réessayer.");
    } finally {
      setLoading(false);
      setShowAlert(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Allouer Utilisateur</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Choisissez les chapitres auxquels cette utilisateur aura accès :
          </p>

          {showAlert && (
            <Alert className="mb-4">
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`chapter-${chapter.id}`}
                  checked={selectedChapters.includes(chapter.id)}
                  onCheckedChange={() => handleChapterSelection(chapter.id)}
                />
                <label
                  htmlFor={`chapter-${chapter.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {chapter.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button 
            onClick={handleAllocation} 
            disabled={loading || selectedChapters.length === 0}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'En cours...' : "Confirmer l'allocation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllowerModal;