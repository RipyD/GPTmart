import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AddGpt = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    gpt_url: '',
    image_url: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.error('User not logged in or fetch failed:', error);
        navigate('/login'); // Redirect to login if not authenticated
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert('⚠️ You must be logged in to submit a GPT.');
      return;
    }

    const { name, description, price, gpt_url, image_url } = form;

    if (!gpt_url || !gpt_url.startsWith('http')) {
      alert('❌ Please provide a valid GPT URL (must start with http)');
      return;
    }

    console.table({ name, description, price, gpt_url, image_url, creator_id: user.id });

    const { error } = await supabase.from('gpts').insert([
      {
        name,
        description,
        price: parseFloat(price),
        gpt_url,
        image_url,
        creator_id: user.id,
      },
    ]);

    if (!error) {
      alert('✅ GPT added to marketplace!');
      navigate('/dashboard');
    } else {
      alert('❌ Error adding GPT');
      console.error('Insert Error:', error.message, error.details || error.hint);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#101221] text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🛍️ Add GPT to Marketplace</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'description', 'price', 'gpt_url', 'image_url'].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter ${field.replace('_', ' ')}`}
              className="w-full p-3 rounded text-black"
              required
            />
          ))}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold text-white"
          >
            🚀 Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGpt;
