"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_middleware_1 = __importDefault(require("../app/middleware/cors.middleware"));
const logger_1 = __importDefault(require("./logger"));
const base_routes_1 = require("../app/routes/base.routes");
exports.default = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use(cors_middleware_1.default);
    // app.use(bodyParser.json(
    //     {
    //         // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
    //         verify: function(req,res,buf) {
    //             var url = req.originalUrl;
    //             if (url.startsWith('/stripe-webhooks')) {
    //                 req.rawBody = buf.toString()
    //             }
    //
    // ));
    app.use((req, res, next) => {
        if (req.originalUrl === '/api/v1/stripe/webhook') {
            logger_1.default.info('Stripe webhook called via /api/v1');
            next();
        }
        else {
            body_parser_1.default.json()(req, res, next);
        }
    });
    app.use(body_parser_1.default.raw({ type: 'text/plain' }));
    app.use(body_parser_1.default.raw({ type: ['image/*'], limit: '5mb' }));
    // Debug
    app.use((req, res, next) => {
        if (req.path !== '/') {
            logger_1.default.http(`##### ${req.method} ${req.path} #####`);
        }
        next();
    });
    app.get('/heartbeat', (req, res) => {
        res.send({ 'message': 'I\'m alive!' });
    });
    app.get(base_routes_1.rootUrl + '/heartbeat', (req, res) => {
        res.send({ 'message': 'I\'m alive!' });
    });
    app.get(base_routes_1.rootUrl + '/testbeat', (req, res) => {
        res.send({ 'message': 'I\'m a new query!' });
    });
    // ROUTES
    require('../app/routes/backdoor.routes')(app);
    require('../app/routes/stripe.routes')(app);
    require('../app/routes/user.routes')(app);
    require('../app/routes/petition.routes')(app);
    require('../app/routes/email.routes')(app);
    return app;
};
//# sourceMappingURL=express.js.map