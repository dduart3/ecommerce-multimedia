import { Component } from "../Component";

export class ScrollToTop extends Component {
  protected render(): void {
    this.setTemplate(/*html*/`
      <button id="scroll-top" 
              class="fixed bottom-8 right-8 bg-black text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    `);
  }

  protected onMount(): void {
    const button = this.querySelector("#scroll-top");

    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight) {
        button?.classList.remove("opacity-0");
      } else {
        button?.classList.add("opacity-0");
      }
    });

    button?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  protected onUnmount(): void {}
  protected onUpdate(): void {
    this.render();
  }
}

customElements.define("scroll-top", ScrollToTop);
