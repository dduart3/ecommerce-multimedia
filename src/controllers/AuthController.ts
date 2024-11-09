import { UserCredential } from 'firebase/auth';
import { AuthService } from '../services/AuthService';
import { User } from '../models/User';
import { ILoginData, IRegisterData } from '../interfaces/Auth';


export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(loginData: ILoginData): Promise<UserCredential> {
    return this.authService.login(loginData);
  }

  async register(registerData: IRegisterData): Promise<User> {
    return this.authService.register(registerData);
  }

  async logout(): Promise<void> {
    return this.authService.logout();
  }
}
