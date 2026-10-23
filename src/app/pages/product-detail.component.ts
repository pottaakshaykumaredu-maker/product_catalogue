import { productService } from '../services/product.service.ts';
import { cartService } from '../services/cart.service.ts';
import { router } from '../app.routes.ts';
import { ProductItem } from '../models/product.model.ts';
import { ProductCardComponent } from '../components/product-card.component.ts';

export class ProductDetailComponent {
  private product: ProductItem | null = null;
  private relatedProducts: ProductItem[] = [];
  private selectedQuantity: number = 1;
  private activeTab: 'overview' | 'xml' | 'academic' = 'overview';

  async render(productIdStr: string, targetElement?: HTMLElement): Promise<void> {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    const id = Number(productIdStr);
    const prod = await productService.getProductById(id);

    if (!prod) {
      el.innerHTML = `
        <div class="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12 space-y-4">
          <div class="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-slate-800">Product Not Found</h2>
          <p class="text-xs text-slate-500">The requested product ID (${productIdStr}) does not exist in the catalogue repository.</p>
          <a href="#products" class="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700">
            Return to Catalogue
          </a>
        </div>
      `;
      return;
    }

    this.product = prod;
    this.selectedQuantity = 1;

    // Fetch related products
    const all = await productService.getAllProducts();
    this.relatedProducts = all.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 3);

