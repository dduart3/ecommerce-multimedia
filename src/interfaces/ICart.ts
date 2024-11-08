import { IProduct } from "./IProduct";

export interface ICart {
  items: Map<string, ICartItem>;
  userId?: string;
  lastUpdated: Date;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
