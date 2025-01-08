import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, CreditCard, Clock } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  finalTotal: number;
  hasNewsletterDiscount?: boolean;
  newsletterDiscount?: number;
}

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  finalTotal,
  hasNewsletterDiscount = false,
  newsletterDiscount = 0
}: OrderSummaryProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-medium mb-4 text-[#471818]">Résumé de la commande</h2>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} TND</span>
          </div>
          
          {hasNewsletterDiscount && newsletterDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Réduction newsletter (-5%)</span>
              <span>-{newsletterDiscount.toFixed(2)} TND</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Livraison</span>
            <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
          </div>
          
          <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-100">
            <span>Total</span>
            <span className="text-[#700100]">{finalTotal.toFixed(2)} TND</span>
          </div>
        </div>

        <div className="bg-[#F8F8F8] rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-[#471818] mb-2">Informations de commande</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#700100]" />
              <span>Livraison gratuite à partir de 500 TND</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#700100]" />
              <span>Livraison express disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#700100]" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#700100]" />
              <span>Retours gratuits sous 14 jours</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;