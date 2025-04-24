import { serve } from 'https://deno.land/std/http/server.ts';
import Stripe from 'https://esm.sh/stripe?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2022-11-15',
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const { user_id, email, price_id, gpt_url, gpt_id } = await req.json();

    if (!price_id || !email || !gpt_url || !gpt_id || !user_id) {
      return new Response(JSON.stringify({ error: 'Missing required data' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // ✅ Log for sanity check
    console.log('✅ Creating session with gpt_url:', gpt_url);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      success_url: `https://gptmart.ai/success?gpt_url=${encodeURIComponent(gpt_url)}`,
      cancel_url: 'https://gptmart.ai/cancel',
      customer_email: email,
      metadata: {
        user_id,
        gpt_id,
        plan: price_id,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (err) {
    console.error('❌ Stripe session error:', err);
    return new Response(JSON.stringify({ error: 'Failed to create Stripe session' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
});
