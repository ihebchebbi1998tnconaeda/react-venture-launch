import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import BoxSelectionDialog from './BoxSelectionDialog';
import BoxInfoTooltip from './BoxInfoTooltip';

interface ProductOptionsProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: (withBox?: boolean) => void;
  stock?: number;
  availableSizes: string[];
  itemGroupProduct?: string;
}

const ProductOptions = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  onAddToCart,
  stock = 1,
  availableSizes,
  itemGroupProduct,
}: ProductOptionsProps) => {
  const [isBoxDialogOpen, setIsBoxDialogOpen] = useState(false);
  const [selectedBoxOption, setSelectedBoxOption] = useState<boolean | null>(null);

  const displaySize = (size: string) => {
    if (size === '3XL') return '3XL';
    return size;
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      // Handle size selection error
      return;
    }

    if (itemGroupProduct === 'chemises') {
      if (selectedBoxOption !== null) {
        onAddToCart(selectedBoxOption);
      } else {
        setIsBoxDialogOpen(true);
      }
    } else {
      onAddToCart(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">
            Taille {selectedSize ? `sélectionnée: ${displaySize(selectedSize)}` : ''}
          </span>
          <button className="text-xs text-[#700100] hover:underline">
            Guide des tailles
          </button>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 text-sm font-medium rounded-md transition-all duration-200
                ${selectedSize === size 
                  ? 'bg-[#700100] text-white shadow-md transform scale-105' 
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-[#700100] hover:bg-gray-50'
                }`}
            >
              {displaySize(size)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Quantité</span>
          <span className="text-sm font-medium text-gray-600">{stock} disponible</span>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-9 w-9 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100] transition-all"
          >
            <span className="h-4 w-4">-</span>
          </Button>
          <span className="w-10 text-center text-lg font-semibold text-black">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="h-9 w-9 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100] transition-all"
          >
            <span className="h-4 w-4">+</span>
          </Button>
        </div>
      </div>

      {itemGroupProduct === 'chemises' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gray-900">Boîte Cadeau</span>
            <BoxInfoTooltip />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedBoxOption(true)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
                ${selectedBoxOption === true 
                  ? 'border-[#700100] bg-[#700100]/5 text-[#700100]' 
                  : 'border-gray-200 hover:border-[#700100] text-gray-600 hover:text-[#700100]'
                }`}
            >
              <img 
                src="/Menu/Sur musure .png" 
                alt="With Box" 
                className="w-12 h-12 object-cover rounded"
              />
              <span className="font-medium">Avec boîte</span>
            </button>
            <button
              onClick={() => setSelectedBoxOption(false)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
                ${selectedBoxOption === false 
                  ? 'border-[#700100] bg-[#700100]/5 text-[#700100]' 
                  : 'border-gray-200 hover:border-[#700100] text-gray-600 hover:text-[#700100]'
                }`}
            >
              <div className="w-12 h-12 flex items-center justify-center text-current">
                <span className="text-2xl">✗</span>
              </div>
              <span className="font-medium">Sans boîte</span>
            </button>
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCartClick}
        className="w-full h-12 bg-[#700100] hover:bg-[#5a0100] text-white text-lg font-medium transition-all duration-300 rounded-md mt-3"
        disabled={stock === 0}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        {stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
      </Button>

      <div className="space-y-1.5 text-sm font-medium text-gray-600 mt-3">
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#700100]"></span>
          Livraison gratuite en Tunisie à partir de 299 TND
        </p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#700100]"></span>
          L'ajout d'une personnalisation nécessitera un paiement en ligne
        </p>
      </div>

      <BoxSelectionDialog
        isOpen={isBoxDialogOpen}
        onClose={() => setIsBoxDialogOpen(false)}
        onConfirm={(withBox) => {
          setSelectedBoxOption(withBox);
          setIsBoxDialogOpen(false);
          onAddToCart(withBox);
        }}
      />
    </div>
  );
};

export default ProductOptions;