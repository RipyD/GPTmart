import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreatorDashboard = () => {
  const [gpts, setGpts] = useState([]);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ views: 0, rentals: 0, revenue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;
      setUser(userId);

      if (userId) {
        const { data, error } = await supabase
          .from('gpts')
          .select('*')
          .eq('creator_id', userId)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching GPTs:', error.message);
        } else {
          const fallbackGpts = [
            {
              id: 'demo-1',
              name: 'JavaScript Helper GPT',
              description: 'Assists with front-end code generation and syntax checks.',
              image_url: 'https://images.unsplash.com/photo-1581091012184-7e0cdfbb6790?fit=crop&w=600&q=80',
              price: 12.99,
              views: 120,
              total_rentals: 5
            },
            {
              id: 'demo-2',
              name: 'Marketing Copy AI',
              description: 'Creates engaging product descriptions and ad copy.',
              image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=600&q=80',
              price: 9.99,
              views: 90,
              total_rentals: 3
            },
            {
              id: 'demo-3',
              name: 'Design Feedback GPT',
              description: 'Gives constructive UI/UX critique for websites and apps.',
              image_url: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?fit=crop&w=600&q=80',
              price: 8.99,
              views: 60,
              total_rentals: 2
            },
            {
              id: 'demo-4',
              name: 'Resume Builder AI',
              description: 'Crafts resumes tailored to job listings using your experience.',
              image_url: 'https://images.unsplash.com/photo-1603574670812-d24560880210?fit=crop&w=600&q=80',
              price: 6.99,
              views: 150,
              total_rentals: 4
            },
            {
              id: 'demo-5',
              name: 'AI Investment Advisor',
              description: 'Analyzes stock trends and suggests possible trades.',
              image_url: 'https://images.unsplash.com/photo-1591696331115-0c8d3ee4f915?fit=crop&w=600&q=80',
              price: 14.99,
              views: 110,
              total_rentals: 6
            }
          ];

          const hasLiveRentals = data.some(gpt => gpt.total_rentals > 1);
          const gptsToShow = hasLiveRentals ? data : fallbackGpts;

          const totalViews = gptsToShow.reduce((sum, g) => sum + (g.views || 0), 0);
          const totalRentals = gptsToShow.reduce((sum, g) => sum + (g.total_rentals || 0), 0);
          const totalRevenue = gptsToShow.reduce((sum, g) => sum + ((g.total_rentals || 0) * (g.price || 0)), 0);

          setGpts(gptsToShow);
          setStats({ views: totalViews, rentals: totalRentals, revenue: totalRevenue });
        }
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-16 bg-[#0e0f1a] text-white min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold flex items-center gap-2">🛍️ Your GPT Storefront</h2>
            <p className="text-gray-400 text-lg">View and manage your AI products</p>
          </div>
          <Link
            to="/new-gpt"
            className="bg-gradient-to-r from-purple-500 to-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
          >
            ➕ Add New GPT
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#121a2c] p-4 rounded-xl border border-purple-700 shadow text-center">
            <h3 className="text-xl font-semibold text-purple-400">${stats.revenue.toFixed(2)}</h3>
            <p className="text-sm text-gray-400">Total Revenue</p>
          </div>
          <div className="bg-[#121a2c] p-4 rounded-xl border border-blue-700 shadow text-center">
            <h3 className="text-xl font-semibold text-blue-400">{stats.views}</h3>
            <p className="text-sm text-gray-400">Total Views</p>
          </div>
          <div className="bg-[#121a2c] p-4 rounded-xl border border-pink-700 shadow text-center">
            <h3 className="text-xl font-semibold text-pink-400">{stats.rentals}</h3>
            <p className="text-sm text-gray-400">Total Rentals</p>
          </div>
        </div>

        {gpts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">You haven’t added any GPTs yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {gpts.map((gpt) => (
              <motion.div
                key={gpt.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-[#121a2c] p-6 rounded-xl border border-gray-700 shadow-md hover:border-purple-500 hover:shadow-purple-500/30 transition"
              >
                <img
                  src={gpt.image_url || 'https://via.placeholder.com/300x200'}
                  alt={gpt.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{gpt.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-2">{gpt.description}</p>
                <p className="text-green-400 font-bold mb-1">${gpt.price}</p>
                <p className="text-xs text-gray-400 mb-2">👁 {gpt.views || 0} · 💸 {gpt.total_rentals || 0}</p>
                <Link
                  to={`/gpt/${gpt.id}`}
                  className="text-sm text-purple-400 font-medium hover:underline flex items-center gap-1"
                >
                  ✏️ Edit
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatorDashboard;
