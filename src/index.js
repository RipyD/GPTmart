import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your CSS file for styling (including TailwindCSS)
import App from './App'; // Your main App component
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './lib/supabaseClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SessionContextProvider supabaseClient={supabase}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SessionContextProvider>
);
