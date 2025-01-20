import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartContextType } from '@/types/cart';
import { saveCartItems, getCartItems } from '@/utils/cartStorage';
import { getPersonalizations } from '@/utils/personalizationStorage';
import { toast } from "@/hooks/use-toast";
import { stockReduceManager } from '@/utils/StockReduce';
import { calculateCartTotals } from '@/utils/cartCalculations';
import { 
  shouldSkipPackagingFee, 
  shouldSkipPackItem, 
  findExistingItem, 
  prepareItemForCart 
} from '@/utils/cartItemManagement';
import { useTranslation } from 'react-i18next';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  personalization?: string;
  fromPack?: boolean;
  pack?: string;
  withBox?: boolean;
  discount_product?: string;
  type_product?: string;
  itemgroup_product?: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasNewsletterDiscount, setHasNewsletterDiscount] = useState<boolean>(() => {
    return localStorage.getItem('newsletterSubscribed') === 'true';
  });

  useEffect(() => {
    const savedItems = getCartItems();
    const personalizations = getPersonalizations();
    
    const itemsWithPersonalization = savedItems.map(item => ({
      ...item,
      personalization: item.personalization || personalizations[item.id] || '',
    }));
    
    if (itemsWithPersonalization.length > 0) {
      setCartItems(itemsWithPersonalization);
    }
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      if (shouldSkipPackagingFee(prevItems, item)) {
        return prevItems;
      }

      if (shouldSkipPackItem(prevItems, item)) {
        return prevItems;
      }

      const existingItem = findExistingItem(prevItems, item);
      if (existingItem) {
        return prevItems.map(i =>
          i === existingItem
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      const itemWithDetails = prepareItemForCart(item);
      return [...prevItems, itemWithDetails];
    });
  };

  const removeFromCart = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    if (itemToRemove) {
      setCartItems(prevItems => {
        if (itemToRemove.type_product === "Pack" || itemToRemove.fromPack) {
          const packType = itemToRemove.type_product === "Pack" 
            ? itemToRemove.name.split(' - ')[0]
            : itemToRemove.pack;
          
          const remainingItems = prevItems.filter(item => {
            const isPackagingFee = item.type_product === "Pack" && 
                                 item.name.split(' - ')[0] === packType;
            const isPackItem = item.pack === packType && item.fromPack;
            
            return !isPackagingFee && !isPackItem;
          });
          
          toast({
            title: t('cart.provider.packRemoved'),
            description: t('cart.provider.packRemovedDesc'),
            style: {
              backgroundColor: '#700100',
              color: 'white',
              border: '1px solid #590000',
            },
            duration: 5000,
          });
          
          return remainingItems;
        }
        
        return prevItems.filter(item => item.id !== id);
      });
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    stockReduceManager.clearItems();
  };

  const applyNewsletterDiscount = () => {
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (!subscribedEmail) return;

    const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
    
    if (usedDiscountEmails.includes(subscribedEmail)) {
      setHasNewsletterDiscount(false);
      localStorage.removeItem('newsletterSubscribed');
      toast({
        title: t('cart.provider.newsletterUsed'),
        description: t('cart.provider.newsletterUsedDesc'),
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
      return;
    }

    usedDiscountEmails.push(subscribedEmail);
    localStorage.setItem('usedDiscountEmails', JSON.stringify(usedDiscountEmails));
    
    setHasNewsletterDiscount(true);
    localStorage.setItem('newsletterSubscribed', 'true');
  };

  const removeNewsletterDiscount = () => {
    setHasNewsletterDiscount(false);
    localStorage.removeItem('newsletterSubscribed');
  };

  const calculateTotal = () => {
    return calculateCartTotals(cartItems, hasNewsletterDiscount);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      hasNewsletterDiscount,
      applyNewsletterDiscount,
      removeNewsletterDiscount,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
