import { Product, ProductItem, ProductCategory, ProductFilterOptions } from '../models/product.model.ts';

/**
 * ProductService - Angular Injectable Service Architecture
 * Manages product catalogue state, HTTP data-fetching (JSON/XML/Text),
 * filtering, sorting, and POST demonstration.
 */
export class ProductService {
  private products: ProductItem[] = [];
  private isLoaded = false;
  private subscribers: Array<(products: ProductItem[]) => void> = [];

  constructor() {
    this.loadProducts();
  }

  /**
   * Loads product inventory from /data/products.json
   */
  async loadProducts(): Promise<ProductItem[]> {
    if (this.isLoaded && this.products.length > 0) {
      return this.products;
    }

    try {
      const response = await fetch('/data/products.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Partial<Product>[] = await response.json();
      this.products = data.map(item => ProductItem.fromJSON(item));
      this.isLoaded = true;
      this.notifySubscribers();
      return this.products;
    } catch (error) {
      console.warn('Could not fetch from /data/products.json, falling back to static dataset:', error);
      // Fallback data ensures zero downtime
      this.products = this.getFallbackProducts();
      this.isLoaded = true;
      this.notifySubscribers();
      return this.products;
    }
  }

  subscribe(callback: (products: ProductItem[]) => void): () => void {
    this.subscribers.push(callback);
    if (this.isLoaded) {
      callback(this.products);
    }
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers(): void {
    for (const callback of this.subscribers) {
      callback(this.products);
    }
  }

  async getAllProducts(): Promise<ProductItem[]> {
    if (!this.isLoaded) {
      await this.loadProducts();
    }
    return [...this.products];
  }

  async getProductById(id: number): Promise<ProductItem | undefined> {
    if (!this.isLoaded) {
      await this.loadProducts();
    }
    return this.products.find(p => p.id === id);
  }

  async getFeaturedProducts(limit: number = 4): Promise<ProductItem[]> {
    const all = await this.getAllProducts();
    const featured = all.filter(p => p.featured);
    return featured.length > 0 ? featured.slice(0, limit) : all.slice(0, limit);
  }

  async getCategories(): Promise<Array<{ name: ProductCategory; count: number; image: string }>> {
    const all = await this.getAllProducts();
    const categoryMap = new Map<ProductCategory, { count: number; image: string }>();

    for (const product of all) {
      const existing = categoryMap.get(product.category);
      if (existing) {
        existing.count += 1;
      } else {
        categoryMap.set(product.category, {
          count: 1,
          image: product.image
        });
      }
    }

    return Array.from(categoryMap.entries()).map(([name, data]) => ({
      name,
      count: data.count,
      image: data.image
    }));
  }

  /**
   * Filter and sort logic demonstrating Weeks 4, 5, and 11
   */
  filterAndSort(products: ProductItem[], options: Partial<ProductFilterOptions>): ProductItem[] {
    let result = [...products];

    // 1. Text search (Name, Description, SKU)
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    // 2. Category filtering
    if (options.category && options.category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === options.category!.toLowerCase());
    }

    // 3. Price range filtering
    if (options.minPrice !== undefined && options.minPrice > 0) {
      result = result.filter(p => p.price >= options.minPrice!);
    }
    if (options.maxPrice !== undefined && options.maxPrice > 0) {
      result = result.filter(p => p.price <= options.maxPrice!);
    }

    // 4. Stock status filtering
    if (options.stockStatus && options.stockStatus !== 'all') {
      result = result.filter(p => p.stockStatus === options.stockStatus);
    }

    // 5. Sorting
    if (options.sortBy) {
      switch (options.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return result;
  }

  /**
   * Week 8-10 AJAX Demonstration: Fetching raw XML and parsing via DOMParser
   */
  async fetchProductsAsXML(): Promise<{ rawXml: string; parsedCount: number; xmlDoc: Document }> {
    const response = await fetch('/data/products.xml');
    if (!response.ok) {
      throw new Error(`Failed to load XML: ${response.statusText}`);
    }
    const rawXml = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rawXml, 'application/xml');
    
    // Check for parse errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error(`XML Parsing error: ${parseError.textContent}`);
    }

    const items = xmlDoc.getElementsByTagName('product');
    return {
      rawXml,
      parsedCount: items.length,
      xmlDoc
    };
  }

  /**
   * Week 8-10 AJAX Demonstration: Fetching plain text TSV data via response.text()
   */
  async fetchProductsAsText(): Promise<string> {
    const response = await fetch('/data/products.txt');
    if (!response.ok) {
      throw new Error(`Failed to load text: ${response.statusText}`);
    }
    return await response.text();
  }

  /**
   * Week 8-10 AJAX Demonstration: Mock POST submission with JSON payload
   */
  async submitNewProduct(productData: Partial<Product>): Promise<{ success: boolean; message: string; createdProduct: ProductItem }> {
    // Simulate real network latency (500ms)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Client-side validation
    if (!productData.name || !productData.price || !productData.category) {
      throw new Error('Validation failed: Product Name, Price, and Category are mandatory fields.');
    }

    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const newProduct = ProductItem.fromJSON({
      id: newId,
      name: productData.name,
      category: productData.category,
      description: productData.description || 'Newly added product via AJAX POST demonstration.',
      price: Number(productData.price),
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : Number(productData.price) * 1.15,
      rating: 5.0,
      reviewCount: 1,
      stockStatus: productData.stockStatus || 'In Stock',
      stockCount: productData.stockCount ? Number(productData.stockCount) : 10,
      image: productData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      sku: productData.sku || `PROD-NEW-${newId.toString().padStart(3, '0')}`,
      featured: false
    });

    // In-memory update for current session
    this.products.unshift(newProduct);
    this.notifySubscribers();

    return {
      success: true,
      message: `Product "${newProduct.name}" submitted successfully (Mock POST /api/products response 201 Created).`,
      createdProduct: newProduct
    };
  }

  private getFallbackProducts(): ProductItem[] {
    return [
      ProductItem.fromJSON({
        id: 1,
        name: "Sony WH-1000XM5 Wireless Headphones",
        category: "Electronics",
        description: "Industry-leading noise canceling headphones with dual processors and 8 microphones.",
        price: 348.00,
        originalPrice: 399.99,
        rating: 4.8,
        reviewCount: 1420,
        stockStatus: "In Stock",
        stockCount: 42,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        featured: true,
        sku: "ELEC-SONY-001"
      }),
      ProductItem.fromJSON({
        id: 2,
        name: "Apple MacBook Air M3 13-inch",
        category: "Electronics",
        description: "Blazing-fast 8-core CPU, 10-core GPU, 16GB Unified Memory, and Liquid Retina display.",
        price: 1099.00,
        originalPrice: 1199.00,
        rating: 4.9,
        reviewCount: 890,
        stockStatus: "In Stock",
        stockCount: 18,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        featured: true,
        sku: "ELEC-APPL-002"
      })
    ];
  }
}

export const productService = new ProductService();
