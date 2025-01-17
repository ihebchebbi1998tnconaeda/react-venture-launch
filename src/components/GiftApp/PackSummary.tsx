import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Package2, ShoppingBag, Gift, PenLine } from 'lucide-react';
import { getPersonalizationPrice } from '@/utils/personalizationPricing';

interface PackSummaryProps {
  items: Product[];
  note: string;
  onNoteChange: (note: string) => void;
}

const PackSummary = ({
  items,
  note,
  onNoteChange,
}: PackSummaryProps) => {
  const calculateTotalWithPersonalization = () => {
    return items.reduce((sum, item) => {
      const basePrice = item.price;
      const personalizationPrice = getPersonalizationPrice(
        item.itemgroup_product || '',
        item.personalization,
        true // items in packs have free personalization
      );
      return sum + basePrice + personalizationPrice;
    }, 0);
  };

  const totalPrice = calculateTotalWithPersonalization();

  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 space-y-4 shadow-lg border border-gray-100"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package2 className="w-5 h-5 text-[#6D0201]" />
          <h2 className="text-lg font-medium text-gray-900">Résumé</h2>
        </div>
        <div className="flex items-center gap-2 bg-[#6D0201]/5 px-3 py-1.5 rounded-full">
          <Gift className="w-4 h-4 text-[#6D0201]" />
          <span className="text-sm font-medium text-[#6D0201]">
            {items.length} {items.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-lg backdrop-blur-sm border border-gray-100"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-sm text-[#6D0201]">{item.price.toFixed(2)} TND</p>
              {/*   {item.personalization && item.itemgroup_product === 'chemises' && (
                  <div className="flex items-center gap-1 text-xs text-[#700100] mt-1">
                    <PenLine size={12} />
                    Personnalisation incluse
                  </div>
                )} */}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Separator className="my-4" />
        
        <div className="flex justify-between items-center bg-[#6D0201]/5 p-4 rounded-lg">
          <span className="text-sm font-small text-gray-700">Total du Pack</span>
          <motion.span 
            key={totalPrice}
            initial={{ scale: 1.2, color: '#6D0201' }}
            animate={{ scale: 1, color: '#1a1a1a' }}
            className="text-small font-semibold"
          >
            {totalPrice.toFixed(2)} TND
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default PackSummary;