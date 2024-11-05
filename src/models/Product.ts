import { IProduct } from '../interfaces/IProduct';

export class Product implements IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;

  constructor(data: IProduct) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
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
      imageUrl: this.imageUrl
    };
  }
}