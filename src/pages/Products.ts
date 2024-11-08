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
      <app-header class=""></app-header>
      <div class=" mx-auto  mt-20 bg-slate-50 w-full h-screen">
      <h1 class="text-5xl font-bold text-center h-64 font-orbitron relative bg-[url('./src/assets/images/Techwear.jpg')] bg-right bg-contain bg-no-repeat grid place-items-center">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <span class="relative z-10 text-[90px]">Productos</span>
</h1>
        
        <div class="flex mt-[-32px]"> 
          <!-- Products Grid -->
          <div id="products-grid" class="grid pt-10 px-28 grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-8 mt-4">
            <!-- Product cards will be inserted here -->
          </div>
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