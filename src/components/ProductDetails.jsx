import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowLeft, Shield, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import ProductCard, { MOCK_PRODUCTS } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  const relatedProducts = React.useMemo(() => {
    if (!product) return [];
    return MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-brand-600 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-3 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-white relative flex items-center justify-center p-4">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-1000 rounded-2xl"
               />
               
               {/* Overlay badges */}
               <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 bg-brand-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-500/30">
                    Premium Category: {product.category}
                  </span>
               </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center py-4"
          >
            <div className="mb-6">
               <div className="flex items-center gap-1.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-500 text-brand-500" />
                  ))}
                  <span className="text-xs font-bold text-slate-400 ml-1">(128 Reviews)</span>
               </div>
               
               <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tighter mb-2 leading-tight">
                 {product.name}
               </h1>
               
               <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm mb-6">
                 Engineered for elite performance. Masterpiece carbon fiber frame and high-precision gears for the perfect ride.
               </p>
               
               <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter font-space">
                    {product.price}
                  </span>
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">
                    Instock
                  </span>
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
               <button 
                 onClick={() => addToCart(product)}
                 className="flex-grow py-4 bg-brand-500 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all hover:-translate-y-1 active:scale-95 active:translate-y-0"
               >
                 <ShoppingCart size={20} />
                 Add to Bag
               </button>
               
               {/* <button 
                 onClick={toggleWishlist}
                 className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all active:scale-90 ${
                   isInWishlist(product.id) 
                   ? "bg-red-50 text-red-500 border-red-200" 
                   : "border-slate-100 text-slate-400 hover:border-red-500 hover:text-red-500"
                 }`}
               >
                 <Heart size={20} className={isInWishlist(product.id) ? "fill-red-500" : ""} />
               </button> */}
            </div>

            {/* Features/Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100">
               <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                     <Shield size={16} />
                  </div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Lifetime Warranty</h4>
               </div>
               
               <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                     <Truck size={16} />
                  </div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Free Express</h4>
               </div>
 
               <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                     <RotateCcw size={16} />
                  </div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight">30 Day Return</h4>
               </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-24 border-t border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-500 mb-2 block">Top Recommendations</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                  More <span className="text-brand-600">{product.category}</span> Masterpieces
                </h2>
              </div>
              <Link 
                to={`/shop?category=${product.category}`} 
                className="flex items-center gap-3 text-slate-900 font-black hover:text-brand-600 transition-all group px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100"
              >
                View Category
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1.2}
                loop={relatedProducts.length > 4}
                speed={800}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 24 }, // sm
                  768: { slidesPerView: 2.5, spaceBetween: 28 }, // md
                  1024: { slidesPerView: 3, spaceBetween: 32 }, // lg
                  1280: { slidesPerView: 4, spaceBetween: 32 }, // xl
                }}
                className="!pb-8 !pt-4"
              >
                {relatedProducts.map((p, idx) => (
                  <SwiperSlide key={p.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
