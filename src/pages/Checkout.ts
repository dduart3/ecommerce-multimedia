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
    this.container.innerHTML = /*html */ `
<div class="h-screen w-full bg-white flex items-center justify-center">
    <div class="text-center">
        <div role="status">
          <img src="./src/assets/images/logoblack.png" width="400px"/>
            <svg aria-hidden="true" class="inline  w-12 h-12 text-gray-200 animate-spin dark:text-gray-500 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 215619   .841C84 .9175   .9121   .7997   .2913   .1811   .8758C89 .083   .2158   .5421   .6781   .9676   .0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only text-dark">Cargando...</span>
        </div>
    </div>
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
