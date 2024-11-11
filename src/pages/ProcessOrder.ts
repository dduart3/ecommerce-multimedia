import { Page } from "./Page";
import { StripeService } from "../services/StripeService";
import { CartState } from "../state/CartState";
import { UserState } from "../state/UserState";
import { AuthState } from "../state/AuthState";
import { Loader } from "../components/common/Loader";
import { IPaymentIntent, PaymentIntentStatus } from "../interfaces/StripeInterfaces";
import { showToast } from "../utils/toast";
import { OrderController } from "../controllers/OrderController";
import { IOrder } from "../interfaces/Order";

export class ProcessOrderPage extends Page {
  private stripeService: StripeService;
  private cartState: CartState;
  private authState: AuthState;
  private userState: UserState;
  private orderController: OrderController;
  private unsubscribeAuth: (() => void) | null = null;
  

  constructor(containerId: string) {
    super(containerId);
    this.stripeService = StripeService.getInstance();
    this.cartState = CartState.getInstance();
    this.authState = AuthState.getInstance();
    this.userState = UserState.getInstance();
    this.orderController = new OrderController();

    this.unsubscribeAuth = this.authState.subscribe(() => this.render());
  }

  async render(): Promise<void> {
    this.container.innerHTML = "";
    this.container.appendChild(new Loader());

    await this.processOrder();
  }

  private async processOrder(): Promise<void> {
    const currentUser = this.userState.getCurrentUser();
    if (!currentUser) return;
    
    const checkout = await this.stripeService.getLastCheckout(currentUser.email);
    if (!checkout) return;
    
    const lineItems = await this.stripeService.getCheckoutLineItems(checkout.id);
    if (!lineItems) return;
    
    const paymentIntent = await this.stripeService.getLastPaymentIntent();
    if (!paymentIntent) return;
    
    const items = lineItems.map((item: any) => ({
      productId: item.price?.id as string,
      quantity: item.quantity as number,
    }));

    const order = {
      uid: currentUser.uid,
      items,
      total: (checkout.amount_total/100),
      status: paymentIntent.status,
      createdAt: Date.now(),
    } as Omit<IOrder, "id">;

    if (paymentIntent.status === PaymentIntentStatus.SUCCEEDED) {
      this.renderSuccess()
      //this.renderFailure();
      //const result = await this.orderController.createOrder(order);
      //this.cartState.clearCart();
      //window.navigateTo("/");
    }
  }

  private renderSuccess(): void {
    this.container.innerHTML = /*html*/`
        <div class="min-h-screen bg-stone-950 flex items-center justify-center">
            <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
                <div class="mb-4">
                    <svg class="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">¡Pago Exitoso!</h2>
                <p class="text-gray-600 mb-6">Tu orden ha sido procesada correctamente.</p>
                <a href="/orders" data-link class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                    Ir a tu historial de ordenes
                </a>
            </div>
        </div>
    `;
}

private renderFailure(): void {
    this.container.innerHTML = /*html*/`
        <div class="min-h-screen bg-stone-950 flex items-center justify-center">
            <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
                <div class="mb-4">
                    <svg class="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Error en el Pago</h2>
                <p class="text-gray-600 mb-6">Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.</p>
                <a href="/checkout" data-link class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                    Volver al checkout
                </a>
            </div>
        </div>
    `;
  }
}
