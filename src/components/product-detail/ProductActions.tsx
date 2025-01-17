import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductActionsProps {
  handleInitialAddToCart: () => void;
  product: Product;
  selectedSize: string;
}

const ProductActions = ({ 
  handleInitialAddToCart, 
  product, 
  selectedSize 
}: ProductActionsProps) => {
  return (
    <>
      <Button
        onClick={handleInitialAddToCart}
        className="w-full h-12 bg-[#700100] hover:bg-[#5a0100] text-white text-lg font-medium transition-all duration-300 rounded-md"
        disabled={!product.quantity || !selectedSize}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        {!product.quantity ? "Rupture de stock" : "Ajouter au panier"}
      </Button>

      <div className="space-y-1.5 text-sm font-medium text-gray-600 mt-3">
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#700100]"></span>
          Livraison gratuite en Tunisie à partir de 299 TND
        </p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#700100]"></span>
          Nous acceptons les échanges sous 30 jours
        </p>
      </div>
    </>
  );
};

export default ProductActions;