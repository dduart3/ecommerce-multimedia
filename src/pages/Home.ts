
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
        <p class="text-primary font-orbitron font-bold text-[260px] pl-52">01</p>
        
        <h2 class="text-primary font-semibold font-orbitron text-3xl pt-4"> Experiencia <span class="text-5xl">HADESX</span> </h2>
        
          <p class="text-black font-orbitron w-[500px] pt-5 font-medium text-xl"> <b>HadesX</b> va más allá de lo convencional, ofreciéndote ropa que no solo se ve bien, sino que también te acompaña en cualquier situación. Si buscas destacar y romper con lo establecido, <b>HadesX</b> es tu aliado para redefinir tu estilo y elevarlo a otro nivel. </p>

          <button class="pt-10 hover:scale-110 ease-in transition-transform">
            <img src="./src/assets/images/VerBtn.png" alt="">
          </button>
          
        </div>
      </div>
    </div>
      
    <!-- Una nueva manera de vestir  -->

    <div class="pl-4 "> 
          <img src="./src/assets/images/fondo1.png" class="-z-10 absolute" />
          <div class="font-orbitron font-bold flex justify-between w-full p-20 items-center h-96 pt-[140px]">
              <h2 class="w-1/2 text-[80px]">UNA NUEVA MANERA DE VESTIR</h2>
              
              <div>
              <p class="text-[280px]">02</p>
              <h2 class="text-[40px]">¿Por qué nosotros?</h2>
              </div>

          </div>
          <!-- Cards  -->
          <div class="flex gap-3 items-center justify-between px-20 py-24 pt-[150px]">
                <img src="./src/assets/images/Confianza.png" class="cursor-pointer hover:scale-105 ease-in-out transition-transform duration-500" >
                <img src="./src/assets/images/Comodidad.png" class="cursor-pointer hover:scale-105 ease-in-out transition-transform duration-500">
                <img src="./src/assets/images/Inversion.png" class="cursor-pointer hover:scale-105 ease-in-out transition-transform duration-500">
          </div>

    </div>


    <!-- Catalogo  -->
    <div class="w-screen ml-[-9px] bg-slate-50">

      <div class="h-[900px] w-screen ml-[25px] bg-slate-50 bg-[url('./src/assets/images/linea.png')] bg-no-repeat bg-left">
      
      <div class="text-dark font-orbitron font-bold flex justify-between px-28 pt-2 items-center">
        
       <!-- Titulos  -->
        <p class="text-[200px]">03</p>

        <div>
          <h3 class="text-[130px]">Catalogo</h3>
          <div class="w-80 bg-dark h-2"></div>
        </div>

      </div>

       <!-- Botones  -->

       <div class="font-orbitron font-bold text-[60px] text-dark flex justify-between items-center px-36 py-14 ">
       
        <!-- Mujer  -->
       <div class="flex flex-col items-center">
          <img src="./src/assets/images/Mujer.png" class="mb-2 hover:scale-105 ease-in-out transition-transform duration-500 cursor-pointer" />
          <p class="mt-[-70px]">Mujer</p>
        </div>
        <!-- Hombre -->
        <div class="flex flex-col items-center">
          <img src="./src/assets/images/Hombre.png" class="mb-2 hover:scale-105 ease-in-out transition-transform duration-500 cursor-pointer" />
          <p class="mt-[-70px]">Hombre</p>
        </div>
        <!-- Otros  -->
        <div class="flex flex-col items-center">
          <img src="./src/assets/images/Otros.png" class="mb-2 hover:scale-105 ease-in-out transition-transform duration-500 cursor-pointer" />
          <p class="mt-[-40px]">Accesorios</p>
        </div>

        







    </div>

     <!-- Techwear Essentials [Productos destacados]  -->

<div class="h-[1700px] bg-slate-50 w-full ml-[-9px]">
      <div class="h-full w-full bg-[url('./src/assets/images/shop_section.png')] bg-no-repeat object-cover ml-[9px]">
      
            <!-- Techwear Essentials  -->
            <div class="font-krona text-dark w-1/2 px-28 pt-32">

              <h2 class="text-[90px]">Techwear Essentials</h2>
              <p class="text-[30px]">Tus favoritos</p>
              
            </div>

            <!-- Productos Imagenes  -->
          
          <div class="flex w-full h-[800px] gap-5 justify-center items-center ml-[-60px]">

                <img src="./src/assets/images/Product1.png" width="470px" class="mt-[-280px]"/>

                  <div class="mt-[110px]">
                    <p class="font-orbitron text-dark font-bold border-2 border-primary align-middle items-center justify-center flex p-2 mb-5">Populares</p>
                    <img src="./src/assets/images/Product2.png" />
                  </div>

                <img src="./src/assets/images/Product3.png" class="mt-[-210px]"/>

          </div>

      <div> 

      <div class="h-full w-full bg-[url('./src/assets/images/product_decoration.png')] bg-no-repeat object- text-dark" > <p class="font-orbitron font-bold text-[40px] flex items-center h-20 ml-52 ">Productos</p> </div>
      


      </div>


      <button class=""><img src="./src/assets/images/tiendaBtn.png"/></button>

</div>  



<!-- Contactanos  -->

<section class="w-full h-[620px] bg-[url('./src/assets/images/ContactanosBg.png')] bg-cover bg-center ml-[-7px] flex pt-72 font-orbitron font-bold">

<h6 class=" text-[50px] pl-24 ">NO SEAS TIMIDO. <br> CONTACTANOS.</h6>

<div class="font-normal ml-10">
<p class="pb-4">info@hadesX.com</p>
<p class="pb-4">+1(832)764-2222</p>
<p class="w-72 pb-4">Avenida Guajira, Zona Industrial Norte, Maracaibo 4001, Zulia 1er piso a la derecha de la entrada principal</p>

</div>


</section>

<!-- FAQ  -->

    

<section class="w-full h-[1000px] bg-[url('./src/assets/images/FAQBg.png')] bg-cover bg-center ml-[-7px] flex pt-72 font-orbitron font-bold">


</section>
  


  
<app-footer></app-footer>
  
  






        
        
    `;
  }
}
