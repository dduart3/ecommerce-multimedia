import { Page } from './Page';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export class LoginPage extends Page {
  private formData: FormData = {
    email: '',
    password: ''
  };
  private errors: FormErrors = {};
  private isLoading: boolean = false;

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `

    <div class="bg-slate-50">
        <div class="flex h-screen">
            <!-- Lado izquierdo - Imagen -->
        <div class="hidden lg:block lg:w-1/2">
       
        <!-- Boton para ir hacia atras -->
        <button class="absolute h-16 w-16 ml-7 mt-10 bg-black rounded-full border-4 border-white flex items-center justify-center hover:bg-primary hover:scale-110 transition-all ease-in-out"> 
                <svg class="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24"> 
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg> 
        </button>
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
                                <p id="email-error" class="mt-2 text-sm text-red-600"></p>
                            </div>
                            <div>
                                <label for="password" class="sr-only">Password</label>
                                <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                />
                                <p id="password-error" class="mt-2 text-sm text-red-600"></p>
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
                
                <div class="text-sm">
                    <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                        ¿Olvidaste tu contraseña?
                    </a>
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

    // Event Listener
    formElement.addEventListener('submit', (e) => this.handleSubmit(e));
    emailInput.addEventListener('input', (e) => this.handleChange(e));
    passwordInput.addEventListener('input', (e) => this.handleChange(e));
  }

  private handleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    this.formData = {
      ...this.formData,
      [name]: value
    };
    this.clearError(name);
  }

  private clearError(fieldName: string): void {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  private validateForm(): FormErrors {
    const newErrors: FormErrors = {};
    if (!this.formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
      newErrors.email = "Email incorrecto";
    }
    if (!this.formData.password) {
      newErrors.password = "Ingresa una contraseña";
    }
    return newErrors;
  }

  private setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    submitButton.disabled = isLoading;
    submitButton.innerHTML = isLoading 
      ? `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
         </svg> Signing in...`
      : 'Sign in';
  }

  private showErrors(errors: FormErrors): void {
    Object.entries(errors).forEach(([field, message]) => {
      const errorElement = document.getElementById(`${field}-error`);
      if (errorElement) {
        errorElement.textContent = message;
      }
    });
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const newErrors = this.validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      this.setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', this.formData);
        // Here you would typically send the data to your backend
        alert('Inicio de sesión exitoso');
      } catch (error) {
        console.error("Error al iniciar sesion:", error);
        alert('Error al intentar iniciar sesion');
      } finally {
        this.setLoading(false);
      }
    } else {
      this.showErrors(newErrors);
    }
  }
}