// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const GPTCard = ({ icon, title, description }) => (
  <div className="bg-[#121a2c] rounded-2xl p-5 shadow-md w-full max-w-xs hover:bg-[#1d2a45] transition duration-200">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e121c] to-[#1c243b] text-white font-sans">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
        <div className="flex items-center space-x-3">
          <img src="/gptmart-logo-circle.svg" alt="GPTmart logo" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold text-white">GPTmart</span>
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/marketplace" className="text-white hover:underline">Marketplace</Link>
          <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
          <Link to="/analytics" className="text-white hover:underline">Analytics</Link>
          <Link to="/pricing" className="text-white hover:underline">Pricing</Link>
          <Link to="/login" className="bg-white text-purple-600 font-semibold px-4 py-1 rounded-md hover:bg-gray-100">Sign In</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-16 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6">Discover and Rent Custom GPTs</h1>
        <p className="text-gray-300 text-lg mb-8">
          Browse a marketplace of custom AI models for various tasks and applications.
        </p>
        <Link to="/marketplace">
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition mb-16">
            🚀 Explore AI models built by top creators
          </button>
        </Link>

        {/* Featured GPTs */}
        <h2 className="text-3xl font-bold mb-8">Featured GPTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center mb-24">
          <GPTCard icon="🤖" title="Code Helper" description="AI for dev questions & bug squashing." />
          <GPTCard icon="🧳" title="Travel Planner" description="Custom trip advice & itinerary bots." />
          <GPTCard icon="🍽️" title="Recipe Genie" description="Find meals with what’s in your fridge." />
          <GPTCard icon="📚" title="Study Buddy" description="Learn new topics with GPT tutoring." />
        </div>

        {/* Placeholder Section */}
        <h2 className="text-4xl font-extrabold mb-8">GPTs of the Week</h2>
        <p className="text-gray-500 text-lg">Coming soon...</p>
      </main>
    </div>
  );
};

export default Home;
