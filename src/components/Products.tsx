import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useProducts } from '@/services/productsApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { fetchProducts } = useProducts();

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, [fetchProducts]);

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
