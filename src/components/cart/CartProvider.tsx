import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, CartContextType } from '@/types/cart';
import { calculateCartTotals } from '@/utils/cartCalculations';
import { saveCartItems } from '@/utils/cartStorage';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasNewsletterDiscount, setHasNewsletterDiscount] = useState(false);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, item];
      saveCartItems(newItems);
      return newItems;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      saveCartItems(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      saveCartItems(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartItems([]);
  };

  const applyNewsletterDiscount = () => {
    setHasNewsletterDiscount(true);
  };

  const removeNewsletterDiscount = () => {
    setHasNewsletterDiscount(false);
  };

  const calculateTotal = () => {
    return calculateCartTotals(cartItems, hasNewsletterDiscount);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        hasNewsletterDiscount,
        applyNewsletterDiscount,
        removeNewsletterDiscount,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};