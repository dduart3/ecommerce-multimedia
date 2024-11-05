import { Page } from './Page';
import { OrderController } from '../controllers/OrderController';

export class CheckoutPage extends Page {
  private orderController: OrderController;

  constructor(containerId: string) {
    super(containerId);
    this.orderController = new OrderController();
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/`
      <app-header></app-header>
      <div class="container mx-auto px-4 pt-24">
        <h1 class="text-3xl font-bold mb-8">Checkout</h1>
        <form id="checkout-form" class="grid gap-4">
          <input type="text" placeholder="Name" required>
          <input type="email" placeholder="Email" required>
          <input type="text" placeholder="Address" required>
          <button type="submit" class="bg-black text-white px-6 py-2">
            Complete Order
          </button>
        </form>
      </div>
    `;
  }
}
