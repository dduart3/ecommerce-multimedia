export class Header extends HTMLElement {
  constructor() {
      super();
      this.render();
      this.addNavigationListeners();
  }

  private addNavigationListeners() {
      const navLinks = this.querySelectorAll('nav a');
      navLinks.forEach(link => {
          link.setAttribute('data-link', '');
          link.addEventListener('click', (e) => {
              e.preventDefault();
              const href = link.getAttribute('href') || '/';
              window.history.pushState(null, '', href);
              window.dispatchEvent(new PopStateEvent('popstate'));
          });
      });
  }

  render() {
      this.innerHTML =/*html*/ `
      <header class="bg-transparent w-full ">
          <div class="container mx-auto px-4">
              <div class="flex items-center justify-between h-20">
                  <!-- Logo -->
                  <div class="flex-shrink-0">
                      <img src="/src/assets/images/logo.png" width="150" alt="Logo" class="h-12 w-auto">
                  </div>

                  <!-- Navbar -->
                  <nav class="hidden md:flex space-x-8">
                      <a href="/" class="hover:text-black font-medium transition-colors">INICIO</a>
                      <a href="/products" class="hover:text-black font-medium transition-colors">PRODUCTOS</a>
                      <a href="/about" class="hover:text-black font-medium transition-colors">NOSOTROS</a>
                      <a href="/contact" class="hover:text-black font-medium transition-colors">CONTACTO</a>
                  </nav>

                  <!-- Icons -->
                  <div class="flex items-center space-x-4">
                      <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </button>
                      
                      <a href="/cart" data-link class="p-2 hover:bg-gray-100 rounded-full transition-colors group">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:stroke-black" fill="none" viewBox="0 0 24 24" stroke="white">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                      </a>
                      
                      <a href="/profile" data-link class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                      </a>
                  </div>
              </div>
          </div>
      </header>
      `;
  }
}

customElements.define('app-header', Header);