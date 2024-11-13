import { ProductController } from "../controllers/ProductController";
import { CartState } from "../state/CartState";
import { Page } from "./Page";

export class ProductPage extends Page {
  private productId: string;
  private productController: ProductController;
  private cartState: CartState;

  constructor(containerId: string, productId: string) {
    super(containerId);
    this.productId = productId;
    this.productController = new ProductController();
    this.cartState = CartState.getInstance();
  }

  async render(): Promise<void> {
    const product = await this.productController.getProduct(this.productId);

    this.container.innerHTML = /*html*/ `
      <app-header class=""></app-header>
      <div class="min-h-screen bg-dark pt-36 text-black ">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex gap-8">
              <!-- Product Image -->
              <div class="w-1/2">
                <div class="aspect-w-1 aspect-h-1">
                  <img src="/src/assets/images/products/${product.imageUrl}" 
                       alt="${product.name}" 
                       class="w-full h-[400px] object-contain bg-gray-50 rounded-lg">
                </div>
              </div>
              
              <!-- Product Info -->
              <div class="w-1/2 font-orbitron">
                <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
                <p class="text-4xl font-bold mb-6">$${product.price}</p>
                <p class="text-gray-600 mb-6">${product.description}</p>
                
                <div class="mb-6">
                  <span class="text-sm font-thin text-black">Stock: ${product.stock}</span>
                              <!-- Quantity Selector -->
                  <div class="flex items-center space-x-4 mt-4">
                    <button id="decrease-qty" class="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                      -
                    </button>
                    <span id="quantity" class="text-xl font-bold">1</span>
                    <button id="increase-qty" class="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                      +
                    </button>
                  </div>
                </div>

                <button class="add-to-cart w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                        ${product.stock === 0 ? 'disabled' : ''}>
                  ${product.stock === 0 ? 'No disponible' : 'Añadir al carrito'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupCartButton();
  }
private setupCartButton(): void {
    const addToCartButton = this.container.querySelector('.add-to-cart');
    const decreaseBtn = this.container.querySelector('#decrease-qty');
    const increaseBtn = this.container.querySelector('#increase-qty');
    const quantitySpan = this.container.querySelector('#quantity');
    let quantity = 1;

    // Update initial quantity if product is already in cart
    const currentCartItem = this.cartState.getItems().get(this.productId);
    if (currentCartItem) {
        quantity = currentCartItem.quantity;
        if (quantitySpan) quantitySpan.textContent = quantity.toString();
    }

    const updateQuantityWithAnimation = (newValue: number) => {
        if (quantitySpan) {
            quantitySpan.classList.add('scale-125', 'text-primary');
            quantitySpan.textContent = newValue.toString();
            setTimeout(() => {
                quantitySpan.classList.remove('scale-125', 'text-primary');
            }, 200);
        }
    };

    decreaseBtn?.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateQuantityWithAnimation(quantity);
            increaseBtn?.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        if (quantity === 1) {
            decreaseBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });

    increaseBtn?.addEventListener('click', async () => {
        const product = await this.productController.getProduct(this.productId);
        if (quantity < product.stock) {
            quantity++;
            updateQuantityWithAnimation(quantity);
            decreaseBtn?.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        if (quantity === product.stock) {
            increaseBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });

    addToCartButton?.addEventListener('click', async () => {
        const product = await this.productController.getProduct(this.productId);
        const isInCart = this.cartState.getItems().has(this.productId);
        
        if (isInCart) {
            this.cartState.updateQuantity(this.productId, quantity);
            addToCartButton.innerHTML = '✓ Carrito actualizado!';
        } else {
            this.cartState.addToCart(product, quantity);
            addToCartButton.innerHTML = '✓ Agregado!';
        }
        
        addToCartButton.classList.add('bg-green-600');
        
        setTimeout(() => {
            addToCartButton.innerHTML = 'Añadir al carrito';
            addToCartButton.classList.remove('bg-green-600');
        }, 1000);

        const cartIcon = document.querySelector('cart-widget');
        cartIcon?.classList.add('animate-bounce');
        setTimeout(() => {
            cartIcon?.classList.remove('animate-bounce');
        }, 1000);
    });
  }
}