export const calculateDiscountedPrice = (originalPrice: number, discount: string): number => {
  if (!discount || discount === "") return originalPrice;
  const discountValue = parseFloat(discount);
  if (isNaN(discountValue) || discountValue <= 0) return originalPrice;
  return originalPrice * (1 - discountValue / 100);
};

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};