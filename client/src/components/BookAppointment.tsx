import {Box} from "@mui/material";
import StripeEmbeddedCheckout from "./StripeEmbeddedCheckout";
import dotenv from 'dotenv';
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

const BookAppointment = () => {

    async function fulfillCheckout(sessionId) {
        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require('stripe')('STRIPE_TEST_SECRET_KEY');

        console.log('Fulfilling Checkout Session ' + sessionId);

        // TODO: Make this function safe to run multiple times,
        // even concurrently, with the same session ID

        // TODO: Make sure fulfillment hasn't already been
        //disable payment button afterwards for such users? embedded checkout handles?
        // performed for this Checkout Session if (axios.get().then.. check user.fulfilled from DB).

        // Retrieve the Checkout Session from the API with line_items expanded
        const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items'],
        });

        // Check the Checkout Session's payment_status property
        // to determine if fulfillment should be peformed
        if (checkoutSession.payment_status !== 'unpaid') {
            // TODO: Perform fulfillment of the line items

            // TODO: Record/save fulfillment status for this
            // Checkout Session
        }
    }





    return (
        <Box>Book with us
            <StripeEmbeddedCheckout></StripeEmbeddedCheckout>
        </Box>
    )
}

export default BookAppointment;