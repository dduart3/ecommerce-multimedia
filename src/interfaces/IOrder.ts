export interface IOrder {
    id: string;
    userId: string;
    products: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
  }
  