import { AuthController } from "../controllers/AuthController";
import {
  AuthOperationResult,
  validateLoginData,
  validateRegisterData,
} from "../utils/validators";
import { UserState } from "./UserState";
import { auth } from "../config/firebase";
import { ILoginData, IRegisterData } from "../interfaces/Auth";

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

    if (loginValidationResult !== AuthOperationResult.SUCCESS)
      return loginValidationResult;

    const result = await this.authController
      .login(loginData)
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
        return AuthOperationResult.SUCCESS;
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential") {
          return AuthOperationResult.INVALID_CREDENTIALS;
        }
        console.error("Error logging in:", error);
        return AuthOperationResult.UNKNOW_ERROR;
      });

    return result;
  }

  async register(registerData: IRegisterData): Promise<AuthOperationResult> {
    const registerValidationResult = validateRegisterData(registerData);

    if (registerValidationResult !== AuthOperationResult.SUCCESS) return registerValidationResult;

    const result = await this.authController
      .register(registerData)
      .then(() => {
        this.isAuthenticated = true;
        this.notifySubscribers();
        return AuthOperationResult.SUCCESS;
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          return AuthOperationResult.EMAIL_IN_USE;
        }
        console.error("Error logging in:", error);
        return AuthOperationResult.UNKNOW_ERROR;
      });

    return result;
  }

  async logout(): Promise<void> {
    return this.authController.logout().then(() => {
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
        await this.userState.clearUserProfile();
        this.isAuthenticated = false;
      }
      this.notifySubscribers();
    });
  }

  subscribe(callback: (isAuth: boolean) => void) {
    this.subscribers.push(callback);
    callback(this.isAuthenticated);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback(this.isAuthenticated));
  }
}
