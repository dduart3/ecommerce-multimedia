import { CartController } from '../controllers/CartController';
import { ICartItem } from '../interfaces/Cart';
import { storage } from '../utils/storage';
import { IProduct } from '../interfaces/Product';

export class CartState {
  private static instance: CartState;
  private cartController: CartController;
  private subscribers: (() => void)[] = [];
  private readonly STORAGE_KEY = 'cart_items';

  private constructor() {
    this.cartController = new CartController();
    this.loadFromStorage();
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

  addToCart(product: IProduct, quantity: number = 1): void {
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

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
    callback();
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private updateCartCount() {
    this.saveToStorage();
    this.subscribers.forEach(callback => callback());
  }

  private loadFromStorage(): void {
    const savedCart = storage.get<[string, ICartItem][]>(this.STORAGE_KEY);
    if (savedCart) {
      const items = new Map(savedCart);
      items.forEach((item) => {
        this.cartController.addToCart(item.product, item.quantity);
      });
    }
  }
  
  private saveToStorage(): void {
    const items = this.cartController.getItems();
    storage.set(this.STORAGE_KEY, Array.from(items.entries()));
  }
}
