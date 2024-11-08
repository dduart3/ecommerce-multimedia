import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';

export class AuthService {
  async login({email, password}:{email: string, password: string}): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async register({email, password}: {email: string, password: string}): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}