export abstract class Component extends HTMLElement {
  constructor() {
    super();
  }

  protected abstract render(): void;
  protected abstract onMount(): void;
  protected abstract onUnmount(): void;
  protected abstract onUpdate(): void;

  disconnectedCallback(): void {
    this.onUnmount();
  }

  connectedCallback(): void {
    this.render();
    this.onMount();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.onUpdate();
  }

  protected setTemplate(template: string): void {
    this.innerHTML = template;
  }
}
