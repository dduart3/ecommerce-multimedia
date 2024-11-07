import { Page } from './Page';
import { ProductController } from '../controllers/ProductController';
import { CartController } from '../controllers/CartController';
import { ProductCard } from '../components/product/ProductCard';
//import { ProductCard } from '../components/product/ProductCard';

export class ProductsPage extends Page {
  private productController: ProductController;
  private cartController: CartController;

  constructor(containerId: string) {
    super(containerId);
    this.productController = new ProductController();
    this.cartController = new CartController();
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `
      <app-header></app-header>
      <div class="container mx-auto px-4 ">
        <h1 class="text-4xl font-bold text-center mb-12">Our Products</h1>
        
        <!-- Products Grid -->
        <div id="products-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          <!-- Product cards will be inserted here -->
        </div>
      </div>
    `;

    const products = await this.productController.getAllProducts();
    const grid = document.getElementById('products-grid');
    
    if (grid) {
      products.forEach(product => {
        console.log(product);
        const card = new ProductCard(product);
        grid.appendChild(card);
      });
    }
  }
}