import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { FirebaseService } from './FirebaseService';
import { User } from '../models/User';
export class AuthService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async login({email, password}:{email: string, password: string}): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async register({email, password, firstName, lastName}: {email: string, password: string, firstName: string, lastName: string}): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const newUser = new User({
      id: user.uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      orders: []
    });
    
    try {
      await this.firebaseService.addDocument('users', newUser);
      return newUser as User;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}