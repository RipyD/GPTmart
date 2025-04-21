// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e121c] to-[#1c243b] text-white font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#1f2937]/90 to-[#4b5563]/90 shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/gptmart-logo.svg"
              alt="GPTmart logo"
              className="w-14 h-14 sm:w-16 sm:h-16 transition-transform hover:rotate-1"
            />
            <span className="text-3xl font-extrabold text-white tracking-tight">GPTmart</span>
          </div>
          <nav className="flex items-center gap-5 text-white text-sm font-medium">
            <Link to="/marketplace" className="hover:text-green-400 transition">Marketplace</Link>
            <Link to="/dashboard" className="hover:text-green-400 transition">Dashboard</Link>
            <Link to="/analytics" className="hover:text-green-400 transition">Analytics</Link>
            <Link to="/pricing" className="hover:text-green-400 transition">Pricing</Link>
            <Link to="/login" className="ml-3 bg-white text-gray-800 font-semibold px-4 py-1.5 rounded-md hover:bg-gray-100 transition">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="pt-8">{children}</main>
    </div>
  );
};

export default Layout;
