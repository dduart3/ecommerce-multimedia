export interface ICart {
  items: Map<string, ICartItem>;
  userId?: string;
  lastUpdated: Date;
}

export interface ICartItem {
  productId: string;
  quantity: number;
  price: number;
}
