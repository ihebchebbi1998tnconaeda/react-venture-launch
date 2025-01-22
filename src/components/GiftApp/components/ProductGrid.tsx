import React from 'react';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart, products, onDragStart }) => {
  const { t } = useTranslation();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    if (onDragStart) {
      onDragStart(e, product);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300"
          draggable
          onDragStart={(e) => handleDragStart(e, product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">{product.price}</span>
              <button
                onClick={() => onAddToCart(product)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('addToCart')}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;