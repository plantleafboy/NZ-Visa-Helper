"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookFulfilment = exports.getCheckoutStatus = exports.createSession = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailerConfig_1 = require("../utilities/nodemailerConfig");
dotenv_1.default.config();
// TODO: set up production key when redeployed
const stripe = new stripe_1.default(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});
function fulfillCheckout(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        logger_1.default.info('Fulfilling Checkout Session ' + sessionId);
        // TODO: Make this function safe to run multiple times,
        // even concurrently, with the same session ID
        // TODO: Make sure fulfillment hasn't already been
        // disable payment button afterwards for such users? embedded checkout handles?
        // performed for this Checkout Session if (axios.get().then.. check user.fulfilled from DB).
        // Retrieve the Checkout Session from the API with line_items expanded
        const checkoutSession = yield stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items'],
        });
        // Check the Checkout Session's payment_status property
        // to determine if fulfillment should be performed
        if (checkoutSession.payment_status !== 'unpaid') {
            // TODO: Perform fulfillment of the line items
            try {
                yield (0, nodemailerConfig_1.sendEmailWithoutParameters)(); // change to correct email function
            }
            catch (e) {
                logger_1.default.error('Error sending email:', e);
            }
            // TODO: Record/save fulfillment status for this Checkout Session save IN USER DB
        }
    });
}
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            // payment_method_types: ['card'], FOR EXTRA PAYMENT TYPES
            line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'consultation',
                        },
                        unit_amount: 6000,
                    },
                    quantity: 1,
                }],
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: `${req.headers.origin}/order-outcome/return?session_id={CHECKOUT_SESSION_ID}` // make server page (url)
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ id: session.id, clientSecret: session.client_secret });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.createSession = createSession;
const getCheckoutStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('enter function here');
    const session = yield stripe.checkout.sessions.retrieve(req.query.session_id);
    logger_1.default.info(req.query.session_id);
    res.send({
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details.email
    });
});
exports.getCheckoutStatus = getCheckoutStatus;
// Use the secret provided by Stripe CLI for local testing
// or your webhook endpoint's secret.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const webhookFulfilment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Received > webhook req.body", req.body);
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    }
    catch (err) {
        logger_1.default.error('fail on construction ', err.message);
        return res.status(400).send(`Webhook construct event Error: ${err.message}`);
    }
    // since we use checkout API from stripe, we can expect these events
    if (event.type === 'checkout.session.completed'
        || event.type === 'checkout.session.async_payment_succeeded') {
        logger_1.default.info('Checkout session was completed!');
        yield fulfillCheckout(event.data.object.id);
    }
    // alternative webhook wevents, hoewever should not be applicable to us TODO: if needed, finish alternative flow(s)
    else if (event.type === 'payment_intent.succeeded') { // TODO: confirm what data is required and where it is retrieved from
        logger_1.default.info('PaymentIntent was successful!');
        const checkoutSessions = yield stripe.checkout.sessions.list({
            payment_intent: event.data.object.id,
        });
        if (checkoutSessions.data.length > 0) {
            const session = checkoutSessions.data[0];
            logger_1.default.info('Found Checkout Session:', session);
        }
        else {
            logger_1.default.error('No Checkout Session associated with this Payment Intent');
        }
    }
    res.status(200).end();
    logger_1.default.info('fulfilled');
});
exports.webhookFulfilment = webhookFulfilment;
//# sourceMappingURL=stripe.controller.js.map