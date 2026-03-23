import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdmin } from './context/AdminContext';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddEditProduct from './pages/AddEditProduct';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import { Inventory, Payments, Offers, Reviews } from './pages/InventoryPaymentsOffersReviews';
import { Reports, Services, CMS, Shipping, Settings, AdminUsers, Logs, Categories, SpareParts } from './pages/OtherPages';

const ProtectedRoute = ({ children }) => {
  const { adminUser } = useAdmin();
  if (!adminUser) return <Navigate to="/admin/login" replace />;
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
      <Route path="login" element={adminUser ? <Navigate to="/admin" replace /> : <AdminLogin />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="products/add" element={<ProtectedRoute><AddEditProduct /></ProtectedRoute>} />
      <Route path="products/edit/:id" element={<ProtectedRoute><AddEditProduct /></ProtectedRoute>} />
      <Route path="categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path="inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="spare-parts" element={<ProtectedRoute><SpareParts /></ProtectedRoute>} />
      <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      <Route path="payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      <Route path="offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
      <Route path="reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
      <Route path="services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
      <Route path="reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="cms" element={<ProtectedRoute><CMS /></ProtectedRoute>} />
      <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="admins" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
      <Route path="logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
    </Routes>
  );
}
