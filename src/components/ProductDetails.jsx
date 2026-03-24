import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Star, ArrowLeft, Shield, Truck, RotateCcw, 
  CheckCircle2, Ruler, Weight, Zap, Info, ChevronRight,
  TrendingUp, Award, Clock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, user, orders } = useShop();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', height: '', weight: '' });
  const [isVerified, setIsVerified] = useState(false);
  const [form, setForm] = useState({ color: '#000000' });

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      if (found.colors?.[0]) setForm({ color: found.colors[0] });
    }
  }, [id, products]);

  useEffect(() => {
    if (product) {
      const q = query(collection(db, "reviews"), where("productId", "==", product.id));
      const unsub = onSnapshot(q, (snapshot) => {
        setReviews(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
      return () => unsub();
    }
  }, [product]);

  useEffect(() => {
    if (user && product) {
      const bought = (orders || []).some(o => 
        o.status === "Delivered" && 
        o.items.some(item => item.id === product.id)
      );
      setIsVerified(bought);
    }
  }, [user, product, orders]);

  // Related products from same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
  }, [product, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
          className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full" 
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a Frame Size first');
      return;
    }
    addToCart(product, selectedSize, form.color);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Only verified buyers can leave reviews.");
      return;
    }
    if (!newReview.height || !newReview.weight) {
      toast.error("Please include your Height and Weight to help other buyers.");
      return;
    }
    await addDoc(collection(db, "reviews"), {
      ...newReview,
      productId: product.id,
      userId: user.email,
      userName: user.name,
      createdAt: serverTimestamp(),
      isVerified: true
    });
    setNewReview({ rating: 5, text: '', height: '', weight: '' });
    toast.success("Review submitted!");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 lg:pt-32 pb-20 overflow-x-hidden">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/5 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* BREADCRUMBS - Responsive Padding */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 overflow-x-auto no-scrollbar py-1">
            <button 
              onClick={() => navigate(-1)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all group shrink-0"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div className="flex items-center gap-2 whitespace-nowrap">
               <Link to="/" className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-500">Home</Link>
               <ChevronRight size={10} className="text-slate-300" />
               <Link to="/shop" className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-500">Shop</Link>
               <ChevronRight size={10} className="text-slate-300" />
               <span className="text-[10px] sm:text-xs font-black text-slate-900 uppercase tracking-widest truncate max-w-[100px] sm:max-w-none">{product.name}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 mb-16 sm:mb-20 items-start">
          {/* IMAGE SECTION - Takes more space on Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-6"
          >
            <div className="bg-white rounded-[2.5rem] p-2 sm:p-3 shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden group">
               <div className="aspect-[16/11] sm:aspect-[16/10] xl:aspect-[16/9] rounded-[2rem] overflow-hidden bg-slate-50 relative flex items-center justify-center p-4 sm:p-8 transition-all duration-700 group-hover:bg-white">
                  <motion.img 
                    layoutId={`product-img-${product.id}`}
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
                     <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                          {product.category}
                        </span>
                     </div>
                  </div>

                  {/* Tech Specs Summary floating */}
                  <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex gap-1.5 sm:gap-2">
                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-xl border border-white transition-transform hover:-translate-y-1">
                        <Weight size={12} className="text-brand-500 mb-0.5" />
                        <span className="text-[7px] sm:text-[8px] font-black text-slate-900">9.2kg</span>
                     </div>
                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-xl border border-white transition-transform hover:-translate-y-1">
                        <Zap size={12} className="text-amber-500 mb-0.5" />
                        <span className="text-[7px] sm:text-[8px] font-black text-slate-900">Carbon</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Value Props Grid */}
            <div className="grid grid-cols-3 gap-3">
               {[
                 { icon: Award, label: "Pro", desc: "Elite Eng." },
                 { icon: Shield, label: "Life", desc: "Warranty" },
                 { icon: Clock, label: "Fast", desc: "48h Del." }
               ].map((prop, i) => (
                 <div key={i} className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-white shadow-sm flex flex-col items-center text-center gap-1 group hover:bg-white hover:shadow-md transition-all">
                    <prop.icon size={16} className="text-brand-500 mb-0.5 group-hover:scale-110 transition-transform" />
                    <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-900">{prop.label}</h4>
                    <p className="hidden xs:block text-[7px] font-bold text-slate-400 uppercase">{prop.desc}</p>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* CONTENT SECTION - Reduced Vertical Spacing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="mb-6">
               <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-black text-amber-700">{product.rating || 5.0}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                    {reviews.length || 0} performance reviews
                  </span>
               </div>
               
               <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-950 tracking-tighter mb-2 sm:mb-3 leading-none">
                 {product.name}
               </h1>
               
               <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed mb-4 sm:mb-6">
                 {product.description || "Uncompromising performance meets avant-garde design. This masterpiece features a precision-engineered carbon frame for aerodynamic efficiency."}
               </p>
               
               <div className="flex items-end gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Edition MSRP</span>
                     <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-950 tracking-tighter leading-none">
                       {typeof product.price === 'string' && product.price.includes('₹') ? product.price : `₹${product.price?.toLocaleString('en-IN')}`}
                     </span>
                  </div>
                  {product.oldPrice && (
                    <span className="text-lg font-bold text-slate-300 line-through mb-0.5">
                      {typeof product.oldPrice === 'string' && product.oldPrice.includes('₹') ? product.oldPrice : `₹${product.oldPrice?.toLocaleString('en-IN')}`}
                    </span>
                  )}
               </div>

               {/* Configuration Selection - Compact */}
               <div className="space-y-6">
                   {/* Color Selection */}
                   <div className="space-y-3">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Frame Finish</label>
                         <span className="text-[9px] font-black text-brand-600 uppercase tracking-widest">{form.color}</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {(product.colors || ['#0F172A', '#E2E8F0', '#EF4444', '#3B82F6', '#10B981']).map(color => {
                          const isHex = color.startsWith('#');
                          return (
                            <button
                              key={color}
                              onClick={() => setForm(f => ({ ...f, color }))}
                              className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                form.color === color 
                                ? 'ring-2 ring-brand-500 ring-offset-2 scale-105 shadow-lg shadow-brand-500/10' 
                                : 'hover:scale-105 opacity-80'
                              }`}
                              style={{ backgroundColor: isHex ? color : '#ccc' }}
                            >
                               {!isHex && <span className="text-[7px] font-black text-white uppercase">{color[0]}</span>}
                               {form.color === color && (
                                 <motion.div layoutId="activeColor" className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <CheckCircle2 size={8} className="text-white" />
                                 </motion.div>
                               )}
                            </button>
                          );
                        })}
                      </div>
                   </div>

                   {/* Size Selection */}
                   <div className="space-y-3">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Precision Fit</label>
                         <button className="text-[9px] font-black text-brand-600 uppercase tracking-widest flex items-center gap-1 hover:text-brand-700 transition-all">
                            Sizing Guide <Ruler size={10} />
                         </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(product.sizes || ['XS', 'S', 'M', 'L', 'XL']).map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 border-2 ${
                              selectedSize === size
                              ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 translate-y-[-2px]"
                              : "bg-white border-slate-50 text-slate-400 hover:border-slate-200"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                   </div>
               </div>
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 mt-8 sm:mt-10">
               <button 
                 onClick={handleAddToCart}
                 disabled={product.stock <= 0}
                 className={`flex-1 group py-3.5 sm:py-5 rounded-[1.2rem] sm:rounded-[1.8rem] font-black uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-2 transition-all duration-500 ${
                   product.stock > 0
                   ? "bg-white text-slate-900 border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 shadow-sm"
                   : "bg-slate-50 text-slate-300 cursor-not-allowed"
                 }`}
               >
                 <ShoppingCart size={14} className="group-hover:rotate-[15deg] transition-transform" />
                 {product.stock <= 0 ? "Out" : "Add to Bag"}
               </button>

               <button 
                 onClick={() => { 
                    if(!selectedSize) { toast.error("Select size"); return; }
                    handleAddToCart(); 
                    navigate('/checkout', { 
                       state: { product, selectedSize, selectedColor: form.color } 
                    }); 
                 }}
                 disabled={product.stock <= 0}
                 className={`flex-[1.4] py-3.5 sm:py-5 rounded-[1.2rem] sm:rounded-[1.8rem] font-black uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-2 transition-all duration-500 shadow-xl shadow-brand-500/10 ${
                   product.stock > 0
                   ? "bg-brand-500 text-white hover:bg-brand-600 hover:scale-[1.01] active:scale-95"
                   : "bg-slate-50 text-slate-300 cursor-not-allowed shadow-none"
                 }`}
               >
                 <Zap size={14} className="fill-white" />
                 {product.stock <= 0 ? "Empty" : "Instant Checkout"}
               </button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-[1.5rem] text-white/90">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white/10 rounded-xl flex items-center justify-center text-brand-500 shrink-0">
                    <Info size={16} />
                </div>
                <div>
                   <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white">White Glove Delivery</h4>
                   <p className="text-[8px] sm:text-[9px] font-medium text-white/50 leading-tight">Professionally assembled and delivered with care.</p>
                </div>
            </div>
          </motion.div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="pt-16 sm:pt-20 lg:pt-24 border-t border-slate-100 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-24 h-fit">
              <h2 className="text-3xl font-black text-slate-950 tracking-tighter mb-4">Rider Feedback</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                Performance reports from verified CycleCore athletes.
              </p>

              {isVerified ? (
                <form onSubmit={submitReview} className="p-6 sm:p-8 bg-white border border-slate-100 rounded-[2.5rem] space-y-6 shadow-xl shadow-slate-200/50">
                  <h3 className="text-lg font-black tracking-tight mb-2 text-slate-900">Post Report</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                      <input 
                        type="number" 
                        required
                        value={newReview.height}
                        onChange={e => setNewReview({...newReview, height: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-[11px] font-bold focus:ring-2 focus:ring-brand-500/20 shadow-inner" 
                        placeholder="180" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                      <input 
                        type="number" 
                        required
                        value={newReview.weight}
                        onChange={e => setNewReview({...newReview, weight: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-[11px] font-bold focus:ring-2 focus:ring-brand-500/20 shadow-inner" 
                        placeholder="75" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Technical Journal</label>
                     <textarea 
                      placeholder="Share your ride quality experience..." 
                      required
                      value={newReview.text}
                      onChange={e => setNewReview({...newReview, text: e.target.value})}
                      className="w-full p-5 bg-slate-50 border-none rounded-[1.8rem] text-[11px] font-bold min-h-[100px] focus:ring-2 focus:ring-brand-500/20 transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg active:scale-95">
                    Submit Report
                  </button>
                </form>
              ) : (
                <div className="p-8 sm:p-10 bg-white border border-slate-100 rounded-[2.5rem] text-center shadow-sm">
                  <Shield size={28} className="mx-auto text-slate-200 mb-6" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-[180px] mx-auto">
                    Only verified owners can submit performance reviews.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {reviews.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 py-24 sm:py-32 text-center h-full flex flex-col items-center justify-center">
                  <TrendingUp size={40} className="text-slate-100 mb-6" />
                  <p className="text-slate-400 font-bold tracking-tight">Be the first to benchmark this masterpiece.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {reviews.map(review => (
                    <motion.div 
                      key={review.id} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-6 sm:p-10 bg-white rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/40 relative overflow-hidden"
                    >
                      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-slate-50 font-black text-6xl sm:text-8xl pointer-events-none select-none opacity-50">"</div>

                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black shrink-0">
                            {review.userName?.[0] || 'R'}
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-slate-950 flex items-center gap-2">
                              {review.userName}
                              {review.isVerified && <CheckCircle2 size={10} className="text-brand-500 shrink-0" />}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 px-2 py-0.5 bg-slate-50 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-100 w-fit">
                               {review.height}cm / {review.weight}kg
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0 self-end sm:self-auto">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < review.rating ? "fill-brand-500 text-brand-500" : "text-brand-100"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-slate-600 font-medium leading-[1.6] sm:leading-[1.8] relative z-10">
                        {review.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SWIPER - Moved to bottom */}
        <AnimatePresence>
          {relatedProducts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pb-16 sm:pb-20"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
                 <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tighter leading-none mb-3">Explore <span className="text-brand-600">Similar</span> Gear</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">High precision alternatives in {product.category}</p>
                 </div>
                 <Link to="/shop" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 transition-all shrink-0">
                    Full Catalog <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all"><ChevronRight size={16} /></div>
                 </Link>
              </div>

              <div className="relative -mx-4 px-4 overflow-visible">
                 <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    breakpoints={{
                      480: { slidesPerView: 1.5, spaceBetween: 20 },
                      640: { slidesPerView: 2.2, spaceBetween: 24 },
                      1024: { slidesPerView: 3.2 },
                      1280: { slidesPerView: 4.2 }
                    }}
                    className="!overflow-visible"
                 >
                    {relatedProducts.map((p) => (
                      <SwiperSlide key={p.id} className="pb-8">
                        <ProductCard product={p} />
                      </SwiperSlide>
                    ))}
                 </Swiper>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
