import { FirebaseService } from './FirebaseService';
import { Order } from '../models/Order';
import { IOrder } from '../interfaces/Order';

export class OrderService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async createOrder(orderData: Omit<IOrder, "id">): Promise<Order> {
    const orderId = await this.firebaseService.addDocument('orders', orderData);
    return new Order({ ...orderData, id: orderId });
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.firebaseService.getDocument('orders', orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return order as Order;
  }

  async getOrderByPaymentIntentId(paymentIntentId: string): Promise<Order | null> {
    return this.firebaseService.getDocumentByField<Order>('orders', 'paymentIntentId', paymentIntentId);
}

  async getUserOrders(uid: string): Promise<Order[]> {
      try {
        const orders = await this.firebaseService.getDocumentByField<Order | Order[]>('orders', 'uid', uid);
        console.log('Fetched orders:', orders);
        if (orders === null) {
          return [];
        }
        if(orders instanceof Array){
          return orders;
        }
        return [orders];
      } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await this.firebaseService.updateDocument('orders', orderId, { status });
  }
}