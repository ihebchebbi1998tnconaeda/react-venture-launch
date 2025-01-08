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
import { HoldToConfirmButton } from '@/components/order/HoldToConfirmButton';
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

  const handleConfirmOrder = async () => {
    if (!state?.orderDetails) {
      navigate('/cart');
      return;
    }

    const { items, userDetails } = state.orderDetails;
    const packType = sessionStorage.getItem('selectedPackType') || 'aucun';

    try {
      const formattedItems = items.map((item: any) => ({
        id: item.id,
        name: item.personalization 
          ? `${item.name} (Personnalisation = ${item.personalization})`
          : item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        size: item.size || '-',
        color: item.color || '-',
        personalization: item.personalization || '-',
        pack: packType,
        box: item.withBox ? 'Avec box' : 'Sans box'
      }));

      const orderData = {
        order_id: `ORDER-${Date.now()}`,
        user_details: {
          first_name: userDetails.firstName,
          last_name: userDetails.lastName,
          email: userDetails.email,
          phone: userDetails.phone,
          address: userDetails.address,
          country: userDetails.country,
          zip_code: userDetails.zipCode
        },
        items: formattedItems,
        price_details: {
          subtotal,
          shipping_cost: shipping,
          has_newsletter_discount: hasNewsletterDiscount,
          newsletter_discount_amount: newsletterDiscount,
          final_total: finalTotal
        },
        payment: {
          method: 'cash' as const,
          status: 'not yet',
          konnect_payment_url: '-',
          completed_at: new Date().toISOString()
        },
        order_status: {
          status: 'not yet',
          shipped_at: '-',
          delivered_at: '-'
        }
      };

      await submitOrder(orderData);
      
      clearCart();
      sessionStorage.removeItem('selectedPackType');
      
      toast({
        title: "Commande confirmée",
        description: "Votre commande a été confirmée avec succès",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
      navigate('/payment-success');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la confirmation de votre commande",
        variant: "destructive",
      });
    }
  };

  if (!state?.orderDetails) {
    navigate('/cart');
    return null;
  }

  const { items, userDetails } = state.orderDetails;
  const packType = sessionStorage.getItem('selectedPackType');

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <TopNavbar />
      <div className="container mx-auto px-4 py-8 mt-24">
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

          <HoldToConfirmButton onConfirm={handleConfirmOrder} />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPreviewPage;