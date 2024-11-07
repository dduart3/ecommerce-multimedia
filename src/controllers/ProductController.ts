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
}