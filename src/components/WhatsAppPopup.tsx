import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import FloatingCartIcon from './FloatingCartIcon';

const WhatsAppPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Changed to start minimized
  
  useEffect(() => {
    const showPopup = () => {
      if (!isMinimized) {
        setIsVisible(true);
      }
    };

    // Initial delay before first popup
    const initialDelay = setTimeout(showPopup, 3000);

    // Set up interval for showing popup
    const interval = setInterval(() => {
      showPopup();
    }, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [isMinimized]);

  const handleClose = () => {
    setIsMinimized(true);
    setIsVisible(false);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+21629509840', '_blank');
  };

  const handleMinimizedClick = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <FloatingCartIcon />
      <AnimatePresence>
        {isVisible && !isMinimized ? (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 100 }}
          >
            <div className="bg-gradient-to-b from-red-800/70 via-red-800/60 to-red-800/70 backdrop-blur-sm border-t border-b border-red-500/30 shadow-lg rounded-lg px-8 py-4 flex items-center gap-4 relative max-w-xs sm:max-w-sm">
              <button 
                onClick={handleClose}
                className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex flex-col items-start gap-2">
                <p className="text-white text-sm font-medium">
                  Besoin d'aide ?
                </p>
                <p className="text-white/60 text-xs">
                  Contactez-nous sur WhatsApp
                </p>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                  onClick={handleWhatsAppClick}
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Discuter maintenant
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleMinimizedClick}
            className={`rounded-full bg-green-500 hover:bg-green-600 p-4 shadow-lg ${isMinimized ? 'block' : 'hidden'}`}
          >
            <FaWhatsapp className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppPopup;