import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F1F0FB] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full"
      >
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-serif text-[#1A1F2C] mb-4">
          Échec du paiement
        </h1>
        <p className="text-gray-600 mb-6">
          Une erreur s'est produite lors du traitement de votre paiement. Veuillez réessayer.
        </p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-[#700100] text-white px-6 py-3 rounded-md hover:bg-[#591C1C] transition-colors"
        >
          Retour au panier
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentFailurePage;