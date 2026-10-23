/**
 * Angular-style Routes Definition and Client-side Router
 */

export interface Route {
  path: string;
  title: string;
  component: string;
}

export const routes: Route[] = [
  { path: '', title: 'Home - Product Catalogue', component: 'home' },
  { path: 'home', title: 'Home - Product Catalogue', component: 'home' },
  { path: 'products', title: 'All Products - Catalogue', component: 'products' },
  { path: 'product/:id', title: 'Product Details', component: 'product-detail' },
  { path: 'categories', title: 'Product Categories', component: 'categories' },
  { path: 'cart', title: 'Shopping Cart', component: 'cart' },
  { path: 'login', title: 'Sign In - Academic Portal', component: 'login' },
  { path: 'register', title: 'Register - Student Account', component: 'register' },
  { path: 'academic', title: 'Academic Hub - 14 Weeks Curriculum', component: 'academic' },
  { path: 'quiz', title: 'Week 7 - MCQ Skill Test', component: 'quiz' },
];

export class Router {
  private currentPath: string = '';
  private currentParams: Record<string, string> = {};
  private currentQueryParams: Record<string, string> = {};
  private subscribers: Array<(path: string, params: Record<string, string>, query: Record<string, string>) => void> = [];

  constructor() {
    window.addEventListener('popstate', () => this.handleLocationChange());
    window.addEventListener('hashchange', () => this.handleLocationChange());
  }

  init(): void {
    this.handleLocationChange();
  }

  subscribe(callback: (path: string, params: Record<string, string>, query: Record<string, string>) => void): () => void {
    this.subscribers.push(callback);
    callback(this.currentPath, this.currentParams, this.currentQueryParams);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  navigate(url: string, queryParams?: Record<string, string>): void {
    let cleanUrl = url.startsWith('/') ? url.substring(1) : url;
    if (queryParams && Object.keys(queryParams).length > 0) {
      const q = new URLSearchParams(queryParams).toString();
      cleanUrl += `?${q}`;
    }
    window.location.hash = '#' + cleanUrl;
  }

  private handleLocationChange(): void {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    const [pathPart, queryPart] = rawHash.split('?');
    const path = pathPart || '';

    // Parse query params
    const queryParams: Record<string, string> = {};
    if (queryPart) {
      const sp = new URLSearchParams(queryPart);
      sp.forEach((val, key) => {
        queryParams[key] = val;
      });
    }

    // Match routes
    let matchedComponent = 'home';
    const params: Record<string, string> = {};

    if (!path || path === '' || path === 'home') {
      matchedComponent = 'home';
    } else if (path.startsWith('product/')) {
      matchedComponent = 'product-detail';
      params.id = path.split('/')[1] || '';
    } else if (path === 'products') {
      matchedComponent = 'products';
    } else if (path === 'categories') {
      matchedComponent = 'categories';
    } else if (path === 'cart') {
      matchedComponent = 'cart';
    } else if (path === 'login') {
      matchedComponent = 'login';
    } else if (path === 'register') {
      matchedComponent = 'register';
    } else if (path === 'academic' || path.startsWith('academic/')) {
      matchedComponent = 'academic';
    } else if (path === 'quiz') {
      matchedComponent = 'quiz';
    } else {
      matchedComponent = 'home';
    }

    this.currentPath = matchedComponent;
    this.currentParams = params;
    this.currentQueryParams = queryParams;

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    for (const callback of this.subscribers) {
      callback(this.currentPath, this.currentParams, this.currentQueryParams);
    }
  }

  getPath(): string {
    return this.currentPath;
  }

  getParams(): Record<string, string> {
    return this.currentParams;
  }

  getQueryParams(): Record<string, string> {
    return this.currentQueryParams;
  }
}

export const router = new Router();
