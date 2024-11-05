import { ProductService } from '../services/ProductService';
import { CartController } from './CartController';
import { Product } from '../models/Product';

export class ProductController {
  private productService: ProductService;
  private cartController: CartController;

  constructor() {
    this.productService = new ProductService('product-container');
    this.cartController = new CartController();
    this.initializeEventListeners();
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.fetchProducts();
    this.renderProducts(products);
    return products;
  }

  private renderProducts(products: Product[]) {
    const container = document.getElementById('product-container');
    if (!container) return;

    products.forEach(product => {
      const productElement = this.createProductElement(product);
      container.appendChild(productElement);
    });
  }

  private createProductElement(product: Product): HTMLElement {
    const element = document.createElement('div');
    element.className = 'product-card';
    element.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.getFormattedPrice()}</p>
      <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    return element;
  }

  private initializeEventListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('add-to-cart')) {
        const productId = target.getAttribute('data-product-id');
        if (productId) {
          this.handleAddToCart(productId);
        }
      }
    });
  }

  private async handleAddToCart(productId: string) {
    const product = await this.productService.getProductById(productId);
    if (product) {
      this.cartController.addToCart(product);
    }
  }
}