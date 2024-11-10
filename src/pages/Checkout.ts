import { Page } from './Page';
import { StripeService } from '../services/StripeService';
import { CartState } from '../state/CartState';
import { UserState } from '../state/UserState';
import { AuthState } from '../state/AuthState';
import { Loader } from '../components/common/Loader';
import { showToast } from '../utils/toast';

export class CheckoutPage extends Page {
  private stripeService: StripeService;
  private cartState: CartState;
  private authState: AuthState;
  private userState: UserState;
  private unsubscribeAuth: (() => void) | null = null;

  constructor(containerId: string) {
    super(containerId);
    this.stripeService = StripeService.getInstance();
    this.cartState = CartState.getInstance();
    this.authState = AuthState.getInstance();
    this.userState = UserState.getInstance();
    this.unsubscribeAuth = this.authState.subscribe(() => this.render());
  }

  async render(): Promise<void> {
    this.container.innerHTML = '';
    this.container.appendChild(new Loader());

    const currentUser = this.userState.getCurrentUser();
    if(!currentUser){
      window.navigateTo('/login');
      showToast({ message: 'Necesitas iniciar sesión para poder comprar', type: 'error' });
      if (this.unsubscribeAuth) this.unsubscribeAuth();
      return;
    }

    //await this.redirectToCheckout();
    console.log(currentUser);
    const checkouts = await this.stripeService.getCheckouts(currentUser.email);
    console.log(checkouts);
    const lastCheckoutId = checkouts[0].id;
    
    const lineItems = await this.stripeService.getCheckoutLineItems(lastCheckoutId);

    console.log(lineItems);
  }

  private async redirectToCheckout(): Promise<void> {
    const stripe = this.stripeService.stripe;
    if (stripe) {
      const lineItems = this.getLineItems();

        stripe.redirectToCheckout({
          lineItems,
          mode: 'payment',
          
          /*
           * Do not rely on the redirect to the successUrl for fulfilling
           * purchases, customers may not always reach the success_url after
           * a successful payment.
           * Instead use one of the strategies described in
           * https://docs.stripe.com/payments/checkout/fulfill-orders
           */
          successUrl: window.location.protocol + '//localhost:5173/',
          cancelUrl: window.location.protocol + '//localhost:5173/',
        })
        .then(function (result) {
          if (result.error) {
            /*
             * If `redirectToCheckout` fails due to a browser or network
             * error, display the localized error message to your customer.
             */
          }
        });
      }
  }

  private getLineItems(): {price: string, quantity: number}[] {
    const items = Array.from(this.cartState.getItems().values()) ;
    return items.map((item) => ({
      price: item.product.stripePriceId,
      quantity: item.quantity,
    }));
  } 
  
}
