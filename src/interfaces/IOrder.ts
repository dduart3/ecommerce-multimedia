export enum OrderStatus {
  PENDING = 'pendiente',
  COMPLETED = 'completada',
  CANCELLED = 'cancelada',
}
export interface IOrder {
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
  }
  