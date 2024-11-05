import { FirebaseService } from './FirebaseService';
import { Order } from '../models/Order';

export class OrderService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async createOrder(orderData: any): Promise<Order> {
    const orderId = await this.firebaseService.addDocument('orders', orderData);
    return new Order({ id: orderId, ...orderData });
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const orders = await this.firebaseService.getUserOrders(userId) as Order[];
    return orders.map(data => new Order(data));
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await this.firebaseService.updateDocument('orders', orderId, { status });
  }
}