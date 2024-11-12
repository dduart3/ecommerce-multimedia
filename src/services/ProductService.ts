import { Product } from '../models/Product';
import { FirebaseService } from './FirebaseService';

export class ProductService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.firebaseService.getCollection('products') as Product[];
    return products.map(data => new Product(data));
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.firebaseService.getDocument('products', id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product as Product;
  }

  async updateProduct(productId: string, data: Partial<Product>): Promise<void> {
    await this.firebaseService.updateDocument('products', productId, data);
  }
}
