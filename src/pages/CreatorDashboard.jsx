import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const CreatorDashboard = () => {
  const [user, setUser] = useState(null);
  const [gpts, setGpts] = useState([]);
  const [rentalCounts, setRentalCounts] = useState({});
  const [revenueByGpt, setRevenueByGpt] = useState({});
  const [dashboardStats, setDashboardStats] = useState({
    totalRevenue: 0,
    totalViews: 0,
    totalRentals: 0,
    averageConversion: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: session } = await supabase.auth.getUser();
      if (session?.user) {
        setUser(session.user);

        const { data: userGPTs, error: gptError } = await supabase
          .from('gpts')
          .select('*')
          .eq('creator_id', session.user.id);

        if (!gptError && userGPTs.length > 0) {
          setGpts(userGPTs);

          const { data: rentals, error: rentalError } = await supabase
            .from('rentals')
            .select('gpt_id');

          if (!rentalError) {
            const countMap = {};
            const revenueMap = {};
            let totalRevenue = 0;
            let totalViews = 0;
            let totalRentals = 0;

            userGPTs.forEach(gpt => {
              countMap[gpt.id] = 0;
              revenueMap[gpt.id] = 0;
            });

            rentals.forEach(r => {
              if (countMap[r.gpt_id] !== undefined) {
                countMap[r.gpt_id]++;
                const gpt = userGPTs.find(g => g.id === r.gpt_id);
                revenueMap[r.gpt_id] += gpt?.price || 0;
              }
            });

            userGPTs.forEach(gpt => {
              const rentals = countMap[gpt.id] || 0;
              const revenue = revenueMap[gpt.id] || 0;
              totalRentals += rentals;
              totalRevenue += revenue;
              totalViews += gpt.views || 0;
            });

            const averageConversion = totalViews > 0 ? (totalRentals / totalViews) * 100 : 0;

            setRentalCounts(countMap);
            setRevenueByGpt(revenueMap);
            setDashboardStats({
              totalRevenue,
              totalViews,
              totalRentals,
              averageConversion
            });
          }
        } else {
          console.error('❌ Error fetching GPTs:', gptError);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (gptId) => {
    if (!user) return alert("Not authorized");
    if (!window.confirm("Are you sure you want to delete this GPT?")) return;

    const { error } = await supabase
      .from('gpts')
      .delete()
      .eq('id', gptId)
      .eq('creator_id', user.id);

    if (error) {
      console.error("❌ Error deleting GPT:", error);
    } else {
      setGpts((prev) => prev.filter((g) => g.id !== gptId));
      alert("✅ GPT deleted");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
            🎨 Your Creator Storefront
          </h1>
          <p className="text-gray-300 text-lg">Make money with your GPTs. Track results. Flex on 'em.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-md flex items-center space-x-4 hover:shadow-lg transition">
            <span className="text-3xl">💰</span>
            <div>
              <p className="text-sm text-gray-300">Total Revenue</p>
              <h2 className="text-2xl font-bold text-emerald-300">${dashboardStats.totalRevenue.toFixed(2)}</h2>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-md flex items-center space-x-4 hover:shadow-lg transition">
            <span className="text-3xl">👁</span>
            <div>
              <p className="text-sm text-gray-300">Total Views</p>
              <h2 className="text-2xl font-bold text-blue-300">{dashboardStats.totalViews}</h2>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-md flex items-center space-x-4 hover:shadow-lg transition">
            <span className="text-3xl">📈</span>
            <div>
              <p className="text-sm text-gray-300">Avg Conversion</p>
              <h2 className="text-2xl font-bold text-yellow-300">{dashboardStats.averageConversion.toFixed(1)}%</h2>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Link to="/add-gpt" className="bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold shadow">
            🛍️ Add GPT to Marketplace
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading your GPTs...</p>
        ) : gpts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gpts.map((gpt) => (
              <div key={gpt.id} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={gpt.image_url || 'https://via.placeholder.com/300x200'}
                  alt={gpt.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-white mb-1">{gpt.name}</h3>
                <p className="text-xs text-gray-300 line-clamp-2 mb-1">{gpt.description}</p>
                <p className="text-green-400 text-sm font-bold mb-2">${gpt.price}</p>

                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>👁 {gpt.views || 0}</span>
                  <span>💸 {rentalCounts[gpt.id] || 0} rentals</span>
                </div>

                <p className="text-xs text-emerald-400 font-semibold mb-2">
                  💵 Est. Revenue: ${revenueByGpt[gpt.id]?.toFixed(2) || '0.00'}
                </p>

                <div className="flex justify-between text-xs mt-2">
                  <Link to={`/gpt/${gpt.id}`} className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded text-white font-medium hover:opacity-90">
                    ✏️ Edit
                  </Link>
                  <button onClick={() => handleDelete(gpt.id)} className="bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1 rounded text-white font-medium hover:opacity-90">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No GPTs listed yet. Click “Add GPT to Marketplace” to start!</p>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
