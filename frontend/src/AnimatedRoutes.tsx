import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Páginas
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import PlaceholderPage from './pages/PlaceholderPage';

import DeliveryStatusPage from './pages/deliveries/DeliveryStatusPage';

import ManageUsersPage from './pages/users/ManageUsersPage';

import SalesAnalyticsPage from './pages/analytics/SalesAnalyticsPage';

import LeadsPage from './pages/LeadsPage';
import DeliveriesPage from './pages/deliveries/DeliveriesPage';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%' }}
      >
        <Routes location={location}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="/users/sellers" element={<ManageUsersPage />} />
          <Route path="/users/deliverers" element={<ManageUsersPage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
          <Route path="/analytics/sales" element={<SalesAnalyticsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
