export interface FirestoreSchema {
  products: {
    [productId: string]: {
      name: string;
      price: number;
      description: string;
      imageUrl: string;
      stock: number;
      category: string;
      createdAt: Date;
    }
  }
}
