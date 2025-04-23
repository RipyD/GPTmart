import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { supabase } from './lib/supabaseClient';

import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Marketplace from './pages/Marketplace';
import CreatorDashboard from './pages/CreatorDashboard';
import CreatorProfile from './pages/CreatorProfile';
import GptDetail from './pages/GptDetail';
import Login from './pages/Login';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Pricing from './pages/Pricing';
import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Home from './pages/Home';
import NewGpt from './pages/NewGpt';

import './index.css';

// Import framer-motion for animation support
import { motion } from 'framer-motion';

const AppWrapper = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace motion={motion} />} />
        <Route path="/dashboard" element={<ProtectedRoute><CreatorDashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/gpt/:id" element={<GptDetail />} />
        <Route path="/creator/:id" element={<CreatorProfile />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/new-gpt" element={<ProtectedRoute><NewGpt /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Layout>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
