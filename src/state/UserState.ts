import { UserController } from '../controllers/UserController';
import { User } from '../models/User';

export class UserState {
  private static instance: UserState;
  private userController: UserController;
  private currentUser: User | null = null;
  private subscribers: ((user: User | null) => void)[] = [];

  private constructor() {
    this.userController = new UserController();
  }

  public static getInstance(): UserState {
    if (!UserState.instance) {
      UserState.instance = new UserState();
    }
    return UserState.instance;
  }

  async updateProfile(userData: User): Promise<void> {
    if (!this.currentUser?.id) return Promise.reject('No user logged in');
    
    const user = await this.userController.updateUser(this.currentUser.id, userData);
    this.currentUser = user;
    this.notifySubscribers();
  }

  async loadUserProfile(id: string): Promise<void> {
    const user = await this.userController.getUser(id);
    this.currentUser = user;
    this.notifySubscribers();
  }

  async clearUserProfile(): Promise<void> {
    this.currentUser = null;
    this.notifySubscribers();
  }

  subscribe(callback: (user: User | null) => void) {
    this.subscribers.push(callback);
    callback(this.currentUser);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.currentUser));
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}