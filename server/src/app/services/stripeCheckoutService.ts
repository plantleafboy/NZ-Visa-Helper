import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY
);

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
      line_items: [{
          price_data: {
              currency: 'usd',
              product_data: {
                  name: 'consultation',
              },
              unit_amount: 60,
          },
          quantity: 1,
      }],
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'   //use url
    })

    res.send({clientSecret: session.client_secret});
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));