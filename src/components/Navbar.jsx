
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">GPTmart</Link>

      <div className="flex gap-4 items-center">
        <Link to="/marketplace" className="hover:underline">Marketplace</Link>

        {!user ? (
          <Link to="/login" className="hover:underline">Login</Link>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/analytics" className="hover:underline">Analytics</Link>
            <button onClick={onLogout} className="hover:underline text-red-300">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
