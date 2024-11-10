import { loadStripe, Stripe } from '@stripe/stripe-js';
import { stripeApi } from './../config/stripe';
import { getEpochTimeSinceHoursAgo } from '../utils/helpers';

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

  async getPaymentIntents() {
    const { data: response } = await stripeApi.get('/payment_intents',  {
      params: {
        limit: 20,
      },
    })
    return response.data;
  }

  async getCheckouts(customerEmail: string) {
    const { data: response } = await stripeApi.get('/checkout/sessions',  {
      params: {
        limit: 20,
        customer_details: {
          email: customerEmail,
        },
        created: {
          gte: getEpochTimeSinceHoursAgo(30)
        }
      },
    })
    return response.data;
  }

  async getCheckoutLineItems(id: string) {
    const { data: response } = await stripeApi.get(`/checkout/sessions/${id}/line_items`, {
      params: {
        limit: 20,
      },
    })
    return response.data;
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51QHymTIyj0lnLLZfDdYDsZClfxhhihJH1VUVdrycoxhvAT1xWyc7IpTOBv0F8aFpo7PCJSq2wowW3K5qRN8MNuu2009uAPLU7z');
    if (!this.stripe) {
      throw new Error('Stripe initialization failed');
    }
    console.log('Stripe initialized successfully');
  }
}


