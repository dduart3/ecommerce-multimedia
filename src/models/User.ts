import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  id: string;
  email: string;
  name: string;
  orders: string[];

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.orders = data.orders || [];
  }

  addOrder(orderId: string): void {
    this.orders.push(orderId);
  }

  toJSON(): IUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      orders: this.orders
    };
  }
}