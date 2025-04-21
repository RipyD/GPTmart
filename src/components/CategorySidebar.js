import React from "react";

const categories = ["All", "Social Media", "Business", "Developer Tools"];

const CategorySidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="space-y-2 p-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`block w-full text-left px-4 py-2 rounded-xl ${
            selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategorySidebar;
