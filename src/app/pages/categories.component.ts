import { productService } from '../services/product.service.ts';
import { ProductCategory, ProductItem } from '../models/product.model.ts';
import { router } from '../app.routes.ts';

export class CategoriesComponent {
  private categories: Array<{ name: ProductCategory; count: number; image: string }> = [];
  private allProducts: ProductItem[] = [];

  async render(targetElement?: HTMLElement): Promise<void> {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    this.categories = await productService.getCategories();
    this.allProducts = await productService.getAllProducts();

    el.innerHTML = `
      <div class="space-y-8 pb-16">
        
        <!-- Header -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div class="flex items-center gap-2 text-xs text-slate-600 mb-1">
            <a href="#home" class="hover:text-indigo-600">Home</a>
            <span>/</span>
            <span class="font-bold text-slate-700">Categories</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Product Categories</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Browse our full catalog organized across 7 core departments. Each category features real-time inventory counts and certified products.
          </p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.categories.map(cat => {
            const sampleProducts = this.allProducts.filter(p => p.category === cat.name).slice(0, 3);
            return `
              <div class="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between group">
                <div>
                  <!-- Category Header -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                      ${this.getCategoryIcon(cat.name)}
                    </div>
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      ${cat.count} Products
                    </span>
                  </div>

                  <h3 class="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    ${cat.name}
                  </h3>

                  <!-- Mini preview items -->
                  <div class="space-y-2 mt-4 pt-4 border-t border-slate-100">
                    <p class="text-[11px] font-bold uppercase tracking-wider text-slate-600">Popular In This Category</p>
                    <div class="space-y-1.5">
                      ${sampleProducts.map(sp => `
                        <a href="#product/${sp.id}" class="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 group/item">
                          <span class="text-slate-700 group-hover/item:text-indigo-600 truncate max-w-[200px]">${sp.name}</span>
                          <span class="font-bold text-slate-900 font-mono text-[11px]">$${sp.price.toFixed(2)}</span>
                        </a>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <!-- CTA Button -->
                <div class="pt-6 mt-4 border-t border-slate-100">
                  <button 
                    data-explore-category="${cat.name}"
                    class="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white">
                    <span>Explore All ${cat.name}</span>
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;

    this.attachEvents(el);
  }

  private getCategoryIcon(cat: ProductCategory): string {
    switch (cat) {
      case 'Electronics':
        return '⚡';
      case 'Clothing':
        return '👕';
      case 'Books':
        return '📚';
      case 'Home & Kitchen':
        return '🍳';
      case 'Sports':
        return '⚽';
      case 'Beauty':
        return '✨';
      case 'Accessories':
        return '⌚';
      default:
        return '🏷️';
    }
  }

  private attachEvents(el: HTMLElement): void {
    el.querySelectorAll('[data-explore-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = (btn as HTMLElement).getAttribute('data-explore-category');
        if (cat) {
          router.navigate('products', { category: cat });
        }
      });
    });
  }
}
