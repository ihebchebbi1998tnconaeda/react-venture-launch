import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onDragStart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          draggable
          onDragStart={(e) => onDragStart(e, product)}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-gray-500">{product.price} TND</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;