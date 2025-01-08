import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyCartMessageProps {
  onNavigate: () => void;
}

const EmptyCartMessage = ({ onNavigate }: EmptyCartMessageProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 bg-white/50 rounded-xl shadow-sm backdrop-blur-sm border border-white/10"
  >
    <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-[#8E9196]" />
    <h2 className="text-2xl text-[#1A1F2C] mb-6 font-serif">Votre panier est vide</h2>
    <button
      onClick={onNavigate}
      className="bg-[#700100] text-white px-8 py-3 rounded-full hover:bg-[#591C1C] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
    >
      Continuer mes achats
    </button>
  </motion.div>
);

export default EmptyCartMessage;