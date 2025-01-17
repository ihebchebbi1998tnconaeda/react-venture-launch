import { CartItem } from '@/types/cart';

export const BOX_PRICE = 30;

export const calculateCartTotals = (cartItems: CartItem[], hasNewsletterDiscount: boolean) => {
  const itemsSubtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const boxTotal = cartItems.reduce((sum, item) => 
    sum + (item.withBox ? BOX_PRICE * item.quantity : 0), 0);
  
  const subtotal = itemsSubtotal + boxTotal;
  const discount = hasNewsletterDiscount ? subtotal * 0.05 : 0;
  const total = subtotal - discount;
  
  return { subtotal: itemsSubtotal, discount, total, boxTotal };
};