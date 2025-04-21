// src/pages/CreatorProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const CreatorProfile = () => {
  const { id } = useParams();
  const [gpts, setGpts] = useState([]);
  const [creator, setCreator] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    const fetchData = async () => {
      const { data: creatorData, error: creatorError } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (creatorError) {
        console.error('❌ Error fetching creator:', creatorError.message);
        setCreator(null);
      } else {
        setCreator(creatorData);
      }

      const { data: gptData, error: gptError } = await supabase
        .from('gpts')
        .select('*')
        .eq('creator_id', id);

      if (gptError) {
        console.error('❌ Error fetching GPTs:', gptError.message);
      } else {
        setGpts(gptData);
      }
    };

    fetchData();
  }, [id]);

  if (creator === undefined) {
    return <div className="p-6 text-center text-gray-600">Loading creator profile...</div>;
  }

  if (creator === null) {
    return <div className="p-6 text-center text-red-500">Creator not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/marketplace" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Marketplace
      </Link>

      <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src={creator.avatar_url || 'https://i.pravatar.cc/100'}
          alt={creator.name || 'Creator'}
          className="w-24 h-24 rounded-full border object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-1">{creator.name}</h1>
          <p className="text-gray-600">{creator.bio || 'This creator has not added a bio yet.'}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">🧠 GPTs by {creator.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gpts.map((gpt) => (
          <Link
            to={`/gpt/${gpt.id}`}
            key={gpt.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition block"
          >
            <img
              src={gpt.image_url || 'https://via.placeholder.com/300x200'}
              alt={gpt.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold">{gpt.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{gpt.description}</p>
            <p className="text-blue-600 font-semibold mt-2">${gpt.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CreatorProfile;

