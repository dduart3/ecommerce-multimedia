import { Component } from '../Component';
import { Product } from '../../models/Product';
import { CartState } from '../../state/CartState';

export class ProductCard extends Component {
  private product: Product;
  private cartState: CartState;

  constructor(product: Product) {
    super();
    this.product = product;
    this.cartState = CartState.getInstance();
  }

  protected render(): void {
    this.setTemplate(/*html*/`
      <div class="text-black bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div class="aspect-w-1 aspect-h-1 w-full">
          <img src="/src/assets/images/products/${this.product.imageUrl}" 
               alt="${this.product.name}" 
               class="w-full h-[200px] object-contain bg-gray-50">
        </div>
        <div class="p-3 font-orbitron">
          <h3 class="text-md font-bold mb-1 truncate">${this.product.name}</h3>
          <div class="flex justify-between items-center">
            <div class="flex flex-col justify-between gap-2">
            <span class="text-sm text-black">Disponibles: ${this.product.stock}</span>
            <span class="text-lg font-bold">${this.product.getFormattedPrice()}</span>
            </div>
            
            <button class="add-to-cart bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors ${this.product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                    ${this.product.stock === 0 ? 'disabled' : ''}>
              ${this.product.stock === 0 ? 'No disponible' : 'Meter al carrito'}
            </button>
          </div>
        </div>
      </div>
    `);
  }

  protected onMount(): void {
    const addToCartButton = this.querySelector('.add-to-cart');
    addToCartButton?.addEventListener('click', () => {
      this.cartState.addToCart(this.product);
    });
  }

  protected onUnmount(): void {
    const addToCartButton = this.querySelector('.add-to-cart');
    addToCartButton?.removeEventListener('click', () => {});
  }

  protected onUpdate(): void {
    this.render();
  }
}

customElements.define('product-card', ProductCard);