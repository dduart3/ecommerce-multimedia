import { AuthService } from '../services/AuthService';
import { OrderService } from '../services/OrderService';
import { User } from '../models/User';

export class UserController {
  private authService: AuthService;
  private orderService: OrderService;
  private authStateListeners: ((user: User | null) => void)[] = [];

  constructor() {
    this.authService = new AuthService();
    this.orderService = new OrderService();
    this.setupAuthListener();
  }

  async register(email: string, password: string, name: string): Promise<User> {
    const user = await this.authService.register(email, password, name);
    return user;
  }

  async login(email: string, password: string) {
    const result = await this.authService.login(email, password);
    return result;
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    this.authStateListeners.push(callback);
    this.authService.onAuthStateChange(callback);
  }

  private notifyAuthStateListeners(user: User | null) {
    this.authStateListeners.forEach(listener => listener(user));
  }

  private setupAuthListener() {
    this.authService.onAuthStateChange(async (user) => {
      if (user) {
        const orders = await this.orderService.getUserOrders(user.id);
       
      } else {
        this.handleLogout();
      }
      this.notifyAuthStateListeners(user);
    });
  }


  private handleLogout() {
    const userProfileElement = document.getElementById('user-profile');
    if (userProfileElement) {
      userProfileElement.innerHTML = '<p>Please log in to view your profile</p>';
    }
  }
}