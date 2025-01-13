import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { updateProductStock } from '@/utils/stockManagement';
import { submitOrder } from '@/services/orderSubmissionApi';
import { toast } from "@/hooks/use-toast";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart, cartItems, hasNewsletterDiscount, calculateTotal } = useCart();
  const { subtotal, discount: newsletterDiscount, total } = calculateTotal();
  const shipping = subtotal > 500 ? 0 : 7;
  const finalTotal = total + shipping;

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const pendingOrderString = sessionStorage.getItem('pendingOrder');
        if (pendingOrderString) {
          const pendingOrder = JSON.parse(pendingOrderString);
          console.log('Processing pending order:', pendingOrder);
          
          await updateProductStock(pendingOrder.cartItems);

          const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
          const packType = sessionStorage.getItem('selectedPackType') || 'aucun';

          const formattedItems = pendingOrder.cartItems.map((item: any) => ({
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
            order_id: pendingOrder.orderId,
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
              method: 'card' as const,
              status: 'completed',
              konnect_payment_url: pendingOrder.payUrl || '-',
              completed_at: new Date().toISOString()
            },
            order_status: {
              status: 'not yet',
              shipped_at: '-',
              delivered_at: '-'
            }
          };

          await submitOrder(orderData);
          
          toast({
            title: "Commande confirmée !",
            description: "Un email de confirmation vous a été envoyé.",
            style: {
              backgroundColor: '#700100',
              color: 'white',
              border: '1px solid #590000',
            },
          });
          
          sessionStorage.removeItem('pendingOrder');
          sessionStorage.removeItem('selectedPackType');
        }

        clearCart();
      } catch (error) {
        console.error('Error processing payment success:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du traitement de votre commande. Notre équipe a été notifiée.",
          variant: "destructive",
        });
      }
    };

    handlePaymentSuccess();
  }, [clearCart, hasNewsletterDiscount, subtotal, newsletterDiscount, finalTotal]);

  return (
    <div className="min-h-screen bg-[#F1F0FB] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-2xl font-serif text-[#1A1F2C] mb-4">
          Paiement réussi !
        </h1>
        <p className="text-gray-600 mb-6">
          Votre commande a été confirmée et sera traitée dans les plus brefs délais.
          Un email de confirmation vous a été envoyé.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-[#700100] text-white px-6 py-3 rounded-md hover:bg-[#591C1C] transition-colors"
        >
          Retour à l'accueil
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;