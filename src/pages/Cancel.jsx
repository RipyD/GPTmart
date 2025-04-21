import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => (
  <div className="max-w-xl mx-auto p-6 text-center">
    <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h1>
    <p className="text-gray-700 mb-6">No worries. Feel free to browse other GPTs.</p>
    <Link to="/" className="text-blue-600 underline">← Back to Marketplace</Link>
  </div>
);

export default Cancel;
