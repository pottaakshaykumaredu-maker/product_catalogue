import { productService } from '../services/product.service.ts';
import { ProductItem, ProductCategory, ProductFilterOptions } from '../models/product.model.ts';
import { ProductCardComponent } from '../components/product-card.component.ts';
import { router } from '../app.routes.ts';

export class ProductsComponent {
  private allProducts: ProductItem[] = [];
  private displayedProducts: ProductItem[] = [];
  private filterOptions: ProductFilterOptions = {
    searchQuery: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 1500,
    stockStatus: 'all',
    sortBy: 'rating-desc'
  };
  private viewMode: 'grid' | 'list' = 'grid';
  private categories: Array<{ name: ProductCategory; count: number; image: string }> = [];

  async render(targetElement?: HTMLElement): Promise<void> {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    this.allProducts = await productService.getAllProducts();
    this.categories = await productService.getCategories();

    // Read initial query params from router
    const queryParams = router.getQueryParams();
    if (queryParams.search) {
      this.filterOptions.searchQuery = queryParams.search;
    }
    if (queryParams.category) {
      this.filterOptions.category = queryParams.category;
    }

    this.applyFilters();
    this.renderView(el);
  }

  private applyFilters(): void {
    this.displayedProducts = productService.filterAndSort(this.allProducts, this.filterOptions);
  }

