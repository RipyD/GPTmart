import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import FeaturedSections from '../components/FeaturedSections';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [featured, setFeatured] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGpts = async () => {
      const { data, error } = await supabase
        .from('gpts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('❌ Error fetching GPTs:', error.message);
      else {
        setFeatured(data.slice(0, 3));
        setWeekly(data.slice(3, 6));
      }
    };

    fetchGpts();
  }, []);

  return (
    <>
      <header className="w-full px-6 py-4 flex justify-between items-center bg-[#1f2937] border-b border-gray-700 shadow-sm transition duration-300 hover:shadow-md hover:bg-[#232d3c]">
        <div className="flex items-center space-x-3">
          <img src="/gptmart-logo-circle.svg" alt="GPTmart logo" className="w-8 h-8 object-contain bg-transparent" />
          <span className="text-xl font-bold text-white">GPTmart</span>
        </div>
        <nav className="space-x-6 text-white">
          <Link to="/marketplace" className="hover:underline">Marketplace</Link>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </nav>
      </header>

      <div className="min-h-screen bg-gradient-to-b from-[#150c2a] to-[#1c243b] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse"><span className="text-red-500 animate-bounce drop-shadow-md">🚀</span> Discover the Future of AI at GPTmart</h1>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">Custom GPTs. Killer use cases. Built by brilliant creators. Rent what you need, when you need it.</p>
            <p className="text-gray-400 text-xs mb-6 max-w-xl mx-auto tracking-wide uppercase">Zero setup. Try before you buy.</p>
            <button
              onClick={() => navigate('/marketplace')}
              className="relative overflow-hidden group bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="absolute inset-0 bg-white opacity-10 group-hover:animate-ping rounded-full"></span>
              <span className="relative z-10">🚀 Explore AI models built by top creators</span>
            </button>
          </div>

          {/* Featured GPTs */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">🔥 Featured GPTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featured.map((gpt) => (
                <motion.div
                  key={gpt.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-[#121a2c] p-4 rounded-xl border border-gray-700 shadow-md hover:border-purple-500 hover:shadow-purple-500/50 transition-all duration-300 ease-in-out transform block"
                >
                  <Link to={`/gpt/${gpt.id}`}>
                    <img
                      src={gpt.image_url || 'https://via.placeholder.com/300x200'}
                      alt={gpt.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-lg font-bold text-white">{gpt.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{gpt.description}</p>
                    <p className="text-purple-300 font-semibold mt-2">${gpt.price}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* GPTs of the Week */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">🌟 GPTs of the Week</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {weekly.map((gpt) => (
                <motion.div
                  key={gpt.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-[#121a2c] p-4 rounded-xl border border-gray-700 shadow-md hover:border-purple-500 hover:shadow-purple-500/50 transition-all duration-300 ease-in-out transform block"
                >
                  <Link to={`/gpt/${gpt.id}`}>
                    <img
                      src={gpt.image_url || 'https://via.placeholder.com/300x200'}
                      alt={gpt.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-lg font-bold text-white">{gpt.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{gpt.description}</p>
                    <p className="text-purple-300 font-semibold mt-2">${gpt.price}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
