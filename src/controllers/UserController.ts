import { UserService } from '../services/UserService';
import { User } from '../models/User';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUser(uid: string): Promise<User> {
    return this.userService.getUser(uid);
  }

  async updateUser(id: string, userData: User): Promise<User> {
    return this.userService.updateUser(id, userData);
  }
}