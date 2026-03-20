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

const PrivateRoute = ({ children }) => {
  const { user } = useShop();
  return user ? children : <Navigate to="/login" />;
};

import ScrollToTop from './layout/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
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
        
        {/* Public Routes */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        
        {/* Protected Routes */}
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/my-orders' element={<PrivateRoute><MyOrders /></PrivateRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
