import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { savePersonalization, removePersonalization, getPersonalizations } from '@/utils/personalizationStorage';
import { canItemBePersonalized, getPersonalizationMessage } from '@/utils/personalizationConfig';
import { useToast } from "@/components/ui/use-toast";

interface PersonalizationInputProps {
  itemId: number;
  onUpdate: (text: string) => void;
  itemGroup: string;
}

const PersonalizationInput = ({ itemId, onUpdate, itemGroup }: PersonalizationInputProps) => {
  const [isPersonalized, setIsPersonalized] = useState(() => {
    const personalizations = getPersonalizations();
    return !!personalizations[itemId];
  });
  const [text, setText] = useState(() => {
    const personalizations = getPersonalizations();
    return personalizations[itemId] || '';
  });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();


  const maxLength = itemGroup.toLowerCase() === 'chemises' ? 4 : 100;
  const remainingChars = maxLength - text.length;

  const canPersonalize = canItemBePersonalized(itemGroup);
  const personalizationMessage = getPersonalizationMessage(itemGroup);

  if (!canPersonalize) {
    return personalizationMessage ? (
      <div className="mt-2 text-sm text-gray-500 italic">
        {personalizationMessage}
      </div>
    ) : null;
  }

  if (!isPersonalized && !text) {
    return null;
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    } else {
      toast({
        title: "Limite de caractères atteinte",
        description: itemGroup.toLowerCase() === 'chemises' 
          ? "La personnalisation est limitée à 4 caractères pour les chemises"
          : "La personnalisation est limitée à 100 caractères",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      if (itemGroup.toLowerCase() === 'chemises' && trimmedText.length > 4) {
        toast({
          title: "Erreur de personnalisation",
          description: "Pour les chemises, la personnalisation est limitée à 4 caractères maximum",
          variant: "destructive",
        });
        return;
      }
      savePersonalization(itemId, trimmedText);
      setIsEditing(false);
      onUpdate(trimmedText);
    }
  };

  const handleRemove = () => {
    removePersonalization(itemId);
    setText('');
    setIsPersonalized(false);
    onUpdate('');
  };

  const handleCancel = () => {
    if (!text) {
      setIsPersonalized(false);
      onUpdate('');
    } else {
      setIsEditing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-2 space-y-2"
    >
      {isEditing ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Votre texte de personnalisation</label>
            <span className={`text-sm ${remainingChars === 0 ? 'text-red-500' : 'text-gray-500'}`}>
              {remainingChars} caractères restants
            </span>
          </div>
          <Textarea
            placeholder={itemGroup.toLowerCase() === 'chemises' 
              ? "Maximum 4 caractères (ex: IHEB)"
              : "Ajoutez votre texte personnalisé ici..."}
            value={text}
            onChange={handleTextChange}
            maxLength={maxLength}
            className="text-sm text-black resize-none focus:ring-[#700100] focus:border-[#700100] bg-white border-gray-300 rounded-md shadow-sm hover:border-[#700100] transition-all duration-300"
            rows={3}
          />
          <p className="text-xs text-gray-500 italic">
            {itemGroup.toLowerCase() === 'chemises' 
              ? "Pour les chemises, la personnalisation est limitée à 4 caractères"
              : "Maximum 100 caractères"}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-[#700100] hover:bg-[#590000] text-white shadow-sm hover:shadow-md transition-all duration-300"
              onClick={handleSave}
            >
              Confirmer
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-[#700100] bg-white text-[#700100] hover:bg-red-500 hover:text-white transition-all duration-300"
              onClick={handleCancel}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-3 rounded-lg relative group border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <p className="text-sm text-gray-600 pr-8">Personalisation: {text}</p>
          <div className="absolute right-2 top-2 flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-[#700100] hover:bg-[#700100]/10"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalizationInput;