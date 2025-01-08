import { CartItem } from "@/components/cart/CartProvider";
import { UserDetails, getUserDetails } from "./userDetailsStorage";
import { getCartItems } from "./cartStorage";
import { getPersonalizations } from "./personalizationStorage";

export interface OrderData {
  cartItems: CartItem[];
  userDetails: UserDetails | null;
  personalizations: Record<number, string>;
  total: number;
  shipping: number;
  finalTotal: number;
  paymentMethod: 'card' | 'cash' | null;
  orderId: string;
  orderDate: string;
}

export const collectOrderData = (): OrderData => {
  console.log('Collecting order data from localStorage...');
  
  // Get cart items and calculate totals
  const cartItems = getCartItems();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total >= 500 ? 0 : 7; // Free shipping over 500 TND
  const finalTotal = total + shipping;

  // Get user details
  const userDetails = getUserDetails();
  
  // Get personalizations
  const personalizations = getPersonalizations();

  // Get payment method (if stored)
  const paymentMethod = localStorage.getItem('paymentMethod') as 'card' | 'cash' | null;

  // Generate order ID
  const orderId = `ORDER-${Date.now()}`;

  const orderData: OrderData = {
    cartItems,
    userDetails,
    personalizations,
    total,
    shipping,
    finalTotal,
    paymentMethod,
    orderId,
    orderDate: new Date().toISOString(),
  };

  console.log('Collected order data:', orderData);
  return orderData;
};

// Helper function to save payment method
export const savePaymentMethod = (method: 'card' | 'cash') => {
  localStorage.setItem('paymentMethod', method);
  console.log('Payment method saved:', method);
};

// Helper function to clear all order related data
export const clearOrderData = () => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('userDetails');
  localStorage.removeItem('personalizations');
  localStorage.removeItem('paymentMethod');
  console.log('All order data cleared from localStorage');
};

// Example of how to use this with an API call
export const submitOrderToAPI = async (orderData: OrderData) => {
  console.log('Preparing to submit order to API:', orderData);
  
  try {
    // This is just a placeholder for the actual API call
    // Replace with your actual API endpoint and logic
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    const result = await response.json();
    console.log('Order submitted successfully:', result);
    
    // Clear local storage after successful submission
    clearOrderData();
    
    return result;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};