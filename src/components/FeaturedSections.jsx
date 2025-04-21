import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Section = ({ title, gpts }) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-white mb-10 tracking-tight">{title}</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gpts.map((gpt) => (
          <div
            key={gpt.id}
            onClick={() => navigate(`/gpt/${gpt.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-[1.03] transition transform hover:shadow-xl"
          >
            <img
              src={gpt.image_url || 'https://via.placeholder.com/300x200?text=GPT'}
              alt={gpt.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{gpt.name}</h3>
              <p className="text-sm text-gray-600 mb-2 truncate">{gpt.description}</p>
              {gpt.price && <p className="text-green-600 font-bold text-base">${gpt.price}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const FeaturedSections = () => {
  const [featuredGPTs, setFeaturedGPTs] = useState([]);
  const [weeklyGPTs, setWeeklyGPTs] = useState([]);
  const [featuredCreators, setFeaturedCreators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: featured } = await supabase
        .from('gpts')
        .select('*')
        .eq('featured', true)
        .limit(8);

      const { data: weekly } = await supabase
        .from('gpts')
        .select('*')
        .eq('weekly', true)
        .limit(4);

      const { data: creators } = await supabase
        .from('profiles')
        .select('*')
        .eq('featured', true)
        .limit(4);

      if (featured) setFeaturedGPTs(featured);
      if (weekly) setWeeklyGPTs(weekly);
      if (creators) setFeaturedCreators(creators);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Section title="🔥 Featured GPTs" gpts={featuredGPTs} />
      <Section title="🌟 GPTs of the Week" gpts={weeklyGPTs} />
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-10 tracking-tight">✨ Featured Creators</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredCreators.map((creator) => (
            <div
              key={creator.id}
              onClick={() => window.location.href = `/creator/${creator.id}`}
              className="bg-white rounded-2xl shadow-lg p-5 cursor-pointer hover:scale-[1.03] transition transform hover:shadow-xl"
            >
              <img
                src={creator.avatar_url || 'https://via.placeholder.com/100'}
                alt={creator.username}
                className="w-20 h-20 rounded-full mb-3 mx-auto"
              />
              <h3 className="text-xl font-bold text-gray-900 text-center">{creator.username}</h3>
              <p className="text-sm text-gray-600 text-center">{creator.bio || 'Creator on GPTmart'}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedSections;

