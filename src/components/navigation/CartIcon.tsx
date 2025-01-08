import React, { useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../cart/CartProvider';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartIcon = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <Link to="/cart" className="relative">
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
            className="absolute -top-2 -right-2 bg-[#700100] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {itemCount}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={itemCount > 0 ? {
          scale: [1, 1.2, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : {}}
      >
        <ShoppingCart className="w-6 h-6 text-white hover:text-accent transition-colors duration-300" />
      </motion.div>
    </Link>
  );
};

export default CartIcon;