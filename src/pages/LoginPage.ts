import { Page } from './Page';
import { AuthState } from '../state/AuthState';
import { AuthOperationResult } from '../utils/validators';

export class LoginPage extends Page {
    private authState: AuthState;

    constructor(container: string) {
        super(container);
        this.authState = AuthState.getInstance();
    }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `

    <div class="bg-slate-50">
        <div class="flex h-screen">
            <!-- Lado izquierdo - Imagen -->
        <div class="hidden lg:block lg:w-1/2">
       
        <!-- Boton para ir hacia atras -->
        <a href="/" class="absolute h-16 w-16 ml-7 mt-10 bg-black rounded-full border-4 border-white flex items-center justify-center hover:bg-primary hover:scale-110 transition-all ease-in-out"> 
                <svg class="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24"> 
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg> 
        </a >
        <!-- termina el Boton -->  
        
                <img
                class="object-cover w-full h-full"
                src="./src/assets/images/LoginBackground.png"
                alt="Login background"
                />
            </div>
            
            <!-- Lado derecho - Formulario  -->
            <div class="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-8">
                <div class="w-full max-w-md space-y-8">
                    <div class="flex flex-col items-center">
                        <img src="./src/assets/images/logoblack.png"/>
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 font-orbitron">
                            Iniciar sesión 
                        </h2>
                    </div>
                    <form id="login-form" class="mt-8 space-y-6">
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="email-address" class="sr-only">Email</label>
                                <input
                                id="email-address"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Correo Electrónico"
                                />
                            </div>
                            <div>
                                <label for="password" class="sr-only">Contraseña</label>
                                <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                />
                </div>
            </div>
            
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                        Recuérdame
                    </label>
                </div>
                
                <div class="text-sm flex flex-col">
                    <a href="/register" class="font-medium text-blue-600 hover:text-blue-500">¿No tienes cuenta? Registrate</a>
                </div>
            </div>
            
            <div>
                <button
                id="submit-button"
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-dark hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Iniciar Sesion
            </button>
        </div>
    </form>
</div>
</div>
</div>
</div>
`;    
   const formElement = document.getElementById('login-form') as HTMLFormElement;
    const emailInput = document.getElementById('email-address') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    

    formElement.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Disable submit button while processing
      submitButton.disabled = true;

      const result = await this.authState.login({
        email: emailInput.value,
        password: passwordInput.value
      });

      if (result === AuthOperationResult.SUCCESS) {
        //window.location.href = '/'; // Redirect to home page after successful login
      } else {
        // Handle different error cases

      }

      submitButton.disabled = false;
    });
  }
   
  }
