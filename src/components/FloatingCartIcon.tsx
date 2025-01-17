import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './cart/CartProvider';
import { Link } from 'react-router-dom';

const FloatingCartIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-28 right-8 z-50"
        >
          <Link to="/cart">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-[#700100] p-4 rounded-full shadow-lg relative cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#700100] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border border-white">
                  {itemCount}
                </span>
              )}
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCartIcon;