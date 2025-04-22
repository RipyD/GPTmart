import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleUpgrade = async () => {
    try {
      const endpoint =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:54321/functions/v1/create-stripe-session'
          : 'https://YOUR_PROJECT_REF.functions.supabase.co/create-stripe-session'; // <-- Replace with your actual project ref

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id,
          email: user?.email
        }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        alert("❌ Failed to redirect to Stripe.");
      }
    } catch (error) {
      console.error("Stripe Error:", error);
      alert("An error occurred while creating the Stripe session.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e0f1a] to-[#1c1e2c] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-4">Choose Your Plan</h1>
        <p className="text-gray-400 mb-16 text-lg">
          Whether you're just getting started or scaling your AI empire, GPTmart has you covered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Free Tier */}
          <div className="bg-[#121a2c] border border-gray-600 rounded-2xl p-8 shadow-xl hover:shadow-purple-500/20 transition">
            <h2 className="text-3xl font-bold text-green-400 mb-2">Free</h2>
            <p className="text-gray-300 mb-6 text-sm">Best for testing the waters or casually listing GPTs.</p>
            <ul className="text-left space-y-3 text-sm text-gray-300 mb-8">
              <li>✅ Unlimited GPT uploads</li>
              <li>✅ Basic analytics (views, rentals, revenue)</li>
              <li>✅ Stripe-powered rentals</li>
              <li>❌ No traffic or conversion insights</li>
              <li>❌ No homepage boosting or badges</li>
            </ul>
            <div className="text-2xl font-semibold text-white mb-4">$0<span className="text-sm text-gray-400">/month</span></div>
            <Link
              to="/dashboard"
              className="inline-block bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
            >
              Start for Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 border border-purple-400 rounded-2xl p-8 shadow-xl hover:shadow-pink-500/30 transition">
            <h2 className="text-3xl font-bold text-white mb-2">Pro</h2>
            <p className="text-white/90 mb-6 text-sm">Everything you need to grow, monetize, and scale.</p>
            <ul className="text-left space-y-3 text-sm text-white mb-8">
              <li>✅ All Free features</li>
              <li>✅ Advanced analytics (funnels, sources, trends)</li>
              <li>✅ Featured Creator badge</li>
              <li>✅ Priority placement in marketplace</li>
              <li>✅ Early access to new tools</li>
            </ul>
            <div className="text-2xl font-semibold text-white mb-4">$10<span className="text-sm text-white/80">/month</span></div>
            <button
              onClick={handleUpgrade}
              className="inline-block bg-white text-purple-700 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              🔓 Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
