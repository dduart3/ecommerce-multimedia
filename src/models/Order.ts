import { IOrder, OrderStatus  } from '../interfaces/IOrder';

export class Order implements IOrder {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: OrderStatus;
  createdAt: Date;

  constructor(data: IOrder) {
    this.id = data.id;
    this.userId = data.userId;
    this.products = data.products;
    this.total = data.total;
    this.status = data.status;
    this.createdAt = new Date(data.createdAt);
  }

  updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }

  calculateTotal(): number {
    return this.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  toJSON(): IOrder {
    return {
      id: this.id,
      userId: this.userId,
      products: this.products,
      total: this.total,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}