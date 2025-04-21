// src/components/ProductCard.js

import React from 'react';
import { useCart } from '../Context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
      <p className="text-gray-600">{product.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


