import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const GPTIdeasGenerator = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const checkProStatus = async () => {
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser?.user) return;

      const { data, error } = await supabase
        .from('users')
        .select('is_pro_plus')
        .eq('id', authUser.user.id)
        .single();

      if (!error) {
        setIsPro(data?.is_pro_plus === true);
      }
    };

    checkProStatus();
  }, []);

  const generateIdeas = async () => {
    setLoading(true);

    const fakeIdeas = [
      {
        title: "Startup Slogan Wizard",
        description: "Generates catchy taglines for startups based on their niche.",
        target_user: "Founders & marketers",
        why_it_sells: "Everyone needs a fire tagline, and not everyone’s a poet.",
      },
      {
        title: "Legalese Decoder GPT",
        description: "Breaks down contracts and legal docs into simple English.",
        target_user: "Freelancers & small business owners",
        why_it_sells: "Nobody reads legal stuff—but everyone signs it.",
      },
      {
        title: "DM Slide Assistant",
        description: "Helps users write confident, smooth messages for dating apps.",
        target_user: "People on Tinder or Instagram DMs",
        why_it_sells: "Because charm is hard, and awkward is real.",
      }
    ];

    setTimeout(() => {
      setIdeas(fakeIdeas);
      setLoading(false);
    }, 1200);
  };

  if (!isPro) {
    return (
      <div className="bg-[#1a1f36] p-4 rounded shadow-md mb-6 text-center">
        <h2 className="text-xl font-semibold mb-2">🔒 Pro+ Feature</h2>
        <p className="text-gray-400 mb-4">Unlock GPT idea generation and market insights.</p>
        <Link
          to="/pricing"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded font-bold"
        >
          🚀 Upgrade to GPTmart Pro+
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-[#1a1f36] p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">💡 GPT Ideas Based on Top Sellers</h2>
      <button
        onClick={generateIdeas}
        className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded mb-4 font-bold"
        disabled={loading}
      >
        {loading ? '✨ Generating...' : '🚀 Generate New Ideas'}
      </button>
      <ul className="list-disc ml-6">
        {ideas.map((idea, i) => (
          <li key={i} className="mb-2">
            <strong>{idea.title}</strong>: {idea.description}
            <span className="block text-sm text-gray-300">
              Target: {idea.target_user} — {idea.why_it_sells}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GPTIdeasGenerator;
