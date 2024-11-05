import { AuthService } from '../services/AuthService';
import { IUser } from '../interfaces/IUser';

export class UserController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(email: string, password: string, name: string): Promise<IUser> {
    return await this.authService.register(email, password, name);
  }

  async login(email: string, password: string) {
    return await this.authService.login(email, password);
  }

  async logout() {
    await this.authService.logout();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  async updateUserProfile(userId: string, data: Partial<IUser>) {
    return await this.authService.updateUserProfile(userId, data);
  }
}