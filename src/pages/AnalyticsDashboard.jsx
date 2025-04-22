// src/pages/AnalyticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

const AnalyticsDashboard = () => {
  const [user, setUser] = useState(null);
  const [creator, setCreator] = useState(null);
  const [filter, setFilter] = useState('all');
  const [gpts, setGpts] = useState([]);
  const [growthData, setGrowthData] = useState([
    { date: 'Week 1', revenue: 150 },
    { date: 'Week 2', revenue: 200 },
    { date: 'Week 3', revenue: 280 },
    { date: 'Week 4', revenue: 360 },
    { date: 'Week 5', revenue: 420 }
  ]);
  const [funnelData, setFunnelData] = useState([
    { stage: 'Visited Landing', users: 100 },
    { stage: 'Viewed Marketplace', users: 80 },
    { stage: 'Viewed GPT', users: 60 },
    { stage: 'Clicked Rent', users: 40 },
    { stage: 'Completed Payment', users: 25 },
    { stage: 'Accessed GPT', users: 22 }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        const { data: creatorData } = await supabase.from('creators').select('*').eq('id', data.user.id).single();
        if (creatorData) setCreator(creatorData);

        const { data: gptData } = await supabase.from('gpts').select('*').eq('creator_id', data.user.id);
        setGpts(gptData || []);
      }
    };
    fetchData();
  }, []);

  const fallbackGpts = [
    { name: 'Resume AI', total_rentals: 10, views: 100, price: 9, time_to_first_rent: 2 },
    { name: 'Code Whisperer', total_rentals: 15, views: 200, price: 12, time_to_first_rent: 4 },
    { name: 'Study GPT', total_rentals: 5, views: 70, price: 7, time_to_first_rent: 6 }
  ];

  const displayedGpts = gpts.length > 0 ? gpts : fallbackGpts;
  const totalViews = displayedGpts.reduce((sum, g) => sum + (g.views || 0), 0);
  const totalRevenue = displayedGpts.reduce((sum, g) => sum + (g.total_rentals || 0) * (g.price || 0), 0);
  const avgConversionRate = ((displayedGpts.reduce((sum, g) => sum + (g.views > 0 ? g.total_rentals / g.views : 0), 0) / displayedGpts.length) * 100).toFixed(1);
  const topGPT = displayedGpts.reduce((top, current) => ((top.total_rentals || 0) * (top.price || 0)) > ((current.total_rentals || 0) * (current.price || 0)) ? top : current);

  const handleExportCSV = () => {
    const csv = Papa.unparse({
      fields: ['Name', 'Views', 'Rentals', 'Price'],
      data: displayedGpts.map(g => [g.name, g.views, g.total_rentals, g.price])
    });
    saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'gpt-analytics.csv');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('GPT Analytics Report', 14, 16);
    doc.autoTable({ startY: 20, head: [['Name', 'Views', 'Rentals', 'Price']], body: displayedGpts.map(g => [g.name, g.views, g.total_rentals, `$${g.price}`]) });
    doc.save('gpt-analytics.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e0f1a] to-[#1c1e2c] text-white px-6 py-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 px-6 py-4 rounded-xl shadow">
          <h1 className="text-4xl font-extrabold">📊 Analytics Kingdom</h1>
          <div className="space-x-3">
            <button onClick={handleExportCSV} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Export CSV</button>
            <button onClick={handleExportPDF} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Export PDF</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#121a2c] p-4 rounded-xl border border-purple-700 shadow text-center">
            <h3 className="text-xl font-semibold text-purple-400">${totalRevenue.toFixed(2)}</h3>
            <p className="text-sm text-gray-400">Total Revenue</p>
          </div>
          <div className="bg-[#121a2c] p-4 rounded-xl border border-blue-700 shadow text-center">
            <h3 className="text-xl font-semibold text-blue-400">{totalViews}</h3>
            <p className="text-sm text-gray-400">Total Views</p>
          </div>
          <div className="bg-[#121a2c] p-4 rounded-xl border border-pink-700 shadow text-center">
            <h3 className="text-xl font-semibold text-pink-400">{avgConversionRate}%</h3>
            <p className="text-sm text-gray-400">Avg. Conversion Rate</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div>
            <h2 className="text-lg font-semibold mb-2">Top GPTs by Rentals</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={displayedGpts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_rentals" fill="#8b5cf6" animationDuration={700} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Simulated Revenue Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={3} dot={{ r: 5 }} animationDuration={800} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {!creator?.is_premium && (
  <div className="mt-16 bg-gradient-to-r from-purple-700 to-pink-600 p-6 rounded-xl text-white shadow-xl text-center animate-fade-in">
    <h3 className="text-2xl font-bold mb-2">Unlock Deeper Insights</h3>
    <p className="mb-4 max-w-xl mx-auto">
      See traffic sources, conversion funnels, time-on-page analytics and more.
      Upgrade to Pro to access premium tools designed to help you grow faster.
    </p>
    <a
      href="/pricing"
      className="inline-block bg-white text-purple-700 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
    >
      🔓 Upgrade to Pro
    </a>
  </div>
)}

        <h2 className="text-xl font-semibold mb-4">Creator GPTs</h2>
        <div className="overflow-x-auto flex space-x-4 pb-4">
          {displayedGpts.map(gpt => (
            <div key={gpt.name} className="min-w-[280px] bg-[#121a2c] p-4 rounded-xl border border-gray-600">
              <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                {gpt.name} {gpt.is_founder && <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full animate-pulse">Founder</span>}
              </h3>
              <p className="text-sm text-gray-400 mb-1">{gpt.description}</p>
              <p className="text-purple-400 font-semibold mb-1">${gpt.price}</p>
              <p className="text-xs text-gray-400">👁 {gpt.views || 0} · 💸 {gpt.total_rentals || 0}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold my-6">User Funnel</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={funnelData} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="stage" tick={{ fontSize: 14 }} />
            <Tooltip />
            <Bar dataKey="users" fill="#34d399" animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;