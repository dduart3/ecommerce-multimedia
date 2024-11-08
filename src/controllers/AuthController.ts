import { UserCredential } from 'firebase/auth';
import { AuthService } from '../services/AuthService';


export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login({email, password}:{email: string, password: string}): Promise<UserCredential> {
    return this.authService.login({email, password});
  }

  async register({email, password}: {email: string, password: string}): Promise<UserCredential> {
    return this.authService.register({email, password});
  }

  async logout(): Promise<void> {
    return this.authService.logout();
  }
}
