// src/App.js
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { supabase } from './lib/supabaseClient';

// ✅ All components imported correctly as default exports
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Marketplace from './pages/Marketplace';
import CreatorDashboard from './pages/CreatorDashboard';
import CreatorProfile from './pages/CreatorProfile';
import GptDetail from './pages/GptDetail';
import Login from './pages/Login';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Home from './pages/Home'; // Make sure this is a default export in pages/Home.jsx
import Pricing from './pages/Pricing';

const AppWrapper = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

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
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <ProtectedRoute>
              <CreatorDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/gpt/:id" element={<Layout><GptDetail /></Layout>} />
      <Route path="/creator/:id" element={<Layout><CreatorProfile /></Layout>} />
      <Route path="/success" element={<Layout><Success /></Layout>} />
      <Route path="/cancel" element={<Layout><Cancel /></Layout>} />
      <Route path="/analytics" element={<Layout><AnalyticsDashboard /></Layout>} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
