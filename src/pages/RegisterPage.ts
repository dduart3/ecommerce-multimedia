import { Page } from "./Page";
import { AuthState } from "../state/AuthState";
import { AuthOperationResult, AuthOperationResultMessage } from "../utils/validators";
import { showToast } from "../utils/toast";

export class RegisterPage extends Page {
  private authState: AuthState;

  constructor(containerId: string) {
    super(containerId);
    this.authState = AuthState.getInstance();
  }

  async render(): Promise<void> {
    this.container.innerHTML = /*html*/ `
      <div class="flex min-h-screen bg-stone-950">

<a href="/login"
  class="absolute h-16 w-16 ml-7 mt-10 bg-black rounded-full border-4 border-white flex items-center justify-center hover:bg-primary hover:scale-110 transition-all ease-in-out">
  <svg class="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none"
    viewBox="0 0 24 24">
    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M5 12h14M5 12l4-4m-4 4 4 4" />
  </svg>
  </a>
<div class="flex-1 bg-cover bg-center"
  style="background-image: url('./src/assets/images/RegisterBackground.png')"></div>
<div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="flex flex-col items-center">
    <img src="./src/assets/images/logo.png" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-white font-orbitron">
      Registrarse
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
            <input id="firstName" name="firstName" type="text" autocomplete="given-name" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm" />
          </div>
          <div class="flex-1">
            <label for="lastName" class="block text-sm font-medium text white">
              Apellido
            </label>
            <input id="lastName" name="lastName" type="text" autocomplete="family-name" required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text white">
            Correo Electrónico
          </label>
          <input id="email" name="email" type="email" autocomplete="email" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text white">
            Contraseña
          </label>
          <div class="mt-1 relative">
            <input id="password" name="password" type="password" autocomplete="new-password" required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm" />
            <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center toggle-password">

            </button>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text white">
            Confirmar Contraseña
          </label>
          <div class="mt-1 relative">
            <input id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm" />
            <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center toggle-password">

            </button>
          </div>
        </div>

        <div>
          <button type="submit"
            class="w-full flex justify-center py-2 px-4  bo-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity- disabled:cursor-not-arder-transparent rounded-md shadow-sm text-sm font-medium textllowed">
            Registrarse
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
    `;

    const form = document.querySelector("form");
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
    const firstNameInput = document.getElementById("firstName") as HTMLInputElement;
    const lasttNameInput = document.getElementById("lastName") as HTMLInputElement;
    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      submitButton.disabled = true;

      const result = await this.authState.register({
        email: emailInput.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value,
        firstName: firstNameInput.value,
        lastName: lasttNameInput.value,
      });

      if (result === AuthOperationResult.SUCCESS) {
        showToast({message: AuthOperationResultMessage[result], type: "success"});
        window.location.href = "/";
      } else {
        showToast({message: AuthOperationResultMessage[result], type: "error"});
      }

      submitButton.disabled = false;
    });
  }

}

