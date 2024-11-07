import { loadStripe, Stripe } from '@stripe/stripe-js';

export class StripeService {
  private static instance: StripeService;
  public stripe: Stripe | null;

  private constructor() {
    this.stripe = null;
    this.initializeStripe();
  }

  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51QHymTIyj0lnLLZfDdYDsZClfxhhihJH1VUVdrycoxhvAT1xWyc7IpTOBv0F8aFpo7PCJSq2wowW3K5qRN8MNuu2009uAPLU7z');
    if (!this.stripe) {
      throw new Error('Stripe initialization failed');
    }
    console.log('Stripe initialized successfully');
  }

  async getProducts() {
    const response = await fetch('https://api.stripe.com/v1/products', {
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_PUBLIC_KEY}`,
      }
    });

    const { data: products } = await response.json();
    
    const productsWithPrices = await Promise.all(
      products.map(async (product: any) => {
        const priceResponse = await fetch(`https://api.stripe.com/v1/prices?product=${product.id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.STRIPE_PUBLIC_KEY}`,
          }
        });
        const { data: prices } = await priceResponse.json();
        return { ...product, price: prices[0] };
      })
    );

    return productsWithPrices;
  }


  async redirectToCheckout(sessionId: string) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }
    
    const result = await this.stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  }
}


