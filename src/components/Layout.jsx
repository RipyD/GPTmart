import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e121c] to-[#1c243b] text-white font-sans">
      <Navbar user={user} onLogout={onLogout} />
      <main className="pt-24">{children}</main>
    </div>
  );
};

export default Layout;
