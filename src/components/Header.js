// /src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">GPTmart</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/marketplace" className="hover:underline">Marketplace</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
