import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdmin } from './context/AdminContext';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddEditProduct from './pages/AddEditProduct';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import { Inventory } from './pages/InventoryPaymentsOffersReviews';
import { Settings, Categories } from './pages/OtherPages';

const ProtectedRoute = ({ children }) => {
  const { adminUser } = useAdmin();
  if (!adminUser) return <Navigate to="/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
};

export default function AdminRouter() {
  const { adminUser, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">VeloAdmin Loading</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="products/add" element={<ProtectedRoute><AddEditProduct /></ProtectedRoute>} />
      <Route path="products/edit/:id" element={<ProtectedRoute><AddEditProduct /></ProtectedRoute>} />
      <Route path="categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path="inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
