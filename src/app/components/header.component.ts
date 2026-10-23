import { router } from '../app.routes.ts';
import { cartService } from '../services/cart.service.ts';
import { authService } from '../services/auth.service.ts';
import { CartSummary } from '../models/cart-item.model.ts';
import { User } from '../models/user.model.ts';

export class HeaderComponent {
  private cartSummary: CartSummary = { subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0, itemCount: 0 };
  private currentUser: User | null = null;
  private currentPath: string = 'home';
  private mobileMenuOpen: boolean = false;

  constructor() {
    cartService.subscribe((_, summary) => {
      this.cartSummary = summary;
      this.render();
    });

    authService.subscribe(user => {
      this.currentUser = user;
      this.render();
    });

    router.subscribe(path => {
      this.currentPath = path;
      this.mobileMenuOpen = false;
      this.render();
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.render();
  }

  render(targetElement?: HTMLElement): void {
    const el = targetElement || document.getElementById('app-header');
    if (!el) return;

    const navItems = [
      { path: 'home', label: 'Home' },
      { path: 'products', label: 'Catalogue' },
      { path: 'categories', label: 'Categories' },
      { path: 'academic', label: 'Academic Labs (14 Weeks)', highlight: true },
      { path: 'quiz', label: 'Skill Test', badge: 'Week 7' },
    ];

    el.innerHTML = `
      <!-- Academic Lab Banner Header -->
      <div class="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-indigo-100 text-xs py-1.5 px-4">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              ACADEMIC PROJECT
            </span>
            <span class="font-medium">Web Technologies Laboratory — Course Outcomes CO1 to CO5</span>
          </div>
          <div class="flex items-center gap-4 text-indigo-200">
            <span class="hidden md:inline">Coverage: Weeks 1–14 (HTML5 • CSS3 • JS • XML/DTD • AJAX • TS • Angular)</span>
            <a href="#academic" class="underline hover:text-white transition-colors font-semibold">View Lab Mapping &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <nav class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 gap-4">
            
            <!-- Brand Logo -->
            <div class="flex items-center gap-3">
              <a href="#home" class="flex items-center gap-2.5 group">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <span class="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent">
                    OmniCatalogue
                  </span>
                  <span class="block text-[10px] uppercase font-bold tracking-widest text-slate-600 -mt-1">
                    Angular Suite
                  </span>
                </div>
              </a>
            </div>

            <!-- Desktop Navigation Links -->
            <div class="hidden lg:flex items-center gap-1">
              ${navItems.map(item => {
                const isActive = this.currentPath === item.path;
                return `
                  <a href="#${item.path}" 
                     class="px-3 py-2 rounded-lg text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                       isActive
                         ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                         : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                     } ${item.highlight ? 'border border-indigo-200/80 bg-indigo-50/40 text-indigo-700' : ''}">
                    ${item.label}
                    ${item.badge ? `<span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">${item.badge}</span>` : ''}
                  </a>
                `;
              }).join('')}
            </div>

            <!-- Search Quick Bar -->
            <div class="hidden md:flex flex-1 max-w-xs relative">
              <input 
                id="header-search-input"
                type="text" 
                placeholder="Search products, SKU..." 
                class="w-full bg-slate-100 text-sm text-slate-800 rounded-full pl-9 pr-4 py-2 border border-transparent focus:border-indigo-400 focus:bg-white focus:outline-none transition-all"
              />
              <svg class="w-4 h-4 text-slate-600 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Right Actions: Cart & Auth -->
            <div class="flex items-center gap-3">
              <!-- Cart Button -->
              <a href="#cart" class="relative p-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center" title="View Cart">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                ${
                  this.cartSummary.itemCount > 0
                    ? `<span class="absolute -top-1 -right-1 bg-indigo-600 text-white font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                        ${this.cartSummary.itemCount}
                       </span>`
                    : ''
                }
              </a>

              <!-- User Auth Actions -->
              ${
                this.currentUser
                  ? `
                    <div class="relative group">
                      <button id="user-menu-btn" class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
                        <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                          ${this.currentUser.fullName.charAt(0)}
                        </div>
                        <div class="hidden sm:block text-left text-xs">
                          <p class="font-bold text-slate-800 leading-tight">${this.currentUser.fullName}</p>
                          <p class="text-slate-600 capitalize text-[10px]">${this.currentUser.role}</p>
                        </div>
                      </button>
                      <div class="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 hidden group-hover:block transition-all z-50">
                        <div class="px-4 py-2 border-b border-slate-100">
                          <p class="text-xs text-slate-600">Signed in as</p>
                          <p class="text-xs font-bold text-slate-800 truncate">${this.currentUser.email}</p>
                          <span class="text-[10px] text-indigo-600 font-semibold">${this.currentUser.collegeId || 'CS Scholar'}</span>
                        </div>
                        <button id="header-logout-btn" class="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  `
                  : `
                    <div class="flex items-center gap-1.5">
                      <a href="#login" class="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors">
                        Sign In
                      </a>
                      <a href="#register" class="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow transition-all">
                        Register
                      </a>
                    </div>
                  `
              }

              <!-- Mobile Hamburger Button -->
              <button id="mobile-menu-toggle" class="lg:hidden p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg" aria-label="Toggle menu">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${this.mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}" />
                </svg>
              </button>

            </div>

          </div>
        </div>

        <!-- Mobile Dropdown Menu -->
        ${
          this.mobileMenuOpen
            ? `
              <div class="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-lg">
                <div class="mb-3">
                  <input 
                    id="mobile-search-input"
                    type="text" 
                    placeholder="Search catalogue..." 
                    class="w-full bg-slate-100 text-sm rounded-lg px-3 py-2 border border-slate-200"
                  />
                </div>
                ${navItems.map(item => `
                  <a href="#${item.path}" class="block px-3 py-2 rounded-lg text-sm font-semibold ${
                    this.currentPath === item.path ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }">
                    ${item.label}
                  </a>
                `).join('')}
              </div>
            `
            : ''
        }
      </nav>
    `;

    // Attach event listeners
    this.attachEvents(el);
  }

  private attachEvents(el: HTMLElement): void {
    const toggleBtn = el.querySelector('#mobile-menu-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    const logoutBtn = el.querySelector('#header-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => authService.logout());
    }

    const searchInput = el.querySelector('#header-search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
          router.navigate('products', { search: searchInput.value.trim() });
        }
      });
    }

    const mobileSearch = el.querySelector('#mobile-search-input') as HTMLInputElement;
    if (mobileSearch) {
      mobileSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && mobileSearch.value.trim()) {
          router.navigate('products', { search: mobileSearch.value.trim() });
        }
      });
    }
  }
}
