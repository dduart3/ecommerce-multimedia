import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { User } from '../models/User';

export class AuthService {
  async register(email: string, password: string, name: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      id: userCredential.user.uid,
      email,
      name,
      orders: []
    };
    
    await setDoc(doc(db, 'users', userData.id), userData);
    return new User(userData);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    await signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  async updateUserProfile(userId: string, data: Partial<User>) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
    const updatedDoc = await getDoc(userRef);
    const userData = updatedDoc.data() as User;
    return new User({ ...userData });
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data() as User;
        callback(new User({  ...userData, id: firebaseUser.uid }));
      } else {
        callback(null);
      }
    });
  }
}