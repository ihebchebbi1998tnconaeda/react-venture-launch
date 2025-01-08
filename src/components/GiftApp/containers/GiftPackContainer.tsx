import React from 'react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GiftPackContainerProps {
  title: string;
  item?: Product;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onItemClick?: (product: Product) => void;
  onRemoveItem?: (index: number) => void;
  containerIndex: number;
  className?: string;
}

const GiftPackContainer = ({
  title,
  item,
  onDrop: parentOnDrop,
  onItemClick,
  onRemoveItem,
  containerIndex,
  className = '',
}: GiftPackContainerProps) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const productData = e.dataTransfer.getData('product');
    if (!productData) return;
    
    const product: Product = JSON.parse(productData);
    const packType = document.querySelector('[data-pack-type]')?.getAttribute('data-pack-type');
    
    // Validate Pack Prestige chemise
    if (packType === 'Pack Prestige' && product.itemgroup_product === 'chemises') {
      const existingChemises = document.querySelectorAll('[data-product-type="chemises"]').length;
      if (existingChemises >= 1) {
        toast({
          title: "Limite atteinte",
          description: "Le Pack Prestige ne peut contenir qu'une seule chemise",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate Pack Premium cravate
    if (packType === 'Pack Premium' && product.itemgroup_product === 'Cravates') {
      const existingCravates = document.querySelectorAll('[data-product-type="Cravates"]').length;
      if (existingCravates >= 1) {
        toast({
          title: "Limite atteinte",
          description: "Le Pack Premium ne peut contenir qu'une seule cravate",
          variant: "destructive",
        });
        return;
      }
    }

    parentOnDrop(e);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#700100';
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = '';
    e.currentTarget.style.backgroundColor = item ? 'rgba(255, 255, 255, 0.95)' : '';
  };

  const handleItemClick = () => {
    if (item) {
      setShowDetails(true);
    }
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative transition-all duration-300 ${className} ${
          item ? 'bg-white/95' : ''
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <h3 className="text-lg font-medium text-[#700100] mb-2">{title}</h3>
          {!item && (
            <p className="text-sm text-gray-500 text-center">
              Glissez et déposez un article ici
            </p>
          )}
          {item && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full h-full group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100/30 transition-all duration-300 group-hover:shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain cursor-pointer transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg"
                    onClick={handleItemClick}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/90 backdrop-blur-sm rounded-b-lg">
                    <p className="text-sm font-medium text-[#700100] truncate text-center">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
              {onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(containerIndex)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110 shadow-lg z-10"
                  aria-label="Remove item"
                >
                  <X size={16} />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {item && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-3xl p-0 bg-white/95 backdrop-blur-md rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side - Image */}
              <div className="relative p-6 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[300px] object-contain"
                />
              </div>

              {/* Right side - Product Details */}
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-['WomanFontBold'] text-[#700100]">
                  {item.name}
                </h2>

                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Prix:</span> {item.price} TND</p>
                  <p><span className="font-semibold">Matière:</span> {item.material}</p>
                  <p><span className="font-semibold">Couleur:</span> {item.color}</p>
                  <p><span className="font-semibold">Référence:</span> {item.reference}</p>
                  <p><span className="font-semibold">État:</span> {item.status}</p>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold mb-2 text-black">Description:</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold mb-2 text-black">Tailles disponibles:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(item.sizes).map(([size, quantity]) => (
                      quantity > 0 && (
                        <span
                          key={size}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {size.toUpperCase()}
                        </span>
                      )
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => setShowDetails(false)}
                    className="w-full bg-[#700100] hover:bg-[#590000] text-white"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GiftPackContainer;
