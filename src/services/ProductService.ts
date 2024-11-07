import { Product } from '../models/Product';
import { FirebaseService } from './FirebaseService';

export class ProductService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.firebaseService.getCollection('productos') as Product[];
    return products.map(data => new Product(data));
  }

  async getProductById(id: string): Promise<Product | null> {
    const data = await this.firebaseService.getDocument('products', id) as Product;
    return data ? new Product(data) : null;
  }
}
