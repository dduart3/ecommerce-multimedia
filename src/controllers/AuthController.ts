import { UserCredential } from 'firebase/auth';
import { AuthService } from '../services/AuthService';
import { User } from '../models/User';


export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login({email, password}:{email: string, password: string}): Promise<UserCredential> {
    return this.authService.login({email, password});
  }

  async register({email, password, firstName, lastName}: {email: string, password: string, firstName: string, lastName: string}): Promise<User> {
    return this.authService.register({email, password, firstName, lastName});
  }

  async logout(): Promise<void> {
    return this.authService.logout();
  }
}
