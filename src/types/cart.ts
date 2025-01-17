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

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  hasNewsletterDiscount: boolean;
  applyNewsletterDiscount: () => void;
  removeNewsletterDiscount: () => void;
  calculateTotal: () => { subtotal: number; discount: number; total: number; boxTotal: number };
}