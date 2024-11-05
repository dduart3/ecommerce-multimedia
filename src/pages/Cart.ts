import { Page } from './Page';
import { CartController } from '../controllers/CartController';

export class CartPage extends Page {
  private cartController: CartController;

  constructor(containerId: string) {
    super(containerId);
    this.cartController = new CartController();
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/`
      <app-header></app-header>
      <div class="container mx-auto px-4 pt-24">
        <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
        <div id="cart-items" class="grid gap-4"></div>
        <div class="mt-8 flex justify-end">
          <a href="/checkout" data-link class="bg-black text-white px-6 py-2">
            Proceed to Checkout
          </a>
        </div>
      </div>
    `;
  }
}