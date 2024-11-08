import { UserService } from '../services/UserService';
import { User } from '../models/User';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUser(id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  async updateUser(id: string, userData: User): Promise<User> {
    return this.userService.updateUser(id, userData);
  }
}