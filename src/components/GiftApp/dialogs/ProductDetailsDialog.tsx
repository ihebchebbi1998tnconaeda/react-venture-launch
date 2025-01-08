import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Product } from '@/types/product';
import ProductImageCarousel from '../../product-detail/ProductImageCarousel';

interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const ProductDetailsDialog = ({
  open,
  onOpenChange,
  product
}: ProductDetailsDialogProps) => {
  if (!product) return null;

  const formattedDescription = product.description.split('\\n').map((line, index) => (
    <p key={index} className="text-gray-600 py-1">{line.trim()}</p>
  ));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white/95">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <ProductImageCarousel 
              images={[product.image]} 
              name={product.name} 
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#6D0201]">
              {product.name}
            </h2>
            <p className="text-xl text-[#000] font-semibold">
              {product.price} TND
            </p>
            <div className="flex flex-col space-y-2">
              {formattedDescription}
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-600 font-medium mb-2">
                  Couleur : {product.color}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;