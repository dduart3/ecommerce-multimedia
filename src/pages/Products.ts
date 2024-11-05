import { Page } from './Page';
import { ProductController } from '../controllers/ProductController';
import { CartController } from '../controllers/CartController';
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
    this.container.innerHTML = `
      <div class="products-container">
        <h1>Our Products</h1>
        <div id="products-grid" class="products-grid"></div>
      </div>
    `;

    const products = await this.productController.getAllProducts();
    const grid = document.getElementById('products-grid');
    
    if (grid) {
      products.forEach(product => {
        //const card = new ProductCard(product, this.cartController);
        //grid.appendChild(card.render());
      });
    }
  }
}