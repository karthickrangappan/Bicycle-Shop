import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { useShop } from '../../context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function NewArrivals() {
  const { products } = useShop();
  
  // Select latest products from DB
  const newProducts = React.useMemo(() => {
    const data = products.filter(p => p.status !== 'inactive');
    // Sort by id descending or just take the last 6
    return [...data].sort((a, b) => b.id - a.id).slice(0, 6);
  }, [products]);

  if (newProducts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 border border-emerald-100"
            >
               <Sparkles size={14} /> Fresh Off The Line
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black text-slate-900 tracking-tighter"
            >
              Discover <span className="text-emerald-500">New Arrivals</span>
            </motion.h2>
          </div>
          
          <Link 
            to="/shop" 
            className="flex items-center gap-2 text-slate-900 font-bold hover:text-emerald-600 transition-colors group px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            View Full Drop
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Product Swiper */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // PAUSE ON HOVER
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
              1536: { slidesPerView: 5, spaceBetween: 32 },
            }}
            className="!pb-16"
          >
            {newProducts.map((product, idx) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
