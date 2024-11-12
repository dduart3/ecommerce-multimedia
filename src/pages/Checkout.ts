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

    await this.validateSession();
    await this.redirectToCheckout();
  }

  private async redirectToCheckout(): Promise<void> {
    const stripe = this.stripeService.stripe;
    if (stripe) {
      const lineItems = this.getLineItems();
        stripe.redirectToCheckout({
          lineItems,
          mode: 'payment',
          billingAddressCollection: 'required',
          customerEmail: this.userState.getCurrentUser()?.email,
          successUrl: window.location.protocol + '//localhost:5173/process-order',
          cancelUrl: window.location.protocol + '//localhost:5173/process-order',
        })
        .then(function (result) {
          if (result.error) {
            showToast({ message: result.error.message || 'Ha ocurrido un error, por favor intente de nuevo mas tarde.', type: 'error' });
            window.navigateTo('/');
          }
        });
      }
  }

  private async validateSession(): Promise<void> {
    const currentUser = this.userState.getCurrentUser();
    if(!currentUser){
      window.navigateTo('/login');
      showToast({ message: 'Necesitas iniciar sesión para poder comprar', type: 'error' });
      if (this.unsubscribeAuth) this.unsubscribeAuth();
      return;
    }

    if(this.cartState.getItems().size === 0){
      window.navigateTo('/products');
      showToast({ message: 'No tienes productos en el carrito', type: 'error' });
      if (this.unsubscribeAuth) this.unsubscribeAuth();
      return;
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
