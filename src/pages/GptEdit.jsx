import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const GptEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    gpt_url: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGPT = async () => {
      const { data, error } = await supabase.from('gpts').select('*').eq('id', id).single();
      if (error) {
        console.error('❌ Error loading GPT:', error);
        alert('Failed to load GPT');
        return;
      }
      setForm(data);
      setLoading(false);
    };
    fetchGPT();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, description, price, gpt_url, image_url } = form;

    const { error } = await supabase
      .from('gpts')
      .update({ name, description, price: parseFloat(price), gpt_url, image_url })
      .eq('id', id);

    if (error) {
      console.error('❌ Update error:', error);
      alert('Failed to update GPT');
    } else {
      alert('✅ GPT updated!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#101221] text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">✏️ Edit GPT</h1>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-5">
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
              className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-bold text-white"
            >
              💾 Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default GptEdit;