import { router } from './app.routes.ts';
import { HeaderComponent } from './components/header.component.ts';
import { FooterComponent } from './components/footer.component.ts';
import { NotificationComponent } from './components/notification.component.ts';

// Pages
import { HomeComponent } from './pages/home.component.ts';
import { ProductsComponent } from './pages/products.component.ts';
import { ProductDetailComponent } from './pages/product-detail.component.ts';
import { CategoriesComponent } from './pages/categories.component.ts';
import { CartComponent } from './pages/cart.component.ts';
import { LoginComponent } from './pages/login.component.ts';
import { RegisterComponent } from './pages/register.component.ts';
import { QuizComponent } from './pages/quiz.component.ts';
import { AcademicHubComponent } from './pages/academic-hub.component.ts';

/**
 * AppComponent
 * Root Angular Component managing template structure, router-outlet,
 * and page view lifecycle.
 */
export class AppComponent {
  private headerComponent: HeaderComponent;
  private footerComponent: FooterComponent;
  private notificationComponent: NotificationComponent;

  // Page Component Singletons
  private homeComponent: HomeComponent;
  private productsComponent: ProductsComponent;
  private productDetailComponent: ProductDetailComponent;
  private categoriesComponent: CategoriesComponent;
  private cartComponent: CartComponent;
  private loginComponent: LoginComponent;
  private registerComponent: RegisterComponent;
  private quizComponent: QuizComponent;
  private academicHubComponent: AcademicHubComponent;

  constructor() {
    this.headerComponent = new HeaderComponent();
    this.footerComponent = new FooterComponent();
    this.notificationComponent = new NotificationComponent();

    this.homeComponent = new HomeComponent();
    this.productsComponent = new ProductsComponent();
    this.productDetailComponent = new ProductDetailComponent();
    this.categoriesComponent = new CategoriesComponent();
    this.cartComponent = new CartComponent();
    this.loginComponent = new LoginComponent();
    this.registerComponent = new RegisterComponent();
    this.quizComponent = new QuizComponent();
    this.academicHubComponent = new AcademicHubComponent();
  }

  bootstrap(rootElement: HTMLElement): void {
    // Initial master shell layout
    rootElement.innerHTML = `
      <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <!-- Toast Notifications Outlet -->
        <div id="app-notifications"></div>

        <!-- Global Navigation Header -->
        <div id="app-header"></div>

        <!-- Main Content Area / router-outlet -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          <div id="app-main-content">
            <!-- Dynamic Page Route Content Rendered Here -->
            <div class="flex items-center justify-center py-24 text-slate-400">
              <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </main>

        <!-- Global Footer -->
        <div id="app-footer"></div>
      </div>
    `;

    // Render persistent components
    this.headerComponent.render(document.getElementById('app-header')!);
    this.footerComponent.render(document.getElementById('app-footer')!);
    this.notificationComponent.render(document.getElementById('app-notifications')!);

    // Subscribe to client-side router
    router.subscribe((path, params) => {
      this.routeTo(path, params);
    });

    // Start router
    router.init();
  }

  private async routeTo(path: string, params: Record<string, string>): Promise<void> {
    const mainEl = document.getElementById('app-main-content');
    if (!mainEl) return;

    // Show smooth loading placeholder for async routes
    mainEl.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
        <svg class="animate-spin h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-xs font-semibold text-slate-500">Loading module...</span>
      </div>
    `;

    try {
      switch (path) {
        case 'home':
          document.title = 'Home - Product Catalogue Suite';
          await this.homeComponent.render(mainEl);
          break;

        case 'products':
          document.title = 'All Products - Catalogue Suite';
          await this.productsComponent.render(mainEl);
          break;

        case 'product-detail':
          document.title = 'Product Details - Catalogue Suite';
          await this.productDetailComponent.render(params.id || '1', mainEl);
          break;

        case 'categories':
          document.title = 'Categories - Product Catalogue';
          await this.categoriesComponent.render(mainEl);
          break;

        case 'cart':
          document.title = 'Shopping Cart - Product Catalogue';
          await this.cartComponent.render(mainEl);
          break;

        case 'login':
          document.title = 'Student Portal Sign In';
          this.loginComponent.render(mainEl);
          break;

        case 'register':
          document.title = 'Student Registration - Academic Suite';
          this.registerComponent.render(mainEl);
          break;

        case 'academic':
          document.title = 'Academic Hub (14 Weeks) - Web Technologies';
          this.academicHubComponent.render(mainEl);
          break;

        case 'quiz':
          document.title = 'Week 7 MCQ Skill Test - Academic Evaluation';
          this.quizComponent.render(mainEl);
          break;

        default:
          document.title = 'Home - Product Catalogue Suite';
          await this.homeComponent.render(mainEl);
          break;
      }
    } catch (error) {
      console.error('Error rendering route:', path, error);
      mainEl.innerHTML = `
        <div class="bg-rose-50 border border-rose-200 text-rose-800 p-8 rounded-3xl text-center space-y-3 max-w-md mx-auto my-12">
          <h3 class="font-bold text-base">Route Rendering Error</h3>
          <p class="text-xs">Failed to load view for route "${path}". Check browser console logs.</p>
          <a href="#home" class="inline-block px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700">
            Return to Safety (Home)
          </a>
        </div>
      `;
    }
  }
}
