// src/components/Cart.js

import React from 'react';
import { useCart } from '../Context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <span>{product.title}</span>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
