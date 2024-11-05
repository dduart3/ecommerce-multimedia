import { FirebaseService } from './FirebaseService';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { User } from '../models/User';

export class AuthService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async register(email: string, password: string, name: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      id: userCredential.user.uid,
      email,
      name,
      orders: []
    };
    
    await this.firebaseService.addDocument('users', userData);
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

  async getUserProfile(userId: string): Promise<User | null> {
    const userData = await this.firebaseService.getDocument('users', userId) as User || null;
    return userData ? new User(userData) : null;
  }

  async updateUserProfile(userId: string, data: Partial<User>) {
    await this.firebaseService.updateDocument('users', userId, data);
    const updatedData = await this.firebaseService.getDocument('users', userId) as User || null;
    return new User(updatedData!);
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await this.firebaseService.getDocument('users', firebaseUser.uid) as User || null;
        callback(userData ? new User(userData) : null);
      } else {
        callback(null);
      }
    });
  }
}