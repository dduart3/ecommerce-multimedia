import { OrderController } from "../controllers/OrderController";
import { UserState } from "../state/UserState";
import { Page } from "./Page";

export class UserProfilePage extends Page {
  private userState: UserState;
  private orderController: OrderController;

  constructor(containerId: string) {
    super(containerId);
    this.userState = UserState.getInstance();
    this.orderController = new OrderController();
  }

  async render(): Promise<void> {
    //const user = this.userState.getCurrentUser();
    //const orders = await this.orderController.getUserOrders(user?.uid || '');

    this.container.innerHTML = /*html*/`
    <app-header></app-header>
      <div class="min-h-screen  pt-24">
        <div class="container mx-auto px-4 pr-8">
          <!-- Profile Header -->
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-center space-x-4">
              <div class="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span class="text-2xl font-bold text-gray-600">DD</span>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-800">David Duarte</h1>
                <p class="text-gray-600">test@gmail.com</p>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="bg-white rounded-lg shadow-lg min-h-[400px]">
            <div class="border-b px-6">
              <nav class="-mb-px flex space-x-6">
                <button class="tab-btn active border-b-2 border-black px-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Mis Órdenes
                </button>
                <!-- Can add more tabs here -->
              </nav>
            </div>

            <!-- Orders Tab -->
            <div class="tab-content p-6">
              <div class="space-y-4">
                 <!-- Order Card -->
                  <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start">

                      <div>
                        <p class="text-sm text-gray-500">Orden # 123</p>
                        <p class="font-medium text-gray-500">${new Date().toLocaleDateString()}</p>
                      </div>
                      <div class="text-right">
                        
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          "completed" === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }">
                          Completada
                        </span>
                        
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="text-sm text-gray-600">Items: 4</p>
                    </div>
                  </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addEventListeners();
  }

  private addEventListeners(): void {
    const tabs = this.container.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active', 'border-black'));
        tab.classList.add('active', 'border-black');
        // Handle tab content switching
      });
    });
  }
}