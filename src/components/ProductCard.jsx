import { ShoppingCart, Star, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

// 🔥 GRID COMPONENT
export function ProductGrid() {
  const { products, loading } = useShop();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useShop();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  // Dynamic themes based on product category
  const getCategoryTheme = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes('mountain')) return { gradient: "from-blue-600", border: "bg-blue-600", bg: "bg-blue-50/40", text: "text-blue-600", light: "bg-blue-50" };
    if (cat.includes('road')) return { gradient: "from-emerald-600", border: "bg-emerald-600", bg: "bg-emerald-50/40", text: "text-emerald-600", light: "bg-emerald-50" };
    if (cat.includes('urban') || cat.includes('city')) return { gradient: "from-cyan-500", border: "bg-cyan-500", bg: "bg-cyan-50/40", text: "text-cyan-600", light: "bg-cyan-50" };
    if (cat.includes('electric') || cat.includes('e-bike')) return { gradient: "from-amber-500", border: "bg-amber-500", bg: "bg-amber-50/40", text: "text-amber-600", light: "bg-amber-50" };
    if (cat.includes('gravel')) return { gradient: "from-indigo-500", border: "bg-indigo-500", bg: "bg-indigo-50/40", text: "text-indigo-600", light: "bg-indigo-50" };
    return { gradient: "from-brand-600", border: "bg-brand-600", bg: "bg-slate-50", text: "text-brand-600", light: "bg-brand-50" };
  };

  const theme = getCategoryTheme(product.category);

  const formatCurrency = (amount) => {
    const numericAmount = typeof amount === 'string' 
      ? parseInt(amount.replace(/[^\d]/g, '')) 
      : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(numericAmount);
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={`group relative ${theme.light} rounded-[2rem] border border-slate-100 overflow-hidden shadow-lg shadow-slate-200/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] hover:border-brand-100/50`}
    >
      {/* IMAGE CONTAINER */}
      <div className={`relative aspect-video sm:aspect-[4/3] overflow-hidden ${theme.bg} transition-colors duration-500`}>
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
          />
        </Link>

        {/* Floating Action Menu */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/95 backdrop-blur-xl border border-white/20 text-slate-400 hover:text-brand-600 hover:bg-white shadow-lg transition-all duration-300"
              title="Quick Add"
            >
              <ShoppingCart size={18} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/95 backdrop-blur-xl border border-white/20 text-slate-400 hover:text-cyan-500 hover:bg-white shadow-lg transition-all duration-300"
            >
              <Eye size={18} />
            </Link>
        </div>

        {/* Premium Badge Layer */}
        <div className="absolute top-4 left-4 z-20">
           <div className={`px-3 py-1 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center gap-2 shadow-sm`}>
              <div className={`w-1 h-1 rounded-full ${theme.border} animate-pulse`} />
              <span className="text-[8px] font-black text-white uppercase tracking-[0.1em]">
                {product.category}
              </span>
           </div>
        </div>
      </div>

      {/* CONTENT REGION */}
      <div className={`p-5 relative ${theme.light}`}>
        {/* Rating & reviews */}
        <div className="flex items-center justify-between mb-3">
           <div className="flex items-center gap-1">
             <div className="flex">
               {[...Array(5)].map((_, i) => (
                 <Star 
                  key={i} 
                  size={10} 
                  className={`${
                      i < Math.floor(product.rating || 5) 
                      ? "fill-amber-400 text-amber-400" 
                      : "fill-slate-100 text-slate-100"
                  }`} 
                 />
               ))}
             </div>
             <span className="text-[10px] font-black text-slate-900">{product.rating || 5}</span>
           </div>
           <span className="text-[9px] font-bold text-slate-400 uppercase">
             {product.reviews || 0} REVIEWS
           </span>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="block mb-3">
          <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors duration-300 leading-tight tracking-tight min-h-[40px] line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Features / Details chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(product.sizes || []).slice(0, 2).map((s, i) => (
            <span key={i} className="px-2 py-0.5 bg-white/50 text-slate-400 text-[9px] font-bold rounded-md border border-slate-100/50 uppercase">
              {s.includes('Age') ? s.split('(')[0].trim() : s}
            </span>
          ))}
          {(!product.sizes || product.sizes.length === 0) && (
            <div className={`px-2 py-0.5 ${theme.bg} ${theme.text} text-[8px] font-black rounded-md border border-current opacity-60 uppercase`}>
               Elite
            </div>
          )}
        </div>

        {/* Pricing Segment */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">MSRP</span>
            <div className="flex items-baseline gap-1">
               <span className={`text-xl font-black text-slate-950 tracking-tighter leading-none`}>
                 {formatCurrency(product.price)}
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className={`absolute top-0 left-0 w-1 h-0 ${theme.border} group-hover:h-full transition-all duration-500 ease-out`} />
    </motion.div>
  );
}

 

