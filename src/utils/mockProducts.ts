import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function mockProducts() {
  const products = [
    {
      name: "Glasses",
      price: 1299.99,
      description: "High-performance glasses",
      imageUrl: "/images/glasses.jpg",
      stock: 10,
      category: "glasses",
      createdAt: new Date()
    },
    {
      name: "Jacket",
      price: 129.99,
      description: "Techwear jacket",
      imageUrl: "/images/jacket.jpg",
      stock: 15,
      category: "jackets",
      createdAt: new Date()
    }
  ];

  const productsRef = collection(db, 'products');
  
  for (const product of products) {
    await addDoc(productsRef, product);
  }
}
