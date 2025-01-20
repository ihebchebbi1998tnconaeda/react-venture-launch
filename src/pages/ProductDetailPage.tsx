import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailContainer from '@/components/product-detail/ProductDetailContainer';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product: Product = {
    id: 1,
    name: "Sample Product",
    price: 99.99,
    description: "Sample description",
    images: ["/path/to/image.jpg"],
    category: "sample",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue"],
    stock: 10
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailContainer product={product} />
    </div>
  );
};

export default ProductDetailPage;