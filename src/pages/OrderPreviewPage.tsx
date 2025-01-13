import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import DeliveryDetails from '@/components/order/DeliveryDetails';
import OrderItems from '@/components/order/OrderItems';
import OrderSummary from '@/components/order/OrderSummary';
import { useCart } from '@/components/cart/CartProvider';
import { submitOrder } from '@/services/orderSubmissionApi';

const OrderPreviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hasNewsletterDiscount, calculateTotal, cartItems, clearCart } = useCart();
  const { subtotal, discount: newsletterDiscount, total } = calculateTotal();
  const shipping = subtotal > 500 ? 0 : 7;
  const finalTotal = total + shipping;

  if (!state?.orderDetails) {
    navigate('/cart');
    return null;
  }

  const { items, userDetails } = state.orderDetails;
  const packType = sessionStorage.getItem('selectedPackType');

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <TopNavbar />
    
      <div className="container mx-auto px-4 py-8 mt-24 lg:mt-[0.5%] mt-[-15%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-[#700100] hover:text-[#591C1C] mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour au panier
          </button>

          <h1 className="text-3xl font-serif text-[#1A1F2C] mb-8">
            Aperçu de votre commande
            {packType && (
              <span className="ml-2 text-lg text-[#700100]">
                ({packType})
              </span>
            )}
          </h1>
          
          <DeliveryDetails userDetails={userDetails} />
          <OrderItems items={items} packType={packType} />
          <OrderSummary 
            subtotal={subtotal}
            shipping={shipping}
            finalTotal={finalTotal}
            hasNewsletterDiscount={hasNewsletterDiscount}
            newsletterDiscount={newsletterDiscount}
          />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPreviewPage;