import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from '@/types/product';
import SizeSelector from '../../product-detail/SizeSelector';
import { canItemBePersonalized, getPersonalizationMessage } from '@/utils/personalizationConfig';
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { needsSizeSelection } from '@/utils/sizeUtils';

interface ModifyItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Product | null;
  selectedSize: string;
  personalization: string;
  onSizeSelect: (size: string) => void;
  onPersonalizationChange: (text: string) => void;
  onConfirm: () => void;
}

const ModifyItemDialog = ({
  open,
  onOpenChange,
  item,
  selectedSize,
  personalization,
  onSizeSelect,
  onPersonalizationChange,
  onConfirm,
}: ModifyItemDialogProps) => {
  if (!item) return null;

  const canPersonalize = item ? canItemBePersonalized(item.itemgroup_product) : false;
  const personalizationMessage = item ? getPersonalizationMessage(item.itemgroup_product) : undefined;
  const requiresSizeSelection = item ? needsSizeSelection(item.itemgroup_product) : false;
  const isChemise = item?.itemgroup_product === 'chemises';
  const maxLength = isChemise ? 4 : 100;
  const remainingChars = maxLength - (personalization?.length || 0);

  const handlePersonalizationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      onPersonalizationChange(newText);
    } else {
      toast({
        title: "Limite de caractères atteinte",
        description: isChemise 
          ? "La personnalisation est limitée à 4 caractères pour les chemises"
          : "La personnalisation est limitée à 100 caractères",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white/95">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-[#6D0201] mb-4">
            Modifier l'article
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {requiresSizeSelection && (
            <SizeSelector
              selectedSize={selectedSize}
              sizes={Object.keys(item.sizes)}
              onSizeSelect={onSizeSelect}
              isCostume={item.itemgroup_product === 'costumes'}
            />
          )}
          
          {canPersonalize && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Votre texte de personnalisation</label>
                <span className={`text-sm ${remainingChars === 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {remainingChars} caractères restants
                </span>
              </div>
              <Textarea
                placeholder={isChemise 
                  ? "Maximum 4 caractères (ex: IHEB)"
                  : "Ajoutez votre texte personnalisé ici..."}
                value={personalization}
                onChange={handlePersonalizationChange}
                maxLength={maxLength}
                className="min-h-[120px] p-4 text-gray-800 bg-gray-50 border-2 border-gray-200 focus:border-[#700100] focus:ring-[#700100] rounded-lg resize-none transition-all duration-300"
              />
              <p className="text-sm text-gray-500 italic">
                {isChemise 
                  ? "Pour les chemises, la personnalisation est limitée à 4 caractères"
                  : "Maximum 100 caractères"}
              </p>
            </div>
          )}

          <button
            onClick={onConfirm}
            className="w-full py-4 rounded-xl text-white font-medium bg-[#6D0201] hover:bg-[#590000] transition-all duration-300"
          >
            Enregistrer les modifications
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyItemDialog;