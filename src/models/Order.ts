import { IOrder, IOrderItem, OrderStatus  } from '../interfaces/Order';

export class Order implements IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
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

  getTotal(): number {
    return this.total;
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