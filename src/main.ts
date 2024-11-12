import "./style.css";
import './components/cart/CartItem';
import './components/cart/CartComponent';
import "./components/common/Header";
import './components/common/Footer';
import './components/common/ScrollToTop';
import { StripeService } from "./services/StripeService";
import { CartState } from "./state/CartState";
import { Router } from './router/Router';
import { UserState } from "./state/UserState";
import { AuthState } from "./state/AuthState";

class App {
  private router: Router;
  private stripeService: StripeService;
  private cartState: CartState;
  private userState: UserState;
  private authState: AuthState;

  constructor() {
    this.stripeService = StripeService.getInstance();
    this.cartState = CartState.getInstance();
    this.userState = UserState.getInstance();
    this.authState = AuthState.getInstance();
    this.router = new Router("app");
  }
}

new App();