import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { GripVertical } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, product: Product) => void;
}

const ProductGrid = ({ products, onDragStart }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-center italic">
          Aucun article disponible pour le moment
        </p>
      </div>
    );
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, product: Product) => {
    onDragStart(event, product);
  };

  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 min-h-0">
      {products.map((product) => (
        <motion.div
          key={product.id}
          draggable
          onDragStart={(e) => handleDragStart(e, product)}
          data-product-type={product.itemgroup_product}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-lg shadow-sm p-4 cursor-grab active:cursor-grabbing border border-gray-100/50 hover:shadow-md transition-all"
        >
          <div className="relative">
            <GripVertical className="absolute top-0 right-0 text-gray-400" size={16} />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 object-contain mb-2"
            />
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="text-sm text-[#700100] font-medium mt-1">{product.price} TND</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;