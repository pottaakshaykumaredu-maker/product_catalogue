import { Product } from './product.model.ts';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  appliedPromo?: string;
}
