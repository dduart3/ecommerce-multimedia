import { Component } from '../Component';
import { ProductController } from '../../controllers/ProductController';
import { Product } from '../../models/Product';

export class SearchComponent extends Component {
    private productController: ProductController;
    private isOpen: boolean = false;

    constructor() {
        super();
        this.productController = new ProductController();
    }

    protected render(): void {
        this.setTemplate(/*html*/`
            <div class="relative">
                <button class="search-button p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                <div class="search-modal fixed inset-0 bg-black bg-opacity-50 z-50 ${this.isOpen ? '' : 'hidden'}">
                    <div class="bg-white mx-auto mt-20 max-w-2xl rounded-xl shadow-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-bold font-orbitron">Buscar Productos</h3>
                            <button class="close-search text-gray-500 hover:text-gray-700">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <input type="text" 
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
                            placeholder="Buscar productos..."
                            id="search-input">
                        <div id="search-results" class="mt-4 max-h-96 overflow-y-auto"></div>
                    </div>
                </div>
            </div>
        `);
        this.setupListeners();
    }

    protected onMount(): void {
        this.setupListeners();
    }

    private setupListeners(): void {
        const searchButton = this.querySelector('.search-button');
        const closeButton = this.querySelector('.close-search');
        const searchInput = this.querySelector('#search-input') as HTMLInputElement;

        searchButton?.addEventListener('click', () => {
            console.log('Search clicked');
            this.isOpen = true;
            this.render();
            (this.querySelector('#search-input') as HTMLInputElement)?.focus();
        });

        closeButton?.addEventListener('click', () => {
            console.log('Close clicked');
            this.isOpen = false;
            this.render();
        });

        let debounceTimer: number;
        searchInput?.addEventListener('input', () => {
            console.log('Input detected:', searchInput.value);
            clearTimeout(debounceTimer);
            debounceTimer = window.setTimeout(async () => {
                const searchTerm = searchInput.value;
                console.log('Searching for:', searchTerm);
                
                if (searchTerm.length < 2) {
                    console.log('Search term too short');
                    this.renderResults([]);
                    return;
                }
                
                const products = await this.productController.searchProducts(searchTerm);
                console.log('Found products:', products);
                this.renderResults(products);
            }, 300);
        });
    }
    private renderResults(products: Product[]): void {
        const resultsContainer = this.querySelector('#search-results');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = products.length ? products.map(product => /*html*/`
            <a href="/product/${product.id}" 
               class="flex items-center p-4 hover:bg-gray-50 transition-colors rounded-lg text-black">
                <img src="/src/assets/images/products/${product.imageUrl}" 
                     class="w-16 h-16 object-contain rounded">
                <div class="ml-4">
                    <h4 class="font-medium">${product.name}</h4>
                    <p class="text-sm text-gray-600">${product.getFormattedPrice()}</p>
                </div>
            </a>
        `).join('') : /*html*/`
            <p class="text-center text-gray-500 py-4">No se encontraron productos</p>
        `;
    }

    protected onUnmount(): void {}
    protected onUpdate(): void {}
}

customElements.define('search-widget', SearchComponent);