    this.renderContent(el);
  }

  private renderContent(el: HTMLElement): void {
    if (!this.product) return;
    const p = this.product;
    const isOutOfStock = p.stockStatus === 'Out of Stock' || p.stockCount <= 0;

    el.innerHTML = `
      <div class="space-y-12 pb-16">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-slate-600">
          <a href="#home" class="hover:text-indigo-600">Home</a>
          <span>/</span>
          <a href="#products" class="hover:text-indigo-600">Catalogue</a>
          <span>/</span>
          <a href="#products?category=${p.category}" class="hover:text-indigo-600">${p.category}</a>
          <span>/</span>
          <span class="font-bold text-slate-700 truncate max-w-xs">${p.name}</span>
        </nav>

        <!-- Main Product Presentation Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
          
          <!-- Product Visual Stage -->
          <div class="space-y-4">
            <div class="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner group">
              <img 
                src="${p.image}" 
                alt="${p.name}" 
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'"
              />
              <div class="absolute top-4 left-4 flex gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-md border border-white">
                  ${p.category}
                </span>
                ${p.discountPercentage > 0 ? `
                  <span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md">
                    -${p.discountPercentage}% OFF
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Trust Highlights Badges -->
            <div class="grid grid-cols-3 gap-3 text-center text-xs text-slate-600 pt-2">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <svg class="w-5 h-5 mx-auto text-indigo-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p class="font-bold text-slate-800">100% Authentic</p>
                <p class="text-[10px] text-slate-600">Verified SKU</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <svg class="w-5 h-5 mx-auto text-emerald-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="font-bold text-slate-800">Fast Shipping</p>
                <p class="text-[10px] text-slate-600">Dispatches in 24h</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <svg class="w-5 h-5 mx-auto text-amber-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p class="font-bold text-slate-800">Easy Returns</p>
                <p class="text-[10px] text-slate-600">30-day guarantee</p>
              </div>
            </div>
          </div>

          <!-- Product Details Column -->
          <div class="flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              
              <!-- SKU & Rating Header -->
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  SKU: ${p.sku}
                </span>

                <div class="flex items-center gap-1.5 text-xs">
                  <div class="flex text-amber-500">
                    ${'★'.repeat(Math.floor(p.rating))}
                  </div>
                  <span class="font-bold text-slate-800">${p.rating.toFixed(1)}</span>
                  <span class="text-slate-600">(${p.reviewCount} customer reviews)</span>
                </div>
              </div>

              <!-- Title -->
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                ${p.name}
              </h1>

              <!-- Price Box -->
              <div class="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span class="text-3xl font-extrabold text-slate-900 tracking-tight">
                  $${p.price.toFixed(2)}
                </span>
                ${
                  p.originalPrice && p.originalPrice > p.price
                    ? `
                      <span class="text-base text-slate-600 line-through font-medium">
                        $${p.originalPrice.toFixed(2)}
                      </span>
                      <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        You save $${(p.originalPrice - p.price).toFixed(2)}
                      </span>
                    `
                    : ''
                }
              </div>

              <!-- Stock Status Bar -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-700">Inventory Status:</span>
                  <span class="font-bold ${
                    p.stockStatus === 'In Stock'
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full'
                      : p.stockStatus === 'Low Stock'
                      ? 'text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full'
                      : 'text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full'
                  }">
                    ${p.stockStatus} (${p.stockCount} units)
                  </span>
                </div>
                <!-- Visual Stock Progress Bar -->
                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div class="h-full rounded-full transition-all ${
                    p.stockCount > 15 ? 'bg-emerald-500' : p.stockCount > 0 ? 'bg-amber-500' : 'bg-rose-500'
                  }" style="width: ${Math.min(100, (p.stockCount / 50) * 100)}%"></div>
                </div>
              </div>

              <!-- Short Description -->
              <p class="text-slate-600 text-sm leading-relaxed">
                ${p.description}
              </p>

            </div>

            <!-- Quantity & Purchase Actions Form -->
            <div class="pt-6 border-t border-slate-100 space-y-4">
              
              <div class="flex items-center gap-4">
                <span class="text-xs font-bold text-slate-700">Quantity:</span>
                <div class="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button 
                    id="qty-decrement-btn" 
                    ${this.selectedQuantity <= 1 || isOutOfStock ? 'disabled' : ''}
                    class="px-3.5 py-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold">
                    &minus;
                  </button>
                  <span id="qty-display" class="px-4 py-2 text-xs font-extrabold text-slate-800 font-mono">
                    ${this.selectedQuantity}
                  </span>
                  <button 
                    id="qty-increment-btn" 
                    ${this.selectedQuantity >= p.stockCount || isOutOfStock ? 'disabled' : ''}
                    class="px-3.5 py-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold">
                    &#43;
                  </button>
                </div>
                <span class="text-xs text-slate-600">
                  ${p.stockCount > 0 ? `Max: ${p.stockCount}` : 'Unavailable'}
                </span>
              </div>

              <!-- Main Action Buttons -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button 
                  id="detail-add-cart-btn"
                  ${isOutOfStock ? 'disabled' : ''}
                  class="w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 active:scale-98'
                  }">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>

                <button 
                  id="detail-buy-now-btn"
                  ${isOutOfStock ? 'disabled' : ''}
                  class="w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-98'
                  }">
                  <span>Buy Now</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>

          </div>

        </div>

        <!-- Technical Tabs: Overview, XML, Academic Viva -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div class="flex border-b border-slate-200 bg-slate-50/70 text-xs font-bold">
            <button id="tab-btn-overview" class="px-6 py-4 border-b-2 transition-all ${this.activeTab === 'overview' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'}">
              Full Overview
            </button>
            <button id="tab-btn-xml" class="px-6 py-4 border-b-2 transition-all flex items-center gap-1.5 ${this.activeTab === 'xml' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'}">
              <span>XML Representation (Week 6)</span>
              <span class="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-mono">DTD Valid</span>
            </button>
            <button id="tab-btn-academic" class="px-6 py-4 border-b-2 transition-all ${this.activeTab === 'academic' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'}">
              Viva Voce Architecture Notes
            </button>
          </div>

          <div class="p-6 sm:p-8 text-sm">
            ${
              this.activeTab === 'overview'
                ? `
                  <div class="space-y-4 max-w-3xl">
                    <h3 class="text-base font-extrabold text-slate-900">Product Specifications</h3>
                    <p class="text-slate-600 leading-relaxed">${p.description}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                        <span class="text-slate-500 font-medium">Department</span>
                        <span class="font-bold text-slate-800">${p.category}</span>
                      </div>
                      <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                        <span class="text-slate-500 font-medium">Internal SKU</span>
                        <span class="font-mono font-bold text-slate-800">${p.sku}</span>
                      </div>
                      <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                        <span class="text-slate-500 font-medium">Units In Warehouse</span>
                        <span class="font-bold text-slate-800">${p.stockCount}</span>
                      </div>
                      <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                        <span class="text-slate-500 font-medium">Customer Rating</span>
                        <span class="font-bold text-amber-600">★ ${p.rating} / 5.0 (${p.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                `
                : this.activeTab === 'xml'
                ? `
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <h3 class="text-base font-extrabold text-slate-900">XML Schema Node Representation</h3>
                      <span class="text-xs text-slate-500 font-mono">public/data/products.xml</span>
                    </div>
                    <pre class="bg-slate-900 text-emerald-400 p-5 rounded-2xl overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
&lt;product id="prod_${p.id}" category="${p.category}" featured="${p.featured ? 'true' : 'false'}"&gt;
  &lt;id&gt;${p.id}&lt;/id&gt;
  &lt;name&gt;${p.name}&lt;/name&gt;
  &lt;category&gt;${p.category}&lt;/category&gt;
  &lt;description&gt;${p.description}&lt;/description&gt;
  &lt;price currency="USD"&gt;${p.price.toFixed(2)}&lt;/price&gt;
  ${p.originalPrice ? `&lt;originalPrice&gt;${p.originalPrice.toFixed(2)}&lt;/originalPrice&gt;` : ''}
  &lt;rating&gt;${p.rating.toFixed(1)}&lt;/rating&gt;
  &lt;stockStatus&gt;${p.stockStatus}&lt;/stockStatus&gt;
  &lt;stockCount&gt;${p.stockCount}&lt;/stockCount&gt;
  &lt;image&gt;${p.image}&lt;/image&gt;
  &lt;sku&gt;${p.sku}&lt;/sku&gt;
&lt;/product&gt;
                    </pre>
                    <p class="text-xs text-slate-500">
                      This node is validated against <code class="text-indigo-600 font-bold font-mono">public/data/products.dtd</code> conforming to Week 6 XML/DTD syllabus requirements.
                    </p>
                  </div>
                `
                : `
                  <div class="space-y-4 max-w-3xl text-xs text-slate-600 leading-relaxed">
                    <h3 class="text-base font-extrabold text-slate-900">Academic Implementation Mapping</h3>
                    <div class="space-y-3">
                      <div class="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100">
                        <span class="font-bold text-indigo-900">Week 11 (TypeScript Model):</span>
                        <p class="mt-1">
                          The product object is an instance of <code class="font-mono text-indigo-700 bg-indigo-100 px-1 py-0.5 rounded">ProductItem implements Product</code>. Methods like <code class="font-mono text-indigo-700">isAvailable()</code> and getter <code class="font-mono text-indigo-700">discountPercentage</code> calculate dynamic metrics automatically.
                        </p>
                      </div>
                      <div class="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                        <span class="font-bold text-emerald-900">Weeks 12-14 (Angular Reactive Data Flow):</span>
                        <p class="mt-1">
                          When the quantity or "Add to Cart" button is clicked, an event triggers <code class="font-mono text-emerald-700 bg-emerald-100 px-1 py-0.5 rounded">CartService.addToCart(product, qty)</code>, propagating state to all subscribed UI components (header badge, cart page, and notification toasts).
                        </p>
                      </div>
                    </div>
                  </div>
                `
            }
          </div>
        </div>

        <!-- Related Products Section -->
        ${
          this.relatedProducts.length > 0
            ? `
              <div class="space-y-6 pt-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-extrabold text-slate-900 tracking-tight">More in ${p.category}</h3>
                  <a href="#products?category=${p.category}" class="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                    See All ${p.category} &rarr;
                  </a>
                </div>
                <div id="related-products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  ${this.relatedProducts.map(rp => ProductCardComponent.renderCard(rp)).join('')}
                </div>
              </div>
            `
            : ''
        }

      </div>
    `;

    this.attachEvents(el);
  }

  private attachEvents(el: HTMLElement): void {
    if (!this.product) return;
    const p = this.product;

    // Quantity buttons
    const decBtn = el.querySelector('#qty-decrement-btn');
    const incBtn = el.querySelector('#qty-increment-btn');
    const display = el.querySelector('#qty-display');

    if (decBtn && incBtn && display) {
      decBtn.addEventListener('click', () => {
        if (this.selectedQuantity > 1) {
          this.selectedQuantity--;
          this.renderContent(el);
        }
      });
      incBtn.addEventListener('click', () => {
        if (this.selectedQuantity < p.stockCount) {
          this.selectedQuantity++;
          this.renderContent(el);
        }
      });
    }

    // Add to cart
    const addCartBtn = el.querySelector('#detail-add-cart-btn');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        cartService.addToCart(p, this.selectedQuantity);
      });
    }

    // Buy now
    const buyNowBtn = el.querySelector('#detail-buy-now-btn');
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        cartService.addToCart(p, this.selectedQuantity);
        router.navigate('cart');
      });
    }

    // Tabs
    const tabOverview = el.querySelector('#tab-btn-overview');
    const tabXml = el.querySelector('#tab-btn-xml');
    const tabAcademic = el.querySelector('#tab-btn-academic');

    if (tabOverview) {
      tabOverview.addEventListener('click', () => {
        this.activeTab = 'overview';
        this.renderContent(el);
      });
    }
    if (tabXml) {
      tabXml.addEventListener('click', () => {
        this.activeTab = 'xml';
        this.renderContent(el);
      });
    }
    if (tabAcademic) {
      tabAcademic.addEventListener('click', () => {
        this.activeTab = 'academic';
        this.renderContent(el);
      });
    }

    // Related products grid listeners
    const relatedGrid = el.querySelector('#related-products-grid') as HTMLElement;
    if (relatedGrid) {
      ProductCardComponent.attachListeners(relatedGrid, (id) => this.relatedProducts.find(prod => prod.id === id));
    }
  }
}
