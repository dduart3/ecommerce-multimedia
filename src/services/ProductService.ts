import { Product } from '../models/Product';
import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export class ProductService {
  private containerId: string;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  async fetchProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      return querySnapshot.docs.map(doc => {
        return new Product({
          id: doc.id,
          ...doc.data() as Omit<Product, 'id'>
        });
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProductById(productId: string): Promise<Product | null> {
    try {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return new Product({
          id: docSnap.id,
          ...docSnap.data() as Omit<Product, 'id'>
        });
      }
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  renderProducts(products: Product[]): void {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = products.map(product => this.createProductHTML(product)).join('');
  }

  private createProductHTML(product: Product): string {
    return `
      <div class="product-item" data-product-id="${product.id}">
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${product.getFormattedPrice()}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
  }
}