  private renderView(el: HTMLElement): void {
    const categoriesList = ['all', 'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty', 'Accessories'];

    el.innerHTML = `
      <div class="space-y-8 pb-16">
        
        <!-- Header & Breadcrumbs -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-600 mb-1">
              <a href="#home" class="hover:text-indigo-600">Home</a>
              <span>/</span>
              <span class="font-bold text-slate-700">Catalogue</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Product Catalogue</h1>
            <p class="text-xs text-slate-500 mt-0.5">Explore our inventory of verified products with real-time stock levels and faceted filters.</p>
          </div>

          <div class="flex items-center gap-3">
            <!-- View Mode Switcher -->
            <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button id="view-grid-btn" class="px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${this.viewMode === 'grid' ? 'bg-white shadow-xs text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900'}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
              <button id="view-list-btn" class="px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${this.viewMode === 'list' ? 'bg-white shadow-xs text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900'}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                List
              </button>
            </div>

            <!-- Sort By Dropdown -->
            <div class="relative min-w-44">
              <select id="sort-select" class="w-full bg-slate-100 hover:bg-slate-200/70 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-200 focus:outline-none focus:border-indigo-400 cursor-pointer transition-colors">
                <option value="rating-desc" ${this.filterOptions.sortBy === 'rating-desc' ? 'selected' : ''}>Rating: High to Low</option>
                <option value="price-asc" ${this.filterOptions.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-desc" ${this.filterOptions.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                <option value="name-asc" ${this.filterOptions.sortBy === 'name-asc' ? 'selected' : ''}>Name: A to Z</option>
                <option value="name-desc" ${this.filterOptions.sortBy === 'name-desc' ? 'selected' : ''}>Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Filter Controls & Results Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <!-- Sidebar Filters -->
          <aside class="space-y-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
              
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 class="font-extrabold text-sm text-slate-900">Filters</h3>
                <button id="reset-filters-btn" class="text-xs text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
                  Reset All
                </button>
              </div>

              <!-- Search Input Filter -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-slate-700">Search Products</label>
                <div class="relative">
                  <input 
                    id="filter-search-input" 
                    type="text" 
                    value="${this.filterOptions.searchQuery}"
                    placeholder="Search name, SKU, tags..."
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                  ${this.filterOptions.searchQuery ? `
                    <button id="clear-search-btn" class="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs">
                      &times;
                    </button>
                  ` : ''}
                </div>
              </div>

              <!-- Category Filter Buttons -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-700">Category</label>
                <div class="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
                  ${categoriesList.map(cat => {
                    const isSelected = this.filterOptions.category.toLowerCase() === cat.toLowerCase();
                    const count = cat === 'all' ? this.allProducts.length : (this.categories.find(c => c.name.toLowerCase() === cat.toLowerCase())?.count || 0);
                    return `
                      <button 
                        data-filter-category="${cat}"
                        class="w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }">
                        <span class="capitalize">${cat === 'all' ? 'All Categories' : cat}</span>
                        <span class="text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-indigo-200/60 text-indigo-800' : 'bg-slate-100 text-slate-500'}">
                          ${count}
                        </span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Price Range Slider -->
              <div class="space-y-3 pt-2 border-t border-slate-100">
                <div class="flex items-center justify-between text-xs">
                  <label class="font-bold text-slate-700">Max Price</label>
                  <span id="price-slider-display" class="font-extrabold text-indigo-600 font-mono">
                    $${this.filterOptions.maxPrice}
                  </span>
                </div>
                <input 
                  id="filter-price-range" 
                  type="range" 
                  min="20" 
                  max="1200" 
                  step="10" 
                  value="${this.filterOptions.maxPrice}"
                  class="w-full accent-indigo-600 cursor-pointer"
                />
                <div class="flex justify-between text-[10px] text-slate-600 font-mono">
                  <span>$20</span>
                  <span>$600</span>
                  <span>$1,200+</span>
                </div>
              </div>

              <!-- Stock Status Filter -->
              <div class="space-y-2 pt-2 border-t border-slate-100">
                <label class="text-xs font-bold text-slate-700">Stock Availability</label>
                <div class="space-y-1.5 text-xs">
                  ${['all', 'In Stock', 'Low Stock', 'Out of Stock'].map(st => `
                    <label class="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                      <input 
                        type="radio" 
                        name="stock-filter" 
                        value="${st}" 
                        ${this.filterOptions.stockStatus === st ? 'checked' : ''}
                        class="accent-indigo-600 text-xs"
                      />
                      <span>${st === 'all' ? 'All Stock Levels' : st}</span>
                    </label>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- Quick Academic Callout in Sidebar -->
            <div class="bg-indigo-50/70 border border-indigo-200/80 p-4 rounded-2xl text-xs space-y-2">
              <span class="font-bold text-indigo-800 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Academic Note (Weeks 4, 5, 11)
              </span>
              <p class="text-indigo-950 text-[11px] leading-relaxed">
                Filtering &amp; sorting logic is strictly decoupled in <code class="bg-indigo-100 px-1 py-0.5 rounded text-[10px] font-mono">ProductService</code> using TypeScript interfaces and high-order Array methods.
              </p>
            </div>
          </aside>

          <!-- Main Products Grid / List Area -->
          <div class="lg:col-span-3 space-y-6">
            
            <!-- Result Stats Bar -->
            <div class="flex items-center justify-between text-xs text-slate-500 pb-1">
              <p>
                Showing <span class="font-bold text-slate-900">${this.displayedProducts.length}</span> of <span class="font-bold text-slate-900">${this.allProducts.length}</span> products
                ${this.filterOptions.category !== 'all' ? ` in <span class="font-semibold text-indigo-600">${this.filterOptions.category}</span>` : ''}
                ${this.filterOptions.searchQuery ? ` matching "<span class="font-semibold text-indigo-600">${this.filterOptions.searchQuery}</span>"` : ''}
              </p>
            </div>

            <!-- Products View Container -->
            ${
              this.displayedProducts.length === 0
                ? `
                  <div class="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 shadow-xs">
                    <div class="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="space-y-1">
                      <h3 class="text-base font-bold text-slate-800">No matching products found</h3>
                      <p class="text-xs text-slate-500 max-w-sm mx-auto">Try loosening your filter criteria, broadening your price range, or clearing your search term.</p>
                    </div>
                    <button id="empty-reset-btn" class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors">
                      Clear All Filters
                    </button>
                  </div>
                `
                : this.viewMode === 'grid'
                  ? `
                    <div id="products-catalogue-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      ${this.displayedProducts.map(p => ProductCardComponent.renderCard(p)).join('')}
                    </div>
                  `
                  : `
                    <div id="products-catalogue-list" class="space-y-4">
                      ${this.displayedProducts.map(p => this.renderListItem(p)).join('')}
                    </div>
                  `
            }

          </div>

        </div>

      </div>
    `;

    this.attachEvents(el);
  }

  private renderListItem(product: ProductItem): string {
    const isOutOfStock = product.stockStatus === 'Out of Stock' || product.stockCount <= 0;
    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-center justify-between">
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 bg-slate-100"
          />
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">${product.category}</span>
              <span class="text-[10px] font-mono text-slate-600">${product.sku}</span>
              <span class="text-[10px] font-bold ${product.stockStatus === 'In Stock' ? 'text-emerald-600' : (product.stockStatus === 'Low Stock' ? 'text-amber-600' : 'text-rose-600')}">
                ● ${product.stockStatus}
              </span>
            </div>
            <a href="#product/${product.id}" class="block font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors">
              ${product.name}
            </a>
            <p class="text-xs text-slate-500 line-clamp-1">${product.description}</p>
            <div class="flex items-center gap-1 text-amber-500 text-xs">
              <span>★</span>
              <span class="font-bold text-slate-800">${product.rating.toFixed(1)}</span>
              <span class="text-slate-600 text-[10px]">(${product.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        <div class="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
          <div class="text-right">
            <span class="text-lg font-extrabold text-slate-900">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<p class="text-[10px] text-slate-600 line-through">$${product.originalPrice.toFixed(2)}</p>` : ''}
          </div>
          <div class="flex items-center gap-2">
            <a href="#product/${product.id}" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100">
              Details
            </a>
            <button 
              data-add-to-cart="${product.id}"
              ${isOutOfStock ? 'disabled' : ''}
              class="px-3.5 py-1.5 rounded-lg text-xs font-bold ${isOutOfStock ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'}">
              ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private attachEvents(el: HTMLElement): void {
    // Attach product card listeners
    const grid = el.querySelector('#products-catalogue-grid') as HTMLElement;
    if (grid) {
      ProductCardComponent.attachListeners(grid, (id) => this.allProducts.find(p => p.id === id));
    }
    const list = el.querySelector('#products-catalogue-list') as HTMLElement;
    if (list) {
      ProductCardComponent.attachListeners(list, (id) => this.allProducts.find(p => p.id === id));
    }

    // View mode switcher
    const gridBtn = el.querySelector('#view-grid-btn');
    const listBtn = el.querySelector('#view-list-btn');
    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => {
        this.viewMode = 'grid';
        this.renderView(el);
      });
      listBtn.addEventListener('click', () => {
        this.viewMode = 'list';
        this.renderView(el);
      });
    }

    // Sort select
    const sortSelect = el.querySelector('#sort-select') as HTMLSelectElement;
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        this.filterOptions.sortBy = sortSelect.value as any;
        this.applyFilters();
        this.renderView(el);
      });
    }

    // Search input
    const searchInput = el.querySelector('#filter-search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.filterOptions.searchQuery = searchInput.value;
        this.applyFilters();
        this.renderView(el);
      });
    }

    const clearSearch = el.querySelector('#clear-search-btn');
    if (clearSearch) {
      clearSearch.addEventListener('click', () => {
        this.filterOptions.searchQuery = '';
        this.applyFilters();
        this.renderView(el);
      });
    }

    // Category filter buttons
    el.querySelectorAll('[data-filter-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = (btn as HTMLElement).getAttribute('data-filter-category');
        if (cat) {
          this.filterOptions.category = cat;
          this.applyFilters();
          this.renderView(el);
        }
      });
    });

    // Price slider
    const priceSlider = el.querySelector('#filter-price-range') as HTMLInputElement;
    if (priceSlider) {
      priceSlider.addEventListener('input', () => {
        this.filterOptions.maxPrice = Number(priceSlider.value);
        const display = el.querySelector('#price-slider-display');
        if (display) {
          display.textContent = `$${priceSlider.value}`;
        }
      });
      priceSlider.addEventListener('change', () => {
        this.applyFilters();
        this.renderView(el);
      });
    }

    // Stock radio filters
    el.querySelectorAll('input[name="stock-filter"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const val = (e.target as HTMLInputElement).value;
        this.filterOptions.stockStatus = val;
        this.applyFilters();
        this.renderView(el);
      });
    });

    // Reset buttons
    const resetBtn = el.querySelector('#reset-filters-btn');
    const emptyResetBtn = el.querySelector('#empty-reset-btn');
    const resetAction = () => {
      this.filterOptions = {
        searchQuery: '',
        category: 'all',
        minPrice: 0,
        maxPrice: 1500,
        stockStatus: 'all',
        sortBy: 'rating-desc'
      };
      this.applyFilters();
      this.renderView(el);
    };

    if (resetBtn) resetBtn.addEventListener('click', resetAction);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAction);
  }
}
