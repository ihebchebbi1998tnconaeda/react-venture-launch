export interface CartItem {
  id: string;
  quantity: number;
  product_id: number;
  size?: string;
  color?: string;
  personalization?: string;
  itemgroup_product: string;
}