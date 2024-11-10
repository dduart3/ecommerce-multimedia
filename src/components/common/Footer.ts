export class Footer extends HTMLElement {

constructor(){

    super();
    this.render()
    
}
    render() {
        this.innerHTML = /*html*/ `
        <footer class="bg-dark h-78 flex flex-col justify-between">
        <div class="pl-9 pt-5 flex justify-between">
          <!-- Logo, redes sociales e imagenes -->
          <div class="pt-19">
            <a href="/"><img src="./src/assets/images/logo.png" class="pb-16"/></a> 
            <p class="font-orbitron text-[20px]">Síguenos en nuestras redes</p>
            <div class="flex gap-3 pt-6">
              <!-- Iconos de redes sociales -->
              <svg
                class="w-10 h-10 bg-white rounded-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="blue"
                  fill-rule="evenodd"
                  d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="w-10 h-10 p-1 bg-white rounded-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="blue"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
              <svg
                class="w-10 h-10 p-1 bg-white rounded-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="blue"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="w-10 h-10 p-2 bg-white rounded-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="blue"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"
                />
              </svg>
            </div>
          </div>

          <!-- Menú de navegación -->
          <div class="font-oxygen font-semibold text-right pr-10 pt-16 text-[20px]">
            <ul>
              <li class="pb-2"><a href="/about">Nosotros</a></li>
              <li class="pb-2"><a href="/privacy">Políticas de privacidad</a></li>
              <li class="pb-2"><a href="/terms">Términos y condiciones</a></li>
              <li class="pb-2"><a href="/returns">Políticas de devolución</a></li>
            </ul>
          </div>
        </div>

        <!-- Texto centrado al final del footer -->
        <div class="text-center pb-4">
          <p class="font-oxygen font-semibold">
            © ${new Date().getFullYear()} HadesX® Todos Los Derechos Reservados.
          </p>
        </div>
      </footer>
    `;
}

}
customElements.define('app-footer',Footer);