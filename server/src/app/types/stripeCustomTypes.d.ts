type StripeFulfillmentData = {
    sessionId: string;
    paymentStatus: string;
    amountTotal: number | null;
    currency: string | null;
    customerEmail: string | undefined;
    customerName: string | undefined; 
    paymentIntentId: string | null;
}
