import { IUser } from '../interfaces/User';

export class User implements IUser {
  id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  orders: string[];

  constructor(data: IUser) {
    this.id = data.id;
    this.uid = data.uid;
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
      uid: this.uid,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      orders: this.orders
    };
  }
}