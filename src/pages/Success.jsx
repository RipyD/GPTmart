import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const query = new URLSearchParams(useLocation().search);
  const gptUrl = decodeURIComponent(query.get('gpt_url') || '');
  console.log("📦 Success page query:", window.location.search);

  return (
    <div className="max-w-xl mx-auto p-6 text-center text-white">
      <h1 className="text-3xl font-bold text-green-500 mb-4">🎉 Payment Successful!</h1>
      <p className="mb-4">Thanks for your purchase.</p>

      {gptUrl ? (
        <div className="mt-4 text-sm break-words">
          <p className="text-gray-300 mb-2">Your GPT is ready:</p>
          <a
            href={gptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            🚀 Click here to open it
          </a>
        </div>
      ) : (
        <p className="text-gray-500">No GPT URL provided.</p>
      )}

      <div className="mt-6">
        <Link to="/marketplace" className="text-blue-500 hover:underline">
          ← Back to Marketplace
        </Link>
      </div>
    </div>
  );
};

export default Success;
