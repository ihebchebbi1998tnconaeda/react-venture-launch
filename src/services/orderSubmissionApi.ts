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

const sendOrderConfirmationEmail = async (orderData: OrderSubmission): Promise<void> => {
  console.log('Sending order confirmation email with data:', orderData);
  
  try {
    const response = await fetch('https://fioriforyou.com/testsmtp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email API error response:', errorText);
      throw new Error(`Email API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Email confirmation response:', result);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error(`Failed to send confirmation email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const submitOrder = async (orderData: OrderSubmission): Promise<any> => {
  console.log('Submitting order with data:', orderData);

  try {
    // First submit the order
    const orderResponse = await fetch('https://respizenmedical.com/fiori/submit_all_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(orderData),
    });

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('Order submission error response:', errorText);
      throw new Error(`Order submission failed: ${orderResponse.status} - ${errorText}`);
    }

    const orderResult = await orderResponse.json();
    console.log('Order submission successful:', orderResult);

    // If order submission is successful, send confirmation email
    try {
      await sendOrderConfirmationEmail(orderData);
      console.log('Email confirmation sent successfully');
    } catch (emailError) {
      // Log email error but don't fail the order submission
      console.error('Email confirmation failed but order was submitted:', emailError);
    }

    return orderResult;
  } catch (error) {
    console.error('Error in order process:', error);
    throw error;
  }
};