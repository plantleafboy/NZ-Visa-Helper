"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const base_routes_1 = require("./base.routes");
const stripeCheckout = __importStar(require("../controllers/stripe.controller"));
module.exports = (app) => {
    app.route(base_routes_1.rootUrl + '/stripe/embedded-checkout')
        .post(stripeCheckout.createSession);
    // app.route(rootUrl+'/stripe/webhook')
    app.route(base_routes_1.rootUrl + '/stripe/session-status')
        .get(stripeCheckout.getCheckoutStatus);
    app.post(base_routes_1.rootUrl + '/stripe/webhook', express_1.default.raw({ type: 'application/json' }), // apply middleware to parse raw body
    stripeCheckout.webhookFulfilment);
    // app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    //     let event = request.body;
    //     // Only verify the event if you have an endpoint secret defined.
    //     // Otherwise use the basic event deserialized with JSON.parse
    //     if (endpointSecret) {
    //         // Get the signature sent by Stripe
    //         const signature = request.headers['stripe-signature'];
    //         try {
    //             event = stripe.webhooks.constructEvent(
    //                 request.body,
    //                 signature,
    //                 endpointSecret
    //             );
    //         } catch (err) {
    //             console.log(`⚠️  Webhook signature verification failed.`, err.message);
    //             return response.sendStatus(400);
    //         }
    //     }
    //
    //     // Handle the event
    //     switch (event.type) {
    //         case 'payment_intent.succeeded':
    //             const paymentIntent = event.data.object;
    //             console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    //             // Then define and call a method to handle the successful payment intent.
    //             // handlePaymentIntentSucceeded(paymentIntent);
    //             break;
    //         case 'payment_method.attached':
    //             const paymentMethod = event.data.object;
    //             // Then define and call a method to handle the successful attachment of a PaymentMethod.
    //             // handlePaymentMethodAttached(paymentMethod);
    //             break;
    //         default:
    //             // Unexpected event type
    //             console.log(`Unhandled event type ${event.type}.`);
    //     }
    //
    //     // Return a 200 response to acknowledge receipt of the event
    //     response.send();
    // });
};
//# sourceMappingURL=stripe.routes.js.map