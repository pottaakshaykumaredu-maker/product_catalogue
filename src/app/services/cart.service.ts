import { Product } from '../models/product.model.ts';
import { CartItem, CartSummary } from '../models/cart-item.model.ts';
import { notificationService } from './notification.service.ts';

export class CartService {
  private items: CartItem[] = [];
  private appliedPromo: string | null = null;
  private promoDiscountPercentage: number = 0;
  private subscribers: Array<(items: CartItem[], summary: CartSummary) => void> = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('college_cart_items');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.items = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
      }
    } catch (e) {
      console.warn('Failed to parse cart from localStorage:', e);
      this.items = [];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('college_cart_items', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }

  subscribe(callback: (items: CartItem[], summary: CartSummary) => void): () => void {
    this.subscribers.push(callback);
    callback([...this.items], this.getCartSummary());
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notify(): void {
    this.saveToStorage();
    const summary = this.getCartSummary();
    for (const callback of this.subscribers) {
      callback([...this.items], summary);
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  addToCart(product: Product, quantity: number = 1): boolean {
    if (product.stockStatus === 'Out of Stock' || product.stockCount <= 0) {
      notificationService.error('Stock Unavailable', `Sorry, "${product.name}" is currently out of stock.`);
      return false;
    }

    const existingIndex = this.items.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      const currentQty = this.items[existingIndex].quantity;
      const targetQty = currentQty + quantity;

      if (targetQty > product.stockCount) {
        notificationService.warning(
          'Maximum Stock Reached',
          `Only ${product.stockCount} units available in inventory.`
        );
        this.items[existingIndex].quantity = product.stockCount;
      } else {
        this.items[existingIndex].quantity = targetQty;
        notificationService.success('Cart Updated', `Updated quantity for "${product.name}" (${targetQty} items).`);
      }
    } else {
      const initialQty = Math.min(quantity, product.stockCount);
      this.items.push({
        product,
        quantity: initialQty,
        addedAt: new Date()
      });
      notificationService.success('Added to Cart', `"${product.name}" has been added to your cart.`);
    }

    this.notify();
    return true;
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.items.find(i => i.product.id === productId);
    if (!item) return;

    if (quantity > item.product.stockCount) {
      notificationService.warning('Stock Limit', `Maximum available quantity is ${item.product.stockCount}`);
      item.quantity = item.product.stockCount;
    } else {
      item.quantity = quantity;
    }

    this.notify();
  }

  removeFromCart(productId: number): void {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      this.items = this.items.filter(i => i.product.id !== productId);
      notificationService.info('Item Removed', `"${item.product.name}" was removed from your cart.`);
      this.notify();
    }
  }

  clearCart(): void {
    this.items = [];
    this.appliedPromo = null;
    this.promoDiscountPercentage = 0;
    this.notify();
    notificationService.info('Cart Cleared', 'Your shopping cart is now empty.');
  }

  applyPromoCode(code: string): { success: boolean; message: string } {
    const cleanCode = code.trim().toUpperCase();
    
    // Academic promo code demonstration
    if (cleanCode === 'COLLEGE10') {
      this.appliedPromo = cleanCode;
      this.promoDiscountPercentage = 10;
      this.notify();
      return { success: true, message: 'Promo code COLLEGE10 applied! 10% discount added.' };
    } else if (cleanCode === 'VIVA20') {
      this.appliedPromo = cleanCode;
      this.promoDiscountPercentage = 20;
      this.notify();
      return { success: true, message: 'Promo code VIVA20 applied! 20% discount added.' };
    } else {
      return { success: false, message: 'Invalid promo code. Try "COLLEGE10" or "VIVA20".' };
    }
  }

  removePromoCode(): void {
    this.appliedPromo = null;
    this.promoDiscountPercentage = 0;
    this.notify();
  }

  getCartSummary(): CartSummary {
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    
    const discount = (subtotal * this.promoDiscountPercentage) / 100;
    const taxableAmount = Math.max(0, subtotal - discount);
    
    // Shipping is free if subtotal > 100, else $9.99 (or 0 if cart empty)
    const shipping = itemCount === 0 ? 0 : (taxableAmount > 100 ? 0 : 9.99);
    
    // 8% sales tax calculation
    const tax = taxableAmount * 0.08;
    const total = taxableAmount + shipping + tax;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
      itemCount,
      appliedPromo: this.appliedPromo || undefined
    };
  }
}

export const cartService = new CartService();
