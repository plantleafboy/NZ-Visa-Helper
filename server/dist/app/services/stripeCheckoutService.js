"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_TEST_SECRET_KEY);
// async function fulfillCheckout(sessionId: string) {
//     // Set your secret key. Remember to switch to your live secret key in production.
//     // See your keys here: https://dashboard.stripe.com/apikeys
//     Logger.info('Fulfilling Checkout Session ' + sessionId);
//
//     // TODO: Make this function safe to run multiple times,
//     // even concurrently, with the same session ID
//
//     // TODO: Make sure fulfillment hasn't already been
//     // disable payment button afterwards for such users? embedded checkout handles?
//     // performed for this Checkout Session if (axios.get().then.. check user.fulfilled from DB).
//
//     // Retrieve the Checkout Session from the API with line_items expanded
//     const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
//         expand: ['line_items'],
//     });
//
//     // Check the Checkout Session's payment_status property
//     // to determine if fulfillment should be performed
//     if (checkoutSession.payment_status !== 'unpaid') {
//         // TODO: Perform fulfillment of the line items
//         try {
//             await sendEmailWithoutParameters()
//         } catch (e) {
//             Logger.error('Error sending email:', e);
//         }
//
//
//         // TODO: Record/save fulfillment status for this Checkout Session
//     }
// }
// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//       line_items: [{
//           price_data: {
//               currency: 'usd',
//               product_data: {
//                   name: 'consultation',
//               },
//               unit_amount: 60,
//           },
//           quantity: 1,
//       }],
//       mode: 'payment',
//       ui_mode: 'embedded',
//       return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'   // use url
//     })
//     res.json({ id: session.id, client_secret: session.client_secret });
//     // res.send({clientSecret: session.client_secret});
// });
// app.listen(4242, () => Logger.info(`Listening on port ${4242}!`));
//# sourceMappingURL=stripeCheckoutService.js.map