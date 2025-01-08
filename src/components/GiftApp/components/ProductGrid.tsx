import React from 'react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, product: Product) => void;
}

const ProductGrid = ({ products, onDragStart }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white/50 p-4 rounded-lg cursor-move relative group"
          draggable
          onDragStart={(e) => onDragStart(e, product)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-contain mb-2"
          />
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-xs text-gray-600">{product.price} TND</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;