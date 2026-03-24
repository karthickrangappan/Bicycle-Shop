import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowLeft, Shield, Truck, RotateCcw, CheckCircle2, Ruler, Weight, ChevronRight, Bike } from 'lucide-react';
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
  const { products, addToCart, addToWishlist, isInWishlist, removeFromWishlist, user, orders } = useShop();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', height: '', weight: '' });
  const [isVerified, setIsVerified] = useState(false);
  const [form, setForm] = useState({ color: '#000000' });

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found && found.status === 'inactive') {
      toast.error("This cycle is currently hidden from the shop.");
      navigate('/shop', { replace: true });
      return;
    }
    setProduct(found);
  }, [id, products, navigate]);

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
      const bought = orders.some(o => 
        o.status === "Delivered" && 
        o.items.some(item => item.id === product.id)
      );
      setIsVerified(bought);
    }
  }, [user, product, orders]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id && p.status !== 'inactive')
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  }, [product, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full" />
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
    <div className="min-h-screen bg-slate-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-brand-600 transition-colors mb-6 group text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-3 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-fit"
          >
            <div className="aspect-[16/11] sm:aspect-video rounded-[2rem] overflow-hidden bg-slate-50 relative flex items-center justify-center">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
               <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-white">
                    {product.category}
                  </span>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2rem] p-5 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-100 h-fit"
          >
            <div className="mb-4">
               <div className="flex items-center gap-1 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < Math.floor(product.rating || 5) ? "fill-brand-500 text-brand-500" : "text-slate-100"} />
                    ))}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{reviews.length} Performance Records</span>
               </div>
               
               <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tighter mb-1.5 leading-tight">
                 {product.name}
               </h1>
               
               <p className="text-[11px] text-slate-500 font-medium max-w-sm mb-4 leading-relaxed">
                 {product.description || "Engineered for elite performance. Masterpiece carbon fiber frame and high-precision gears for the perfect ride."}
               </p>
               
               <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">
                    ₹{product.price}
                  </span>
                  {product.stock > 0 ? (
                    <span className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded-md text-[8px] font-black uppercase tracking-widest border border-green-100/50">
                      {product.stock} In Stock
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-red-50 text-red-600 rounded-md text-[8px] font-black uppercase tracking-widest border border-red-100/50">
                      Sold Out
                    </span>
                  )}
               </div>

                   {/* Variant Selection */}
                   <div className="space-y-3 mb-5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-0.5 flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        Color Variant <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(product.colors || ['#000000', '#ffffff', '#ef4444', '#3b82f6', '#10b981']).map(color => {
                          const isHex = color.startsWith('#');
                          return (
                            <button
                              key={color}
                              onClick={() => setForm(f => ({ ...f, color }))}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border ${
                                form.color === color ? 'border-brand-500 bg-brand-50 text-brand-600 shadow-sm' : 'border-slate-100 bg-white text-slate-400'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                {isHex && <div className="w-2 h-2 rounded-full border border-slate-200" style={{ backgroundColor: color }} />}
                                <span>{color}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                   </div>

                   {/* Size Selection */}
                   <div className="space-y-3 mb-6">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-0.5 flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        Precision Fit <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(product.sizes || ['XS', 'S', 'M', 'L', 'XL']).map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg font-black text-[10px] tracking-widest transition-all ${
                              selectedSize === size
                              ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                              : "bg-white text-slate-400 border border-slate-50 hover:border-slate-200"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                   </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-6">
               <button 
                 onClick={handleAddToCart}
                 disabled={product.stock <= 0 || !selectedSize}
                 className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${
                   product.stock > 0 && selectedSize
                   ? "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-white hover:shadow-sm"
                   : "bg-slate-50 text-slate-300 cursor-not-allowed border-transparent"
                 }`}
               >
                 <ShoppingCart size={14} />
                 {product.stock <= 0 ? "Out" : !selectedSize ? "Size?" : "To Bag"}
               </button>

               <button 
                 onClick={() => { 
                    handleAddToCart(); 
                    if(selectedSize) navigate('/checkout', { 
                       state: { product, selectedSize, selectedColor: form.color } 
                    }); 
                 }}
                 disabled={product.stock <= 0 || !selectedSize}
                 className={`flex-[1.5] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
                   product.stock > 0 && selectedSize
                   ? "bg-brand-500 text-white shadow-brand-500/10 hover:bg-brand-600"
                   : "bg-slate-50 text-slate-200 cursor-not-allowed shadow-none"
                 }`}
               >
                 {product.stock <= 0 ? "No Stock" : !selectedSize ? "Variant?" : "Buy It Now"}
               </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-5 border-t border-slate-50">
               <div className="flex flex-col items-center text-center gap-1">
                  <Shield size={14} className="text-slate-300" />
                  <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Warranty</h4>
               </div>
               <div className="flex flex-col items-center text-center gap-1 border-x border-slate-50">
                  <Truck size={14} className="text-slate-300" />
                  <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Express</h4>
               </div>
               <div className="flex flex-col items-center text-center gap-1">
                  <RotateCcw size={14} className="text-slate-300" />
                  <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest">30 Day</h4>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-16 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Customer Experience</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Read how others are performing with their {product.name}.
              </p>

              {isVerified ? (
                <form onSubmit={submitReview} className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-bl-full pointer-events-none" />
                  <h3 className="text-lg font-black tracking-tight mb-2">Leave a Performance Review</h3>
                  
                  {/* Star Rating Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate your experience</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-transform active:scale-90"
                        >
                          <Star 
                            size={24} 
                            className={`${star <= newReview.rating ? "fill-brand-500 text-brand-500" : "text-slate-700"} transition-all`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Height (cm)</label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                        <input 
                          type="number" 
                          required
                          value={newReview.height}
                          onChange={e => setNewReview({...newReview, height: e.target.value})}
                          className="w-full pl-9 pr-3 py-3 bg-slate-800 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-brand-500 transition-all" 
                          placeholder="180" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weight (kg)</label>
                      <div className="relative">
                        <Weight className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                        <input 
                          type="number" 
                          required
                          value={newReview.weight}
                          onChange={e => setNewReview({...newReview, weight: e.target.value})}
                          className="w-full pl-9 pr-3 py-3 bg-slate-800 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-brand-500 transition-all" 
                          placeholder="75" 
                        />
                      </div>
                    </div>
                  </div>

                  <textarea 
                    placeholder="Tell us about the handling, comfort, and speed..." 
                    required
                    value={newReview.text}
                    onChange={e => setNewReview({...newReview, text: e.target.value})}
                    className="w-full p-4 bg-slate-800 border-none rounded-xl text-xs font-bold min-h-[100px] focus:ring-1 focus:ring-brand-500 transition-all"
                  />
                  <button className="w-full py-4 bg-brand-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 active:scale-95">
                    Post My Review
                  </button>
                </form>
              ) : (
                <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] text-center">
                  <Shield size={32} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                    Only verified riders who have purchased this bike can submit a performance review.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-400 font-bold">No performance reviews yet. Be the first to share your journey.</p>
                </div>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black">
                          {review.userName?.[0] || 'R'}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                            {review.userName}
                            {review.isVerified && <CheckCircle2 size={12} className="text-brand-500" />}
                          </h4>
                          <div className="flex gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tight mt-0.5">
                             <span>{review.height}cm</span>
                             <span>•</span>
                             <span>{review.weight}kg</span>
                             {review.createdAt && (
                               <>
                                 <span>•</span>
                                 <span className="text-slate-300">
                                   {review.createdAt.toDate ? review.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                                 </span>
                               </>
                             )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? "fill-brand-500 text-brand-500" : "text-slate-100"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-slate-100 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
               <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tighter leading-none mb-2">Explore <span className="text-brand-600">Similar</span> Gear</h2>
                  <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">High precision alternatives in {product.category}</p>
               </div>
               <Link to="/shop" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 transition-all shrink-0">
                  Full Catalog <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all"><ChevronRight size={16} /></div>
               </Link>
            </div>

            <div className="relative overflow-visible">
               <Swiper
                  modules={[Autoplay]}
                  spaceBetween={16}
                  slidesPerView={1}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  breakpoints={{
                    480: { slidesPerView: 1.5, spaceBetween: 20 },
                    768: { slidesPerView: 2.5, spaceBetween: 24 },
                    1024: { slidesPerView: 3.5, spaceBetween: 30 },
                    1280: { slidesPerView: 4, spaceBetween: 32 }
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
          </div>
        )}
      </div>
    </div>
  );
}
