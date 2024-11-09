import { ICartItem } from '../interfaces/Cart';
import { IOrder, OrderStatus  } from '../interfaces/Order';

export class Order implements IOrder {
  id: string;
  userId: string;
  items: ICartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;

  constructor(data: IOrder) {
    this.id = data.id;
    this.userId = data.userId;
    this.items = data.items;
    this.total = data.total;
    this.status = data.status;
    this.createdAt = new Date(data.createdAt);
  }

  updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  toJSON(): IOrder {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
      total: this.total,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}