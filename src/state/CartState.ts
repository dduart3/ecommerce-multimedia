import { CartController } from '../controllers/CartController';
import { Product } from '../models/Product';
import { ICartItem } from '../interfaces/Cart';

export class CartState {
  private static instance: CartState;
  private cartController: CartController;
  private subscribers: ((count: number) => void)[] = [];

  private constructor() {
    this.cartController = new CartController();
    this.updateCartCount = this.updateCartCount.bind(this);
  }

  public static getInstance(): CartState {
    if (!CartState.instance) {
      CartState.instance = new CartState();
    }
    return CartState.instance;
  }

  getItems(): Map<string, ICartItem> {
    return this.cartController.getItems();
  }

  getItemCount(): number {
    return this.cartController.getItemCount();
  }

  getTotal(): number {
    return this.cartController.getTotal();
  }

  getFormattedTotal(): string {
    return this.cartController.getFormattedTotal();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItem = this.cartController.getItems().get(product.id);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    
    if (currentQuantity + quantity <= product.stock) {
      this.cartController.addToCart(product, quantity);
      this.updateCartCount();
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    const items = this.cartController.getItems();
    const item = items.get(productId);
    
    if (item && quantity <= item.product.stock && quantity > 0) {
      this.cartController.updateQuantity(productId, quantity);
      this.updateCartCount();
    }
  }
  
  removeFromCart(productId: string) {
    this.cartController.removeFromCart(productId);
    this.updateCartCount();
  }

  subscribe(callback: (count: number) => void) {
    this.subscribers.push(callback);
    callback(this.getItemCount());
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private updateCartCount() {
    const count = this.getItemCount();
    this.subscribers.forEach(callback => callback(count));
  }
}
