/**
 * Product Data Model & TypeScript Class Implementation
 * Fulfills Week 11 (TypeScript Classes, Interfaces, Typed Methods)
 * and Week 12-14 (Angular Model Architecture)
 */

export type ProductCategory = 
  | 'Electronics' 
  | 'Clothing' 
  | 'Books' 
  | 'Home & Kitchen' 
  | 'Sports' 
  | 'Beauty' 
  | 'Accessories';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stockStatus: StockStatus;
  stockCount: number;
  image: string;
  featured?: boolean;
  sku: string;
}

/**
 * Week 11 Demonstration: TypeScript Class with typed properties,
 * access modifiers, getters, and business calculation methods.
 */
export class ProductItem implements Product {
  constructor(
    public id: number,
    public name: string,
    public category: ProductCategory,
    public description: string,
    public price: number,
    public rating: number,
    public stockStatus: StockStatus,
    public stockCount: number,
    public image: string,
    public sku: string,
    public originalPrice?: number,
    public reviewCount: number = 0,
    public featured: boolean = false
  ) {}

  /**
   * Calculates discount percentage compared to original price
   */
  get discountPercentage(): number {
    if (!this.originalPrice || this.originalPrice <= this.price) {
      return 0;
    }
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }

  /**
   * Checks real-time stock availability
   */
  isAvailable(): boolean {
    return this.stockCount > 0 && this.stockStatus !== 'Out of Stock';
  }

  /**
   * Formats the price in USD currency
   */
  getFormattedPrice(currency: string = '$'): string {
    return `${currency}${this.price.toFixed(2)}`;
  }

  /**
   * Formatted rating with one decimal point
   */
  get formattedRating(): string {
    return this.rating.toFixed(1);
  }

  /**
   * Static factory to instantiate a class instance from a raw JSON object
   */
  static fromJSON(json: Partial<Product>): ProductItem {
    return new ProductItem(
      json.id || 0,
      json.name || '',
      (json.category as ProductCategory) || 'Electronics',
      json.description || '',
      json.price || 0,
      json.rating || 0,
      (json.stockStatus as StockStatus) || 'In Stock',
      json.stockCount || 0,
      json.image || '',
      json.sku || '',
      json.originalPrice,
      json.reviewCount || 0,
      json.featured || false
    );
  }
}

export interface ProductFilterOptions {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  stockStatus: string;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';
}
