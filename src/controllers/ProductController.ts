import { ProductService } from '../services/ProductService';
import { CartController } from './CartController';
import { Product } from '../models/Product';

export class ProductController {
  private productService: ProductService;
  private cartController: CartController;

  constructor() {
    this.productService = new ProductService();
    this.cartController = new CartController();
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.getProducts();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    return this.productService.getProduct(id);
  }

  async updateStock(productId: string, quantityChange: number): Promise<void> {
    const product = await this.productService.getProduct(productId);
    const newStock = product.stock + quantityChange;
    await this.productService.updateProduct(productId, { stock: newStock });
  }

  async searchProducts(searchTerm: string): Promise<Product[]> {
    const products = await this.productService.getProducts();
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

}