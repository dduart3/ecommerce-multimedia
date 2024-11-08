import { Page } from './Page';
import { StripeService } from '../services/StripeService';
import { CartService } from '../services/CartService';

export class CheckoutPage extends Page {
  private stripeService: StripeService;
  private cartService: CartService;

  constructor(containerId: string) {
    super(containerId);
    this.stripeService = StripeService.getInstance();
    this.cartService = new CartService();
  }

  async render(): Promise<void> {
    // Initial loading state
    this.container.innerHTML = `
      <app-header></app-header>
      <div class="container mx-auto px-4 pt-24">
        <div class="loading">Initializing payment system...</div>
      </div>
    `;

    // Wait for Stripe to be initialized
    await this.initializeStripeElements();
  }

  private async initializeStripeElements() {
    const stripe = this.stripeService.stripe
    console.log(stripe);
    if (stripe) {
      this.container.innerHTML = /*html*/`
        <app-header></app-header>
        <div class="container flex p-16">
        <!-- Create a button that your customers click to complete their purchase. Customize the styling to suit your branding. -->
          <button
            style="background-color:#6772E5;color:#FFF;padding:8px 12px;border:0;border-radius:4px;font-size:1em;cursor:pointer"
            id="checkout-button-price_1QHzNWIyj0lnLLZf1dbHp5Fx"
            role="link"
            type="button"
          >
            Checkout
          </button>

          <div id="error-message"></div>
          </div>
      `;
      const checkoutButton = document.getElementById('checkout-button-price_1QHzNWIyj0lnLLZf1dbHp5Fx');
      checkoutButton?.addEventListener('click', function () {
        /*
         * When the customer clicks on the button, redirect
         * them to Checkout.
         */
        stripe.redirectToCheckout({
          lineItems: [{price: 'price_1QHzNWIyj0lnLLZf1dbHp5Fx', quantity: 3}],
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
            const displayError = document.getElementById('error-message');

            if(displayError && result.error.message){
              displayError.textContent = result.error.message;
            }

            
          }
        });
      });
    
    }
  }
}
