import { Page } from "./Page";
import { StripeService } from "../services/StripeService";
import { CartState } from "../state/CartState";
import { UserState } from "../state/UserState";
import { AuthState } from "../state/AuthState";
import { Loader } from "../components/common/Loader";
import {  PaymentIntentStatus } from "../interfaces/StripeInterfaces";
import { OrderController } from "../controllers/OrderController";
import { IOrder } from "../interfaces/Order";
import { ProductController } from "../controllers/ProductController";
import { ICartItem } from "../interfaces/Cart";

export class ProcessOrderPage extends Page {
  private stripeService: StripeService;
  private cartState: CartState;
  private authState: AuthState;
  private userState: UserState;
  private orderController: OrderController;
  private productController: ProductController
  private unsubscribeAuth: (() => void) | null = null;
  

  constructor(containerId: string) {
    super(containerId);
    this.stripeService = StripeService.getInstance();
    this.cartState = CartState.getInstance();
    this.authState = AuthState.getInstance();
    this.userState = UserState.getInstance();
    this.orderController = new OrderController();
    this.productController = new ProductController();

    this.unsubscribeAuth = this.authState.subscribe(() => this.render());
  }

  async render(): Promise<void> {
    this.container.innerHTML = "";
    this.container.appendChild(new Loader());

    await this.processOrder();
  }

  private async processOrder(): Promise<void> {
    const currentUser = this.userState.getCurrentUser();
    if (!currentUser) {
      this.renderFailure("No estás autenticado en el sitio.");
      return;
    }
    
    const checkout = await this.stripeService.getLastCheckout(currentUser.email);

    if(!checkout){
      this.renderFailure(`No tienes ninguna orden pendiente por procesar.`);
      return;
    }

    const paymentIntent = await this.stripeService.getPaymentIntent(checkout.payment_intent);
    if(!paymentIntent){
      this.renderFailure(`No tienes ninguna orden pendiente por procesar.`);
      return;
    }

    const lineItems = await this.stripeService.getCheckoutLineItems(checkout.id);
    if(!lineItems){
      this.renderFailure(`No tienes ninguna orden pendiente por procesar.`);
      return;
    }

    const cartItems = Array.from(this.cartState.getItems().values())

    const orderItems = cartItems.map((item: ICartItem) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      productPrice: item.product.price,
    }));  

    const userOrders = await this.orderController.getUserOrders(currentUser.uid);

    const isOrderProcessed = userOrders.some((order: IOrder) => order.paymentIntentId === paymentIntent.id);

    if(isOrderProcessed){
      this.renderFailure(`No tienes ninguna orden pendiente por procesar.`);
      return;
    }

    const order = {
      uid: currentUser.uid,
      items: orderItems,
      total: (checkout.amount_total/100),
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
      createdAt: Date.now(),
      description: paymentIntent.description,
      receiptUrl: paymentIntent.latest_charge.receipt_url
    } as Omit<IOrder, "id">;

    if (paymentIntent.status === PaymentIntentStatus.SUCCEEDED) {
      this.renderSuccess();
      await this.orderController.createOrder(order);
      await this.updateProductsStock(cartItems)
      this.cartState.clearCart();
      return;
    }else{
      this.renderFailure('Ha ocurrrido un error al procesar el pago y no pudo ser procesado, por favor intenta nuevamente.');
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
                <a href="/profile" data-link class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                    Ir a tu historial de ordenes
                </a>
            </div>
        </div>
    `;
}

private renderFailure(message?: string): void {
    this.container.innerHTML = /*html*/`
        <div class="min-h-screen bg-stone-950 flex items-center justify-center">
            <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
                <div class="mb-4">
                    <svg class="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Ha ocurrido un error</h2>
                <p class="text-gray-600 mb-6">${message ? message :`Hubo un problema. Por favor, intenta nuevamente.`}</p>
                <a href="/" data-link class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                    Ir al inicio
                </a>
            </div>
        </div>
    `;
  }

  private async updateProductsStock(items: ICartItem[]): Promise<void> {
    for (const item of items) {
        await this.productController.updateStock(item.product.id, -item.quantity);
    }
  }
}
