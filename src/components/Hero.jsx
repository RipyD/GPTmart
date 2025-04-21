import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white text-center py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold">Welcome to GPTmart</h1>
        <p className="mt-4 text-lg">Discover and rent custom AI tools for your projects</p>
        <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-400">
          Start Exploring
        </button>
      </div>
    </section>
  );
};

export default Hero;
