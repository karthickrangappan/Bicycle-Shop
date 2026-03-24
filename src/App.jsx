import React, { useEffect } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./components/home/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import Services from "./components/Services";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useShop } from "./context/ShopContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/Cart";
import CategoryPage from "./components/CategoryPage";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import MyOrders from "./components/MyOrders";
import Profile from "./components/Profile";
import TechnicalHelp from "./components/support/TechnicalHelp";
import ServiceCenter from "./components/support/ServiceCenter";
import WarrantyPolicy from "./components/support/WarrantyPolicy";
import SizingGuide from "./components/support/SizingGuide";
import ShippingInfo from "./components/support/ShippingInfo";
import WarrantyClaimForm from "./components/support/WarrantyClaimForm";
import AdminRouter from "./admin/AdminRouter";
import { AdminProvider } from "./admin/context/AdminContext";
import ScrollToTop from "./layout/ScrollToTop";
import { Toaster, useToasterStore, toast } from "react-hot-toast";

// Toast Limiter component to ensure only 1 toast is visible
const ToastLimiter = () => {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return null;
};

const PrivateRoute = ({ children }) => {
  const { user } = useShop();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: 80,
          right: 20,
        }}
        toastOptions={{
          duration: 2500,
          style: {
            background: '#0f172a',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '12px 20px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        }}
        gutter={8}
      />
      <ToastLimiter />
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Category Route */}
        <Route path="/category/:name" element={<CategoryPage />} />

        {/* Product Routes */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Support Routes */}
        <Route path="/technical-help" element={<TechnicalHelp />} />
        <Route path="/service-center" element={<ServiceCenter />} />
        <Route path="/warranty-policy" element={<WarrantyPolicy />} />
        <Route path="/sizing-guide" element={<SizingGuide />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/warranty-claim" element={<WarrantyClaimForm />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <AdminRouter />
            </AdminProvider>
          }
        />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
