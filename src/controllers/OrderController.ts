import { OrderService } from '../services/OrderService';
import { CartService } from '../services/CartService';
import { Order } from '../models/Order';

export class OrderController {
  private orderService: OrderService;
  private cartService: CartService;

  constructor() {
    this.orderService = new OrderService();
    this.cartService = new CartService();
  }

  async createOrder(userId: string): Promise<Order> {
    const cartItems = this.cartService.getItems();
    const total = this.cartService.getTotal();

    const orderData = {
      userId,
      products: Array.from(cartItems.values()),
      total,
      status: 'pending' as const,
      createdAt: new Date()
    };

    const order = await this.orderService.createOrder(orderData);
    this.cartService.clear();
    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return await this.orderService.getUserOrders(userId);
  }

  async updateOrderStatus(orderId: string, status: 'pending' | 'completed' | 'cancelled'): Promise<void> {
    await this.orderService.updateOrderStatus(orderId, status);
  }
}