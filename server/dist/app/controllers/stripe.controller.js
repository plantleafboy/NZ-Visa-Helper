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
exports.testLog = exports.createSession = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});
const testLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("working query received");
});
exports.testLog = testLog;
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
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
            // success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            // cancel_url: `${req.headers.origin}/cancel`
            // https://docs.stripe.com/api/checkout/sessions/object
            return_url: `${req.headers.origin}/order-outcome/return?session_id={CHECKOUT_SESSION_ID}` // make server page (url)
        });
        res.setHeader('Content-Type', 'application/json');
        // res.status(200).json({ id: session.id });
        if (session.client_secret) {
            res.json({ clientSecret: session.client_secret });
        }
        else {
            res.status(500).json({ error: 'Client secret is missing from the session response.' });
        }
        // res.json({ id: session.id, clientSecret: session.client_secret, url: session.url });
        // res.send({clientSecret: session.client_secret});
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.createSession = createSession;
//# sourceMappingURL=stripe.controller.js.map