import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e121c] to-[#1c243b] text-white font-sans">
      <Navbar />
      <main className="pt-40">{children}</main>
    </div>
  );
};

export default Layout;
