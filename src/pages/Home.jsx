import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedSections from '../components/FeaturedSections';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e121c] to-[#1c243b] text-white font-sans">
      {/* Header */}
     

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
