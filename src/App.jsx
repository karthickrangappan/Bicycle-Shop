import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './components/home/Home';
import About from './components/About';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Services from './components/Services';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useShop } from './context/ShopContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';
import Profile from './components/Profile';
import TechnicalHelp from './components/support/TechnicalHelp';
import ServiceCenter from './components/support/ServiceCenter';
import WarrantyPolicy from './components/support/WarrantyPolicy';
import SizingGuide from './components/support/SizingGuide';
import ShippingInfo from './components/support/ShippingInfo';
import WarrantyClaimForm from './components/support/WarrantyClaimForm';

const PrivateRoute = ({ children }) => {
  const { user } = useShop();
  return user ? children : <Navigate to="/login" />;
};

import ScrollToTop from './layout/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        
        {/* Auth Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Product Routes */}
        <Route path='/product/:id' element={<ProductDetails />} />
        
        {/* Protected Routes */}
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/wishlist' element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/my-orders' element={<PrivateRoute><MyOrders /></PrivateRoute>} />

        {/* Support Routes */}
        <Route path='/technical-help' element={<TechnicalHelp />} />
        <Route path='/service-center' element={<ServiceCenter />} />
        <Route path='/warranty-policy' element={<WarrantyPolicy />} />
        <Route path='/sizing-guide' element={<SizingGuide />} />
        <Route path='/shipping-info' element={<ShippingInfo />} />
        <Route path='/warranty-claim' element={<WarrantyClaimForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
