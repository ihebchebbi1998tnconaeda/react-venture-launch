import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Text, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { savePersonalization, getPersonalizations } from '@/utils/personalizationStorage';
import { useToast } from "@/hooks/use-toast";
import { getMaxLength } from '@/utils/personalizationConfig';

interface PersonalizationButtonProps {
  productId: number;
  onSave: (text: string) => void;
  initialText?: string;
  itemgroup_product?: string;
}

const PersonalizationButton = ({ productId, onSave, initialText = '', itemgroup_product = '' }: PersonalizationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(initialText);
  const { toast } = useToast();

  const maxLength = getMaxLength(itemgroup_product);
  const remainingChars = maxLength - text.length;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const handleSave = () => {
    if (text.trim()) {
      if (itemgroup_product === 'chemises' && text.length > 4) {
        toast({
          title: "Erreur de personnalisation",
          description: "Pour les chemises, la personnalisation est limitée à 4 caractères maximum",
          variant: "destructive",
        });
        return;
      }
      savePersonalization(productId, text.trim());
      onSave(text.trim());
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white text-[#700100] border-2 border-[#700100] hover:bg-[#700100] hover:text-white transition-all duration-300"
        >
          <Text className="mr-2 h-5 w-5" />
          {text ? 'Modifier la personnalisation' : 'Personnaliser votre produit'}
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white shadow-xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-[#700100] mb-4 text-center">
              Personnalisation du produit
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-6 bg-white">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                <span>Votre message personnalisé</span>
                <span className={`text-sm ${remainingChars === 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {remainingChars} caractères restants
                </span>
              </label>
              <Textarea
                placeholder={itemgroup_product === 'chemises' 
                  ? "Maximum 4 caractères (ex: IHEB)"
                  : "Ajoutez votre texte personnalisé ici..."}
                value={text}
                onChange={handleTextChange}
                maxLength={maxLength}
                className="min-h-[120px] p-4 text-gray-800 bg-gray-50 border-2 border-gray-200 focus:border-[#700100] focus:ring-[#700100] rounded-lg resize-none transition-all duration-300"
              />
              <p className="text-sm text-gray-500 italic">
                {itemgroup_product === 'chemises' 
                  ? "Pour les chemises, la personnalisation est limitée à 4 caractères"
                  : "Maximum 100 caractères"}
              </p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1 border-2 border-gray-300 bg-[#fff] hover:bg-[#590000] text-gray-700 transition-all duration-300"
              >
                Annuler
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-[#700100] hover:bg-[#590000] text-white transition-all duration-300"
              >
                <Save className="mr-2 h-5 w-5" />
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalizationButton;