import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
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
  finalTotal
}: PaymentButtonsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
          Payer avec carte bancaire ({finalTotal.toFixed(2)} TND)
        </motion.button>
      </div>
    </>
  );
};

export default PaymentButtons;