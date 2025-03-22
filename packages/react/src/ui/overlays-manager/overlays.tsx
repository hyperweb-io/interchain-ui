import uniqueId from "lodash/uniqueId";

export const OVERLAYS_MANAGER_ID = "interchain-ui-overlays-manager";

class Overlays {
  private static instance: Overlays;
  private overlayRoot: HTMLElement | null = null;
  private overlayStack: string[] = [];

  private constructor() {}

  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  public static getInstance(): Overlays {
    if (!Overlays.instance) {
      Overlays.instance = new Overlays();
    }
    return Overlays.instance;
  }

  get overlays(): string[] {
    return this.overlayStack;
  }

  public getOrCreateOverlayRoot(ownerDocument?: Document): HTMLElement | null {
    if (!Overlays.isBrowser()) {
      return null;
    }

    let doc = ownerDocument || document;

    if (!this.overlayRoot) {
      const root = document.createElement("div");
      root.id = OVERLAYS_MANAGER_ID;
      doc.body.appendChild(root);
      this.overlayRoot = root;
    }
    return this.overlayRoot;
  }

  public pushOverlay(id: string): void {
    this.overlayStack.push(id);
  }

  public popOverlay(id: string): void {
    const index = this.overlayStack.lastIndexOf(id);
    if (index !== -1) {
      this.overlayStack = this.overlayStack.slice(0, index);
    }
  }

  public isTopMostOverlay(id: string): boolean {
    return this.overlayStack[this.overlayStack.length - 1] === id;
  }

  public cleanup(): void {
    if (!Overlays.isBrowser() || !this.overlayRoot) {
      return;
    }

    document.body.removeChild(this.overlayRoot);
    this.overlayRoot = null;
    this.overlayStack = [];
  }

  public generateId(prefix: string = "overlay"): string {
    return uniqueId(`${prefix}-`);
  }
}

export const overlays = Overlays.getInstance();
