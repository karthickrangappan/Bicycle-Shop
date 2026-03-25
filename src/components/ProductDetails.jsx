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
    if (found) {
      setProduct(found);
      // Auto-select first variant and size
      const initialColor = found.colors?.length > 0 ? found.colors[0] : '#000000';
      const initialSize = found.sizes?.length > 0 ? found.sizes[0] : 'S';
      setForm({ color: initialColor });
      setSelectedSize(initialSize);
    }
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
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-12 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-brand-600 transition-colors mb-6 sm:mb-8 group text-[10px] sm:text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-stretch">
          {/* Image Gallery Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-h-[400px] sm:max-h-[450px] lg:max-h-[520px]"
          >
            <div className="h-full bg-slate-50 relative aspect-[4/3] sm:aspect-video lg:aspect-auto">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg border border-white">
                  {product.category}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 bg-white rounded-[2rem] p-4 sm:p-6 xl:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 max-h-[400px] sm:max-h-[450px] lg:max-h-[520px] overflow-y-auto custom-scrollbar"
          >
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < Math.floor(product.rating || 5) ? "fill-brand-500 text-brand-500" : "text-slate-100"} />
                  ))}
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">{reviews.length} Experiences</span>
              </div>

              <h1 className="text-xl sm:text-2xl xl:text-3xl font-black text-slate-950 tracking-tighter mb-1 sm:mb-2 leading-tight">
                {product.name}
              </h1>

              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mb-4 sm:mb-6 leading-relaxed">
                {product.description || "Engineered for elite performance. Masterpiece carbon fiber frame and high-precision gears."}
              </p>

              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">
                  ₹{product.price}
                </span>
                {product.stock > 0 ? (
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100/50">
                    {product.stock} In Stock
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100/50">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Variant Selection */}
              <div className="space-y-3 mb-4 sm:mb-6">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                  Color Variant <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {(product.colors || ['#000000', '#ffffff', '#ef4444', '#3b82f6', '#10b981']).map(color => {
                    const isHex = color.startsWith('#');
                    return (
                      <button
                        key={color}
                        onClick={() => setForm(f => ({ ...f, color }))}
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-black transition-all border ${form.color === color 
                          ? 'border-brand-500 bg-brand-50 text-brand-600 shadow-md scale-[1.02]' 
                          : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
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
              <div className="space-y-3 mb-6 sm:mb-8">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                  Precision Fit <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
                  {(product.sizes || ['XS', 'S', 'M', 'L', 'XL']).map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 sm:px-5 rounded-xl font-black text-[9px] tracking-widest transition-all ${selectedSize === size
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-[1.02]"
                        : "bg-white text-slate-400 border border-slate-100 hover:border-slate-200 hover:shadow-sm"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || !selectedSize}
                className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${product.stock > 0 && selectedSize
                  ? "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-white hover:shadow-md"
                  : "bg-slate-50 text-slate-300 cursor-not-allowed border-transparent"
                }`}
              >
                <ShoppingCart size={14} />
                {product.stock <= 0 ? "Reservation Closed" : !selectedSize ? "Select Precision Fit" : "Add To Bag"}
              </button>

              <button
                onClick={() => {
                  if (selectedSize) {
                    navigate('/checkout', {
                      state: { 
                        product, 
                        selectedSize, 
                        selectedColor: form.color 
                      }
                    });
                  } else {
                    toast.error('Please select a Precision Fit first');
                  }
                }}
                disabled={product.stock <= 0}
                className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg ${product.stock > 0 && selectedSize
                  ? "bg-brand-500 text-white shadow-brand-500/20 hover:bg-brand-600 hover:shadow-brand-500/30"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                }`}
              >
                {product.stock <= 0 ? "Out of Stock" : !selectedSize ? "Finalize Variant" : "Buy It Now"}
              </button>
            </div>

            {/* <div className="grid grid-cols-3 gap-3 pt-4 sm:pt-6 border-t border-slate-50">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Shield size={16} className="text-slate-300" />
                <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Lifetime Warranty</h4>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 border-x border-slate-100">
                <Truck size={16} className="text-slate-300" />
                <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Global Express</h4>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RotateCcw size={16} className="text-slate-300" />
                <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest">30-Day Return</h4>
              </div>
            </div> */}
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 pt-12 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Rider Experience</h2>
              <p className="text-slate-500 text-[11px] font-medium mb-6 leading-relaxed">
                Authentic performance records from the global community. Dominating terrain with the {product.name}.
              </p>

              {isVerified ? (
                <form onSubmit={submitReview} className="p-6 sm:p-8 bg-slate-900 rounded-[2rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-bl-full pointer-events-none" />
                  <h3 className="text-lg font-black tracking-tight mb-1">Submit Record</h3>

                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Overall Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-transform active:scale-90"
                        >
                          <Star
                            size={22}
                            className={`${star <= newReview.rating ? "fill-brand-500 text-brand-500" : "text-slate-700 hover:text-slate-500"} transition-all`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Height (cm)</label>
                      <div className="relative">
                        <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                          type="number"
                          required
                          value={newReview.height}
                          onChange={e => setNewReview({ ...newReview, height: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-800 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-brand-500 transition-all text-white"
                          placeholder="180"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weight (kg)</label>
                      <div className="relative">
                        <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                          type="number"
                          required
                          value={newReview.weight}
                          onChange={e => setNewReview({ ...newReview, weight: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-800 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-brand-500 transition-all text-white"
                          placeholder="75"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience Details</label>
                    <textarea
                      placeholder="Share details on handling, suspension, and speed..."
                      required
                      value={newReview.text}
                      onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                      className="w-full p-5 bg-slate-800 border-none rounded-2xl text-xs font-bold min-h-[120px] focus:ring-2 focus:ring-brand-500 transition-all text-white leading-relaxed"
                    />
                  </div>

                  <button className="w-full py-4.5 bg-brand-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/30 active:scale-[0.98]">
                    Post Final Review
                  </button>
                </form>
              ) : (
                <div className="p-8 bg-white border border-slate-100 rounded-[2rem] text-center shadow-sm">
                  <Shield size={36} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed max-w-[200px] mx-auto">
                    Only authenticated riders can contribute records.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-8 space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                  <Bike size={48} className="mx-auto text-slate-200 mb-6" />
                  <p className="text-slate-400 font-bold tracking-tight">Zero records found. Be the pioneer and share your first ride.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {reviews.map(review => (
                    <div key={review.id} className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-50 text-brand-600 rounded-2xl flex items-center justify-center text-lg font-black shadow-inner">
                            {review.userName?.[0] || 'R'}
                          </div>
                          <div>
                            <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                              {review.userName}
                              {review.isVerified && <CheckCircle2 size={14} className="text-brand-500" />}
                            </h4>
                            <div className="flex flex-wrap gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                              <span className="flex items-center gap-1"><Ruler size={10} /> {review.height}cm</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><Weight size={10} /> {review.weight}kg</span>
                              <span className="hidden sm:inline-block opacity-30">|</span>
                              <span className="text-slate-300">
                                {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified Record'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-0.5 bg-slate-50 px-3 py-1.5 rounded-full">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? "fill-brand-500 text-brand-500" : "text-slate-200"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm border-l-4 border-slate-50 pl-6 text-slate-600 font-medium leading-[1.8] italic">
                        "{review.text}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-24 border-t border-slate-100 pb-12 sm:pb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-8 px-2">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-950 tracking-tighter leading-none mb-3 sm:mb-4">
                  Explore <span className="text-brand-600">Similar</span> Gear
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs opacity-70">
                  Precision-engineered alternatives for {product.category} territory.
                </p>
              </div>

              <Link
                to="/shop"
                className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-brand-600 transition-all shrink-0"
              >
                Browse Catalog
                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all transform group-hover:rotate-12">
                  <ChevronRight size={20} />
                </div>
              </Link>
            </div>

            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
              <Swiper
                          modules={[Autoplay, ]}
                          spaceBetween={20}
                          slidesPerView={1}
                          loop={true}
                          speed={1000}
                          autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true, // PAUSE ON HOVER
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
                {relatedProducts.map((p) => (
                  <SwiperSlide key={p.id}>
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
