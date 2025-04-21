// src/pages/GptDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const placeholder = 'https://via.placeholder.com/600x300.png?text=GPT+Preview';

const GptDetail = () => {
  const { id } = useParams();
  const [gpt, setGpt] = useState(null);
  const [user, setUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: gptData, error: gptError } = await supabase.from('gpts').select('*').eq('id', id).single();
      if (!gptError) setGpt(gptData);

      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        setUser(userData.user);
        const { data: purchase } = await supabase
          .from('purchases')
          .select('*')
          .eq('user_id', userData.user.id)
          .eq('gpt_id', id)
          .maybeSingle();
        setHasAccess(!!purchase);
      }
    };
    fetchData();
  }, [id]);

  const handleRentClick = async () => {
    try {
      const session = await supabase.auth.getSession();
      const access_token = session?.data?.session?.access_token;

      if (!access_token) {
        alert('❌ You must be signed in to rent.');
        return;
      }

      console.log('🔑 Access token:', access_token);
      console.log('🧠 GPT Details:', {
        gpt_id: gpt.id,
        gpt_name: gpt.name,
        gpt_price: gpt.price
      });

      const res = await fetch('https://dfrdebyrwcerxqhvqwgr.functions.supabase.co/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          gpt_id: gpt.id,
          gpt_name: gpt.name,
          gpt_price: gpt.price,
        }),
      });

      const result = await res.json();
      console.log('🎯 Stripe response:', result);

      if (result?.url) {
        window.location.href = result.url;
      } else {
        alert('❌ Stripe error: No URL returned.');
      }
    } catch (err) {
      console.error('❌ Stripe fetch error:', err);
      alert('❌ Failed to fetch checkout URL.');
    }
  };

  if (!gpt) return <p className="p-6 text-center text-white">Loading GPT...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#150c2a] to-[#1c243b] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-[#121a2c] rounded-2xl shadow-lg p-6 border border-gray-700">
        <Link to="/marketplace" className="text-blue-400 hover:underline text-sm mb-6 inline-block">
          ← Back to Marketplace
        </Link>

        <img
          src={gpt.image_url || placeholder}
          alt={gpt.name}
          className="w-full h-64 object-cover rounded-lg mb-6 border border-gray-800"
        />

        <h1 className="text-3xl font-bold mb-2">{gpt.name}</h1>
        <p className="text-gray-300 mb-4">{gpt.description}</p>
        <p className="text-purple-300 text-lg font-semibold mb-2">${gpt.price} per use</p>

        <div className="text-sm text-gray-400 mb-6">
          by <Link to={`/creator/${gpt.creator_id}`} className="hover:underline text-white">View Creator</Link>
        </div>

        {hasAccess ? (
          <a
            href={gpt.gpt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-400 transition font-semibold"
          >
            🚀 Access GPT
          </a>
        ) : (
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-6 py-2 rounded-md font-semibold transition"
            onClick={handleRentClick}
          >
            💳 Rent this GPT
          </button>
        )}
      </div>
    </div>
  );
};

export default GptDetail;
