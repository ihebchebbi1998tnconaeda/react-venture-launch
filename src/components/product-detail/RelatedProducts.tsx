import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { fetchAllProducts } from '@/services/productsApi';

interface RelatedProductsProps {
  currentProduct: Product;
}

const getRelatedCategories = (itemgroup: string): string[] => {
  switch (itemgroup.toLowerCase()) {
    case 'chemises':
      return ['portefeuilles', 'ceintures', 'cravates'];
    case 'cravates':
      return ['portefeuilles', 'ceintures'];
    case 'ceintures':
      return ['portefeuilles', 'porte-clés'];
    case 'portefeuilles':
      return ['ceintures', 'porte-clés'];
    case 'porte-cartes':
      return ['porte-clés', 'portefeuilles'];
    default:
      return ['portefeuilles', 'ceintures', 'cravates'];
  }
};

const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const navigate = useNavigate();
  
  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  if (!allProducts) return null;

  const relatedCategories = getRelatedCategories(currentProduct.itemgroup_product);
  
  const relatedProducts = allProducts
    .filter(product => 
      // Don't include the current product
      product.id !== currentProduct.id &&
      // Include products from related categories
      relatedCategories.some(category => 
        product.itemgroup_product.toLowerCase().includes(category)
      )
    )
    .slice(0, 4); // Limit to 4 related products

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-['WomanFontBold'] text-[#700100] mb-8">
      Les produits associés
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
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
    </div>
  );
};

export default RelatedProducts;