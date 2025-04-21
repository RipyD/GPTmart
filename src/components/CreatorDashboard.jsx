import React from 'react';

const CreatorDashboard = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">Creator Dashboard</h2>
        <p className="mt-4 text-lg">Manage your AI tools and track your earnings.</p>
        <div className="mt-8">
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-400">
            Add New Tool
          </button>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-semibold">Your Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold">Your Tool 1</h4>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Edit Tool
              </button>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold">Your Tool 2</h4>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Edit Tool
              </button>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold">Your Tool 3</h4>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Edit Tool
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorDashboard;
