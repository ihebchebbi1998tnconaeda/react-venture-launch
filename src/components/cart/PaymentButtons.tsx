import React from 'react';
import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { initKonnectPayment } from '@/services/konnectApi';

interface PaymentButtonsProps {
  enabled: boolean;
  cartItems: any[];
  userDetails: any;
  total: number;
  shipping: number;
  finalTotal: number;
  hasPersonalization: boolean;
}

// Set to true to use real payment processing
const BYPASS_PAYMENT = true;

const PaymentButtons = ({ 
  enabled, 
  cartItems, 
  userDetails, 
  finalTotal
}: PaymentButtonsProps) => {
  const navigate = useNavigate();

  const handleKonnectPayment = async () => {
    if (!enabled || !userDetails) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir vos coordonnées d'abord",
        variant: "destructive",
      });
      return;
    }

    if (finalTotal <= 0) {
      toast({
        title: "Erreur",
        description: "Le montant du paiement doit être supérieur à 0",
        variant: "destructive",
      });
      return;
    }

    console.log('Payment process started with amount:', finalTotal);

    try {
      const orderId = `ORDER-${Date.now()}`;
      // Set payment initiation timestamp
      sessionStorage.setItem('paymentInitiated', Date.now().toString());

      if (BYPASS_PAYMENT) {
        console.log('Payment bypassed for testing - simulating successful payment');
        await new Promise(resolve => setTimeout(resolve, 500)); // Reduced timeout

        sessionStorage.setItem('pendingOrder', JSON.stringify({
          cartItems,
          orderId,
          payUrl: 'test-mode'
        }));

        navigate('/payment-success');
      } else {
        console.log('Initiating real payment process with Konnect');
        const response = await initKonnectPayment({
          amount: Math.round(finalTotal * 100) / 100,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          orderId,
        });

        console.log('Konnect payment response:', response);

        if (!response || !response.payUrl) {
          throw new Error('Invalid payment URL received from Konnect');
        }

        sessionStorage.setItem('pendingOrder', JSON.stringify({
          cartItems,
          orderId,
          payUrl: response.payUrl
        }));

        window.location.href = response.payUrl;
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      sessionStorage.removeItem('paymentInitiated');
      
      let errorMessage = "Une erreur s'est produite lors de l'initialisation du paiement.";
      if (error.message.includes('Invalid amount')) {
        errorMessage = "Le montant du paiement est invalide.";
      }
      
      toast({
        title: "Erreur de paiement",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <motion.button
        initial={{ opacity: 0.5 }}
        animate={{ opacity: enabled ? 1 : 0.5 }}
        whileHover={enabled ? { scale: 1.02 } : {}}
        onClick={handleKonnectPayment}
        disabled={!enabled}
        className="w-full bg-[#700100] text-white px-4 py-3 rounded-md hover:bg-[#591C1C] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
      >
        <CreditCard size={20} />
        {BYPASS_PAYMENT ? 
          `Payer (Mode Test) (${finalTotal.toFixed(2)} TND)` : 
          `Payer avec carte bancaire (${finalTotal.toFixed(2)} TND)`}
      </motion.button>
    </div>
  );
};

export default PaymentButtons;