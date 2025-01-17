import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CategoriesDisplay from './components/CategoriesDisplay';
import ProductGrid from './components/ProductGrid';
import { useIsMobile } from '@/hooks/use-mobile';
import AddItemDialog from './dialogs/AddItemDialog';
import { playTickSound } from '@/utils/audio';
import { toast } from '@/hooks/use-toast';
import { getAvailableCategories } from '@/utils/categoryUtils';

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product, size: string, personalization: string) => void;
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
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const itemsPerPage = 4;
  const isMobile = useIsMobile();

  const containerCount = React.useMemo(() => {
    if (['Pack Chemise', 'Pack Ceinture', 'Pack Cravatte', 'Pack Malette'].includes(packType)) return 1;
    return ['Pack Duo', 'Pack Mini Duo'].includes(packType) ? 2 : 3;
  }, [packType]);

  const isPackComplete = selectedItems.length >= containerCount;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', packType, selectedContainerIndex, selectedItems, searchTerm],
    queryFn: fetchAllProducts,
    select: (data) => {
      if (isPackComplete) return [];
      
      let filteredProducts = data;
      const categories = getAvailableCategories(packType, selectedContainerIndex, selectedItems);
      
      console.log('Filtering with categories:', categories);
      
      if (categories.length > 0) {
        filteredProducts = data.filter(product => {
          return categories.some(category => {
            if (category.type === 'itemgroup') {
              if (category.additionalFilter) {
                return product.itemgroup_product === category.value && 
                       product[category.additionalFilter.field as keyof Product] === category.additionalFilter.value;
              }
              return product.itemgroup_product === category.value;
            }
            if (category.type === 'type') {
              return product.type_product === category.value;
            }
            return false;
          });
        });

        filteredProducts = filteredProducts.filter(product => 
          !selectedItems.some(item => item.id === product.id)
        );

        if (packType === 'Pack Trio' && selectedItems.length > 0) {
          const selectedAccessoryTypes = selectedItems
            .filter(item => item.type_product === 'accessoires')
            .map(item => item.itemgroup_product);

          filteredProducts = filteredProducts.filter(product => 
            product.type_product !== 'accessoires' || 
            !selectedAccessoryTypes.includes(product.itemgroup_product)
          );
        }
      }

      return filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, product: Product) => {
    console.log('Drag started for product:', product.name);
    event.dataTransfer.setData('product', JSON.stringify(product));
  };

  const handleProductSelect = (product: Product) => {
    if (isMobile) {
      setSelectedProduct(product);
      setShowAddDialog(true);
      playTickSound();
    }
  };

  const handleConfirm = () => {
    if (selectedProduct && selectedSize) {
      const productWithSize = {
        ...selectedProduct,
        size: selectedSize,
        personalization: personalization
      };
      onItemDrop(productWithSize, selectedSize, personalization);
      setShowAddDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setSelectedProduct(null);
      toast({
        title: "Article ajouté au pack",
        description: "L'article a été ajouté avec succès à votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 h-[90%] flex flex-col">
      <div className="space-y-6 flex-1 flex flex-col">
        {isPackComplete ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="text-2xl font-semibold text-[#700100] text-center">
              Pack Complété !
            </div>
            <p className="text-gray-600 text-center">
              Vous avez sélectionné tous les articles pour votre pack.
            </p>
          </div>
        ) : (
          <>
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
              categories={getAvailableCategories(packType, selectedContainerIndex, selectedItems)} 
              selectedItems={selectedItems}
              packType={packType}
            />
            
            <ProductGrid 
              products={products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
              onDragStart={handleDragStart}
              onProductSelect={handleProductSelect}
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
                Page {currentPage} sur {Math.ceil(products.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(products.length / itemsPerPage), p + 1))}
                disabled={currentPage >= Math.ceil(products.length / itemsPerPage)}
                className="bg-[#700100] hover:bg-[#590000] text-white border-none"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        droppedItem={selectedProduct}
        selectedSize={selectedSize}
        personalization={personalization}
        onSizeSelect={setSelectedSize}
        onPersonalizationChange={setPersonalization}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ProductSelectionPanel;