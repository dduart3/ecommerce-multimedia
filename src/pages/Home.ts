import Swiper from "swiper/bundle";
import 'swiper/swiper-bundle.css'
import { Page } from "./Page";

export class HomePage extends Page {
  async render(): Promise<void> {
    this.container.innerHTML = /*html */ `
      <app-header></app-header>

<!-- Hero Section -->

<div>

  <div class="flex items-center justify-space h-full" id="Home">


  <div class="vertical-navigation">
    <a href="#Home" class="dot"></a>
    <a href="#01" class="dot"></a>
    <a href="#02" class="dot"></a>
    <a href="#03" class="dot"></a>
    <a href="#04" class="dot"></a>
     <a href="#05" class="dot"></a>
      <a href="#faq" class="dot"></a>
  </div>



    <!-- Evoluciona tu estilo   -->
    <div class="pt-12 pl-24 w-1/2">
      <h1 class="font-orbitron font-black text-[80px]">EVOLUCIONA TU ESTILO</h1>
      <p class="font-oxygen text-md mt-[-50px] ">Prepárate para llevar tu look al siguiente nivel con prendas de
        alta calidad que desafían lo convencional. Únete a nosotros y transforma tu estilo en una declaración de
        audacia y originalidad.</p>
      <p class="bg-black w-fit p-3 mt-5 font-oxygen font-bold">Descuento de hasta un 80% de descuento en tu primera compra.
      </p>
     <a href="/products"> <button class="pt-6 hover:scale-105 transition-all ease-in-out"><img src="./src/assets/images/comprar-btn-landing.png" width="200px" /></button></a>
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
    <video class="w-full h-full object-cover bg-center-center" loading="lazy" autoplay loop>
      <source src="./src/assets/videos/VideoLanding.mp4" type="video/mp4">
    </video>
  </div>

  <!-- Logo carrusel  -->
  <div class="h-[80px] bg-black flex items-center overflow-hidden">
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

  <div class="flex h-[750px] w-full bg-slate-100 overflow-hidden ml-2" id="01">
    <img src="./src/assets/images/demonio.png" class="object-cover mt-[-110px]" />

    <!-- Experiencia HADESX  -->
    <div class="h-screen w-full pl-10">
      <p class="text-primary font-orbitron font-bold text-[260px] translate-x-[350px]">01</p>

      <h2 class="text-primary font-semibold font-orbitron text-3xl pt-4"> Experiencia <span
          class="text-5xl">HADESX</span> </h2>

      <p class="text-black font-orbitron w-[500px] pt-5 font-medium text-xl"> <b>HadesX</b> va más allá de lo
        convencional, ofreciéndote ropa que no solo se ve bien, sino que también te acompaña en cualquier situación.
        Si buscas destacar y romper con lo establecido, <b>HadesX</b> es tu aliado para redefinir tu estilo y
        elevarlo a otro nivel. </p>

      <button class="pt-10 hover:scale-110 ease-in transition-transform">
       <a href="/products"> <img src="./src/assets/images/VerBtn.png" alt=""></a>
      </button>

    </div>
  </div>
</div>

<!-- Una nueva manera de vestir  -->

<div class="pl-4" id="02">
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
    <img src="./src/assets/images/Confianza.png"
      class="hover:scale-105 ease-in-out transition-transform duration-500">
    <img src="./src/assets/images/Comodidad.png"
      class="hover:scale-105 ease-in-out transition-transform duration-500">
    <img src="./src/assets/images/Inversion.png"
      class="hover:scale-105 ease-in-out transition-transform duration-500">
  </div>

</div>


<!-- Catalogo  -->
<div class="w-screen ml-[-9px] bg-slate-50" id="03">

  <div
    class="h-[900px] w-screen ml-[25px] bg-slate-50 bg-[url('./src/assets/images/linea.png')] bg-no-repeat bg-left">

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
        <img src="./src/assets/images/Mujer.png"
          class="mb-2 hover:scale-105 ease-in-out transition-transform duration-500" />
        <p class="mt-[-70px]">Mujer</p>
      </div>
      <!-- Hombre -->
      <div class="flex flex-col items-center">
        <img src="./src/assets/images/Hombre.png"
          class="mb-2 hover:scale-105 ease-in-out transition-transform duration-500" />
        <p class="mt-[-70px]">Hombre</p>
      </div>
      <!-- Otros  -->
      <div class="flex flex-col items-center">
        <img src="./src/assets/images/Otros.png"
          class="mb-2 hover:scale-105 ease-in-out transition-transform duration-500" />
        <p class="mt-[-40px]">Accesorios</p>
      </div>









    </div>

    <!-- Techwear Essentials [Productos destacados]  -->

    <div class="h-[1700px] bg-slate-50 w-full ml-[-9px]" id="04">
      <div
        class="h-full w-full bg-[url('./src/assets/images/shop_section.png')] bg-no-repeat object-cover ml-[9px]">

        <!-- Techwear Essentials  -->
        <div class="font-krona text-dark w-1/2 px-28 pt-32">

          <h2 class="text-[90px]">Techwear Essentials</h2>
          <p class="text-[30px]">Tus favoritos</p>

        </div>

        <!-- Productos Imagenes  -->

        <div class="flex w-full h-[800px] gap-5 justify-center items-center ml-[-260px]">

         
          <div class="swiper mt-[-100px]">
              <!-- Additional required wrapper -->
              <div class="swiper-wrapper w-5 ">
                <!-- Slides -->
                <div class="swiper-slide"><a href="/product/co8Yg3KDZQbyhxOBg0Ku"><img src="./src/assets/images/Product1.png" width="430px" class="mt-[-3px] cursor-pointer hover:scale-95 transition-all ease-in-out" /></a></div>
                <div class="swiper-slide"><a href="/product/glf11HcfBQDszkXIFZT8"><img src="./src/assets/images/product-4-populares-home.png" width="430px" class="mt-[-3px] cursor-pointer hover:scale-95 transition-all ease-in-out" /></a></div>
                <div class="swiper-slide"><a href="/product/E3fBAc3EppFvcKFpB9YM"><img src="./src/assets/images/product-5-populares-home.png" class="mt-[-3px] cursor-pointer hover:scale-95 transition-all ease-in-out" width="430px" /></a></div>
                ...
              </div>
              <!-- If we need pagination -->
              <div class="swiper-pagination"></div>

              <!-- If we need navigation buttons -->
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>



          <div class="mt-[110px] ml-[-300px]">
            <p
              class="font-orbitron text-dark font-bold border-2 border-primary align-middle items-center justify-center flex p-2 mb-5">
              Populares</p>
           <a href="/product/kkfhNlq8ifgs6LvtxX7F"> <img src="./src/assets/images/Product2.png" class="cursor-pointer hover:scale-105 transition-all ease-out"/></a>
          </div>
            <div class="cursor-pointer hover:scale-105 transition-all ease-in-out">
             <a href="/product/xc9mG8wTWooPAaXKiZn8"> <img src="./src/assets/images/Product3.png" class="mt-[-210px]" class="cursor-pointer hover:scale-105 transition-all ease-out z-50" /></a>
            </div>
              
        </div>

 



      <!-- Contactanos  -->

      <section
        class="w-full h-[620px] bg-[url('./src/assets/images/ContactanosBg.png')] bg-cover bg-center ml-[-7px] flex pt-72 font-orbitron font-bold" id="05">

        <h6 class=" text-[50px] pl-24 ">NO SEAS TIMIDO. <br> CONTACTANOS.</h6>

        <div class="font-normal ml-10">
          <p class="pb-4">contact@hadesX.com</p>
          <p class="pb-4">+58-(414)-420-6969</p>
          <p class="w-72 pb-4">Avenida Guajira, Zona Industrial Norte, Maracaibo 4001, Zulia 1er piso a la derecha
            de la entrada principal, C.C Sambil Maracaibo, Local 12</p>
        </div>
      </section>

      <!-- FAQ  -->



      <section
  class="w-full h-[1000px] bg-[url('./src/assets/images/FAQBg.png')] bg-cover bg-center ml-[-7px] flex justify-center pt-72 font-orbitron font-bold overflow-hidden" id="faq">
  
  <div class="w-[500px] h-[800px] bg-[url('./src/assets/images/FAQ-acordeon-container.png')] bg-no-repeat bg-contain font-krona opacity-90 pr-12 pl-12 text-[18px] font-normal flex flex-col justify-center translate-x-[296px]">

    <details class="mb-4">
      <summary class="bg-[url('./src/assets/images/FAQ-acordeon-questions-outline.png')] bg-no-repeat bg-center bg-contain pl-14 cursor-pointer py-4 px-4 pr-7 mr-[-47px]">¿Qué es el Techwear y a qué se refiere?</summary>
      <div class="font-oxygen text-[14px] font-normal text-start mt-6 border-2 border-white py-4 px-4 pr-7 mr-[-47px]">
        <p>El techwear es un estilo de ropa funcional que combina diseño minimalista y materiales avanzados para mejorar el rendimiento en situaciones cotidianas. Ofrecemos prendas que repelen el agua, son transpirables y altamente duraderas.</p> 
      </div> 
    </details>

    <details class="mb-4">
    <summary class="bg-[url('./src/assets/images/FAQ-acordeon-questions-outline.png')] bg-no-repeat bg-center bg-contain pl-14 cursor-pointer py-4 px-4 pr-7 mr-[-47px]">¿Por qué elegir nuestra línea de TechWear?</summary>
      <div class="font-oxygen text-[14px] font-normal text-start mt-6 border-2 border-white py-4 px-4 pr-7 mr-[-47px]">
        <p>El Techwear está diseñado para la vida urbana moderna, proporcionando comodidad, funcionalidad y estilo. Es ideal para moverse en la ciudad y resistir condiciones diversas.</p> 
      </div> 
    </details>

    <details class="mb-4">
    <summary class="bg-[url('./src/assets/images/FAQ-acordeon-questions-outline.png')] bg-no-repeat bg-center bg-contain pl-14 cursor-pointer py-4 px-4 pr-7 mr-[-47px]">¿Qué características tienen nuestras prendas?</summary>
      <div class="font-oxygen text-[14px] font-normal text-start mt-6 border-2 border-white py-4 px-4 pr-7 mr-[-47px]">
        <p>Las prendas Techwear ofrecen características avanzadas como impermeabilidad, transpirabilidad y resistencia a la abrasión, diseñadas para mejorar el desempeño en actividades diarias.</p> 
      </div> 
    </details>

    <details class="mb-4">
      <summary class="bg-[url('./src/assets/images/FAQ-acordeon-questions-outline.png')] bg-no-repeat bg-center bg-contain pl-14 cursor-pointer py-4 px-4 pr-7 mr-[-47px]">¿Cuáles son los materiales de nuestras prendas?</summary>
      <div class="font-oxygen text-[14px] font-normal text-start mt-6 border-2 border-white py-4 px-4 pr-7 mr-[-47px]">
        <p>Usamos materiales de alta tecnología como Gore-Tex y otras membranas resistentes al agua y al viento, asegurando durabilidad y funcionalidad en cada prenda.</p> 
      </div> 
    </details>

    <details class="mb-4">
      <summary class="bg-[url('./src/assets/images/FAQ-acordeon-questions-outline.png')] bg-no-repeat bg-center bg-contain pl-14 cursor-pointer py-4 px-4 pr-7 mr-[-47px]">¿Cómo cuidar las prendas HadesX?</summary>
      <div class="font-oxygen text-[14px] font-normal text-start mt-6 border-2 border-white py-4 px-4 pr-7 mr-[-47px]">
        <p>Para mantener su calidad, es recomendable lavarlas a baja temperatura y evitar el uso de suavizantes, ya que estos pueden afectar las propiedades de los materiales.</p> 
      </div> 
    </details>
    
  </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const dots = document.querySelectorAll('.dot');
        const path = window.location.pathname;

        // Definir las rutas que tendrán los puntos negros
        const blackDotPaths = ['/01', '/03', '/04'];

        // Recorrer los dots y verificar la ruta actual
        dots.forEach((dot, index) => {
            const sectionPath = dot.getAttribute('href'); // Obtiene el href del dot como "#01"

            if (blackDotPaths.includes(sectionPath.replace('#', '/'))) {
                dot.style.borderColor = '#000'; // Cambiar borde a negro
                dot.style.backgroundColor = '#000'; // Fondo negro
            } else {
                dot.style.borderColor = '#fff'; // Cambiar borde a blanco
                dot.style.backgroundColor = 'transparent'; // Fondo transparente
            }
        });
    });
</script>

      <app-footer></app-footer>
    `;

    new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      
    });
    
    
   


    new Swiper(".swiper2", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

  }
}
