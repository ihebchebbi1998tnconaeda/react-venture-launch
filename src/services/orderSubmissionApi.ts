interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  zip_code: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  personalization?: string;
  pack: string;
  box?: string;
}

interface PriceDetails {
  subtotal: number;
  shipping_cost: number;
  has_newsletter_discount: boolean;
  newsletter_discount_amount: number;
  final_total: number;
}

interface PaymentDetails {
  method: 'card' | 'cash';
  status: string;
  konnect_payment_url: string;
  completed_at: string;
}

interface OrderStatus {
  status: string;
  shipped_at: string;
  delivered_at: string;
}

interface OrderSubmission {
  order_id: string;
  user_details: UserDetails;
  items: OrderItem[];
  price_details: PriceDetails;
  payment: PaymentDetails;
  order_status: OrderStatus;
}

export const submitOrder = async (orderData: OrderSubmission): Promise<any> => {
  const { cartItems, userDetails } = orderData;
  const packType = sessionStorage.getItem('selectedPackType') || 'aucun';
  
  try {
    const formattedItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price + (item.withBox ? 30 : 0),
      quantity: item.quantity,
      image: item.image,
      size: item.size || '-',
      color: item.color || '-',
      personalization: item.personalization || '-',
      pack: packType,
      box: item.withBox ? 'Avec box' : 'Sans box'
    }));

    const response = await fetch('https://respizenmedical.com/fiori/submit_all_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...orderData,
        items: formattedItems
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Order submission result:', result);
    return result;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};
