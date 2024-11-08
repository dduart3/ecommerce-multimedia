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
      <div class="w-full md:w-1/2 space-y-6 text-center md:text-left ">
        <p class="text-lg leading-relaxed font-semibold font-oxygen">
          At TechWear Future, we're not just selling clothes; we're crafting the future of fashion. Our cutting-edge designs blend form and function, pushing the boundaries of what's possible in urban apparel.
        </p>
        <p class="text-lg leading-relaxed font-oxygen font-semibold">
            Founded in 2025, we've been at the forefront of the techwear revolution, integrating advanced materials and smart technologies into everyday wear. Our mission is to empower individuals with clothing that adapts to the modern urban lifestyle.
        </p>
        <p class="text-lg leading-relaxed font-oxygen font-semibold">
            Join us in shaping the future of fashion, where style meets innovation, and every garment tells a story of progress and possibility.
        </p>
    </div>
</div>

<div class="mt-10 text-center">
    <a 
    href="#" 
    class="inline-block bg-blue-600 text-dark px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
    >
    
</a>
</div>
  </div>
</div>
</div>
`;
    }
  }
      
