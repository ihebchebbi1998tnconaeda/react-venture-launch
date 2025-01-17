import React from 'react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { formatPrice } from '@/utils/priceCalculations';

interface GiftPackContainerProps {
  title: string;
  item?: Product;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onItemClick?: (product: Product) => void;
  onRemoveItem?: (index: number) => void;
  containerIndex: number;
  className?: string;
  imageScale?: number;
}

const GiftPackContainer = ({
  title,
  item,
  onDrop: parentOnDrop,
  onItemClick,
  onRemoveItem,
  containerIndex,
  className = '',
  imageScale = 1,
}: GiftPackContainerProps) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    parentOnDrop(e);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleRemoveItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveItem) {
      onRemoveItem(containerIndex);
      setIsDragOver(false);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative transition-all duration-300 ${className} ${
        isDragOver ? 'border-[#700100] bg-[#700100]/5' : ''
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
        <h3 className={`text-sm font-medium ${item ? 'text-white' : 'text-white'} mb-1`}>
          {title}
        </h3>
        {!item && (
          <p className="text-xs text-gray-400 text-center">
            Glissez et déposez un article ici
          </p>
        )}
        {item && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full h-full group cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[90%] h-[90%] p-2 rounded-lg bg-black/50 backdrop-blur-sm shadow-lg border border-gray-800/30 transition-all duration-300 group-hover:shadow-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg transform scale-${imageScale}`}
                  style={{ transform: `scale(${imageScale})` }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 backdrop-blur-sm rounded-b-lg">
                  <p className="text-xs font-medium text-white truncate text-center mb-0.5">
                    {item.name}
                  </p>
                  <p className="text-xs font-medium text-[#fff] text-center">
                    {formatPrice(item.price)} TND
                  </p>
                </div>
                {onRemoveItem && (
                  <button
                    onClick={handleRemoveItem}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-100 hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg z-10"
                    aria-label="Remove item"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftPackContainer;