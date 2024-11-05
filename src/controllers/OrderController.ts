import { OrderService } from '../services/OrderService';
import { CartService } from '../services/CartService';
import { AuthService } from '../services/AuthService';
import { Order } from '../models/Order';

export class OrderController {
  private orderService: OrderService;
  private cartService: CartService;
  private authService: AuthService;

  constructor() {
    this.orderService = new OrderService();
    this.cartService = new CartService();
    this.authService = new AuthService();
  }

  async createOrder(): Promise<Order | null> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.showLoginPrompt();
      return null;
    }

    const cartItems = this.cartService.getItems();
    if (cartItems.size === 0) {
      this.showEmptyCartMessage();
      return null;
    }

    const orderData = {
      userId: currentUser.uid,
      products: Array.from(cartItems.values()),
      total: this.cartService.getTotal(),
      status: 'pending' as const,
      createdAt: new Date()
    };

    const order = await this.orderService.createOrder(orderData);
    this.cartService.clear();
    this.showOrderConfirmation(order);
    return order;
  }

  async getUserOrders(): Promise<Order[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return [];
    
    return await this.orderService.getUserOrders(currentUser.uid);
  }

  private showLoginPrompt() {
    const orderContainer = document.getElementById('order-container');
    if (orderContainer) {
      orderContainer.innerHTML = `
        <div class="alert">
          Please log in to complete your order
        </div>
      `;
    }
  }

  private showEmptyCartMessage() {
    const orderContainer = document.getElementById('order-container');
    if (orderContainer) {
      orderContainer.innerHTML = `
        <div class="alert">
          Your cart is empty
        </div>
      `;
    }
  }

  private showOrderConfirmation(order: Order) {
    const orderContainer = document.getElementById('order-container');
    if (orderContainer) {
      orderContainer.innerHTML = `
        <div class="success">
          <h3>Order Confirmed!</h3>
          <p>Order ID: ${order.id}</p>
          <p>Total: ${order.total}</p>
        </div>
      `;
    }
  }
}
