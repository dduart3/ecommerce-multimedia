import { CartController } from '../../controllers/CartController';
import { Product } from '../../models/Product';

export class ProductCard extends HTMLElement {
  private product: Product;
  private cartController: CartController;

  constructor(product: Product) {
    super();
    this.product = product;
    this.cartController = new CartController();
    this.render();
    this.addEventListeners();
  }

  private render() {
    this.innerHTML = /*html*/ `
    <div class="text-black bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div class="aspect-w-1 aspect-h-1 w-full">
        <img src="/src/assets/images/products/${this.product.imageUrl}" 
             alt="${this.product.name}" 
             class="w-full h-[200px] object-contain bg-gray-50">
      </div>
      <div class="p-3">
        <h3 class="text-lg font-bold mb-1 truncate">${this.product.name}</h3>
        <p class=" mb-2 text-sm h-12 overflow-hidden">${this.product.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold">${this.product.getFormattedPrice()}</span>
          <button class="add-to-cart bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
  }

  private addEventListeners() {
    const addToCartButton = this.querySelector('.add-to-cart');
    addToCartButton?.addEventListener('click', () => {
      this.cartController.addToCart(this.product);
    });
  }
}

customElements.define('product-card', ProductCard);