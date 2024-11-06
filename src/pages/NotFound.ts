import { Page } from './Page';

export class NotFoundPage extends Page {
  async render(): Promise<void> {
    this.container.innerHTML = /* html */`
      <app-header></app-header>
      <div class="h-screen flex flex-col items-center justify-center">
        <h1 class="text-[120px] font-black">404</h1>
        <p class="text-2xl mb-8">Page not found</p>
        <a href="/" data-link class="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors">
          Back to Home
        </a>
      </div>
    `;
  }
}
