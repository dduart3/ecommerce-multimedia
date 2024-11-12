import { IOrder, IOrderItem  } from '../interfaces/Order';
import { PaymentIntentStatus } from '../interfaces/StripeInterfaces';

export class Order implements IOrder {
  id: string;
  uid: string;
  paymentIntentId: string;
  items: IOrderItem[];
  total: number;
  status: PaymentIntentStatus;
  createdAt: number;
  description: string;
  receiptUrl?: string;

  constructor(data: IOrder) {
    this.id = data.id;
    this.uid = data.uid;
    this.paymentIntentId = data.paymentIntentId;
    this.items = data.items;
    this.total = data.total;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.description = data.description;
    this.receiptUrl = data.receiptUrl;
  }

  getTotal(): number {
    return this.total;
  }

  toJSON(): IOrder {
    return {
      id: this.id,
      uid: this.uid,
      paymentIntentId: this.paymentIntentId,
      items: this.items,
      total: this.total,
      status: this.status,
      createdAt: this.createdAt,
      description: this.description
    };
  }
}