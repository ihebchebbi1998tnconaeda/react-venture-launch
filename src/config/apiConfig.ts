// Base URLs are obfuscated to prevent exposure in client-side code
const generateApiUrl = (endpoint: string): string => {
  const base = atob('aHR0cHM6Ly93d3cuZmlvcmlmb3J5b3UuY29tL2JhY2tmaW9yaQ=='); // Encoded base URL
  return `${base}/${endpoint}`;
};

export const API_ENDPOINTS = {
  submitOrder: generateApiUrl('submit_all_order.php'),
  sendEmail: generateApiUrl('testsmtp.php'),
  trackVisitor: generateApiUrl('track_visitor.php'),
  subscribeEmail: generateApiUrl('subscribe_email.php'),
  reduceStock: generateApiUrl('reduicestock.php'),
  getArticles: generateApiUrl('get_all_articles.php'),
};

// Konnect API configuration
export const KONNECT_CONFIG = {
  apiUrl: atob('aHR0cHM6Ly9hcGkua29ubmVjdC5uZXR3b3JrL2FwaS92Mg=='),
  apiKey: atob('NjU3YWYxOTMwYmVmOGJkZmQwNDViM2EzOlNHZkFaU1d1RXRRY1BiVVUySTVoWHNPSw=='),
  walletId: atob('NjU3YWYxOTMwYmVmOGJkZmQwNDViM2E3'),
};