import { IOrder } from "../../interfaces/Order";
import { PaymentIntentStatus } from "../../interfaces/StripeInterfaces";
import { Component } from "../Component";

export class OrderCard extends Component {
  private order: IOrder;
  constructor(order: IOrder) {
    super();
    this.order = order;
  }
  render() {
    this.setTemplate(/*html*/ `
      <div class="p-6 hover:bg-gray-200 transition-colors order-card-wrapper">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <p class="text-sm text-gray-500">ID de la orden ${this.order.id}</p>
                      <p class="font-medium mt-1">${new Date(this.order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      this.order.status === PaymentIntentStatus.SUCCEEDED
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }">
                      ${
                        this.order.status === PaymentIntentStatus.SUCCEEDED ? "Completada" : "No completada"
                      }
                    </span>
                  </div>
                  
                  <div class="space-y-2">
                     <!-- Product Details Map -->
                      ${this.order.items.map(
                        (item) => /*html*/ `
                          <div class="flex justify-between text-sm">
                            <span class="text-gray-600">${item.productName} x ${item.quantity}</span>
                            <span class="font-medium">$${item.quantity * item.productPrice}</span>
                          </div>
                        `
                      ).join("")}
                  </div>
                  
                  <div class="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
                    <div class="text-sm text-gray-500">
                      <!-- aqui va un reduce que dice la cantidad de productos -->
                      ${this.order.items.reduce((acc, item) => acc + item.quantity, 0)} productos
                    </div>
                    <div class="text-lg font-bold">
                      Total: $${this.order.total}
                    </div>
                  </div>
                </div>
    `);
    this.setListeners();
  }

  protected onMount(): void {
    throw new Error("Method not implemented.");
  }
  protected onUnmount(): void {
    throw new Error("Method not implemented.");
  }
  protected onUpdate(): void {
    throw new Error("Method not implemented.");
  }

  protected setListeners(): void {
    const orderCardWrapper = this.querySelector(".order-card-wrapper");
    if (orderCardWrapper && this.order.status === PaymentIntentStatus.SUCCEEDED) {
      orderCardWrapper.classList.add("cursor-pointer");
      orderCardWrapper?.addEventListener("click", () => {
        window.open(this.order.receiptUrl, '_blank')?.focus();
      }); 
    }
  }
}
customElements.define("order-card", OrderCard);