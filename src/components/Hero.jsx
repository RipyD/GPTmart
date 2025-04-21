import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-800 text-white py-24 text-center overflow-hidden">
      {/* Glowing backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.1),_transparent)] blur-2xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Rent Your GPTs.<br />
          <span className="text-green-400">Monetize the AI You Already Built.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
          GPTmart is the platform for creators to launch, rent, and earn from their custom GPTs — with Stripe payments, timed access, and full creator analytics.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex justify-center flex-wrap gap-4">
          <a href="https://your-notion-form-link.com" target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow hover:bg-green-400 transition">
              🚀 Get Early Access
            </button>
          </a>
          <a href="#marketplace">
            <button className="px-8 py-3 bg-white text-blue-950 text-lg font-semibold rounded-full shadow hover:bg-gray-100 transition">
              👀 Browse GPTs
            </button>
          </a>
        </div>

        {/* Tagline */}
        <p className="mt-10 text-sm uppercase text-blue-300 tracking-wider">
          For GPT Creators, Indie Hackers, and AI Builders
        </p>
      </div>
    </section>
  );
};

export default Hero;
