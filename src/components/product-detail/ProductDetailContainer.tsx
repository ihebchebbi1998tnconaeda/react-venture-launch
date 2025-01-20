import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types/product';
import ProductDetailModal from './ProductDetailModal';

interface ProductDetailContainerProps {
  product: Product;
}

const ProductDetailContainer: React.FC<ProductDetailContainerProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold">{product.price} TND</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Voir les détails
          </button>
        </div>
      </div>

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetailContainer;