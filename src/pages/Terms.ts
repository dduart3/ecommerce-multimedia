import { Page } from "./Page";

export class TermsPage extends Page {
    async render(): Promise<void> {
        this.container.innerHTML = /*html*/`
            <app-header></app-header>
            <div class="min-h-screen py-24 text-black">
                <div class="container mx-auto px-4 max-w-4xl">
                    <div class="bg-white rounded-xl shadow-lg p-8">
                        <h1 class="text-3xl font-bold mb-8 font-orbitron">Términos y Condiciones</h1>
                        <div class="space-y-6 text-gray-700 font-oxygen">
                            <p>Última actualización: ${new Date().toLocaleDateString()}</p>

                            <h2 class="text-xl font-bold mt-6">1. Aceptación de Términos</h2>
                            <p>Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad.</p>

                            <h2 class="text-xl font-bold mt-6">2. Uso del Sitio</h2>
                            <p>Usted acepta utilizar nuestro sitio web solo para propósitos legales y de manera que no infrinja los derechos de otros.</p>

                            <h2 class="text-xl font-bold mt-6">3. Cuentas de Usuario</h2>
                            <p>Al crear una cuenta, usted es responsable de mantener la confidencialidad de su cuenta y contraseña.</p>

                            <h2 class="text-xl font-bold mt-6">4. Precios y Disponibilidad</h2>
                            <p>Nos reservamos el derecho de modificar los precios y la disponibilidad de los productos sin previo aviso.</p>
                        </div>
                    </div>
                </div>
            </div>
            <app-footer></app-footer>

        `;
    }
}
