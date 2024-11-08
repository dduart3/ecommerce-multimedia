import { Component } from '../Component';
import { CartState } from '../../state/CartState';
import { ICartItem } from '../../interfaces/ICart';
import { CartItem } from './CartItem';
export class CartComponent extends Component {
  
  private cartState: CartState;
  private unsubscribe: (() => void) | null = null;
  private isDropdownOpen: boolean = false;

  constructor() {
    super();
    this.cartState = CartState.getInstance();
  }

  render(){
    const total = this.cartState?.getFormattedTotal();
    const itemCount = this.cartState?.getItemCount();
    
    this.setTemplate(/*html*/`
      <div class="cart-widget relative">
        <button id="cart-button" class="p-2 hover:bg-gray-100 rounded-full transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:stroke-black" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span id="cart-counter" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            ${itemCount}
          </span>
        </button>
        
        <div class="cart-dropdown ${this.isDropdownOpen ? '' : 'hidden'} absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">Shopping Cart</h3>
            <div id="cart-items" class="max-h-96 overflow-auto">
             // Cart items will be rendered here
            </div>
            ${itemCount > 0 ? `
              <div class="mt-4 pt-4 border-t">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Total:</span>
                  <span class="font-bold text-lg text-black">${total}</span>
                </div>
                <a href="/checkout" data-link class="block text-center bg-black text-white py-2 mt-4 rounded hover:bg-gray-800 transition-colors">
                  Proceder al pago
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `);
  }

  private renderCartItems(items: Map<string, ICartItem>): void {
    const cartItemsContainer = this.querySelector('#cart-items');
    if (!cartItemsContainer) return;

    if (items.size === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">El carrito está vacio</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    Array.from(items.values()).forEach(item => {
        const cartItem = new CartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });
}
  protected onMount(): void {
    this.unsubscribe = this.cartState?.subscribe(() => this.onUpdate());
  }

  protected onUnmount(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  protected onUpdate(): void {
    this.render();
    this.renderCartItems(this.cartState?.getItems());
    this.addEventListeners();
  }

  private addEventListeners(): void {
    const cartButton = this.querySelector('#cart-button');
    const dropdown = this.querySelector('.cart-dropdown');
    const removeButtons = this.querySelectorAll('.remove-item');

    cartButton?.addEventListener('click', () => {
      const isDropDownHidden = dropdown?.classList.contains('hidden');
      if (isDropDownHidden) {
        this.isDropdownOpen = true;
        dropdown?.classList.remove('hidden');
      } else {
        this.isDropdownOpen = false;
        dropdown?.classList.add('hidden');
      }
    });

    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        if (productId) {
          this.cartState.removeFromCart(productId);
        }
      });
    });
  }
}

customElements.define('cart-widget', CartComponent);