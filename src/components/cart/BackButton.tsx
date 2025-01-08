import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => (
  <motion.button
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    onClick={onClick}
    className="flex items-center gap-2 text-[#1A1F2C] hover:text-[#700100] transition-colors group"
    aria-label="Retour à l'accueil"
  >
    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
    <span className="text-lg font-medium">Retour à l'accueil</span>
  </motion.button>
);

export default BackButton;