export interface PackPrice {
  price: number;
  image: string;
}

export const packPrices: Record<string, PackPrice> = {
  'Pack Prestige': {
    price: 50,
    image: '/BoxToSelected.png'
  },
  'Pack Premium': {
    price: 30,
    image: '/BoxToSelected.png'
  },
  'Pack Trio': {
    price: 20,
    image: '/BoxToSelected.png'
  },
  'Pack Duo': {
    price: 20,
    image: '/BoxToSelected.png'
  },
  'Pack Mini Duo': {
    price: 0,
    image: '/BoxToSelected.png'
  },
  'Pack Chemise': {
    price: 10,
    image: '/BoxToSelected.png'
  },
  'Pack Ceinture': {
    price: 10,
    image: '/BoxToSelected.png'
  },
  'Pack Cravatte': {
    price: 10,
    image: '/BoxToSelected.png'
  },
  'Pack Malette': {
    price: 10,
    image: '/BoxToSelected.png'
  }
};

export const getPackPrice = (packType: string): number => {
  return packPrices[packType]?.price || 0;
};

export const getPackImage = (packType: string): string => {
  return packPrices[packType]?.image || '/BoxToSelected.png';
};