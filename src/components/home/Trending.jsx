import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard, { MOCK_PRODUCTS } from '../ProductCard';
import { useShop } from '../../context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Trending() {
  const { products } = useShop();

  // Select trending products (High rating or just random 8)
  const trendingProducts = React.useMemo(() => {
    const data = products.length > 0 ? products.filter(p => p.status !== 'inactive') : MOCK_PRODUCTS;
    return [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);
  }, [products]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-500/5 blur-[100px] rounded-full -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 border border-brand-100 shadow-sm shadow-brand-500/5"
            >
               <TrendingUp size={14} /> Trending Now
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black text-slate-900 tracking-tighter"
            >
              Hottest <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Picks</span> of the Season
            </motion.h2>
          </div>
          
          <Link 
            to="/shop" 
            className="hidden md:flex items-center gap-3 text-slate-900 font-black hover:text-brand-600 transition-all group px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100"
          >
            Explore Master Catalog
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Swiper */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
              1536: { slidesPerView: 5, spaceBetween: 32 },
            }}
            className="!pb-12 !pt-4"
          >
            {trendingProducts.map((product, idx) => (
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

        {/* Mobile Call to Action */}
        <div className="mt-16 text-center md:hidden">
            <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 text-brand-600 font-black"
            >
                View Full Collection <ArrowRight size={16} />
            </Link>
        </div>

      </div>
    </section>
  );
}
