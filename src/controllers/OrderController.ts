import { OrderService } from '../services/OrderService';
import { Order } from '../models/Order';
import { IOrder } from '../interfaces/Order';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(orderData: Omit<IOrder, "id">): Promise<Order> {
    const createdOrder = await this.orderService.createOrder(orderData);
    return createdOrder;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderService.getUserOrders(userId);
  }

  async getOrder(orderId: string): Promise<Order> {
    return this.orderService.getOrder(orderId);
  }
}