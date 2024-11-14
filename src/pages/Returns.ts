import { Page } from "./Page";

export class ReturnsPage extends Page {
    async render(): Promise<void> {
        this.container.innerHTML = /*html*/`
            <app-header></app-header>
            <div class="min-h-screen py-24 text-black">
                <div class="container mx-auto px-4 max-w-4xl">
                    <div class="bg-white rounded-xl shadow-lg p-8">
                        <h1 class="text-3xl font-bold mb-8 font-orbitron">Política de Devoluciones</h1>
                        <div class="space-y-6 text-gray-700 font-oxygen">
                            <h2 class="text-xl font-bold mt-6">1. Plazo de Devolución</h2>
                            <p>Aceptamos devoluciones dentro de los 30 días posteriores a la compra. Los artículos deben estar sin usar y en su empaque original.</p>

                            <h2 class="text-xl font-bold mt-6">2. Proceso de Devolución</h2>
                            <ol class="list-decimal pl-6 space-y-2">
                                <li>Contacte a nuestro servicio al cliente</li>
                                <li>Reciba su número de autorización de devolución</li>
                                <li>Empaque el artículo de forma segura</li>
                                <li>Envíe el artículo a la dirección proporcionada</li>
                            </ol>

                            <h2 class="text-xl font-bold mt-6">3. Reembolsos</h2>
                            <p>Los reembolsos se procesarán en un plazo de 5-10 días hábiles después de recibir el artículo devuelto.</p>

                            <h2 class="text-xl font-bold mt-6">4. Artículos No Retornables</h2>
                            <ul class="list-disc pl-6 space-y-2">
                                <li>Artículos en oferta o liquidación</li>
                                <li>Productos personalizados</li>
                                <li>Artículos dañados por mal uso</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <app-footer></app-footer>

        `;
    }
}
