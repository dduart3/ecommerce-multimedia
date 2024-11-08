import { AuthController } from '../controllers/AuthController';

export class AuthState {
  private static instance: AuthState;
  private authController: AuthController;
  private isAuthenticated: boolean = false;
  private subscribers: ((isAuth: boolean) => void)[] = [];

  private constructor() {
    this.authController = new AuthController();
  }

  public static getInstance(): AuthState {
    if (!AuthState.instance) {
      AuthState.instance = new AuthState();
    }
    return AuthState.instance;
  }

  async login({email, password}: {email: string, password: string}): Promise<void> {
    return this.authController.login({email, password})
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
      });
  }

  async register({email, password}: {email: string, password: string}): Promise<void> {
    return this.authController.register({email, password})
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
      });
  }

  async logout(): Promise<void> {
    return this.authController.logout()
      .then(() => {
        this.isAuthenticated = false;
        this.notifySubscribers();
      });
  }

  subscribe(callback: (isAuth: boolean) => void) {
    this.subscribers.push(callback);
    callback(this.isAuthenticated);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.isAuthenticated));
  }
}