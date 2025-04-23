import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import CreatorPerformance from '../components/CreatorPerformance';
import GPTIdeasGenerator from '../components/GPTIdeasGenerator';
import FlaggedUserSummary from '../components/FlaggedUserSummary';
import { Link } from 'react-router-dom';

const CreatorInsights = () => {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const checkProStatus = async () => {
      const { data: session } = await supabase.auth.getUser();
      const user = session?.user;

      if (user) {
        const { data } = await supabase
          .from('users')
          .select('is_pro_plus')
          .eq('id', user.id)
          .single();

        setIsPro(data?.is_pro_plus === true);
      }
    };

    checkProStatus();
  }, []);

  if (!isPro) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white text-center">
        <h1 className="text-3xl font-bold mb-6">🔒 Pro+ Feature</h1>
        <p className="text-gray-400 mb-4">The Creator Insights Dashboard is only available for GPTmart Pro+ users.</p>
        <Link
          to="/pricing"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded font-bold"
        >
          🚀 Upgrade to GPTmart Pro+
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Creator Insights Dashboard</h1>
      <CreatorPerformance />
      <GPTIdeasGenerator />
      <FlaggedUserSummary />
    </div>
  );
};

export default CreatorInsights;
