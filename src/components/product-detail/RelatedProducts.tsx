import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-normal group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#700100] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-lg font-semibold text-[#700100]">
            {product.price} TND
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedProducts;