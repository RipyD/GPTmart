import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import GPTIdeasGenerator from '../components/GPTIdeasGenerator'; // Adjust path if needed

const CreatorDashboard = () => {
  const [user, setUser] = useState(null);
  const [gpts, setGpts] = useState([]);

  const fetchUserAndGPTs = async () => {
    const { data: session } = await supabase.auth.getUser();
    setUser(session.user);

    const { data: userGPTs, error } = await supabase
      .from('gpts')
      .select('*')
      .eq('creator_id', session.user.id);

    if (error) {
      console.error('❌ Error fetching GPTs:', error.message);
    } else {
      setGpts(userGPTs);
    }
  };

  useEffect(() => {
    fetchUserAndGPTs();
  }, []);

  const handleDelete = async (gptId) => {
    const confirm = window.confirm("Are you sure you want to delete this GPT?");
    if (!confirm || !user) return;

    const { error } = await supabase
      .from('gpts')
      .delete()
      .eq('id', gptId)
      .eq('creator_id', user.id); // secure match

    if (error) {
      console.error("❌ Error deleting GPT:", error.message);
      alert("Failed to delete GPT. Please try again.");
    } else {
      fetchUserAndGPTs(); // refetch list after delete
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e121c] to-[#1c243b] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-2">🎨 Your Creator Storefront</h1>
          <p className="text-gray-400">Manage your GPT listings, preview your store, and track your performance.</p>
        </div>

        <div className="flex justify-end mb-6">
          <Link to="/dashboard/add" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
            ➕ Add New GPT
          </Link>
        </div>

        {/* GPT Ideas Generator for Pro+ Creators */}
        <GPTIdeasGenerator />

        {gpts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gpts.map((gpt) => (
              <div key={gpt.id} className="bg-[#121a2c] rounded-xl border border-gray-700 shadow-md p-4">
                <img src={gpt.image_url || 'https://via.placeholder.com/300x200'} alt={gpt.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-bold text-white">{gpt.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{gpt.description}</p>
                <p className="text-green-400 font-bold mb-3">${gpt.price}</p>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>👁 {gpt.views || 0}</span>
                  <span>💸 {gpt.total_rentals || 0}</span>
                </div>
                <div className="text-right mt-2">
                  <button
                    onClick={() => handleDelete(gpt.id)}
                    className="text-red-400 hover:underline text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No GPTs listed yet. Click "Add New GPT" to start!</p>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
