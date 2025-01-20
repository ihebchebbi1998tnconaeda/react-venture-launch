import { CartItem } from "@/types/cart";

export const saveCartItems = (items: CartItem[]): void => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

export const getCartItems = (): CartItem[] => {
  const items = localStorage.getItem('cartItems');
  return items ? JSON.parse(items) : [];
};