import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const [gpts, setGpts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Productivity', 'Dev Tools', 'Education', 'Creative', 'Finance'];

  useEffect(() => {
    const fetchGpts = async () => {
      const { data, error } = await supabase
        .from('gpts')
        .select('*')
        .eq('is_test', false)
        .eq('is_published', true)
        .not('creator_id', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching GPTs:', error);
      } else {
        setGpts(data);
      }
    };

    fetchGpts();
  }, []);

  const getDemoImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1581091012184-7e0cdfbb6790?fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1603574670812-d24560880210?fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591696331115-0c8d3ee4f915?fit=crop&w=600&q=80',
    ];
    return images[index % images.length];
  };

  const filteredGpts = selectedCategory === 'All'
    ? gpts
    : gpts.filter((gpt) => gpt.category === selectedCategory);

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

        {/* Category Filter */}
        <div className="mb-10 text-center">
          <p className="text-lg text-pink-400 font-bold mb-2 tracking-wide uppercase animate-pulse">
            ✨ Choose Your Craft
          </p>
          <select
            className="bg-gradient-to-r from-purple-700 to-pink-600 border border-purple-500 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-500/40 focus:outline-none transition duration-300"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-black">{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredGpts.map((gpt, index) => (
            <motion.div
              key={gpt.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-[#1f2937] to-[#0f172a] p-5 rounded-xl border border-gray-700 shadow-lg relative"
            >
              <Link to={`/gpt/${gpt.id}`}>
                {gpt.is_founder && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full shadow ring-2 ring-orange-500 ring-offset-1">
                    🏆 Founder
                  </div>
                )}
                <img
                  src={gpt.image_url || getDemoImage(index)}
                  alt={gpt.name}
                  className="w-full h-44 object-cover rounded mb-3"
                />
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition duration-200">
                  {gpt.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{gpt.description}</p>
                <p className="text-purple-300 font-semibold mt-3">${gpt.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
