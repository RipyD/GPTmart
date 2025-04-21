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
import Navbar from './components/Navbar';
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

  const hideNavbarOnHome = location.pathname === '/';

  return (
    <>
      {!hideNavbarOnHome && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/gpt/:id" element={<GptDetail />} />
        <Route path="/creator/:id" element={<CreatorProfile />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
