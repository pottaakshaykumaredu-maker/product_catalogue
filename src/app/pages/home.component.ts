import { productService } from '../services/product.service.ts';
import { ProductCardComponent } from '../components/product-card.component.ts';
import { ProductItem } from '../models/product.model.ts';
import { router } from '../app.routes.ts';

export class HomeComponent {
  private featuredProducts: ProductItem[] = [];
  private categories: Array<{ name: string; count: number; image: string }> = [];

  async render(targetElement?: HTMLElement): Promise<void> {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    this.featuredProducts = await productService.getFeaturedProducts(6);
    this.categories = await productService.getCategories();

    el.innerHTML = `
      <div class="space-y-16 pb-12">
        
        <!-- Hero Section -->
        <section class="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 border border-slate-800">
          <div class="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 max-w-3xl space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              College Web Technologies Lab Project • Academic 14 Weeks
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Enterprise Product Catalogue <br />
              <span class="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Engineered with Angular &amp; TS
              </span>
            </h1>

            <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              A comprehensive single-page catalogue application covering 18+ items across 7 departments. Features dynamic search, faceted price &amp; category filtering, stock tracking, cart management, and interactive demonstrations for all 14 curriculum practicals.
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-4">
              <a href="#products" class="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-102 active:scale-98 transition-all flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Explore Catalogue
              </a>
              <a href="#academic" class="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-indigo-300 border border-slate-700 font-bold text-sm hover:scale-102 active:scale-98 transition-all flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Academic Labs Hub (14 Weeks)
              </a>
              <a href="#quiz" class="px-4 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-sm transition-all flex items-center gap-1.5">
                <span>Week 7 MCQ Test</span>
                <span class="text-xs bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-extrabold">10 Qs</span>
              </a>
            </div>
          </div>

          <!-- Feature Metric Badges -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800 text-xs">
            <div>
              <p class="text-indigo-400 font-extrabold text-xl">18+</p>
              <p class="text-slate-400 font-medium">Verified Products</p>
            </div>
            <div>
              <p class="text-violet-400 font-extrabold text-xl">7</p>
              <p class="text-slate-400 font-medium">Core Categories</p>
            </div>
            <div>
              <p class="text-emerald-400 font-extrabold text-xl">14</p>
              <p class="text-slate-400 font-medium">Curriculum Weeks</p>
            </div>
            <div>
              <p class="text-pink-400 font-extrabold text-xl">CO1–CO5</p>
              <p class="text-slate-400 font-medium">Course Outcomes</p>
            </div>
          </div>
        </section>

        <!-- Categories Section -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curated Collections</span>
              <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Browse by Category</h2>
            </div>
            <a href="#categories" class="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View All 7 Categories &rarr;
            </a>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
            ${this.categories.map(cat => `
              <button 
                data-category-select="${cat.name}"
                class="group text-left p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 relative overflow-hidden">
                <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-xs text-slate-800 group-hover:text-indigo-600 line-clamp-1">${cat.name}</h3>
                  <p class="text-[11px] text-slate-600 font-medium">${cat.count} items</p>
                </div>
              </button>
            `).join('')}
          </div>
        </section>

        <!-- Featured Products Section -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Top Rated Picks</span>
              <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Featured Products</h2>
            </div>
            <a href="#products" class="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              All Products &rarr;
            </a>
          </div>

          <div id="home-featured-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${this.featuredProducts.map(p => ProductCardComponent.renderCard(p)).join('')}
          </div>
        </section>

        <!-- Academic Technology Architecture Banner -->
        <section class="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div class="space-y-4">
              <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest">Web Technologies Viva Readiness</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Full Coverage of 14 Academic Weeks</h2>
              <p class="text-slate-300 text-sm leading-relaxed">
                Explore real interactive demonstrations of HTML5 validation, CSS3 Flexbox/Grid, JavaScript DOM events, XML &amp; DTD schemas, AJAX/Fetch pipelines, TypeScript classes, and Angular component architecture with reactive state.
              </p>
              <div class="flex flex-wrap gap-2 pt-2">
                <a href="#academic" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-md transition-all">
                  Open Interactive Lab Console
                </a>
                <a href="#quiz" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-200 border border-slate-700 transition-all">
                  Take Skill Evaluation Test
                </a>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span class="text-amber-400 font-bold">Weeks 1–3</span>
                <p class="font-bold text-white mt-1">HTML5 &amp; CSS3</p>
                <p class="text-slate-400 text-[11px] mt-0.5">Semantic forms, Flexbox, Grid</p>
              </div>
              <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span class="text-emerald-400 font-bold">Weeks 4–5</span>
                <p class="font-bold text-white mt-1">JavaScript DOM</p>
                <p class="text-slate-400 text-[11px] mt-0.5">Event bubbling, form validation</p>
              </div>
              <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span class="text-cyan-400 font-bold">Weeks 6–10</span>
                <p class="font-bold text-white mt-1">XML, DTD &amp; AJAX</p>
                <p class="text-slate-400 text-[11px] mt-0.5">DOMParser, Promises, POST</p>
              </div>
              <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span class="text-purple-400 font-bold">Weeks 11–14</span>
                <p class="font-bold text-white mt-1">TypeScript &amp; Angular</p>
                <p class="text-slate-400 text-[11px] mt-0.5">DI, Directives, Reactive Forms</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    `;

    // Attach listeners
    this.attachEvents(el);
  }

  private attachEvents(el: HTMLElement): void {
    // Add to cart buttons
    const grid = el.querySelector('#home-featured-grid') as HTMLElement;
    if (grid) {
      ProductCardComponent.attachListeners(grid, (id) => this.featuredProducts.find(p => p.id === id));
    }

    // Category click handler
    el.querySelectorAll('[data-category-select]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = (btn as HTMLElement).getAttribute('data-category-select');
        if (cat) {
          router.navigate('products', { category: cat });
        }
      });
    });
  }
}
