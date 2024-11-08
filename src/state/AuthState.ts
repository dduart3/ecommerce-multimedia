import { AuthController } from '../controllers/AuthController';
import { validateUserData,OperationResult, validatePassword, validateEmail  } from '../utils/validators';
import { UserState } from './UserState';
import { auth } from '../config/firebase';

export class AuthState {
  private static instance: AuthState;
  private authController: AuthController;
  private userState: UserState;
  private isAuthenticated: boolean = false;
  private subscribers: ((isAuth: boolean) => void)[] = [];

  private constructor() {
    this.authController = new AuthController();
    this.userState = UserState.getInstance();
    this.initAuthListener();
  }

  public static getInstance(): AuthState {
    if (!AuthState.instance) {
      AuthState.instance = new AuthState();
    }
    return AuthState.instance;
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  async login({email, password}: {email: string, password: string}): Promise<OperationResult> {
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    if (emailValidationResult !== OperationResult.Success) return emailValidationResult;
    if (passwordValidationResult !== OperationResult.Success) return passwordValidationResult;

     await this.authController.login({email, password})
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
      });


      return OperationResult.Success;
  }

  async register({email, password, firstName, lastName}: {email: string, password: string, firstName: string, lastName:string}): Promise<OperationResult> {
    const userDataValidationResult = validateUserData({email, firstName, lastName});
    const passwordValidationResult = validatePassword(password);

    if (userDataValidationResult !== OperationResult.Success) return userDataValidationResult;
    if (passwordValidationResult !== OperationResult.Success) return passwordValidationResult;

    await this.authController.register({email, password, firstName, lastName})
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
      });
      
      return OperationResult.Success;
  }

  async logout(): Promise<void> {
    return this.authController.logout()
      .then(() => {
        this.isAuthenticated = false;
        this.notifySubscribers();
      });
  }

  private initAuthListener() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await this.userState.loadUserProfile(user.uid);
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
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