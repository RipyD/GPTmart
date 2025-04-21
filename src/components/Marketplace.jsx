import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const Marketplace = () => {
  useEffect(() => {
    alert("✅ Marketplace.js is rendering!");
    console.log("✅ Marketplace component mounted");
  }, []);

  return (
    <Layout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'green' }}>🚀 Hello from Marketplace!</h1>
        <p>If you see this, Marketplace.js is working ✅</p>
      </div>
    </Layout>
  );
};

export default Marketplace;
