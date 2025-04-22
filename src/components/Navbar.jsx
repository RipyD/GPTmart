import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <img
            src="/gptmart-logo3.png"
            alt="GPTmart logo"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-transform hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-white"
          />
          <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">GPTmart</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-white text-sm font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/marketplace" className="hover:text-yellow-300 transition">Marketplace</Link>
          <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
          <Link to="/analytics" className="hover:text-yellow-300 transition">Analytics</Link>
          <Link to="/pricing" className="hover:text-yellow-300 transition">Pricing</Link>
          <Link to="/login" className="ml-3 bg-white text-gray-800 font-semibold px-4 py-1.5 rounded-md hover:bg-gray-100 transition">Sign In</Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden w-full">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none mb-3"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div className="flex flex-col space-y-2 text-white text-sm font-medium border border-white/20 rounded-lg p-4 bg-gradient-to-br from-purple-800 via-pink-700 to-red-600">
              <Link to="/" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/marketplace" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Marketplace</Link>
              <Link to="/dashboard" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/analytics" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Analytics</Link>
              <Link to="/pricing" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link to="/login" className="bg-white text-gray-800 font-semibold px-4 py-1.5 rounded-md hover:bg-gray-100 transition text-center" onClick={() => setMenuOpen(false)}>Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
