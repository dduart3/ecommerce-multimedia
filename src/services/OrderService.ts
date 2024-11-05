import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Order } from '../models/Order';

export class OrderService {
  async createOrder(orderData: any): Promise<Order> {
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    return new Order({ id: docRef.id, ...orderData });
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
        const data = doc.data() as Order;
        return new Order({ ...data });
    });
  }

  async updateOrderStatus(orderId: string, status: 'pending' | 'completed' | 'cancelled'): Promise<void> {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
  }
}