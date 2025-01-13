export interface Product {
  id: number;
  name: string;
  material: string;
  color: string;
  price: number;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  description: string;
  status: string;
  reference: string;
  itemGroup: string;
  relatedProducts: string;
  colorProduct: string;
  discount_product: string;
  sizes: {
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
    "3xl": number;
    "48": number;
    "50": number;
    "52": number;
    "54": number;
    "56": number;
    "58": number;
  };
  quantity: number;
  type_product: string;
  category_product: string;
  itemgroup_product: string;
  size?: string;
  personalization?: string;
}