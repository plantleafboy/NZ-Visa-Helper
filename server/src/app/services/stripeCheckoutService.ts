import express from 'express';
const app = express();
import dotenv from 'dotenv';
import {sendAppointmentEmail} from "../utilities/nodemailerConfig";
import Logger from '../../config/logger';
dotenv.config();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!);

//verifies checkout status using stripe functions + sends email (nodeMailerConfig)
async function fulfillCheckout(sessionId: string, req: Request) {
    //https://dashboard.stripe.com/apikeys
    Logger.info('Fulfilling Checkout Session (from stripeCheckoutService' + sessionId);
    Logger.info('Request: ', req);

    // TODO: Make this function safe to run multiple times,
    // even concurrently, with the same session ID

    // TODO: Make sure fulfillment hasn't already been
    // disable payment button afterwards for such users? embedded checkout handles?
    // performed for this Checkout Session if (axios.get().then.. check user.fulfilled from DB).

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    if (checkoutSession.payment_status !== 'unpaid') {
        try {
            await sendAppointmentEmail(req) // change to correct email function
        } catch (e) {
            Logger.error('Error sending email:', e);
        }

        // TODO: Record/save fulfillment status for this Checkout Session save IN USER DB
    }
}


export {fulfillCheckout} 