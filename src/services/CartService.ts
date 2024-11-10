import { IProduct } from '../interfaces/Product';
import { Cart } from '../models/Cart';

export class CartService {
  private cart: Cart;

  constructor(userId?: string) {
    this.cart = new Cart(userId);
  }

  addItem(product: IProduct, quantity: number = 1) {
    this.cart.addItem(product, quantity);
  }

  removeItem(productId: string) {
    this.cart.removeItem(productId);
  }

  updateQuantity(productId: string, quantity: number) {
    this.cart.updateQuantity(productId, quantity);
  }

  getItems() {
    return this.cart.items;
  }

  getTotal() {
    return this.cart.getTotal();
  }

  getFormattedTotal() {
    return this.cart.getFormattedTotal();
  }

  getItemCount() {
    return this.cart.getItemCount();
  }

  clear() {
    this.cart.clear();
  }

  onUpdate(callback: (items: Map<string, any>) => void) {
    this.cart.onUpdate(callback);
  }
}