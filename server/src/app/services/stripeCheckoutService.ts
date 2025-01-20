import express from 'express';
const app = express();

const stripe = require('stripe')('sk_test_51QjIpJKgxsHSLKCZiTStjaURzKfkqiAutHv3X51Tp0bOzaihEohndITiG8jcgpjW00MdBdjamdp9AO3o9HQo6IRq003QsELXsT'
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