import { IProduct } from '../interfaces/Product';

export class Product implements IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stripePriceId: string;
  stock: number;

  constructor(data: IProduct) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.stripePriceId = data.stripePriceId;
    this.stock = data.stock;
  }

  getFormattedPrice(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(this.price);
  }

  toJSON(): IProduct {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      imageUrl: this.imageUrl,
      stripePriceId: this.stripePriceId,
      stock: this.stock
    };
  }
}