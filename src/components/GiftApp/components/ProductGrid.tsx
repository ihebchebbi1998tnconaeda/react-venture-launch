import React from 'react';
import { motion, PanInfo } from 'framer-motion';

interface ProductGridProps {
  products: Array<{
    id: number;
    name: string;
    image: string;
    price: number;
  }>;
  onDragStart: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onDragStart }) => {
  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, productId: number) => {
    onDragStart(productId);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-md cursor-grab"
          drag
          dragSnapToOrigin
          onDragStart={(event, info) => handleDragStart(event, info, product.id)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price} TND</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;