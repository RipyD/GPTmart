// src/pages/Marketplace.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Marketplace = () => {
  const [gpts, setGpts] = useState([]);

  useEffect(() => {
    const fetchGpts = async () => {
      const { data, error } = await supabase.from('gpts').select('*').order('created_at', { ascending: false });
      if (error) console.error('❌ Error fetching GPTs:', error);
      else setGpts(data);
    };

    fetchGpts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#150c2a] to-[#1c243b] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 animate-fade-in">
          <h1 className="text-7xl font-extrabold mb-6 text-white drop-shadow-xl">
            GPTs for Every Industry
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg font-medium">
            AI assistants for developers, entrepreneurs, and teams who need cutting-edge results, fast.
          </p>
          <p className="text-sm text-indigo-300 max-w-md mx-auto mb-10 mt-2 italic">
            Built by creators. Rented by innovators. Designed for scale.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="absolute inset-0 bg-white opacity-10 group-hover:animate-ping rounded-full"></span>
              <span className="relative z-10">🛠️ Rent Out Your GPT</span>
            </Link>
          </div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gpts.map((gpt) => (
            <Link
              to={`/gpt/${gpt.id}`}
              key={gpt.id}
              className="bg-gradient-to-br from-[#1f2937] to-[#0f172a] p-5 rounded-xl border border-gray-700 shadow-md hover:border-fuchsia-500 hover:shadow-fuchsia-500/30 hover:scale-[1.03] transition-all duration-300 ease-in-out transform group relative block"
            >
              {gpt.is_founder && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full shadow ring-2 ring-orange-500 ring-offset-1">
  🏆 Founder
</div>
              )}
              <img
                src={gpt.image_url || 'https://via.placeholder.com/300x200'}
                alt={gpt.name}
                className="w-full h-44 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition duration-200">
                {gpt.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{gpt.description}</p>
              <p className="text-purple-300 font-semibold mt-3">${gpt.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
