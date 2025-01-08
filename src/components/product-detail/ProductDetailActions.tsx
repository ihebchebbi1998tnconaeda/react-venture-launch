import React from 'react';
import { Button } from "@/components/ui/button";
import { Store, ShoppingCart } from 'lucide-react';

interface ProductDetailActionsProps {
  onAddToCart: (withBox?: boolean) => void;
  status: string;
  showBoxOption?: boolean;
}

const ProductDetailActions = ({ 
  onAddToCart, 
  status,
  showBoxOption = false 
}: ProductDetailActionsProps) => {
  return (
    <div className="space-y-3 p-6 border-t border-gray-100 bg-gray-50">
      <Button
        onClick={() => onAddToCart()}
        className="w-full bg-[#700100] hover:bg-[#590000] text-white py-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
        disabled={status !== 'En stock'}
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="font-medium">
          {status === 'En stock' ? 'Ajouter au panier' : 'Produit épuisé'}
        </span>
      </Button>

      <button className="w-full py-2.5 border border-[#700100] text-[#700100] rounded-lg flex items-center justify-center gap-2 hover:bg-[#700100] hover:text-white transition-all duration-300">
        <Store className="h-5 w-5" />
        Vérifier la disponibilité en magasin
      </button>
    </div>
  );
};

export default ProductDetailActions;