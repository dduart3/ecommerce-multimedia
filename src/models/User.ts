import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  orders: string[];

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.orders = data.orders || [];
  }

  addOrder(orderId: string): void {
    this.orders.push(orderId);
  }

  toJSON(): IUser {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      orders: this.orders
    };
  }
}