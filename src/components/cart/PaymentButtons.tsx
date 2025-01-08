import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { initKonnectPayment } from '@/services/konnectApi';
import PaymentLoadingScreen from '../payment/PaymentLoadingScreen';

interface PaymentButtonsProps {
  enabled: boolean;
  cartItems: any[];
  userDetails: any;
  total: number;
  shipping: number;
  finalTotal: number;
  hasPersonalization: boolean;
}

const PaymentButtons = ({ 
  enabled, 
  cartItems, 
  userDetails, 
  total, 
  shipping, 
  finalTotal,
  hasPersonalization
}: PaymentButtonsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCashPayment, setShowCashPayment] = useState(true);

  useEffect(() => {
    const hasAnyPersonalization = cartItems.some(item => 
      item.personalization && item.personalization.trim() !== ''
    );
    setShowCashPayment(!hasAnyPersonalization);
  }, [cartItems]);

  const handleKonnectPayment = async () => {
    if (!enabled || !userDetails) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir vos coordonnées d'abord",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 6000));

      const orderId = `ORDER-${Date.now()}`;
      const response = await initKonnectPayment({
        amount: finalTotal,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        orderId,
      });

      sessionStorage.setItem('pendingOrder', JSON.stringify({
        cartItems,
        orderId
      }));

      window.location.href = response.payUrl;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erreur de paiement",
        description: "Échec de l'initialisation du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleCashPayment = () => {
    if (!enabled || !userDetails) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir vos coordonnées d'abord",
        variant: "destructive",
      });
      return;
    }

    navigate('/order-preview', {
      state: {
        orderDetails: {
          items: cartItems,
          userDetails,
          total,
          shipping,
          finalTotal,
          paymentMethod: 'cash'
        }
      }
    });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <PaymentLoadingScreen />}
      </AnimatePresence>

      <div className="space-y-3">
        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: enabled ? 1 : 0.5 }}
          whileHover={enabled ? { scale: 1.02 } : {}}
          onClick={handleKonnectPayment}
          disabled={!enabled || isLoading}
          className="w-full bg-[#700100] text-white px-4 py-3 rounded-md hover:bg-[#591C1C] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          <CreditCard size={20} />
          Payer avec Konnekt ({finalTotal.toFixed(2)} TND)
        </motion.button>
        
        {showCashPayment && (
          <motion.button
            initial={{ opacity: 0.5 }}
            animate={{ opacity: enabled ? 1 : 0.5 }}
            whileHover={enabled ? { scale: 1.02 } : {}}
            onClick={handleCashPayment}
            disabled={!enabled || isLoading}
            className="w-full border border-[#700100] text-[#700100] px-4 py-3 rounded-md hover:bg-[#F1F0FB] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            <Wallet size={20} />
            Payer en espèces ({finalTotal.toFixed(2)} TND)
          </motion.button>
        )}
      </div>
    </>
  );
};

export default PaymentButtons;