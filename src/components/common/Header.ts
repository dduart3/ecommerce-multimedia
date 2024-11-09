import { AuthState } from "../../state/AuthState";
import { UserState } from "../../state/UserState";
import { Component } from "../Component";

export class Header extends Component {
  private authState: AuthState;
  private userState: UserState;
  private unsubscribeAuth: (() => void) | null = null;
  private unsubscribeUser: (() => void) | null = null;

  constructor() {
    super();
    this.authState = AuthState.getInstance();
    this.userState = UserState.getInstance();
  }

  protected render(): void {
    this.setTemplate(/*html*/`
      <header class="bg-transparent w-full top-0 z-50 absolute">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-20">
            <!-- Logo -->
            <div class="flex-shrink-0">
             <a href="/"><img src="/src/assets/images/logo.png" width="150" alt="Logo" class="h-12 w-auto"></a> 
            </div>

            <!-- Navbar -->
            <nav class="hidden md:flex space-x-8">
              <a href="/" class="hover:text-black font-medium transition-colors">INICIO</a>
              <a href="/products" class="hover:text-black font-medium transition-colors">PRODUCTOS</a>
              <a href="/about" class="hover:text-black font-medium transition-colors">NOSOTROS</a>
              <a href="/contact" class="hover:text-black font-medium transition-colors">CONTACTO</a>
            </nav>

            <!-- Icons -->
            <div class="flex items-center space-x-4">
              <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <cart-widget></cart-widget>
              
              ${this.renderAuthButton()}
            </div>
          </div>
        </div>
      </header>
    `);
  }

  private renderAuthButton(): string {
    const isAuth = this.authState.isUserAuthenticated();
    const user = this.userState.getCurrentUser();
    if (isAuth && user) {
      return /*html*/`
        <div class="relative group">
          <button class="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-white text-sm">${user?.firstName}</span>
          </button>
          <div class="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
            <a href="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
            <a href="/orders" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</a>
            <button class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100" onclick="logout()">Logout</button>
          </div>
        </div>
      `;
    }

    return /*html*/`
      <a href="/login" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </a>
    `;
  }

  protected onMount(): void {
    this.unsubscribeAuth = this.authState.subscribe(() => this.render());
    this.unsubscribeUser = this.userState.subscribe(() => this.render());
  }

  protected onUnmount(): void {
    if (this.unsubscribeAuth) this.unsubscribeAuth();
    if (this.unsubscribeUser) this.unsubscribeUser();
  }

  protected onUpdate(): void {
    // todo
  }
}
customElements.define('app-header', Header);