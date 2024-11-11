import { loadStripe, Stripe } from '@stripe/stripe-js';
import { stripeApi } from './../config/stripe';
import { getEpochTimeSinceHoursAgo } from '../utils/helpers';
import { ICheckoutSession, IPaymentIntent } from '../interfaces/StripeInterfaces';

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

  async getLastPaymentIntent() {
    const { data: response } = await stripeApi.get('/payment_intents',  {
      params: {
        limit: 1,
      },
    });
    if (!response.data.length) {
      return null;
    }
    return response.data[0] as IPaymentIntent
  }

  async getLastCheckout(customerEmail: string) {
    const { data: response } = await stripeApi.get('/checkout/sessions',  {
      params: {
        limit: 1,
        customer_details: {
          email: customerEmail,
        },
        created: {
          gte: getEpochTimeSinceHoursAgo(30)
        }
      },
    });
    if (!response.data.length) {
      return null;
    }
    return response.data[0] as ICheckoutSession
  }

  async getCheckoutLineItems(id: string) {
    const { data: response } = await stripeApi.get(`/checkout/sessions/${id}/line_items`, {
      params: {
        limit: 100,
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


