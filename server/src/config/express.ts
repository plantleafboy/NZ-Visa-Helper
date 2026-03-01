import express from "express"
import bodyParser from "body-parser"
import allowCrossOriginRequestsMiddleware from "../app/middleware/cors.middleware"
import Logger from "./logger"
import {rootUrl} from "../app/routes/base.routes";
import path from 'path';

export default () => {
    const app = express();
    
    app.use(express.static(path.join(__dirname, '../../client/build')));
    // Middleware
    app.use(allowCrossOriginRequestsMiddleware);
    app.use((req, res, next) => {
        if (req.originalUrl === '/api/v1/stripe/webhook') {
            Logger.info('Stripe webhook called via /api/v1');
            next();
        } else {
            bodyParser.json()(req, res, next);
        }
    });
    app.use(bodyParser.raw({type: 'text/plain'}));
    app.use(bodyParser.raw({type: ['image/*'], limit: '5mb'}));

    // Debug
    app.use((req, res, next) => {
        if(req.path !== '/'){
            Logger.http(`##### ${req.method} ${req.path} #####`);
        }
        next();
    });

    app.get('/heartbeat', (req, res) => {
        res.send({'message': 'I\'m alive!'});
    });

    app.get(rootUrl + '/heartbeat', (req, res) => {
        res.send({'message': 'I\'m alive!'});
    });

    app.get(rootUrl + '/testbeat', (req, res) => {
        res.send({'message': 'I\'m a new query!'});
    });

    // ROUTES
    require('../app/routes/backdoor.routes')(app);
    require('../app/routes/stripe.routes')(app);
    require('../app/routes/user.routes')(app);
    require('../app/routes/petition.routes')(app);
    require('../app/routes/email.routes')(app);

    return app;
}