import "./style.css";
import './components/cart/CartItem';
import './components/cart/CartComponent';
import "./components/common/Header";
import './components/common/Footer';
import { StripeService } from "./services/StripeService";
import { CartState } from "./state/CartState";
import { OrderController } from './controllers/OrderController'
import { Router } from './router/Router';

class App {
  private orderController: OrderController;
  private router: Router;
  private stripeService: StripeService;
  private cartState: CartState;

  constructor() {
    this.orderController = new OrderController();
    this.stripeService = StripeService.getInstance();
    this.cartState = CartState.getInstance();
    this.router = new Router("app");


    this.initialize();
  }

  private async initialize() {
    try {
      await this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  private async setupEventListeners() {
  
  }
}

new App();