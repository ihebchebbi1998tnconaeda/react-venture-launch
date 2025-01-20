import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserDetails } from '@/utils/userDetailsStorage';
import PaymentButtons from './PaymentButtons';
import { Pencil, Trash2, StickyNote } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';

const promoCodes = {
  'WELCOME10': { discount: 10, description: 'Code de bienvenue' },
  'SUMMER20': { discount: 20, description: 'Offre d\'été' },
  'SPECIAL30': { discount: 30, description: 'Offre spéciale' },
  'LUNCH2024': { discount: 25, description: 'Offre du déjeuner' }
};

interface OrderSummaryProps {
  userDetails: UserDetails | null;
  cartItems: any[];
  onEditDetails?: () => void;
  onDeleteDetails?: () => void;
}

const OrderSummary = ({ 
  userDetails,
  cartItems,
  onEditDetails,
  onDeleteDetails
}: OrderSummaryProps) => {
  const [discountCode, setDiscountCode] = useState('');
  const { calculateTotal, hasNewsletterDiscount } = useCart();
  const { subtotal, discount: newsletterDiscount, total, boxTotal } = calculateTotal();
  
  const shipping = subtotal > 299 ? 0 : 8;
  const finalTotal = total + shipping;

  // Calculate personalization total
  const personalizationTotal = cartItems.reduce((sum, item) => {
    if (item.personalization && item.personalization !== '-' && !item.fromPack) {
      return sum + (30 * item.quantity);
    }
    return sum;
  }, 0);

  const handleApplyDiscount = () => {
    const promoCode = promoCodes[discountCode];
    
    if (promoCode) {
      toast({
        title: "Code promo appliqué",
        description: `Réduction de ${promoCode.discount}% appliquée`,
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    } else {
      toast({
        title: "Code invalide",
        description: "Le code promo n'est pas valide",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-1"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32 border border-gray-100">
        <h2 className="text-xl font-serif text-[#1A1F2C] mb-6">Résumé de la commande</h2>
        
        {userDetails && (
          <div className="mb-6 p-4 bg-[#F1F0FB] rounded-md relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEditDetails && (
                <button
                  onClick={onEditDetails}
                  className="p-1 hover:bg-white rounded-full mr-1 transition-colors"
                  title="Modifier"
                >
                  <Pencil size={16} className="text-[#700100]" />
                </button>
              )}
              {onDeleteDetails && (
                <button
                  onClick={onDeleteDetails}
                  className="p-1 hover:bg-white rounded-full transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} className="text-[#700100]" />
                </button>
              )}
            </div>
            <h3 className="font-medium text-[#1A1F2C] mb-2">Informations de livraison</h3>
            <p className="text-sm text-[#8E9196]">
              {userDetails.firstName} {userDetails.lastName}<br />
              {userDetails.address}<br />
              {userDetails.zipCode} {userDetails.country}<br />
              {userDetails.phone}<br />
              {userDetails.email}
            </p>
            
            {userDetails.orderNote && userDetails.orderNote !== '-' && (
              <div className="mt-4 p-3 bg-white rounded-md">
                <div className="flex items-center gap-2 text-[#1A1F2C]">
                  <StickyNote size={16} className="text-[#700100]" />
                  <span className="font-medium">Note de commande:</span>
                </div>
                <p className="mt-1 text-sm text-[#8E9196]">{userDetails.orderNote}</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-[#8E9196]">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} TND</span>
          </div>
          
          {boxTotal > 0 && (
            <div className="flex justify-between text-[#8E9196]">
              <span>Box cadeau</span>
              <span>{boxTotal.toFixed(2)} TND</span>
            </div>
          )}

          {personalizationTotal > 0 && (
            <div className="flex justify-between text-[#8E9196]">
              <span>Personnalisation</span>
              <span>{personalizationTotal.toFixed(2)} TND</span>
            </div>
          )}
          
          {hasNewsletterDiscount && newsletterDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Réduction newsletter (-5%)</span>
              <span>-{newsletterDiscount.toFixed(2)} TND</span>
            </div>
          )}

          <div className="flex justify-between text-[#8E9196]">
            <span>Livraison</span>
            <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between text-lg font-medium text-[#1A1F2C]">
              <span>Total</span>
              <span>{(finalTotal + personalizationTotal).toFixed(2)} TND</span>
            </div>
            <p className="text-xs text-[#8E9196] mt-1">TVA incluse</p>
          </div>
        </div>
        
        <PaymentButtons 
          enabled={!!userDetails}
          cartItems={cartItems}
          userDetails={userDetails}
          total={subtotal}
          shipping={shipping}
          finalTotal={finalTotal + personalizationTotal}
          hasPersonalization={cartItems.some(item => item.personalization)}
        />

        <div className="mt-6 space-y-2 text-sm text-[#8E9196]">
      
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Livraison gratuite à partir de 299 TND
          </p>
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
  • Échange de produit sous 30 jours ( 4 TND )
</p>
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Service client disponible 24/7
          </p>
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Livraison mondial disponible
          </p>
          <div className="flex justify-left items-center gap-4 mt-2">
          <img src="https://i.ibb.co/pPLzH9L/image.png" alt="Payment Methods" className="h-6" />
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;