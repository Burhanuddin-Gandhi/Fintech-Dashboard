import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights     from './pages/Insights';
import Modal        from './components/UI/Modal';


export default function App() {
  const darkMode  = useSelector(s => s.ui.darkMode);

  const activeTab = useSelector(s => s.ui.activeTab);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <Layout>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'transactions' && <Transactions/>}
      {activeTab === 'insights'     && <Insights/>}
      <Modal/>
    </Layout>
  );
}