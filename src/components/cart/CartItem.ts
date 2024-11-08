import { Component } from '../Component';
import { ICartItem } from '../../interfaces/ICart';
import { CartState } from '../../state/CartState';

export class CartItem extends Component {
  private item: ICartItem;
  private cartState: CartState;

  constructor(item: ICartItem) {
    super();
    this.item = item;
    this.cartState = CartState.getInstance();
  }

  protected render(): void {
    this.setTemplate(/*html*/`
      <div class="flex items-center gap-4 py-2 border-b text-black">
        <img src="/src/assets/images/products/${this.item.product.imageUrl}" alt="${this.item.product.name}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1">
          <h4 class="font-medium my-1">${this.item.product.name}</h4>
          <h5 class="font-normal ">Disponibles: ${this.item.product.stock}</h5>
          <div class="flex justify-between items-center mt-1">
            <div class="quantity-controls flex items-center gap-2">
              <button class="decrease-qty" ${this.item.quantity <= 1 ? 'disabled' : ''}>-</button>
              <span>${this.item.quantity}</span>
              <button class="increase-qty" ${this.item.quantity >= this.item.product.stock ? 'disabled' : ''}>+</button>
            </div>
            <span class="font-medium">$${this.item.product.price}</span>
          </div>
        </div>
        <button class="remove-item text-gray-400 hover:text-red-500" data-id="${this.item.product.id}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    `);
}

  protected onMount(): void {
    this.addEventListeners();
  }

  protected onUnmount(): void {
  }

  protected onUpdate(): void {
    this.render();
  }

  private addEventListeners(): void {
    const removeButton = this.querySelector('.remove-item');
    const increaseButton = this.querySelector('.increase-qty');
    const decreaseButton = this.querySelector('.decrease-qty');

    removeButton?.addEventListener('click', () => {
      this.cartState.removeFromCart(this.item.product.id);
    });

    increaseButton?.addEventListener('click', () => {
      this.cartState.updateQuantity(this.item.product.id, this.item.quantity + 1);
    });

    decreaseButton?.addEventListener('click', () => {
      if (this.item.quantity > 1) {
        this.cartState.updateQuantity(this.item.product.id, this.item.quantity - 1);
      }
    });
  }
}

customElements.define('cart-item', CartItem);