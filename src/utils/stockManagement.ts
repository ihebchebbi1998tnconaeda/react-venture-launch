import { Product } from '@/types/product';

interface CartItem {
  id: number;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '40' | '42' | '44' | '46' | '48' | '50';
  quantity: number;
}

interface StockUpdatePayload {
  id_product: number;
  xs_size: number;
  s_size: number;
  m_size: number;
  l_size: number;
  xl_size: number;
  xxl_size: number;
}

export const getStockForSize = (product: Product, size: string): number => {
  if (!product.sizes) {
    return 0;
  }
  
  // Convert size to lowercase for consistent comparison
  const sizeKey = size.toLowerCase();
  
  // Check if the size exists in the product's sizes
  if (sizeKey in product.sizes) {
    return product.sizes[sizeKey] || 0;
  }
  
  return 0;
};

export const updateProductStock = async (cartItems: CartItem[]): Promise<any[]> => {
  console.log('Updating stock for items:', cartItems);

  try {
    // Construct the stock update payload for each item
    const stockUpdates: StockUpdatePayload[] = cartItems.map(item => {
      // Initialize all sizes to 0
      const stockUpdate: StockUpdatePayload = {
        id_product: item.id,
        xs_size: 0,
        s_size: 0,
        m_size: 0,
        l_size: 0,
        xl_size: 0,
        xxl_size: 0,
      };

      // Check if the item has a valid size, and update the corresponding size field
      if (item.size && SIZE_MAP[item.size.toLowerCase()]) {
        stockUpdate[SIZE_MAP[item.size.toLowerCase()]] = item.quantity;
      }

      return stockUpdate;
    });

    console.log('Sending stock updates:', stockUpdates);

    // Send update requests for each product
    const updatePromises = stockUpdates.map(update => {
      const requestBody = JSON.stringify(update);

      // Log the request body (query) before sending it
      console.log('Sending query for product ID:', update.id_product, requestBody);

      return fetch('https://respizenmedical.com/fiori/recount_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      })
      .then(response => {
        // Log the raw response for debugging
        console.log('Raw response from server:', response);

        // Check if response is ok (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response if the status is OK
        return response.json();
      })
      .catch(error => {
        // Log any errors during the fetch request
        console.error('Error during fetch request for product', update.id_product, error);
        return { success: false, error: error.message }; // Return a custom error response for each failed request
      });
    });

    // Wait for all update promises to complete
    const results = await Promise.all(updatePromises);

    console.log('Stock update results:', results);

    // Return results for further handling (e.g., success/failure feedback)
    return results;

  } catch (error) {
    // Handle any other errors that occur during the process
    console.error('Error updating stock:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const SIZE_MAP: { [key: string]: keyof StockUpdatePayload } = {
  xs: 'xs_size',
  s: 's_size',
  m: 'm_size',
  l: 'l_size',
  xl: 'xl_size',
  xxl: 'xxl_size',
};