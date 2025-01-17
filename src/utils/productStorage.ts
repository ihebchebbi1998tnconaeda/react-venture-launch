import { Product } from '../types/product';

export const saveProduct = (product: Product): void => {
  try {
    const existingProducts = localStorage.getItem('products');
    const products = existingProducts ? JSON.parse(existingProducts) : [];
    
    // Check if product already exists
    const existingIndex = products.findIndex((p: Product) => p.id === product.id);
    
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.push(product);
    }
    
    localStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving product to localStorage:', error);
  }
};

export const getProducts = (): Product[] => {
  try {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('Error getting products from localStorage:', error);
    return [];
  }
};

export const removeProduct = (productId: number): void => {
  try {
    const products = getProducts();
    const filteredProducts = products.filter((p: Product) => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  } catch (error) {
    console.error('Error removing product from localStorage:', error);
  }
};

export const clearProducts = (): void => {
  try {
    localStorage.removeItem('products');
  } catch (error) {
    console.error('Error clearing products from localStorage:', error);
  }
};

export const calculateFinalPrice = (basePrice: number, discount: string): number => {
  if (discount && !isNaN(parseFloat(discount)) && parseFloat(discount) > 0) {
    const discountAmount = (parseFloat(discount) / 100) * basePrice;
    return basePrice - discountAmount;
  }
  return basePrice;
};