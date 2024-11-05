import './style.css';
import './components/common/Header';
import { ProductController } from './controllers/ProductController'
import { CartController } from './controllers/CartController'
import { UserController } from './controllers/UserController'
import { OrderController } from './controllers/OrderController'
import { UIService } from './services/UIService';
import { Router } from './router/Router';

class App {
  private productController: ProductController;
  private cartController: CartController;
  private userController: UserController;
  private orderController: OrderController;
  private uiService: UIService;
  private router: Router;

  constructor() {
    this.productController = new ProductController();
    this.cartController = new CartController();
    this.userController = new UserController();
    this.orderController = new OrderController();
    this.uiService = new UIService();
    this.router = new Router('app');

    this.cartController.onUpdate((items, total) => {
     
    });

    this.userController.onAuthStateChange((user) => {
      this.uiService.updateUserUI(!!user, user?.name);
      if (user) {
        this.orderController.getUserOrders().then(orders => {
          this.uiService.updateOrderUI(orders);
        });
      }
    });

    this.initialize();
  }

  private async initialize() {
    try {
      await this.setupEventListeners();
      await this.productController.getAllProducts();
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  private async setupEventListeners() {
    // Auth related listeners
    const loginForm = document.getElementById('login-form');
    const checkoutButton = document.getElementById('checkout-button');

    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      await this.userController.login(email, password);
    });

    checkoutButton?.addEventListener('click', async () => {
      const order = await this.orderController.createOrder();
      if (order) {
        console.log('Order created:', order);
      }
    });
  }
}

new App();