import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@11.15.0";

// Stripe Secret Key from Supabase environment variable
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { gpt_id, gpt_url, price_id, user_id, email } = await req.json();

    if (!gpt_id || !gpt_url || !price_id || !user_id || !email) {
      return new Response(JSON.stringify({ error: "Missing required GPT details" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      success_url: `https://gptmart.ai/success?gpt_url=${encodeURIComponent(gpt_url)}`,
      cancel_url: "https://gptmart.ai/cancel",
      customer_email: email,
      metadata: {
        gpt_id,
        user_id,
        gpt_url,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("❌ Stripe error:", err);
    return new Response(JSON.stringify({ error: "Stripe checkout failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
