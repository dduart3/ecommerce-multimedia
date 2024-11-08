import { Page } from './Page';
import { OrderController } from '../controllers/OrderController';

export class OrdersPage extends Page {
  private orderController: OrderController;

  constructor(containerId: string) {
    super(containerId);
    this.orderController = new OrderController();
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `
      <app-header></app-header>

       <!-- Container principal   -->
      <div class=" pt-1 w-full bg-white mt-28">
        <p class="font-oxygen text-slate-300 pl-10 pt-6 text-[15px] ">Inicio > Mi Cuenta > Ordenes</p>
        <h1 class="text-3xl font-bold mb-8 text-dark pl-10">Historial de Ordenes</h1>
          
        
         <!-- Container principal de ordenes (gris)   -->
        <div id="orders-list" class="grid gap-4">
        

         <!-- Comienza lista de productos   -->
          <div class="w-full h-screen over bg-slate-200 overflow-scroll">
        
          <div class="bg-white h-52 w-full mt-5">
                <div class= "text-dark flex justify-between px-16 pt-5">
                  <span class="text-[20px] font-bold">Finalizado</span> 

                  <div class="flex gap-16">
                    <div>

                      <p>Pedido efectuado el: <span class="font-semibold">6 ene,2023</span> </p>
                      <p>Nº de pedido: <span class="font-semibold">8160543781301660  <span>  </p>
                    </div>
                    
                    <button class="font-bold">Detalles del pedido</button>
                  </div>
                </div>

          
        
          </div>
                <!-- Finaliza lista de productos   --> 

        </div>
      </div>
    `;
  }
}
