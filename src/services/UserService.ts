import { FirebaseService } from './FirebaseService';
import { User } from '../models/User';

export class UserService {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  async createUser(id: string, userData: Partial<User>): Promise<User> {
    this.validateUserData(userData);

    const newUser = {
      id,
      email: userData.email,
      name: userData.name,
      createdAt: new Date().toISOString(),
      ...userData
    };
    
    try {
      await this.firebaseService.addDocument('users', newUser);
      return newUser as User;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.firebaseService.getDocument('users', id);
      if (!user) {
        throw new Error('User not found');
      }
      return user as User;
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    this.validateUserData(userData);
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
  private validateUserData(userData: Partial<User>): void {
    if (userData.email && !this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    if (userData.name && userData.name.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
