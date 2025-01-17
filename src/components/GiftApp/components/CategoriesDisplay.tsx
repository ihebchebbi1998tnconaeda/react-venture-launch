import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Product } from '@/types/product';
import { Check } from 'lucide-react';

interface Category {
  label: string;
  type: string;
  value: string;
}

interface CategoriesDisplayProps {
  categories: Category[];
  selectedItems: Product[];
  packType: string;
}

const CategoriesDisplay = ({ categories, selectedItems, packType }: CategoriesDisplayProps) => {
  const getStepLabel = () => {
    const itemCount = selectedItems.length;
    
    if (packType === 'Pack Prestige') {
      if (itemCount === 0) return "Étape 1: Choisissez une chemise";
      if (itemCount === 1) return "Étape 2: Ajoutez une ceinture";
      if (itemCount === 2) return "Étape 3: Complétez avec une cravate";
      return "Pack complet!";
    }

    if (packType === 'Pack Premium') {
      if (itemCount === 0) return "Étape 1: Choisissez une cravate";
      if (itemCount === 1) return "Étape 2: Ajoutez un accessoire";
      if (itemCount === 2) return "Étape 3: Complétez avec un autre accessoire";
      return "Pack complet!";
    }

    if (packType === 'Pack Trio') {
      if (itemCount === 0) return "Étape 1: Choisissez un portefeuille ou une ceinture";
      if (itemCount === 1) return "Étape 2: Ajoutez un accessoire";
      if (itemCount === 2) return "Étape 3: Complétez votre pack";
      return "Pack complet!";
    }

    if (packType === 'Pack Duo') {
      if (itemCount === 0) return "Étape 1: Choisissez un portefeuille";
      if (itemCount === 1) return "Étape 2: Ajoutez une ceinture";
      return "Pack complet!";
    }

    if (packType === 'Pack Mini Duo') {
      if (itemCount === 0) return "Étape 1: Choisissez un porte-cartes";
      if (itemCount === 1) return "Étape 2: Ajoutez un porte-clés";
      return "Pack complet!";
    }

    // For single item packs
    if (['Pack Chemise', 'Pack Ceinture', 'Pack Cravatte', 'Pack Malette'].includes(packType)) {
      return itemCount === 0 ? "Choisissez votre article" : "Pack complet!";
    }

    return `Étape ${itemCount + 1}`;
  };

  return (
    <div className="flex flex-col gap-3 py-4 px-2 bg-[#F1F0FB]/40 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#403E43]">
          {getStepLabel()}
        </span>
        <span className="text-xs text-gray-500">
          {selectedItems.length} / {categories.length > 0 ? Math.max(categories.length, selectedItems.length) : 3} articles
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-white hover:bg-[#E5DEFF] text-[#403E43] border border-[#D3E4FD] 
                       px-3 py-1 rounded-md shadow-sm transition-all duration-300
                       font-medium text-sm tracking-wide flex items-center gap-1"
            >
              {category.label}
              {selectedItems.some(item => 
                (category.type === 'itemgroup' && item.itemgroup_product === category.value) ||
                (category.type === 'type' && item.type_product === category.value)
              ) && (
                <Check className="w-3 h-3 text-green-500" />
              )}
            </Badge>
          ))
        ) : (
          <span className="text-gray-500 italic text-sm">
            {selectedItems.length === 0 ? "Chargement des catégories..." : "Pack complet!"}
          </span>
        )}
      </div>
    </div>
  );
};

export default CategoriesDisplay;