import { Page } from "./Page";

export class HomePage extends Page {

  async render(): Promise<void> {
    this.container.innerHTML = /*html */ `
      <app-header></app-header>

       <!-- Hero Section -->
      
       <div>

         <div class="flex items-center justify-space h-full">
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
        
        
        
      </div>
      
      
      
      
      
      <!-- Logo carrusel  -->
      <div class="h-[80px] bg-black flex items-center overflow-hidden">
    <div class="flex animate-right space-x-4">
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <!-- Repite los logos para que el deslizamiento parezca infinito -->
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
      </div>
    </div>

    <!-- Video -->
    <div class="w-full h-[500px] overflow-hidden">
      <video class="w-full h-full object-cover bg-center-center"  loading="lazy" autoplay loop>
        <source src="./src/assets/videos/VideoLanding.mp4" type="video/mp4">
      </video>
    </div>

    <!-- Logo carrusel  -->
<div class="h-[80px] bg-black flex items-center overflow-hidden" >
    <div class="flex animate-left space-x-4">
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <!-- Repite los logos para que el deslizamiento parezca infinito -->
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
          <img src="/src/assets/images/logo.png" width="240px" />
      </div>
    </div>
    
    <!-- Nosotros  -->

    <div class="flex h-[750px] w-full bg-slate-100 overflow-hidden ml-2">
        <img src="./src/assets/images/demonio.png" class="object-cover mt-[-110px]" />
    
        <!-- Experiencia HADESX  -->
        <div class="h-screen w-full pl-10"> 
          <p class="text-primary font-orbitron font-bold text-[200px] pl-52">02</p>
         
          <h2 class="text-primary font-semibold font-orbitron text-3xl pt-4"> Experiencia <span class="text-5xl">HADESX</span> </h2>

          <p class="text-black font-orbitron w-[500px] pt-5 font-medium text-xl"> <b>HadesX</b> va más allá de lo convencional, ofreciéndote ropa que no solo se ve bien, sino que también te acompaña en cualquier situación. Si buscas destacar y romper con lo establecido, <b>HadesX</b> es tu aliado para redefinir tu estilo y elevarlo a otro nivel. </p>

          <button class="pt-10 hover:scale-110 ease-in transition-transform">
          <img src="./src/assets/images/VerBtn.png" alt="">
          </button>
    
        </div>
    
   
    
   
     </div>
      
    
        
        
    `;
  }
}
