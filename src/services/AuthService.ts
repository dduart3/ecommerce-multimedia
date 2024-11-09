import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { FirebaseService } from './FirebaseService';
import { User } from '../models/User';
import { ILoginData, IRegisterData } from '../interfaces/Auth';
export class AuthService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async login(loginData: ILoginData): Promise<UserCredential> {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  }

  async register(registerData: IRegisterData): Promise<User> {
    const { email, password, firstName, lastName } = registerData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const newUser = {
      uid: userCredential.user.uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      orders: []
    };
    
    try {
      const userId = await this.firebaseService.addDocument('users', Object.assign({}, newUser));
      return new User({id: userId, ...newUser});
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}