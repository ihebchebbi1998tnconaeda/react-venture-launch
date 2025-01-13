import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from '@/types/product';
import SizeSelector from '../../product-detail/SizeSelector';
import PersonalizationButton from '../../product-detail/PersonalizationButton';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  droppedItem: Product | null;
  selectedSize: string;
  personalization: string;
  onSizeSelect: (size: string) => void;
  onPersonalizationChange: (text: string) => void;
  onConfirm: () => void;
}

const AddItemDialog = ({
  open,
  onOpenChange,
  droppedItem,
  selectedSize,
  personalization,
  onSizeSelect,
  onPersonalizationChange,
  onConfirm,
}: AddItemDialogProps) => {
  const getAvailableSizes = (product: Product | null): string[] => {
    if (!product || !product.sizes) return [];

    return product.itemgroup_product === 'costumes'
      ? Object.entries(product.sizes)
          .filter(([key, stock]) => ['48', '50', '52', '54', '56', '58'].includes(key) && stock > 0)
          .map(([size]) => size)
      : Object.entries(product.sizes)
          .filter(([key, stock]) => ['s', 'm', 'l', 'xl', 'xxl', '3xl'].includes(key.toLowerCase()) && stock > 0)
          .map(([size]) => size.toUpperCase());
  };

  const availableSizes = getAvailableSizes(droppedItem);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white/95">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-[#6D0201] mb-4">
            Personnalisez votre article
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {availableSizes.length > 0 ? (
            <SizeSelector
              selectedSize={selectedSize}
              sizes={availableSizes}
              onSizeSelect={onSizeSelect}
              isCostume={droppedItem?.itemgroup_product === 'costumes'}
            />
          ) : (
            <p className="text-red-500">Aucune taille disponible pour ce produit</p>
          )}
          
          <PersonalizationButton
            productId={droppedItem?.id || 0}
            onSave={onPersonalizationChange}
            initialText={personalization}
          />

          <button
            onClick={onConfirm}
            className={`w-full py-4 rounded-xl text-white font-medium ${
              !selectedSize || availableSizes.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#6D0201] hover:bg-[#590000]'
            }`}
            disabled={!selectedSize || availableSizes.length === 0}
          >
            Confirmer
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;