import { FirebaseService } from './FirebaseService';
import { User } from '../models/User';

export class UserService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async getUser(uid: string): Promise<User> {
    try {
      const user = await this.firebaseService.getDocumentByField<User>('users', 'uid', uid);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async updateUser(id: string, userData: User): Promise<User> {
    try {
      await this.firebaseService.updateDocument('users', id, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
      
      return this.getUser(id);
    } catch (error: any) {
      throw new Error(`Failed to update user: ${error?.message}`);
    }
  }
}
