import { CartService } from '../services/CartService';
import { Product } from '../models/Product';

export class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
    this.initializeCartUI();
  }

  private initializeCartUI() {
    this.cartService.onUpdate((items) => {
      this.updateCartCounter();
      this.updateCartDisplay();
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

  private updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
      cartCounter.textContent = this.cartService.getItemCount().toString();
    }
  }

  private updateCartDisplay() {
    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
      cartTotal.textContent = this.cartService.getFormattedTotal();
    }
  }
}