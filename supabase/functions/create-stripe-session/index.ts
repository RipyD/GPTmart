import { serve } from 'https://deno.land/std/http/server.ts';
import Stripe from 'https://esm.sh/stripe?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2022-11-15',
});

serve(async (req) => {
  try {
    const { user_id, email, price_id } = await req.json();

    if (!price_id || !email) {
      return new Response(JSON.stringify({ error: 'Missing required data' }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id, // <-- dynamic pricing
          quantity: 1,
        },
      ],
      success_url: 'https://gptmart.ai/success',
      cancel_url: 'https://gptmart.ai/cancel',
      customer_email: email,
      metadata: {
        user_id,
        plan: price_id,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Stripe session error:', err);
    return new Response(JSON.stringify({ error: 'Failed to create Stripe session' }), {
      status: 500,
    });
  }
});
