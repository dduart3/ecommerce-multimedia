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


