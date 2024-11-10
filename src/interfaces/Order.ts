export enum OrderStatus {
  PENDING = 'pendiente',
  COMPLETED = 'completada',
  CANCELLED = 'cancelada',
}
export interface IOrderItem {
  productId: string;
  quantity: number;
}
export interface IOrder {
    id: string;
    userId: string;
    items: IOrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: Date;
}
  