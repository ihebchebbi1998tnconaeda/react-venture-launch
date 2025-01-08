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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white/95">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-[#6D0201] mb-4">
            Personnalisez votre article
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <SizeSelector
            selectedSize={selectedSize}
            sizes={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
            onSizeSelect={onSizeSelect}
          />
          
          <PersonalizationButton
            productId={droppedItem?.id || 0}
            onSave={onPersonalizationChange}
            initialText={personalization}
          />

          <button
            onClick={onConfirm}
            className={`w-full py-4 rounded-xl text-white font-medium ${
              !selectedSize
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#6D0201] hover:bg-[#590000]'
            }`}
            disabled={!selectedSize}
          >
            Confirmer
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;