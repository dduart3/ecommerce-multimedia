import { HomePage } from '../pages/Home';
import { ProductsPage } from '../pages/Products';
import { CheckoutPage } from '../pages/Checkout';
import { UserProfilePage } from '../pages/UserProfile';
import { NotFoundPage } from '../pages/NotFound';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { About } from '../pages/About';
import { ProcessOrderPage } from '../pages/ProcessOrder';
import { ProductPage } from '../pages/Product';
import { ContactPage } from '../pages/Contact';
import { PrivacyPage } from '../pages/Privacy';
import { TermsPage } from '../pages/Terms';
import { ReturnsPage } from '../pages/Returns';
declare global {
  interface Window { navigateTo: (path: string) => void; }
}
export class Router {
  private container: HTMLElement;
  private routes: Map<string, any>;
  private currentPage: any = null;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) throw new Error('Container not found');
    this.container = element;
    
    this.routes = new Map([
      ['/', HomePage],
      ['/products', ProductsPage],
      ['/checkout', CheckoutPage],
      ['/login', LoginPage],
      ['/about', About],
      ['/register', RegisterPage],
      ['/profile', UserProfilePage],
      ['/process-order', ProcessOrderPage],
      ['/contact', ContactPage],
      ['/privacy', PrivacyPage],
      ['/terms', TermsPage],
      ['/returns', ReturnsPage],
    ]);

    this.initializeRouter();
  }

  private initializeRouter() {
    window.addEventListener('popstate', () => this.handleRoute());
    
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('[data-link]')) {
        e.preventDefault();
        this.navigateTo(target.getAttribute('href') || '/');
      }
    });
    (<any>window).navigateTo = this.navigateTo.bind(this);
    this.handleRoute();
  }

  private async handleRoute() {
    const path = window.location.pathname;
    
    if (path.startsWith('/product/')) {
      const productId = path.split('/product/')[1];
      const page = new ProductPage(this.container.id, productId);
      page.render();
      return;
    } 
  
    const PageClass = this.routes.get(path) || NotFoundPage;
    
    if (PageClass && (!this.currentPage || !(this.currentPage instanceof PageClass))) {
      this.currentPage = new PageClass(this.container.id);
      await this.currentPage.render();
    }
  }

  navigateTo(path: string) {
    window.history.pushState(null, '', path);
    this.handleRoute();
  }
}
