import { CartItem } from '@/types/cart';
import { calculateDiscountedPrice } from './priceCalculations';
import { getPersonalizationPrice } from './personalizationPricing';

export const shouldSkipPackagingFee = (
  prevItems: CartItem[], 
  item: CartItem
): boolean => {
  if (item.type_product !== "Pack") return false;
  
  const existingPackagingFee = prevItems.find(i => 
    i.type_product === "Pack" && 
    i.name === item.name
  );
  
  return !!existingPackagingFee;
};

export const shouldSkipPackItem = (
  prevItems: CartItem[], 
  item: CartItem
): boolean => {
  if (!item.fromPack) return false;
  
  const packType = item.pack;
  const existingPackItem = prevItems.find(i => 
    i.id === item.id && 
    i.pack === packType && 
    i.fromPack === true &&
    i.size === item.size &&
    i.personalization === item.personalization
  );
  
  return !!existingPackItem;
};

export const findExistingItem = (
  prevItems: CartItem[], 
  item: CartItem
): CartItem | undefined => {
  if (item.fromPack) return undefined;
  
  return prevItems.find(i => 
    i.id === item.id && 
    i.size === item.size && 
    i.color === item.color && 
    i.personalization === item.personalization &&
    i.withBox === item.withBox &&
    (!i.fromPack && !item.fromPack)
  );
};

export const calculateItemPrice = (item: CartItem): number => {
  const finalPrice = item.discount_product 
    ? calculateDiscountedPrice(item.price, item.discount_product)
    : item.price;

  const personalizationPrice = getPersonalizationPrice(
    item.itemgroup_product || '',
    item.personalization,
    item.fromPack || false
  );

  return finalPrice + personalizationPrice;
};

export const prepareItemForCart = (item: CartItem): CartItem => {
  return {
    ...item,
    price: calculateItemPrice(item),
    originalPrice: item.discount_product ? item.price : undefined,
    pack: item.pack || 'aucun',
    size: item.size || '-',
    personalization: item.personalization || '-'
  };
};