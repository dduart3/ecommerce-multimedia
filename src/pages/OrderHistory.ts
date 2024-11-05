import { Page } from './Page';
import { OrderController } from '../controllers/OrderController';

export class OrderHistoryPage extends Page {
  private orderController: OrderController;

  constructor(containerId: string) {
    super(containerId);
    this.orderController = new OrderController();
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `
      <app-header></app-header>
      <div class="container mx-auto px-4 pt-24">
        <h1 class="text-3xl font-bold mb-8">Order History</h1>
        <div id="orders-list" class="grid gap-4"></div>
      </div>
    `;
  }
}
