import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowLeft, Shield, Truck, RotateCcw, CheckCircle2, Ruler, Weight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import ProductCard from './ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist, isInWishlist, removeFromWishlist, user, orders } = useShop();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', height: '', weight: '' });
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    setProduct(found);
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
      const bought = orders.some(o => 
        o.status === "Delivered" && 
        o.items.some(item => item.id === product.id)
      );
      setIsVerified(bought);
    }
  }, [user, product, orders]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error('Please select a Paint color first');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a Frame Size first');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
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

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-brand-600 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-3 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-white relative flex items-center justify-center p-4">
               <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
               <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 bg-brand-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-500/30">
                    {product.category}
                  </span>
               </div>
            </div>
          </motion.div>
 
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
               <div className="flex items-center gap-1.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating || 5) ? "fill-brand-500 text-brand-500" : "text-slate-200"} />
                  ))}
                  <span className="text-xs font-bold text-slate-400 ml-1">({reviews.length} Reviews)</span>
               </div>
               
               <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tighter mb-2 leading-tight">
                 {product.name}
               </h1>
               
               <p className="text-sm text-slate-500 font-medium max-w-sm mb-6">
                 {product.description || "Engineered for elite performance. Masterpiece carbon fiber frame and high-precision gears for the perfect ride."}
               </p>
               
               <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl font-black text-slate-900">
                    ₹{product.price}
                  </span>
                  {product.stock > 0 ? (
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">
                      {product.stock} Available
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100">
                      Out of Stock
                    </span>
                  )}
               </div>
 
                   {/* Color Selection */}
                   <div className="space-y-4 mb-8">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Select Paint <span className="text-red-500">*</span></label>
                      <div className="flex flex-wrap gap-3">
                        {['#000000', '#ffffff', '#ef4444', '#3b82f6', '#10b981'].map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                              selectedColor === color ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-lg' : 'border-white shadow-sm'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                   </div>

                   {/* Size Selection */}
                   <div className="space-y-4 mb-8">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Select Frame Size <span className="text-red-500">*</span></label>
                      <div className="flex flex-wrap gap-3">
                        {sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-6 py-3 rounded-xl font-black transition-all ${
                              selectedSize === size
                              ? "bg-slate-900 text-white shadow-lg"
                              : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                   </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
               <button 
                 onClick={handleAddToCart}
                 disabled={product.stock <= 0 || !selectedSize}
                 className={`flex-grow py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                   product.stock > 0 && selectedSize
                   ? "bg-brand-500 text-white shadow-brand-500/20 hover:bg-brand-600 hover:-translate-y-1"
                   : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                 }`}
               >
                 <ShoppingCart size={20} />
                 {product.stock <= 0 ? "Out of Stock" : !selectedSize ? "Select Size to Add" : "Add to Bag"}
               </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100">
               <div className="flex items-center gap-2.5">
                  <Shield size={16} className="text-slate-400" />
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Lifetime Warranty</h4>
               </div>
               <div className="flex items-center gap-2.5">
                  <Truck size={16} className="text-slate-400" />
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Free Express</h4>
               </div>
               <div className="flex items-center gap-2.5">
                  <RotateCcw size={16} className="text-slate-400" />
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight">30 Day Return</h4>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-24 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Customer Experience</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Read how others are performing with their {product.name}.
              </p>

              {isVerified ? (
                <form onSubmit={submitReview} className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-4 shadow-2xl">
                  <h3 className="text-lg font-black tracking-tight mb-2">Leave a Review</h3>
                  
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
                          className="w-full pl-9 pr-3 py-3 bg-slate-800 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-brand-500" 
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
                          className="w-full pl-9 pr-3 py-3 bg-slate-800 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-brand-500" 
                          placeholder="75" 
                        />
                      </div>
                    </div>
                  </div>

                  <textarea 
                    placeholder="Your experience..." 
                    required
                    value={newReview.text}
                    onChange={e => setNewReview({...newReview, text: e.target.value})}
                    className="w-full p-4 bg-slate-800 border-none rounded-xl text-xs font-bold min-h-[100px] focus:ring-1 focus:ring-brand-500"
                  />
                  <button className="w-full py-3 bg-brand-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-colors">
                    Post Review
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
                            {review.isVerified && <CheckCircle2 size={14} className="text-brand-500" />}
                          </h4>
                          <div className="flex gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tight mt-0.5">
                             <span>{review.height}cm</span>
                             <span>•</span>
                             <span>{review.weight}kg</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
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
        {/* Related Products Swiper Section */}
        {products.filter(p => p.category === product.category && p.id !== product.id).length > 0 && (
          <div className="mt-24 pt-24 border-t border-slate-100">
            <div className="mb-12">
               <h2 className="text-3xl font-black text-slate-900 tracking-tighter">You Might Also <span className="text-brand-500">Love</span></h2>
               <p className="text-slate-400 font-medium mt-2 italic">Similar elite models engineered with the same DNA.</p>
            </div>
            
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={24}
            slidesPerView={1}
            freeMode={true}
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
              className="related-products-swiper !pb-12"
            >
              {products
                .filter(p => p.category === product.category && p.id !== product.id)
                .map((related) => (
                  <SwiperSlide key={related.id}>
                    <ProductCard product={related} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
