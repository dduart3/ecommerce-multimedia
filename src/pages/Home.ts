import { Page } from "./Page";

export class HomePage extends Page {

  async render(): Promise<void> {
    this.container.innerHTML = /*html */ `
      <app-header></app-header>
       <!-- Hero Section -->
      <section class="h-full flex items-center justify-space overflow-hidden">
        <!-- Evoluciona tu estilo   -->
        <div class="pt-12 pl-24 w-1/2">
          <h1 class="font-orbitron font-black text-[80px]">EVOLUCIONA TU ESTILO</h1>
          <p class="font-oxygen text-md mt-[-50px] ">Prepárate para llevar tu look al siguiente nivel con prendas de alta calidad que desafían lo convencional. Únete a nosotros y transforma tu estilo en una declaración de audacia y originalidad.</p>
          <p class="bg-black w-fit p-3 mt-5 font-oxygen font-bold">Canjea el cupón gratis de hasta un 80% de descuento.</p>
          <button class="pt-6"><img src="/src/assets/images/ReclamarBtn.png" width="200px" /></button>
        </div>
        
        <!-- Imagen  -->
        <div class="w-1/2 translate-x-32">
          <img src="/src/assets/images/WomanHero.png" width="600" alt="Hero Image">
        </div>
  </section>
    `;
  }
}