import express from 'express';
const app = express();
import dotenv from 'dotenv';
import {sendAppointmentEmail} from "../utilities/nodemailerConfig";
import Logger from '../../config/logger';
dotenv.config();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//verifies checkout status using stripe functions + sends email (nodeMailerConfig)
async function fulfillCheckout(sessionId: string, req: Request) {
    //https://dashboard.stripe.com/apikeys
    Logger.info('Found Checkout Session:  ' + sessionId);    

    // TODO: Make this function safe to run multiple times,
    // even concurrently, with the same session ID

    // TODO: Make sure fulfillment hasn't already been
    // disable payment button afterwards for such users? embedded checkout handles?
    // performed for this Checkout Session if (axios.get().then.. check user.fulfilled from DB).

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    const fulfillmentObject: StripeFulfillmentData = {
        sessionId: checkoutSession.id,
        paymentStatus: checkoutSession.payment_status,
        amountTotal: checkoutSession.amount_total,
        currency: checkoutSession.currency,
        customerEmail: checkoutSession.customer_details?.email ?? undefined,
        customerName: checkoutSession.customer_details?.name ?? undefined,
        paymentIntentId: checkoutSession.payment_intent as string | null,
    };
    
    // lineItems: checkoutSession.line_items?.data, // TODO: check if required.

    if (checkoutSession.payment_status === 'paid') {
        try {
            await sendAppointmentEmail(fulfillmentObject) // change to correct email function
        } catch (e) {
            Logger.error('Error sending fulfillment email:' + e);
        }
    }
    else {
        Logger.error('Error checkout payment status NOT paid!');
    }
        // TODO: Record/save fulfillment status for this Checkout Session save IN USER DB

    Logger.info('end of function - fulfillCheckout');

}

export {fulfillCheckout} 