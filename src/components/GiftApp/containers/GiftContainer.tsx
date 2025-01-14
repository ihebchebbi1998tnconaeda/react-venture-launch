import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { calculateDiscountedPrice } from '@/utils/priceCalculations';
import { useToast } from "@/hooks/use-toast";

interface GiftContainerProps {
  index: number;
  onDrop: (item: Product, index: number) => void;
  selectedItem?: Product | null;
  onRemove?: () => void;
  isActive: boolean;
  allowedTypes?: string[];
}

const GiftContainer = ({ 
  index, 
  onDrop, 
  selectedItem, 
  onRemove,
  isActive,
  allowedTypes = []
}: GiftContainerProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const productData = e.dataTransfer.getData('product');
    if (!productData) return;
    
    const product: Product = JSON.parse(productData);
    
    if (allowedTypes.length > 0 && !allowedTypes.includes(product.itemgroup_product)) {
      toast({
        title: "Type de produit non autorisé",
        description: "Ce type de produit n'est pas autorisé dans cet emplacement",
        variant: "destructive",
      });
      return;
    }

    // Calculate discounted price if applicable
    const hasDiscount = product.discount_product !== "" && 
                       !isNaN(parseFloat(product.discount_product)) && 
                       parseFloat(product.discount_product) > 0;
    
    const finalPrice = hasDiscount 
      ? calculateDiscountedPrice(product.price, product.discount_product)
      : product.price;

    // Create a modified product object with the final price
    const productWithFinalPrice = {
      ...product,
      price: finalPrice,
      originalPrice: hasDiscount ? product.price : undefined
    };

    onDrop(productWithFinalPrice, index);
  };

  return (
    <motion.div
      className={`relative h-[200px] rounded-lg border-2 transition-colors ${
        isDragOver 
          ? 'border-[#700100] bg-[#700100]/5' 
          : isActive
            ? 'border-[#700100] bg-white'
            : 'border-dashed border-gray-300 bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {selectedItem ? (
        <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="w-24 h-24 object-contain mb-2"
          />
          <p className="text-sm font-medium text-center text-gray-900 line-clamp-2">
            {selectedItem.name}
          </p>
          <p className="text-sm font-medium text-[#700100] mt-1">
            {selectedItem.price.toFixed(2)} TND
          </p>
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-sm text-center px-4">
            Faites glisser un produit ici
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftContainer;