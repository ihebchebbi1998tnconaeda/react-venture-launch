import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';

const Products = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full py-12">
      <style>
        {`
          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
            padding: 1rem;
          }
        `}
      </style>
      
      <h2 className="text-2xl font-bold text-center mb-8">Nos Produits</h2>
      <div className="product-grid">
        {products.map(product => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;