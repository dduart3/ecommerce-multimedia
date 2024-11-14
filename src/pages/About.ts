import { Page } from "./Page";

export class About extends Page {

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/`
        <app-header></app-header>
        <div class="bg-white text-dark min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[url('./src/assets/images/about-background.png')] bg-no-repeat mt-20"> 
            <div class="max-w-4xl w-full space-y-8">
                <div class="text-right">
                    <h1 class="text-4xl font-orbitron font-extrabold text-dark sm:text-5xl md:text-6xl">
                        Acerca de nosotros
                    </h1>
                    <p class="mt-3 text-xl text-dark font-orbitron font-semibold">
                        Una nueva forma de vestir.
                    </p>
                </div>

                <div class="mt-10 flex flex-col md:flex-row items-center gap-8">
                    <div class="w-full md:w-1/2">
                        <div class="aspect-w-full rounded-lg overflow-hidden shadow-lg">
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 space-y-6 text-center md:text-left">
                        <p class="text-lg leading-relaxed font-semibold font-oxygen">
                            En HadesX, no solo vendemos ropa; estamos creando el futuro de la moda. Nuestros diseños de vanguardia combinan forma y función, desafiando los límites de lo posible en la indumentaria urbana.
                        </p>
                        <p class="text-lg leading-relaxed font-oxygen font-semibold">
                            Fundada en 2025, hemos estado a la vanguardia de la revolución de la moda, integrando materiales avanzados y tecnologías inteligentes en la ropa cotidiana. Nuestra misión es empoderar a las personas con prendas que se adaptan al estilo de vida urbano moderno.
                        </p>
                        <p class="text-lg leading-relaxed font-oxygen font-semibold">
                            Únete a nosotros en la transformación del futuro de la moda, donde el estilo se encuentra con la innovación, y cada prenda cuenta una historia de progreso y posibilidad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

  }
      
