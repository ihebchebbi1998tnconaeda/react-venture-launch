import React, { Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { motion } from 'framer-motion';
import RelatedProducts from '@/components/product-detail/RelatedProducts';
import ProductDetailLayout from '@/components/product-detail/ProductDetailLayout';
import ProductDetailContainer from '@/components/product-detail/ProductDetailContainer';
import CheckoutConfirmationModal from '@/components/modals/CheckoutConfirmationModal';
import WhatsAppPopup from '@/components/WhatsAppPopup';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#700100]"></div>
      </div>
    );
  }

  const product = products?.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <button onClick={() => navigate('/')} className="text-[#700100] hover:underline">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleProductAdded = (productName: string) => {
    setAddedProductName(productName);
    setShowCheckoutModal(true);
  };

  // Get related products if any are specified
  const relatedProductIds = product.relatedProducts
    ? product.relatedProducts.split(',').map(Number)
    : [];
  const relatedProductsList = products?.filter(p => 
    relatedProductIds.includes(p.id)
  ) || [];

  return (
    <ProductDetailLayout onBack={() => navigate(-1)}>
      <ProductDetailContainer 
        product={product} 
        onProductAdded={handleProductAdded}
      />
      
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 mb-8"
      >
        <RelatedProducts currentProduct={product} />
      </motion.section>
      
      <CheckoutConfirmationModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        productName={addedProductName}
      />
        <Suspense fallback={null}>
                      <WhatsAppPopup />
   </Suspense>
    </ProductDetailLayout>
  );
};

export default ProductDetailPage;