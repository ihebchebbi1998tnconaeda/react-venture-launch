import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Product } from '@/types/product';

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
  // Filter out categories that are no longer available
  const availableCategories = categories.filter(category => {
    if (packType === 'Pack Prestige' && category.value === 'chemises') {
      return !selectedItems.some(item => item.itemgroup_product === 'chemises');
    }
    if (packType === 'Pack Premium' && category.value === 'Cravates') {
      return !selectedItems.some(item => item.itemgroup_product === 'Cravates');
    }
    return true;
  });

  return (
    <div className="flex flex-wrap gap-3 py-4 px-2 bg-[#F1F0FB]/40 rounded-lg">
      <span className="text-sm font-medium text-[#403E43] w-full mb-2">
        Catégories disponibles:
      </span>
      {availableCategories.length > 0 ? (
        availableCategories.map((category, index) => (
          <Badge
            key={index}
            variant="outline"
            className="bg-white hover:bg-[#E5DEFF] text-[#403E43] border border-[#D3E4FD] 
                     px-4 py-1.5 rounded-md shadow-sm transition-all duration-300
                     font-medium text-sm tracking-wide"
          >
            {category.label}
          </Badge>
        ))
      ) : (
        <span className="text-gray-500 italic">Aucune catégorie disponible</span>
      )}
    </div>
  );
};

export default CategoriesDisplay;