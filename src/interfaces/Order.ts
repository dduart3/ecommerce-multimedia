import { PaymentIntentStatus } from "./StripeInterfaces";

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  productPrice: number;
}
export interface IOrder {
    id: string;
    uid: string;
    paymentIntentId: string;
    items: IOrderItem[];
    total: number;
    status: PaymentIntentStatus
    createdAt: number;
    description: string;
    receiptUrl?: string;
}
  