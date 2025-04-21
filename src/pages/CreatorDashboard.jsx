// src/pages/CreatorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreatorDashboard = () => {
  const [user, setUser] = useState(null);
  const [creator, setCreator] = useState(null);
  const [gpts, setGpts] = useState([]);
  const [newGpt, setNewGpt] = useState({ name: '', description: '', image_url: '', price: '', gpt_url: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) navigate('/login');
      else {
        setUser(data.user);
        checkCreatorProfile(data.user.id);
      }
    };
    fetchUser();
  }, [navigate]);

  const checkCreatorProfile = async (userId) => {
    const { data, error } = await supabase.from('creators').select('*').eq('id', userId).single();
    if (!data && !error) setCreator(null);
    else if (data) setCreator(data);
  };

  const fetchMyGpts = async () => {
    if (!user) return;
    const { data, error } = await supabase.from('gpts').select('*').eq('creator_id', user.id);
    if (!error) setGpts(data);
  };

  useEffect(() => {
    if (user) fetchMyGpts();
  }, [user]);

  const handleCreatorSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: user.id,
      name: creatorForm.name,
      bio: creatorForm.bio,
      avatar_url: creatorForm.avatar_url,
    };
    const { error } = await supabase.from('creators').insert([payload]);
    if (error) return alert(`❌ Error creating profile: ${error.message}`);
    setCreator(payload);
  };

  const [creatorForm, setCreatorForm] = useState({ name: '', bio: '', avatar_url: '' });
  const handleCreatorChange = (e) => {
    setCreatorForm({ ...creatorForm, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setNewGpt({ ...newGpt, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...newGpt,
      price: parseFloat(newGpt.price),
      creator_id: user.id,
    };
    const { error } = await supabase.from('gpts').insert([payload]);
    if (!error) {
      setNewGpt({ name: '', description: '', image_url: '', price: '', gpt_url: '' });
      setSuccessMessage('✅ GPT added successfully!');
      fetchMyGpts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      alert(`❌ Error: ${error.message}`);
    }
  };

  if (!creator) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#150c2a] to-[#1c243b] text-white px-6 py-12">
        <div className="max-w-2xl mx-auto bg-transparent p-8 rounded-xl border border-purple-500">
          <h1 className="text-3xl font-extrabold mb-6">👤 Create Your Creator Profile</h1>
          <form onSubmit={handleCreatorSubmit} className="space-y-4">
            <input name="name" onChange={handleCreatorChange} value={creatorForm.name} placeholder="Display Name" required className="w-full p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <textarea name="bio" onChange={handleCreatorChange} value={creatorForm.bio} placeholder="Short Bio" className="w-full p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <input name="avatar_url" onChange={handleCreatorChange} value={creatorForm.avatar_url} placeholder="Avatar URL (optional)" className="w-full p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:opacity-90 transition">Create Profile</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#150c2a] to-[#1c243b] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">🎛️ Creator Dashboard</h1>
          <p className="text-gray-400">Manage your GPTs, edit your profile, and grow your AI business.</p>
        </div>

        <div className="flex items-center bg-transparent border border-purple-500 p-6 rounded-xl shadow-lg mb-12">
          <img src={creator.avatar_url || 'https://i.pravatar.cc/100'} alt={creator.name || 'Creator'} className="w-20 h-20 rounded-full border-2 border-purple-500 object-cover mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-white">{creator.name}</h2>
            <p className="text-gray-400">{creator.bio || 'No bio provided yet.'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-transparent border border-purple-500 p-6 rounded-xl shadow-xl mb-10">
          <h3 className="text-xl font-semibold mb-4">➕ Upload a New GPT</h3>
          {successMessage && <div className="text-green-400 mb-4 font-semibold">{successMessage}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={newGpt.name} onChange={handleChange} placeholder="GPT Name" required className="p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <input name="image_url" value={newGpt.image_url} onChange={handleChange} className="p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Image URL" />
            <input name="gpt_url" value={newGpt.gpt_url} onChange={handleChange} className="p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="GPT Link (ChatGPT, etc.)" />
            <input name="price" type="number" value={newGpt.price} onChange={handleChange} className="p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Price ($)" required />
            <textarea name="description" value={newGpt.description} onChange={handleChange} placeholder="What does it do?" required className="p-3 bg-transparent text-white placeholder:text-gray-400 border border-purple-500 rounded col-span-full focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <button className="mt-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-all">Submit GPT</button>
        </form>

        <div>
          <h2 className="text-2xl font-bold mb-4">📦 Your GPTs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gpts.map((gpt) => (
              <div key={gpt.id} className="bg-transparent p-4 rounded-xl border border-purple-500 shadow-md">
                <h3 className="text-white font-semibold text-lg">{gpt.name}</h3>
                <p className="text-sm text-gray-400">{gpt.description}</p>
                <p className="text-purple-400 font-bold mt-2">${gpt.price}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setNewGpt({ name: gpt.name, description: gpt.description, image_url: gpt.image_url, gpt_url: gpt.gpt_url, price: gpt.price });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700 transition"
                  >Edit</button>
                  <button
                    onClick={async () => {
                      const confirm = window.confirm('Are you sure you want to delete this GPT?');
                      if (!confirm) return;
                      const { error } = await supabase.from('gpts').delete().eq('id', gpt.id);
                      if (error) return alert('❌ Failed to delete GPT');
                      fetchMyGpts();
                    }}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;


