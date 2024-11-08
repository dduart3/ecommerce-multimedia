import { Page } from './Page';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firsName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string; 
}




export class RegisterPage extends Page {
  private formData: FormData = {
    
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  private errors: FormErrors = {};
  private isLoading: boolean = false;

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `

<div class="flex min-h-screen bg-stone-950">

        <button class="absolute h-16 w-16 ml-7 mt-10 bg-black rounded-full border-4 border-white flex items-center justify-center hover:bg-primary hover:scale-110 transition-all ease-in-out"> 
                <svg class="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24"> 
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg> 
        </button>
        <div class="flex-1 bg-cover bg-center" style="background-image: url('./src/assets/images/RegisterBackground.png')"></div>
        <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center">
                        <img src="./src/assets/images/logo.png"/>
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-white font-orbitron">
                            Iniciar sesión 
                        </h2>
                    </div>

          <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form class="space-y-6">
                <div class="flex gap-4">
                  <div class="flex-1">
                    <label for="firstName" class="block text-sm font-medium text-white">
                      Nombre
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autocomplete="given-name"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                    />
                    <p id="firstName-error" class="mt-2 text-sm text-red-600 error-message"></p>
                  </div>
                  <div class="flex-1">
                    <label for="lastName" class="block text-sm font-medium text white">
                      Apellido
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autocomplete="family-name"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                    />
                    <p id="lastName-error" class="mt-2 text-sm text-red-600 error-message"></p>
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text white">
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                  />
                  <p id="email-error" class="mt-2 text-sm text-red-600 error-message"></p>
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium text white">
                    Contraseña
                  </label>
                  <div class="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="new-password"
                      required
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center toggle-password"
                    >
                     
                    </button>
                  </div>
                  <p id="password-error" class="mt-2 text-sm text-red-600 error-message"></p>
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text white">
                    Confirmar Contraseña
                  </label>
                  <div class="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autocomplete="new-password"
                      required
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center toggle-password"
                    >
                     
                    </button>
                  </div>
                  <p id="confirmPassword-error" class="mt-2 text-sm text-red-600 error-message"></p>
                </div>

                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border bo-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity- disabled:cursor-not-arder-transparent rounded-md shadow-sm text-sm font-medium textllowed"
                  >
                    Registrar
                  </button>
                </div>
              </form>

              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">
                      O continua con
                    </span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">Sign in with Facebook</span>
                      <svg class="w-5 h-5" fill="blue" viewBox="0 0 20 20" aria-hidden="true">
                        <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">Sign in with Twitter</span>
                      <svg class="w-5 h-5" fill="blue" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">Sign in with GitHub</span>
                      <svg class="w-5 h-5" fill="blue" viewBox="0 0 20 20" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`;

    
  

 

  

 

}}