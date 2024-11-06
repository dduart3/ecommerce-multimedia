import { HomePage } from "../pages/Home";
import { ProductsPage } from "../pages/Products";
import { CartPage } from "../pages/Cart";
import { CheckoutPage } from "../pages/Checkout";
import { UserProfilePage } from "../pages/UserProfile";
import { OrderHistoryPage } from "../pages/OrderHistory";
import { NotFoundPage } from "../pages/NotFound";
import { Page } from "../pages/Page";

export class Router {
  private routes: Map<string, Page>;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) throw new Error("Container not found");

    this.routes = new Map<string, Page>([
      ["/", new HomePage(containerId)],
      ["/products", new ProductsPage(containerId)],
      ["/cart", new CartPage(containerId)],
      ["/checkout", new CheckoutPage(containerId)],
      ["/profile", new UserProfilePage(containerId)],
      ["/orders", new OrderHistoryPage(containerId)],
      ["/not-found", new NotFoundPage(containerId)],
    ]);

    this.initializeRouter();
  }

  private initializeRouter() {
    window.addEventListener("popstate", () => this.handleRoute());

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.matches("[data-link]")) {
        e.preventDefault();
        this.navigateTo(target.getAttribute("href") || "/");
      }
    });

    // Handle initial route
    this.handleRoute();
  }

  private async handleRoute() {
    const path = window.location.pathname;
    const page = this.routes.get(path) || this.routes.get("/not-found");

    if (page) {
      page.render();
    }
  }

  private navigateTo(path: string) {
    window.history.pushState(null, "", path);
    this.handleRoute();
  }
}
