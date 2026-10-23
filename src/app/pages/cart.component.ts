import { cartService } from '../services/cart.service.ts';
import { CartItem, CartSummary } from '../models/cart-item.model.ts';
import { notificationService } from '../services/notification.service.ts';
import { authService } from '../services/auth.service.ts';
import { router } from '../app.routes.ts';

export class CartComponent {
  private items: CartItem[] = [];
  private summary: CartSummary = { subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0, itemCount: 0 };
  private promoInput: string = '';
  private isCheckingOut: boolean = false;
  private orderCompleted: boolean = false;

  async render(targetElement?: HTMLElement): Promise<void> {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    this.items = cartService.getItems();
    this.summary = cartService.getCartSummary();
    this.orderCompleted = false;

    this.renderView(el);
  }

  private renderView(el: HTMLElement): void {
    if (this.orderCompleted) {
      el.innerHTML = `
        <div class="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xl space-y-5 my-12 animate-fade-in">
          <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="space-y-2">
            <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Order Placed Successfully!</h2>
            <p class="text-xs text-slate-500 leading-relaxed">
              Thank you for testing the Product Catalogue shopping cart demonstration. A simulated receipt has been dispatched.
            </p>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-700">
              Transaction ID: WT-TXN-${Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
          <div class="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#products" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors">
              Continue Shopping
            </a>
            <a href="#academic" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
              Explore Academic Labs
            </a>
          </div>
        </div>
      `;
      return;
    }

    if (this.items.length === 0) {
      el.innerHTML = `
        <div class="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto my-12 space-y-6 shadow-xs">
          <div class="w-20 h-20 rounded-full bg-indigo-50 text-indigo-400 flex items-center justify-center mx-auto">
            <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="space-y-1.5">
            <h2 class="text-2xl font-extrabold text-slate-900">Your Cart is Empty</h2>
            <p class="text-xs text-slate-500 max-w-xs mx-auto">
              Looks like you haven't added any products yet. Browse through our catalogue and add items to your basket.
            </p>
          </div>
          <a href="#products" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Explore Product Catalogue
          </a>
        </div>
      `;
      return;
    }

    el.innerHTML = `
      <div class="space-y-8 pb-16">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-600 mb-1">
              <a href="#home" class="hover:text-indigo-600">Home</a>
              <span>/</span>
              <span class="font-bold text-slate-700">Shopping Cart</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
          </div>
          <button id="clear-entire-cart-btn" class="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Items List Column -->
          <div class="lg:col-span-2 space-y-4">
            ${this.items.map(item => {
              const p = item.product;
              const itemTotal = (p.price * item.quantity).toFixed(2);
              return `
                <div class="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="flex items-center gap-4 w-full sm:w-auto">
                    <img 
                      src="${p.image}" 
                      alt="${p.name}" 
                      class="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                    />
                    <div class="space-y-1">
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                        ${p.category}
                      </span>
                      <a href="#product/${p.id}" class="block font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors line-clamp-1">
                        ${p.name}
                      </a>
                      <p class="text-xs text-slate-500 font-mono">
                        $${p.price.toFixed(2)} each &bull; SKU: ${p.sku}
                      </p>
                    </div>
                  </div>

                  <!-- Quantity & Total -->
                  <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <!-- Qty Modifier -->
                    <div class="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                      <button 
                        data-cart-dec="${p.id}"
                        class="px-3 py-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 font-bold text-xs">
                        &minus;
                      </button>
                      <span class="px-3 py-1.5 text-xs font-bold text-slate-800 font-mono">
                        ${item.quantity}
                      </span>
                      <button 
                        data-cart-inc="${p.id}"
                        ${item.quantity >= p.stockCount ? 'disabled' : ''}
                        class="px-3 py-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs">
                        &#43;
                      </button>
                    </div>

                    <!-- Line Total -->
                    <div class="text-right min-w-20">
                      <span class="text-base font-extrabold text-slate-900 font-mono">
                        $${itemTotal}
                      </span>
                    </div>

                    <!-- Delete Button -->
                    <button 
                      data-cart-remove="${p.id}"
                      class="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove item">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}

            <!-- Free Shipping Notification Callout -->
            <div class="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 flex items-center gap-3">
              <svg class="w-5 h-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>
                ${
                  this.summary.subtotal >= 100
                    ? `<strong>Congratulations!</strong> You qualify for <strong>FREE Academic Standard Delivery</strong>.`
                    : `Add <strong>$${(100 - this.summary.subtotal).toFixed(2)}</strong> more to your order to unlock <strong>FREE Shipping</strong>!`
                }
              </span>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="space-y-6">
            <div class="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
              <h2 class="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              <!-- Promo Code Input -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-700">Promo Code</label>
                <div class="flex gap-2">
                  <input 
                    id="promo-code-input"
                    type="text" 
                    placeholder="e.g. COLLEGE10 or VIVA20"
                    value="${this.summary.appliedPromo || ''}"
                    ${this.summary.appliedPromo ? 'disabled' : ''}
                    class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-indigo-500 disabled:bg-slate-100"
                  />
                  ${
                    this.summary.appliedPromo
                      ? `
                        <button id="remove-promo-btn" class="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors">
                          Remove
                        </button>
                      `
                      : `
                        <button id="apply-promo-btn" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors">
                          Apply
                        </button>
                      `
                  }
                </div>
                <p class="text-[10px] text-slate-600">
                  Tip for examiners: Use <code class="text-indigo-600 font-bold">COLLEGE10</code> (10%) or <code class="text-indigo-600 font-bold">VIVA20</code> (20%).
                </p>
              </div>

