import { IProduct } from "./Product";

export interface ICart {
  items: Map<string, ICartItem>;
  userId?: string;
  lastUpdated: Date;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
