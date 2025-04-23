// src/pages/NewGpt.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const NewGpt = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    gpt_url: '',
    image_url: '',
    prompt: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, gpt_url, image_url, prompt } = form;

    const { error } = await supabase.from('gpts').insert([
      {
        name,
        description,
        price: parseFloat(price),
        gpt_url,
        image_url,
        prompt,
        creator_id: user?.id,
      },
    ]);

    if (!error) {
      alert('✅ GPT successfully added!');
      navigate('/dashboard');
    } else {
      alert('❌ Failed to add GPT');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">➕ Create a New GPT</h1>
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

          <textarea
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Paste the full GPT prompt here"
            className="w-full h-40 p-3 rounded text-black"
            required
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded font-bold text-white"
          >
            🚀 Submit GPT
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewGpt;
