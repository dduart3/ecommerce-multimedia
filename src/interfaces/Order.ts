import { ICartItem } from "./Cart";
export enum OrderStatus {
  PENDING = 'pendiente',
  COMPLETED = 'completada',
  CANCELLED = 'cancelada',
}
export interface IOrder {
    id: string;
    userId: string;
    items: ICartItem[];
    total: number;
    status: OrderStatus;
    createdAt: Date;
  }
  