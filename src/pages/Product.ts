import { Page } from "./Page";
import { CartItem } from "../components/cart/CartItem";
import { ICartItem } from '../interfaces/Cart';

export class ProductPage extends Page {
  constructor(containerId: string) {
    super(containerId);
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `
      <app-header></app-header>

      <!-- Contenedor principal -->
      <div class="bg-white w-full h-screen mt-20 px-32">
        
        <!-- Contenedor de producto -->
        <div class="flex w-full">
          
          <!-- Imagen del producto -->
          <div class="w-1/2 h-72 pt-6">
            <img src="./src/assets/images/products/casco.png" class="object-contain" width="400px"/>
          </div>
          
          <!-- Información del producto -->
          <div class="w-1/2 text-dark font-orbitron font-bold mt-16">
            <h3 class="text-[20px] pb-4">Casco vergatario</h3>
            <p class="text-[40px]">$20,00</p>
            <p class="pt-8 font-oxygen">Descripción:</p>
            <p class="pt-2 text-[13px] font-oxygen font-light">
              Casco antivirginidad, joder, que gran casco. Casco antivirginidad, joder, que gran casco. 
              Casco antivirginidad, joder, que gran casco. Casco antivirginidad, joder, que gran casco.
            </p>
            
            <!-- Contenedor del contador del carrito -->
            <div id="cart-item-container" class="flex items-center space-x-4 pt-28">
              
              <!-- Botón de decremento -->
              <button class="bg-red-500 text-white text-2xl font-semibold px-4 py-1 rounded hover:bg-red-600">
                -
              </button>
              
              <!-- Cuadro del número -->
              <div class="text-dark font-oxygen w-24 h-12 flex items-center justify-center text-2xl font-bold bg-white border-2 border-gray-300 rounded shadow">
                0
              </div>
              
              <!-- Botón de incremento -->
              <button class="bg-black text-white text-2xl font-semibold px-4 py-1 rounded hover:bg-gray-900">
                +
              </button>

              
                    <button class="w-30 h-12 bg-black text-white px-4 rounded-lg hover:bg-gray-900">
                        Agregar al Carrito
                    </button>
            
                
            
            </div> <!-- Fin del contenedor del contador del carrito -->
          
              


          </div> <!-- Fin de la información del producto -->

        </div> <!-- Fin del contenedor de producto -->

      </div> <!-- Fin del contenedor principal -->
    `;
  }
}
