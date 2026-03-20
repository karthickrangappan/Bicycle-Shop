import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './components/home/Home';
import About from './components/About';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Services from './components/Services';
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      {/* <Route path='/shop' element={<Shop />} /> */}
      <Route path='/contact' element={<Contact />} />
      <Route path='/services' element={<Services />} />
    </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
