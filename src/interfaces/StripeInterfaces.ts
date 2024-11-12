export enum PaymentIntentStatus {
    CANCELED = 'canceled',
    SUCCEEDED = 'succeeded',
    REQUIRES_PAYMENT_METHOD = 'requires_payment_method'
}
export interface IPaymentIntent {
    id: string;
    currency: string;
    status: PaymentIntentStatus;
    created: number;
    description: string;
    metadata: {
      order_id: string;
    };
    latest_charge: {
      receipt_url: string;
    }
}

export interface ICheckoutSession {
    id: string;
    amount_total: number;
    customer_details: {
      email: string;
    };
    payment_status: string;
    created: number;
    payment_intent: string;
}