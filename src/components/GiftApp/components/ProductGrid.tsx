import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { GripVertical } from 'lucide-react';
import { calculateDiscountedPrice } from '@/utils/priceCalculations';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInView } from 'react-intersection-observer';

interface ProductGridProps {
  products: Product[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, product: Product) => void;
  onProductSelect?: (product: Product) => void;
}

const ProductItem = ({ 
  product, 
  isMobile, 
  onDragStart, 
  onClick 
}: { 
  product: Product;
  isMobile: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, product: Product) => void;
  onClick: () => void;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const hasDiscount = product.discount_product !== "" && 
                     !isNaN(parseFloat(product.discount_product)) && 
                     parseFloat(product.discount_product) > 0;
  
  const displayPrice = hasDiscount 
    ? calculateDiscountedPrice(product.price, product.discount_product)
    : product.price;

  return (
    <motion.div
      ref={ref}
      draggable={!isMobile}
      onDragStart={(e) => onDragStart(e, product)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-lg shadow-sm p-4 border border-gray-100/50 hover:shadow-md transition-all ${
        isMobile ? 'cursor-pointer active:scale-95' : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <div className="relative">
        {!isMobile && <GripVertical className="absolute top-0 right-0 text-gray-400" size={16} />}
        <div className="relative w-full h-24 mb-2">
          {inView && (
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
            />
          )}
          {(!isImageLoaded || !inView) && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {product.name}
        </h3>
        <div className="mt-1">
          {hasDiscount ? (
            <div className="space-y-1">
              <p className="text-sm text-[#700100] font-medium">
                {displayPrice.toFixed(2)} TND
              </p>
              <p className="text-xs text-gray-500 line-through">
                {product.price.toFixed(2)} TND
              </p>
            </div>
          ) : (
            <p className="text-sm text-[#700100] font-medium">
              {displayPrice.toFixed(2)} TND
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid = ({ products, onDragStart, onProductSelect }: ProductGridProps) => {
  const isMobile = useIsMobile();

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-center italic">
          Aucun article disponible pour le moment
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 min-h-0">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isMobile={isMobile}
          onDragStart={onDragStart}
          onClick={() => onProductSelect?.(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;