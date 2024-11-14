import { Page } from "./Page";

export class PrivacyPage extends Page {
    async render(): Promise<void> {
        this.container.innerHTML = /*html*/`
            <app-header></app-header>
            <div class="min-h-screen py-24 text-black">
                <div class="container mx-auto px-4 max-w-4xl">
                    <div class="bg-white rounded-xl shadow-lg p-8">
                        <h1 class="text-3xl font-bold mb-8 font-orbitron">Política de Privacidad</h1>
                        <div class="space-y-6 text-gray-700 font-oxygen">
                            <p>Última actualización: ${new Date().toLocaleDateString()}</p>
                            
                            <h2 class="text-xl font-bold mt-6">1. Información que Recopilamos</h2>
                            <p>Recopilamos información que usted nos proporciona directamente cuando:</p>
                            <ul class="list-disc pl-6 space-y-2">
                                <li>Crea una cuenta</li>
                                <li>Realiza una compra</li>
                                <li>Se suscribe a nuestro boletín</li>
                                <li>Contacta con nuestro servicio al cliente</li>
                            </ul>

                            <h2 class="text-xl font-bold mt-6">2. Uso de la Información</h2>
                            <p>Utilizamos la información recopilada para:</p>
                            <ul class="list-disc pl-6 space-y-2">
                                <li>Procesar sus pedidos</li>
                                <li>Enviar actualizaciones sobre sus compras</li>
                                <li>Mejorar nuestros servicios</li>
                                <li>Personalizar su experiencia</li>
                            </ul>

                            <h2 class="text-xl font-bold mt-6">3. Protección de Datos</h2>
                            <p>Implementamos medidas de seguridad para proteger su información personal contra acceso no autorizado y uso indebido.</p>
                        </div>
                    </div>
                </div>
            </div>
            <app-footer></app-footer>
        `;
    }
}