              <!-- Cost Breakdown -->
              <div class="space-y-2.5 text-xs border-t border-slate-100 pt-4">
                <div class="flex justify-between text-slate-600">
                  <span>Subtotal (${this.summary.itemCount} items)</span>
                  <span class="font-mono font-bold text-slate-800">$${this.summary.subtotal.toFixed(2)}</span>
                </div>

                ${
                  this.summary.discount > 0
                    ? `
                      <div class="flex justify-between text-emerald-600 font-bold">
                        <span>Discount (${this.summary.appliedPromo})</span>
                        <span class="font-mono">-$${this.summary.discount.toFixed(2)}</span>
                      </div>
                    `
                    : ''
                }

                <div class="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span class="font-mono font-bold ${this.summary.shipping === 0 ? 'text-emerald-600' : 'text-slate-800'}">
                    ${this.summary.shipping === 0 ? 'FREE' : `$${this.summary.shipping.toFixed(2)}`}
                  </span>
                </div>

                <div class="flex justify-between text-slate-600">
                  <span>Estimated Tax (8%)</span>
                  <span class="font-mono font-bold text-slate-800">$${this.summary.tax.toFixed(2)}</span>
                </div>

                <div class="border-t border-slate-200 pt-3 flex justify-between items-baseline text-sm">
                  <span class="font-extrabold text-slate-900">Total</span>
                  <span class="text-xl font-extrabold text-indigo-600 font-mono">
                    $${this.summary.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <!-- Checkout Button -->
              <button 
                id="checkout-btn"
                class="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
                <span>Proceed to Simulated Checkout</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <div class="text-[11px] text-center text-slate-600">
                <span>🔒 Safe &amp; Secure Academic Sandbox</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    this.attachEvents(el);
  }

  private attachEvents(el: HTMLElement): void {
    // Quantity increment
    el.querySelectorAll('[data-cart-inc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number((btn as HTMLElement).getAttribute('data-cart-inc'));
        const item = this.items.find(i => i.product.id === id);
        if (item) {
          cartService.updateQuantity(id, item.quantity + 1);
          this.items = cartService.getItems();
          this.summary = cartService.getCartSummary();
          this.renderView(el);
        }
      });
    });

    // Quantity decrement
    el.querySelectorAll('[data-cart-dec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number((btn as HTMLElement).getAttribute('data-cart-dec'));
        const item = this.items.find(i => i.product.id === id);
        if (item) {
          cartService.updateQuantity(id, item.quantity - 1);
          this.items = cartService.getItems();
          this.summary = cartService.getCartSummary();
          this.renderView(el);
        }
      });
    });

    // Remove item
    el.querySelectorAll('[data-cart-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number((btn as HTMLElement).getAttribute('data-cart-remove'));
        cartService.removeFromCart(id);
        this.items = cartService.getItems();
        this.summary = cartService.getCartSummary();
        this.renderView(el);
      });
    });

    // Clear entire cart
    const clearBtn = el.querySelector('#clear-entire-cart-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your entire cart?')) {
          cartService.clearCart();
          this.items = [];
          this.summary = cartService.getCartSummary();
          this.renderView(el);
        }
      });
    }

    // Apply promo
    const applyPromoBtn = el.querySelector('#apply-promo-btn');
    const promoInput = el.querySelector('#promo-code-input') as HTMLInputElement;
    if (applyPromoBtn && promoInput) {
      applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim();
        if (!code) {
          notificationService.warning('Promo Code Empty', 'Please enter a valid promotional code.');
          return;
        }
        const result = cartService.applyPromoCode(code);
        if (result.success) {
          notificationService.success('Discount Applied', result.message);
        } else {
          notificationService.error('Invalid Code', result.message);
        }
        this.summary = cartService.getCartSummary();
        this.renderView(el);
      });
    }

    // Remove promo
    const removePromoBtn = el.querySelector('#remove-promo-btn');
    if (removePromoBtn) {
      removePromoBtn.addEventListener('click', () => {
        cartService.removePromoCode();
        notificationService.info('Promo Removed', 'Promotional discount has been removed.');
        this.summary = cartService.getCartSummary();
        this.renderView(el);
      });
    }

    // Checkout
    const checkoutBtn = el.querySelector('#checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        cartService.clearCart();
        this.orderCompleted = true;
        this.renderView(el);
      });
    }
  }
}
