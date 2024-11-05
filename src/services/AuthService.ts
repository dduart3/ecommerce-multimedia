import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { IUser } from '../interfaces/IUser';

export class AuthService {
  async register(email: string, password: string, name: string): Promise<IUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: IUser = {
      id: userCredential.user.uid,
      email,
      name,
      orders: []
    };
    
    await setDoc(doc(db, 'users', user.id), user);
    return user;
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
}