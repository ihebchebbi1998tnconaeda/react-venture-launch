import React, { useState } from 'react';
import { MinusCircle, PlusCircle, Trash2, Tag, Package, Gift, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartItem } from './CartProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { savePersonalization } from '@/utils/personalizationStorage';
import { toast } from "@/hooks/use-toast";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItemCard = ({ item, onUpdateQuantity, onRemove }: CartItemCardProps) => {
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [personalizationText, setPersonalizationText] = useState(item.personalization || '');
  const packType = sessionStorage.getItem('selectedPackType') || 'aucun';
  const hasDiscount = item.discount_product && item.discount_product !== "" && !isNaN(parseFloat(item.discount_product));
  const isFromPack = item.fromPack && packType !== 'aucun';
  const isPackagingFee = item.type_product === "Pack";
  const hasPersonalization = !isPackagingFee && item.personalization && item.personalization !== '-';
  const isChemise = item.itemgroup_product === 'chemises';
  const showPersonalizationCost = hasPersonalization && isChemise && !isFromPack;

  const maxLength = isChemise ? 4 : 100;
  const remainingChars = maxLength - personalizationText.length;

  const handleSavePersonalization = () => {
    if (isChemise && personalizationText.length > 4) {
      toast({
        title: "Erreur de personnalisation",
        description: "Pour les chemises, la personnalisation est limitée à 4 caractères maximum",
        variant: "destructive",
      });
      return;
    }
    savePersonalization(item.id, personalizationText);
    item.personalization = personalizationText;
    setIsPersonalizationOpen(false);
  };

  const handlePersonalizationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setPersonalizationText(newText);
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md border border-gray-100/50 backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F1F0FB] rounded-lg overflow-hidden group flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain mix-blend-multiply p-2 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-serif text-[#1A1F2C] hover:text-[#700100] transition-colors cursor-pointer truncate max-w-full">
              {item.name}
              {isFromPack && ` (${packType})`}
            </h3>
            {hasDiscount && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#700100] text-white">
                <Tag size={12} />
                -{item.discount_product}%
              </span>
            )}
            <div className="flex flex-wrap gap-1">
              {isFromPack && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#700100]/10 text-[#700100] whitespace-nowrap">
                  <Package size={12} />
                  {packType}
                </span>
              )}
              {item.withBox && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#700100]/10 text-[#700100] whitespace-nowrap">
                  <Gift size={12} />
                  + Box cadeau (30 TND)
                </span>
              )}
              {showPersonalizationCost && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#700100]/10 text-[#700100] whitespace-nowrap">
                  <PenLine size={12} />
                  + Personnalisation (30 TND)
                </span>
              )}
            </div>
          </div>
          
          {(item.size !== '-' || item.color !== '-') && !isPackagingFee && (
            <div className="flex flex-wrap gap-2 mb-2">
              {item.size !== '-' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">
                  Taille: {item.size}
                </span>
              )}
              {item.color !== '-' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">
                  Couleur: {item.color}
                </span>
              )}
            </div>
          )}

          {!isPackagingFee && item.personalization && item.personalization !== '-' && (
           /*  onClick={() => setIsPersonalizationOpen(true)} */
            <div className="mb-2 bg-gray-50 p-3 rounded-lg relative group cursor-pointer" >
              <p className="text-sm text-gray-600 pr-8">
                Personnalisation: {item.personalization}
              </p>
             {/*  <PenLine 
                size={16} 
                className="absolute right-2 top-2 text-[#700100] opacity-0 group-hover:opacity-100 transition-opacity"
              /> */}
            </div>
          )}

          <div className="flex items-center justify-between sm:justify-start gap-4 mt-3">
            <div className="flex items-center bg-[#F1F0FB] rounded-full px-3 py-1">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="text-[#8E9196] hover:text-[#700100] transition-colors p-1"
                aria-label="Diminuer la quantité"
              >
                <MinusCircle size={18} />
              </button>
              <span className="w-8 text-center font-medium text-[#1A1F2C] text-sm">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="text-[#8E9196] hover:text-[#700100] transition-colors p-1"
                aria-label="Augmenter la quantité"
              >
                <PlusCircle size={18} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-base sm:text-lg font-medium">
                {hasDiscount && item.originalPrice ? (
                  <div className="flex flex-col items-end">
                    <span className="text-[#700100]">{(item.price * item.quantity).toFixed(2)} TND</span>
                    <span className="text-sm text-gray-500 line-through">
                      {(item.originalPrice * item.quantity).toFixed(2)} TND
                    </span>
                  </div>
                ) : (
                  <span className="text-[#1A1F2C]">
                    {(item.price * item.quantity).toFixed(2)} TND
                  </span>
                )}
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-[#8E9196] hover:text-red-600 transition-colors group p-1"
                aria-label="Supprimer l'article"
              >
                <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isPackagingFee && (
        <Dialog open={isPersonalizationOpen} onOpenChange={setIsPersonalizationOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white shadow-xl border border-gray-100">
            <DialogHeader>
              <DialogTitle className="text-xl font-serif text-[#700100] mb-4 text-center">
                Modifier la personnalisation
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-6 bg-white">
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
                  value={personalizationText}
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
              
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => setIsPersonalizationOpen(false)}
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 bg-[#fff] hover:bg-[#590000] text-gray-700 transition-all duration-300"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSavePersonalization}
                  className="flex-1 bg-[#700100] hover:bg-[#590000] text-white transition-all duration-300"
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default CartItemCard;