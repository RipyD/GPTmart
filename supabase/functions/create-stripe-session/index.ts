// supabase/functions/create-stripe-session.ts

import { serve } from 'https://deno.land/std/http/server.ts';
import Stripe from 'https://esm.sh/stripe?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2022-11-15',
});

serve(async (req) => {
  try {
    const { user_id, email } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RGn1eBhEyGajSKTFjMJqho7', // ⬅️ Replace with your real Stripe Price ID
          quantity: 1,
        },
      ],
      success_url: 'https://gptmart.ai/success',
      cancel_url: 'https://gptmart.ai/cancel',
      customer_email: email,
      metadata: {
        user_id,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Stripe session error:', err);
    return new Response(JSON.stringify({ error: 'Failed to create session' }), {
      status: 500,
    });
  }
});
