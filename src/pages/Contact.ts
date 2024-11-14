import { Page } from "./Page";

export class ContactPage extends Page {
    async render(): Promise<void> {
        this.container.innerHTML = /*html*/`
            <app-header></app-header>
            <div class="min-h-screen bg-dark pt-24 text-black">
                <div class="container mx-auto px-4 max-w-6xl">
                    <!-- Contact Form Section -->
                    <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h1 class="text-3xl font-bold mb-8 font-orbitron text-center">Contáctanos</h1>
                        
                        <form id="contact-form" class="max-w-2xl mx-auto">
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                <input type="text" required
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                            </div>
                            
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" required
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                            </div>
                            
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                                <textarea required rows="4"
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"></textarea>
                            </div>
                            
                            <button type="submit" 
                                class="w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                    
                    <!-- Contact Info Section -->
                    <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <div class="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div class="mb-4">
                                    <svg class="w-8 h-8 mx-auto text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <h3 class="font-bold mb-2">Email</h3>
                                <p class="text-gray-600">contact@hadesx.com</p>
                            </div>
                            
                            <div>
                                <div class="mb-4">
                                    <svg class="w-8 h-8 mx-auto text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                </div>
                                <h3 class="font-bold mb-2">Teléfono</h3>
                                <p class="text-gray-600">+58-(414)-420-6969</p>
                            </div>
                            
                            <div>
                                <div class="mb-4">
                                    <svg class="w-8 h-8 mx-auto text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                                <h3 class="font-bold mb-2">Dirección</h3>
                                <p class="text-gray-600">C.C Sambil Maracaibo, Local 12</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Google Maps -->
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62728.602699699084!2d-71.69762213559034!3d10.692949099265986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e899eef9e9b7415%3A0x9e01f3869fc994db!2sMaracaibo%20Sambil%20Mall!5e0!3m2!1sen!2sve!4v1731605632464!5m2!1sen!2sve"
                        width="100%" 
                        height="450" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    </div>
                </div>
            </div>
        `;

        this.setupFormListener();
    }

    private setupFormListener(): void {
        const form = this.container.querySelector('#contact-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission
            console.log('Form submitted');
        });
    }
}
