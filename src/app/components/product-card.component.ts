import { Product } from '../models/product.model.ts';
import { cartService } from '../services/cart.service.ts';

export class ProductCardComponent {
  static renderCard(product: Product, compact: boolean = false): string {
    const isOutOfStock = product.stockStatus === 'Out of Stock' || product.stockCount <= 0;
    const isLowStock = product.stockStatus === 'Low Stock' || (product.stockCount > 0 && product.stockCount <= 5);

    let stockBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    let stockBadgeText = 'In Stock';

    if (isOutOfStock) {
      stockBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
      stockBadgeText = 'Out of Stock';
    } else if (isLowStock) {
      stockBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
      stockBadgeText = `Only ${product.stockCount} left`;
    }

    // Rating stars helper
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating - fullStars >= 0.5;

    return `
      <div class="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative" data-product-id="${product.id}">
        
        <!-- Image & Badges Container -->
        <div class="relative aspect-square w-full bg-slate-100 overflow-hidden">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            loading="lazy"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'"
          />
          
          <!-- Category & Stock Status Tags -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 pointer-events-none">
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-xs text-slate-700 shadow-xs border border-white/50">
              ${product.category}
            </span>
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-xs backdrop-blur-xs ${stockBadgeClass}">
              ${stockBadgeText}
            </span>
          </div>

          ${
            product.originalPrice && product.originalPrice > product.price
              ? `
                <div class="absolute bottom-3 left-3 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                  SAVE ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              `
              : ''
          }
        </div>

        <!-- Content Area -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
          <div>
            <!-- SKU & Category Subtitle -->
            <div class="flex items-center justify-between text-[11px] text-slate-600 mb-1">
              <span class="font-mono">${product.sku}</span>
              <!-- Rating Stars -->
              <div class="flex items-center gap-1 text-amber-600">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="font-bold text-slate-700">${product.rating.toFixed(1)}</span>
                <span class="text-slate-600 text-[10px]">(${product.reviewCount})</span>
              </div>
            </div>

            <!-- Product Title -->
            <a href="#product/${product.id}" class="block group-hover:text-indigo-600 transition-colors">
              <h3 class="font-bold text-slate-800 text-sm sm:text-base line-clamp-1 leading-snug">
                ${product.name}
              </h3>
            </a>

            <!-- Description -->
            <p class="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
              ${product.description}
            </p>
          </div>

          <!-- Price & Actions Footer -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-lg font-extrabold text-slate-900 tracking-tight">
                  $${product.price.toFixed(2)}
                </span>
                ${
                  product.originalPrice && product.originalPrice > product.price
                    ? `<span class="text-xs text-slate-600 line-through font-medium">$${product.originalPrice.toFixed(2)}</span>`
                    : ''
                }
              </div>
            </div>

            <!-- Quick Add to Cart -->
            <div class="flex items-center gap-1.5">
              <a 
                href="#product/${product.id}" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                title="View Full Details">
                Details
              </a>
              <button 
                type="button"
                data-add-to-cart="${product.id}"
                ${isOutOfStock ? 'disabled' : ''}
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isOutOfStock
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-xs hover:shadow'
                }">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>${isOutOfStock ? 'Sold Out' : 'Add'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  static attachListeners(container: HTMLElement, getProductById: (id: number) => Product | undefined): void {
    container.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idStr = (btn as HTMLElement).getAttribute('data-add-to-cart');
        if (idStr) {
          const product = getProductById(Number(idStr));
          if (product) {
            cartService.addToCart(product, 1);
          }
        }
      });
    });
  }
}
