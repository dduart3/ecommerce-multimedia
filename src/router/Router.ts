import { HomePage } from '../pages/Home';
import { ProductsPage } from '../pages/Products';
import { CartPage } from '../pages/Cart';
import { CheckoutPage } from '../pages/Checkout';
import { UserProfilePage } from '../pages/UserProfile';
import { OrderHistoryPage } from '../pages/OrderHistory';
import { NotFoundPage } from '../pages/NotFound';

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
      ['/cart', CartPage],
      ['/checkout', CheckoutPage],
      //['/login', LoginPage],
      //['/register', RegisterPage],
      ['/profile', UserProfilePage],
      ['/orders', OrderHistoryPage]
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

    this.handleRoute();
  }

  private async handleRoute() {
    const path = window.location.pathname;
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
