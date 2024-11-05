import { ICart, ICartItem } from '../interfaces/ICart';
import { Product } from './Product';

export class Cart implements ICart {
  items: Map<string, ICartItem>;
  userId?: string;
  lastUpdated: Date;
  private listeners: ((items: Map<string, ICartItem>) => void)[] = [];

  constructor(userId?: string) {
    this.items = new Map();
    this.userId = userId;
    this.lastUpdated = new Date();
  }

  addItem(product: Product, quantity: number = 1): void {
    const existing = this.items.get(product.id);
    
    const cartItem: ICartItem = {
      productId: product.id,
      quantity: existing ? existing.quantity + quantity : quantity,
      price: product.price
    };

    this.items.set(product.id, cartItem);
    this.updateTimestamp();
    this.notifyListeners();
  }

  removeItem(productId: string): void {
    this.items.delete(productId);
    this.updateTimestamp();
    this.notifyListeners();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.get(productId);
    if (item) {
      item.quantity = quantity;
      this.updateTimestamp();
      this.notifyListeners();
    }
  }

  getTotal(): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  getFormattedTotal(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(this.getTotal());
  }

  getItemCount(): number {
    let count = 0;
    this.items.forEach(item => {
      count += item.quantity;
    });
    return count;
  }

  clear(): void {
    this.items.clear();
    this.updateTimestamp();
    this.notifyListeners();
  }

  onUpdate(callback: (items: Map<string, ICartItem>) => void): void {
    this.listeners.push(callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.items));
  }

  private updateTimestamp(): void {
    this.lastUpdated = new Date();
  }

  toJSON(): ICart {
    return {
      items: this.items,
      userId: this.userId,
      lastUpdated: this.lastUpdated
    };
  }
}