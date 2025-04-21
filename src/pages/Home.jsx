import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedSections from '../components/FeaturedSections';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e121c] to-[#1c243b] text-white font-sans">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[#1f2937] to-[#4b5563] shadow-md">
        <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3">
  <img
    src="/gptmart-logo-circle.png" // Replace with actual filename if different
    alt="GPTmart logo"
    className="w-12 h-12 rounded-full shadow-lg"
  />
  <span className="text-3xl font-extrabold text-white tracking-tight">GPTmart</span>
</div>


          
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/marketplace" className="text-white hover:underline">Marketplace</Link>
          <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
          <Link to="/analytics" className="text-white hover:underline">Analytics</Link>
          <Link to="/pricing" className="text-white hover:underline">Pricing</Link>
          <Link to="/login" className="bg-white text-purple-600 font-semibold px-4 py-1 rounded-md hover:bg-gray-100">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Rent Your GPTs. <span className="text-green-400">Monetize the AI You Already Built.</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Browse a marketplace of custom AI models for various tasks and applications.
        </p>
        <Link to="/marketplace">
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition mb-16">
            🚀 Explore AI Models Built by Top Creators
          </button>
        </Link>
      </main>

      {/* Live Featured Sections with GPTs of the Week */}
      <FeaturedSections />
    </div>
  );
};

export default Home;
