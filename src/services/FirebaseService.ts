import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export class FirebaseService {
  // Generic methods for any collection
  async getDocument(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  async getDocumentByField<T>(
    collectionName: string,
    field: string,
    value: any
  ): Promise<T | null> {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    } as T;
  }

  async getDocumentsByField<T>(
    collectionName: string,
    field: string,
    value: any
  ): Promise<T | null> {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return docs as T;
  }

  async getCollection(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async addDocument(collectionName: string, data: any) {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  }

  async updateDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  }

  async deleteDocument(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  }
}
