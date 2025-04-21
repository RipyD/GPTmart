
import React from "react";
import products from "../data/products";

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
          <img src={product.image} alt={product.name} className="rounded-xl w-full h-40 object-cover mb-3" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="mt-2 font-bold text-blue-600">{product.price}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
