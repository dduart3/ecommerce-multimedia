import { AuthController } from '../controllers/AuthController';
import {   AuthOperationResult, validateLoginData  } from '../utils/validators';
import { UserState } from './UserState';
import { auth } from '../config/firebase';
import { ILoginData } from '../interfaces/Auth';

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

  async login(loginData: ILoginData): Promise<AuthOperationResult> {
    const loginValidationResult = validateLoginData(loginData);
    if (loginValidationResult !== AuthOperationResult.SUCCESS) return loginValidationResult;

     await this.authController.login(loginData)
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
      }).catch((error) => {
        console.error('Error logging in:', error);
        //return OperationResult.UnknownError;
      })


      return AuthOperationResult.SUCCESS;
  }

  async register({email, password, firstName, lastName}: {email: string, password: string, firstName: string, lastName:string}): Promise<AuthOperationResult> {
    

    await this.authController.register({email, password, firstName, lastName})
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
      }).catch((error) => {
        console.error('Error registering user:', error);
        //return OperationResult.UnknownError;
      });
      
      return AuthOperationResult.SUCCESS;
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