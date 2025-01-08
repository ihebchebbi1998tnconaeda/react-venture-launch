import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PaymentLoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/30 to-red-900/30 blur-xl" />
        <motion.div 
          className="relative backdrop-blur-md rounded-full p-8 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </motion.div>
      </div>
      <motion.p 
        className="absolute bottom-1/4 text-white text-xl font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Préparation du paiement sécurisé...
      </motion.p>
    </motion.div>
  );
};

export default PaymentLoadingScreen;