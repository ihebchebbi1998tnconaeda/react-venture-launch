const KONNECT_API_URL =  'https://api.konnect.network/api/v2';
const KONNECT_API_KEY =  '657af1930bef8bdfd045b3a3:SGfAZSWuEtQcPbUU2I5hXsOK';
const RECEIVER_WALLET_ID =  '657af1930bef8bdfd045b3a7';

interface InitPaymentResponse {
  payUrl: string;
  paymentRef: string;
}

interface KonnectPaymentRequest {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  orderId: string;
}

const fetchWithTimeout = (url: string, options: RequestInit, timeout = 5000): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout)),
  ]) as Promise<Response>;
};

export const initKonnectPayment = async (
  {
    amount,
    firstName,
    lastName,
    email,
    orderId,
  }: KonnectPaymentRequest,
  successUrl = `${window.location.origin}/payment-success`,
  failUrl = `${window.location.origin}/payment-failure`,
  theme = 'light'
): Promise<InitPaymentResponse> => {
  if (amount <= 0) throw new Error('Invalid amount. Must be greater than 0.');
  if (!firstName || !lastName) throw new Error('First and last names are required.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email format.');
  if (!orderId) throw new Error('Order ID is required.');

  try {
    const response = await fetchWithTimeout(`${KONNECT_API_URL}/payments/init-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KONNECT_API_KEY,
      },
      body: JSON.stringify({
        receiverWalletId: RECEIVER_WALLET_ID,
        amount: amount * 1000, // Convert to millimes
        token: 'TND',
        type: 'immediate',
        description: `Order #${orderId}`,
        acceptedPaymentMethods: ['bank_card', 'e-DINAR'],
        firstName,
        lastName,
        email,
        orderId,
        successUrl,
        failUrl,
        theme,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
      throw new Error(`Payment initialization failed: ${errorDetails.message || 'Unknown error'}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};