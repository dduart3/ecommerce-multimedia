import { Page } from './Page';
import { ProductController } from '../controllers/ProductController';
import { ProductCard } from '../components/product/ProductCard';

export class ProductsPage extends Page {
  private productController: ProductController;

  constructor(containerId: string) {
    super(containerId);
    this.productController = new ProductController();
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `
      <app-header></app-header>
      <div class=" mx-auto px-16 pt-16 ">
        <h1 class=" text-5xl font-bold text-center mb-12 font-orbitron">Productos</h1>
        
        <!-- Products Grid -->
        <div id="products-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-4">
          <!-- Product cards will be inserted here -->
        </div>
      </div>
    `;

    const products = await this.productController.getAllProducts();
    const grid = document.getElementById('products-grid');
    
    if (grid) {
      products.forEach(product => {
        const card = new ProductCard(product);
        grid.appendChild(card);
      });
    }
  }
}