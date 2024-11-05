import { CartService } from '../services/CartService';
import { Product } from '../models/Product';

export class CartController {
  private cartService: CartService;
  private listeners: ((itemCount: number, total: string) => void)[] = [];

  constructor() {
    this.cartService = new CartService();
  }

  
  onUpdate(callback: (itemCount: number, total: string) => void) {
    this.listeners.push(callback);
    this.cartService.onUpdate(() => {
      const itemCount = this.cartService.getItemCount();
      const total = this.cartService.getFormattedTotal();
      callback(itemCount, total);
    });
  }

  addToCart(product: Product, quantity: number = 1) {
    this.cartService.addItem(product, quantity);
  }

  removeFromCart(productId: string) {
    this.cartService.removeItem(productId);
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }
}