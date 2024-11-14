import { OrderCard } from "../components/orders/OrderCard";
import { OrderController } from "../controllers/OrderController";
import { AuthState } from "../state/AuthState";
import { UserState } from "../state/UserState";
import { showToast } from "../utils/toast";
import { Page } from "./Page";

export class UserProfilePage extends Page {
  private userState: UserState;
  private authState: AuthState;
  private orderController: OrderController;
  private unsubscribeAuth: (() => void) | null = null;

  constructor(containerId: string) {
    super(containerId);
    this.userState = UserState.getInstance();
    this.authState = AuthState.getInstance();
    this.orderController = new OrderController();

    this.unsubscribeAuth = this.authState.subscribe(() => this.render());
  }

  async render(): Promise<void> {

    this.container.innerHTML = `<div class="min-h-screen bg-stone-950 flex items-center justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>`;

    // Wait for auth state to be fully initialized
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isAuthenticated = this.authState.isUserAuthenticated();
    if (!isAuthenticated) {
        window.navigateTo('/login');	
        return;
    }

    const user = this.userState.getCurrentUser();
    if (!user) {
      showToast({message: "No estás autenticado en el sitio.", type: "error"}); 
      return;
    }
    this.container.innerHTML = /*html*/`
    <app-header></app-header>
      <div class="min-h-screen bg-dark py-24">
        <div class="container mx-auto px-4 max-w-6xl">
          <!-- Profile Header -->
          <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div class="flex items-center space-x-6">
              <div class="h-24 w-24 bg-black rounded-full flex items-center justify-center">
                <span class="text-3xl font-bold text-white">${user.firstName.charAt(0)}${user.lastName.charAt(0)}</span>
              </div>
              <div>
                <h1 class="text-3xl font-bold text-gray-800 font-orbitron">${user?.firstName} ${user?.lastName}</h1>
                <p class="text-gray-600 mt-1">${user?.email}</p>
                <p class="text-sm text-gray-500 mt-2">Miembro desde ${new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <!-- Orders Section -->
          <div id="orders-container" class="bg-white rounded-xl shadow-lg overflow-hidden text-black">
            <div class="border-b border-gray-200">
              <h2 class="text-2xl font-bold p-6 font-orbitron">Historial de Órdenes</h2>
            </div>
            <!-- Orders will render here -->
             <p class="no-orders text-lg text-gray-600 p-4 text-center">Aún no tienes ordenes</p>
             
            </div>
          </div>
        </div>
      </div>
      <app-footer></app-footer>
    `;
    this.renderOrders();
}


  private renderOrders(): void {
    const ordersContainer = this.container.querySelector("#orders-container");
    const ordersText = this.container.querySelector(".no-orders");

    this.orderController.getUserOrders(this.userState.getCurrentUser()?.uid || '').then((orders) => {
    if(!orders) {
      ordersText?.classList.remove("hidden");  
      return;
    }

    ordersText?.classList.add("hidden");  
    orders.forEach((order) => {
      const orderCard = new OrderCard(order);
      ordersContainer?.appendChild(orderCard);
      return;
    });
  });
  }
}