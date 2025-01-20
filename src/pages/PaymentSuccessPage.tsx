import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { updateProductStock } from '@/utils/stockManagement';
import { submitOrder } from '@/services/orderSubmissionApi';
import { toast } from "@/hooks/use-toast";
import { getUserDetails } from '@/utils/userDetailsStorage';
import { stockReduceManager } from '@/utils/StockReduce';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart, cartItems, hasNewsletterDiscount, calculateTotal, removeNewsletterDiscount } = useCart();
  const { subtotal, discount: newsletterDiscount, total, boxTotal } = calculateTotal();
  const shipping = subtotal > 500 ? 0 : 7;
  const finalTotal = total + shipping;

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        console.log('Starting payment success handler...');
        const pendingOrderString = sessionStorage.getItem('pendingOrder');
        if (!pendingOrderString) {
          console.error('No pending order found');
          return;
        }

        const pendingOrder = JSON.parse(pendingOrderString);
        
        const userDetails = getUserDetails();
        const sessionUserDetails = sessionStorage.getItem('userDetails');
        const finalUserDetails = userDetails || (sessionUserDetails ? JSON.parse(sessionUserDetails) : null);
        
        if (!finalUserDetails) {
          const errorMessage = 'User details not found. Please complete the checkout process again.';
          console.error(errorMessage);
          toast({
            title: "Error - Missing User Details",
            description: errorMessage,
            duration: Infinity,
            variant: "destructive"
          });
          setTimeout(() => navigate('/cart'), 3000);
          return;
        }

        // Add items to stock reduce manager before updating stock
        pendingOrder.cartItems.forEach((item: any) => {
          if (item.size && item.quantity) {
            stockReduceManager.addItem(
              item.id.toString(),
              item.size,
              item.quantity
            );
          }
        });

        // Send stock reduce update
        try {
          await stockReduceManager.sendStockUpdate();
        } catch (error) {
          console.error('Failed to update stock reduce:', error);
          // Continue with order processing even if stock reduce fails
        }

        await updateProductStock(pendingOrder.cartItems);

        const currentPackType = sessionStorage.getItem('selectedPackType');

        const formattedItems = pendingOrder.cartItems.map((item: any) => {
          const itemPrice = item.discount_product ? 
            item.price * (1 - parseFloat(item.discount_product) / 100) : 
            item.price;

          const imageUrl = item.image.startsWith('http') ? 
            item.image : 
            `https://www.fioriforyou.com/backfiori/${item.image}`;

          const isPackCharge = item.type_product === "Pack";
          let packInfo = "aucun";
          if (item.fromPack && currentPackType) {
            packInfo = currentPackType;
          }

          return {
            item_id: item.id.toString(),
            quantity: item.quantity,
            price: itemPrice,
            total_price: itemPrice * item.quantity,
            name: item.name,
            size: item.size || '-',
            color: item.color || '-',
            personalization: item.personalization || '-',
            pack: packInfo,
            box: item.withBox ? 'Avec box' : 'Sans box',
            image: imageUrl
          };
        });

        const orderData = {
          order_id: pendingOrder.orderId,
          user_details: {
            first_name: finalUserDetails.firstName || '',
            last_name: finalUserDetails.lastName || '',
            email: finalUserDetails.email || '',
            phone: finalUserDetails.phone || '',
            address: finalUserDetails.address || '',
            country: finalUserDetails.country || '',
            zip_code: finalUserDetails.zipCode || '',
            order_note: finalUserDetails.orderNote || '-' // Added order note
          },
          items: formattedItems,
          price_details: {
            subtotal: subtotal,
            box_total: boxTotal,
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
            status: 'pending',
            shipped_at: null,
            delivered_at: null
          }
        };


        const isTestMode = pendingOrder.payUrl === 'test-mode';
        
        if (isTestMode) {
          toast({
            title: "Mode Test - Détails de la requête API",
            description: (
              <pre className="mt-2 w-full max-h-96 overflow-auto rounded-lg bg-slate-950 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify(orderData, null, 2)}
                </code>
              </pre>
            ),
            duration: Infinity
          });
        }

        const response = await submitOrder(orderData);

        if (!response.success) {
          throw new Error(response.message || 'Failed to submit order');
        }
        
        if (!isTestMode) {
          toast({
            title: "Commande confirmée !",
            description: "Un email de confirmation vous a été envoyé.",
            style: {
              backgroundColor: '#700100',
              color: 'white',
              border: '1px solid #590000',
            },
            duration: Infinity
          });
        }
        
        sessionStorage.removeItem('pendingOrder');
        sessionStorage.removeItem('selectedPackType');
        clearCart();

        // Remove newsletter discount after successful payment
        if (hasNewsletterDiscount) {
          removeNewsletterDiscount();
          const subscribedEmail = localStorage.getItem('subscribedEmail');
          if (subscribedEmail) {
            const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
            if (!usedDiscountEmails.includes(subscribedEmail)) {
              usedDiscountEmails.push(subscribedEmail);
              localStorage.setItem('usedDiscountEmails', JSON.stringify(usedDiscountEmails));
            }
          }
        }
      } catch (error: any) {
        console.error('Error processing order:', error);
        
        const errorDetails = {
          message: error.message,
          response: error.response?.data,
          stack: error.stack
        };

        console.error('Detailed error:', errorDetails);

        toast({
          title: "Erreur",
          description: (
            <div className="space-y-2">
              <p>Erreur lors du traitement de la commande:</p>
              <pre className="mt-2 w-full max-h-96 overflow-auto rounded-lg bg-slate-950 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify(errorDetails, null, 2)}
                </code>
              </pre>
            </div>
          ),
          variant: "destructive",
          duration: Infinity
        });
      }
    };

    handlePaymentSuccess();
  }, [clearCart, hasNewsletterDiscount, removeNewsletterDiscount]);

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