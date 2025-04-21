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
    const { gpt_id, gpt_name, gpt_price, gpt_url } = await req.json();

    if (!gpt_id || !gpt_name || !gpt_price || !gpt_url) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Rent GPT: ${gpt_name}`,
            },
            unit_amount: Math.round(gpt_price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success?gpt_url=${encodeURIComponent(gpt_url)}`,
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        gpt_id,
        gpt_name,
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
