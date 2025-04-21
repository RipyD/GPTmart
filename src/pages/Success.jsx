import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const query = new URLSearchParams(useLocation().search);
  const gptUrl = query.get('gpt_url');

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="mb-4">Thanks for your purchase. Click below to access your GPT.</p>
      {gptUrl ? (
        <a
          href={gptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          🚀 Launch GPT
        </a>
      ) : (
        <p className="text-gray-600">No GPT URL provided.</p>
      )}
      <div className="mt-6">
        <Link to="/marketplace" className="text-blue-500 hover:underline">← Back to Marketplace</Link>
      </div>
    </div>
  );
};

export default Success;
