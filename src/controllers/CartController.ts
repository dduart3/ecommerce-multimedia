import { CartService } from '../services/CartService';
import { Product } from '../models/Product';
import { ICartItem } from '../interfaces/Cart';
import { IProduct } from '../interfaces/Product';

export class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  getItems(): Map<string, ICartItem> {
    return this.cartService.getItems();
  }

  addToCart(product: IProduct, quantity: number = 1) {
    this.cartService.addItem(product, quantity);
  }

  removeFromCart(productId: string) {
    this.cartService.removeItem(productId);
  }

  getItemCount(): number {
    return this.cartService.getItemCount();
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    this.cartService.clear();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getFormattedTotal(): string {
    return this.cartService.getFormattedTotal();
  }
}