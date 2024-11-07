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
      <div class="w-1/4 flex flex-col mx-auto px-4 pt-24">
      <h1 class="text-3xl font-bold ">Your Cart</h1>
          <a href="/checkout" data-link class="bg-black text-white px-6 py-2  w-32">
            Proceed to Checkout
          </a>
      </div>
    `;
  }
}