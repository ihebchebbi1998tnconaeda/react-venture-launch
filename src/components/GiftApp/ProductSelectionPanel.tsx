import React from 'react';
import { Product } from '@/types/product';
import ProductCard from '../product/ProductCard';

interface ProductSelectionPanelProps {
  onProductSelected: (productId: number) => void;
  selectedProducts: number[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 99.99,
    description: "Sample description 1",
    images: ["/path/to/image1.jpg"],
    category: "sample",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue"],
    stock: 10
  },
  {
    id: 2,
    name: "Sample Product 2",
    price: 149.99,
    description: "Sample description 2",
    images: ["/path/to/image2.jpg"],
    category: "sample",
    sizes: ["M", "L", "XL"],
    colors: ["Green", "Black"],
    stock: 5
  }
];

const ProductSelectionPanel = ({ onProductSelected, selectedProducts }: ProductSelectionPanelProps) => {
  const handleProductSelected = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      onProductSelected(productId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProducts.includes(product.id)}
          onSelect={() => handleProductSelected(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductSelectionPanel;