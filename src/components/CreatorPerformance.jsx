import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const CreatorPerformance = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const user = await supabase.auth.getUser();
      const { data, error } = await supabase.rpc('get_creator_performance', { creator_id: user.data.user.id });
      if (!error) setMetrics(data);
    };
    fetchMetrics();
  }, []);

  return (
    <div className="mb-6 bg-[#1a1f36] p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">📈 Top GPTs by Revenue</h2>
      <ul className="list-disc ml-6">
        {metrics.map((gpt) => (
          <li key={gpt.id}>{gpt.name} — ${gpt.total_revenue} from {gpt.total_rentals} rentals</li>
        ))}
      </ul>
    </div>
  );
};

export default CreatorPerformance;
