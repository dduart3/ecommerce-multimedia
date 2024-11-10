import axios, { AxiosError } from 'axios';

const stripeApi = axios.create({
  baseURL: 'https://api.stripe.com/v1',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
});

stripeApi.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error('Invalid API key');
        case 404:
          throw new Error('Resource not found');
        case 429:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error((data as any).error?.message || 'An error occurred');
      }
    }
    throw error;
  });

export { stripeApi };