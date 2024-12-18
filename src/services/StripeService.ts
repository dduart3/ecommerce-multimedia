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

  async getPaymentIntent(paymentIntentId: string) {
    const { data: response } = await stripeApi.get(`/payment_intents/${paymentIntentId}`, {
      params: {
        expand: ['latest_charge'],
      },
    });
    if (!response) {
      return null;
    }
    return response as IPaymentIntent
  }

  async getLastCheckout(customerEmail: string) {
    const { data: response } = await stripeApi.get('/checkout/sessions',  {
      params: {
        limit: 1,
        customer_details: {
          email: customerEmail,
        },
        status: 'complete',
        created: {
          gte: getEpochTimeSinceHoursAgo(1)
        },
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
    this.stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    if (!this.stripe) {
      throw new Error('Stripe initialization failed');
    }
    console.log('Stripe initialized successfully');
  }
}


