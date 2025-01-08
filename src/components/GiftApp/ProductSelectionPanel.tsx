import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CategoriesDisplay from './components/CategoriesDisplay';
import ProductGrid from './components/ProductGrid';

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product) => void;
  packType: string;
  selectedContainerIndex: number;
  selectedItems: Product[];
}

const ProductSelectionPanel = ({ 
  onItemDrop, 
  packType, 
  selectedContainerIndex,
  selectedItems 
}: ProductSelectionPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Get available categories based on pack type and container index
  const getAvailableCategories = () => {
    switch (packType) {
      case 'Pack Prestige':
        return selectedContainerIndex === 0 
          ? [{ label: 'Chemises', type: 'itemgroup', value: 'chemises' }]
          : [{ label: 'Accessoires', type: 'type', value: 'Accessoires' }];
      
      case 'Pack Premium':
        return selectedContainerIndex === 0
          ? [{ label: 'Cravates', type: 'itemgroup', value: 'Cravates' }]
          : [{ label: 'Accessoires', type: 'type', value: 'Accessoires' }];
      
      case 'Pack Trio':
        if (selectedContainerIndex === 0) {
          return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'Portefeuilles' }];
        } else if (selectedContainerIndex === 1) {
          return [{ label: 'Ceintures', type: 'itemgroup', value: 'Ceintures' }];
        } else {
          return [{ label: 'Accessoires', type: 'type', value: 'Accessoires' }];
        }
      
      case 'Pack Duo':
        return selectedContainerIndex === 0
          ? [{ label: 'Portefeuilles', type: 'itemgroup', value: 'Portefeuilles' }]
          : [{ label: 'Ceintures', type: 'itemgroup', value: 'Ceintures' }];
      
      case 'Pack Mini Duo':
        return selectedContainerIndex === 0
          ? [{ label: 'Porte-cartes', type: 'itemgroup', value: 'Porte-cartes' }]
          : [{ label: 'Porte-clés', type: 'itemgroup', value: 'Porte-clés' }];
      
      default:
        return [];
    }
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', packType, selectedContainerIndex, selectedItems],
    queryFn: fetchAllProducts,
    select: (data) => {
      let filteredProducts = data;
      const categories = getAvailableCategories();
      
      if (categories.length > 0) {
        filteredProducts = data.filter(product => {
          // Check if we should filter out chemises for Pack Prestige
          if (packType === 'Pack Prestige' && selectedContainerIndex === 0) {
            const hasChemise = selectedItems.some(item => item.itemgroup_product === 'chemises');
            if (hasChemise && product.itemgroup_product === 'chemises') {
              return false;
            }
          }

          // Check if we should filter out cravates for Pack Premium
          if (packType === 'Pack Premium' && selectedContainerIndex === 0) {
            const hasCravate = selectedItems.some(item => item.itemgroup_product === 'Cravates');
            if (hasCravate && product.itemgroup_product === 'Cravates') {
              return false;
            }
          }

          return categories.some(category => {
            if (category.type === 'itemgroup') {
              return product.itemgroup_product === category.value;
            } else if (category.type === 'type') {
              return product.type_product === category.value;
            }
            return false;
          });
        });
      }

      return filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, product: Product) => {
    console.log('Drag started for product:', product.name);
    event.dataTransfer.setData('product', JSON.stringify(product));
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 h-[90%] flex flex-col">
      <div className="space-y-6 flex-1 flex flex-col">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/50 border-white/30"
          />
        </div>

        <CategoriesDisplay 
          categories={getAvailableCategories()} 
          selectedItems={selectedItems}
          packType={packType}
        />
        
        <ProductGrid 
          products={paginatedProducts}
          onDragStart={handleDragStart}
        />

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="bg-[#700100] hover:bg-[#590000] text-white border-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="bg-[#700100] hover:bg-[#590000] text-white border-none"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionPanel;
