export abstract class Page {
  protected container: HTMLElement;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) throw new Error(`Container ${containerId} not found`);
    this.container = element;
  }

  abstract render(): Promise<void>;

  protected onMount(): void {
    // Called after render
  }

  protected onUnmount(): void {
    // Cleanup before page change
  }

  protected onUpdate(): void {
    // Called when page needs to update
  }
}
