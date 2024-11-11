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
    const user = this.userState.getCurrentUser();
    const orders = await this.orderController.getUserOrders(user?.uid || '');

    this.container.innerHTML = /*html*/`
      <div class="min-h-screen bg-stone-950 pt-24">
        <div class="container mx-auto px-4">
          <!-- Profile Header -->
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-center space-x-4">
              <div class="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span class="text-2xl font-bold text-gray-600">${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}</span>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-800">${user?.firstName} ${user?.lastName}</h1>
                <p class="text-gray-600">${user?.email}</p>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="bg-white rounded-lg shadow-lg">
            <div class="border-b px-6">
              <nav class="-mb-px flex space-x-6">
                <button class="tab-btn active border-b-2 border-black px-1 py-4 text-sm font-medium">
                  Mis Órdenes
                </button>
                <button class="tab-btn border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Información Personal
                </button>
              </nav>
            </div>

            <!-- Orders Tab -->
            <div class="tab-content p-6">
              <div class="space-y-4">
                ${orders.map(order => `
                  <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-sm text-gray-500">Orden #${order.id}</p>
                        <p class="font-medium">${new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-lg font-bold">$${order.total}</p>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }">
                          ${order.status}
                        </span>
                      </div>
                    </div>
                    <div class="mt-4">
                      <p class="text-sm text-gray-600">Items: ${order.items.length}</p>
                    </div>
                  </div>
                `).join('')}
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