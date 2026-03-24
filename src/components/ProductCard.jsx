import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

// ✅ YOUR MOCK DATA WITH RATINGS
export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Firefox Viper 21S",
    category: "Mountain",
    price: "₹24,999",
    rating: 4.8,
    reviews: 124,
    image: "https://bicyclekart.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730536780"
  },
  {
    id: 2,
    name: "Giant TCR Advanced",
    category: "Road",
    price: "₹1,85,000",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Hero Lectro C8",
    category: "E-Bikes",
    price: "₹38,995",
    rating: 4.7,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Btwin Riverside 120",
    category: "City",
    price: "₹12,999",
    rating: 4.5,
    reviews: 342,
    image: "https://bicyclekart.com/cdn/shop/files/MAINcopy_4_f82b0278-c8ce-45ca-9a98-2b6a06a4d806.jpg?v=1730720227"
  },
  {
    id: 5,
    name: "Hercules Roadeo A50",
    category: "Mountain",
    price: "₹18,500",
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Trek Domane AL 2",
    category: "Road",
    price: "₹82,299",
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Merida Big Nine 20",
    category: "Mountain",
    price: "₹45,500",
    rating: 4.7,
    reviews: 78,
    image: "https://bicyclekart.com/cdn/shop/files/MAINcopy_4_f82b0278-c8ce-45ca-9a98-2b6a06a4d806.jpg?v=1730720227"
  },
  {
    id: 8,
    name: "Specialized Turbo Vado",
    category: "E-Bikes",
    price: "₹2,10,000",
    rating: 5.0,
    reviews: 45,
    image: "https://bicyclekart.com/cdn/shop/files/MAINcopy_4_f82b0278-c8ce-45ca-9a98-2b6a06a4d806.jpg?v=1730720227"
  },
  {
    id: 9,
    name: "Cannondale Topstone",
    category: "Gravel",
    price: "₹1,45,000",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    name: "Scott Speedster 40",
    category: "Road",
    price: "₹75,000",
    rating: 4.6,
    reviews: 112,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCHwgnnpZ68AiFwcT63KS9hCYnzQLIAzMrA&s"
  },
  {
    id: 11,
    name: "Kona Lava Dome",
    category: "Mountain",
    price: "₹58,000",
    rating: 4.7,
    reviews: 54,
    image: "https://omobikes.com/cdn/shop/files/merida-big-nine-15-2022.webp?v=1760154428&width=360"
  },
  {
    id: 12,
    name: "Rad Power RadRover",
    category: "E-Bikes",
    price: "₹1,35,000",
    rating: 4.8,
    reviews: 198,
    image: "https://omobikes.com/cdn/shop/files/Zozila21sTurboGrey1.jpg?v=1770782436&width=360"
  },
  {
    id: 13,
    name: "Brompton C Line",
    category: "City",
    price: "₹1,65,000",
    rating: 4.9,
    reviews: 32,
    image: "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2025/NOVEMBER/6/Wou7hXdK_1e28ec6ee2b5403d9dc565eb298dbb19.jpg"
  },
  {
    id: 14,
    name: "Santa Cruz Blur",
    category: "Mountain",
    price: "₹4,50,000",
    rating: 5.0,
    reviews: 28,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZza7dPbQMkN5Yqjrrw69hTGpjNEP9smecCw&s"
  },
  {
    id: 15,
    name: "Pinarello Dogma F12",
    category: "Road",
    price: "₹12,00,000",
    rating: 5.0,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 16,
    name: "Surly Ghost Grappler",
    category: "Gravel",
    price: "₹1,85,000",
    rating: 4.7,
    reviews: 63,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-76BwEIcIHAzxkU1ExQxr9FlKmwPQ7HFPvA&s"
  },
  {
    id: 17,
    name: "Canyon Spectral",
    category: "Mountain",
    price: "₹2,90,000",
    rating: 4.9,
    reviews: 42,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6v8_z0J7mcws0dhF24edYkrY5J2uObhDtZA&s"
  },
  {
    id: 18,
    name: "Bianchi Aria",
    category: "Road",
    price: "₹2,30,000",
    rating: 4.8,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 19,
    name: "Trek Rail 9.7",
    category: "E-Bikes",
    price: "₹5,40,000",
    rating: 4.9,
    reviews: 31,
    image: "https://bicyclekart.com/cdn/shop/files/MAINcopy_4_f82b0278-c8ce-45ca-9a98-2b6a06a4d806.jpg?v=1730720227"
  },
  {
    id: 20,
    name: "Dahon Mariner",
    category: "City",
    price: "₹62,000",
    rating: 4.7,
    reviews: 84,
    image: "https://bicyclekart.com/cdn/shop/files/Secondary2copy_1066x.jpg?v=1730712326"
  }
];

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
        {(products.length > 0 ? products.filter(p => p.status !== 'inactive') : MOCK_PRODUCTS).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// 🔥 PRODUCT CARD
export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();

  // const handleWishlist = (e) => {
  //   e.preventDefault();
  //   isInWishlist(product.id)
  //     ? removeFromWishlist(product.id)
  //     : addToWishlist(product);
  // };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Size selection is mandatory - redirect to details
    navigate(`/product/${product.id}`);
  };

  // Dynamic themes based on product category
  const categoryTheme = {
    Mountain: { gradient: "from-blue-500/40", border: "bg-blue-500", bg: "bg-blue-50/30" },
    Road: { gradient: "from-emerald-500/40", border: "bg-emerald-500", bg: "bg-emerald-50/30" },
    City: { gradient: "from-cyan-500/40", border: "bg-cyan-500", bg: "bg-cyan-50/30" },
    "E-Bikes": { gradient: "from-yellow-500/40", border: "bg-yellow-500", bg: "bg-yellow-50/30" },
    Gravel: { gradient: "from-indigo-500/40", border: "bg-indigo-500", bg: "bg-indigo-50/30" }
  }[product.category] || { gradient: "from-brand-500/40", border: "bg-brand-500", bg: "bg-slate-50" };

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)] hover:border-brand-200"
    >
      {/* IMAGE - Shorter Aspect Ratio */}
      <div className={`relative aspect-[4/3] overflow-hidden ${categoryTheme.bg} cursor-pointer`}>
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Quick Add To Cart Icon - Show on hover */}
        <div className="absolute top-4 right-4 z-20 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/90 backdrop-blur-xl text-slate-400 hover:text-brand-500 hover:bg-white shadow-xl hover:shadow-brand-500/10 transition-all duration-300 shadow-slate-200"
            title="Add to Cart"
            >
            <ShoppingCart size={18} className="transition-transform duration-300 group-hover:scale-110" />
            </button>
        </div>

        {/* Badge Overlay */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
           <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-[10px] font-black text-white rounded-full uppercase tracking-widest border border-white/10 ring-1 ring-black/20">
             {product.category}
           </span>
        </div>

        {/* Hover Gradient Glow */}
        <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${categoryTheme.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
           <div className="flex">
             {[...Array(5)].map((_, i) => (
               <Star 
                key={i} 
                size={12} 
                className={`${
                    i < Math.floor(product.rating || 5) 
                    ? "fill-brand-500 text-brand-500" 
                    : "fill-slate-200 text-slate-200"
                }`} 
               />
             ))}
           </div>
           <span className="text-[11px] font-black text-slate-400 font-space">{product.rating || 5}</span>
           <span className="text-[10px] font-bold text-slate-300 ml-auto uppercase tracking-tighter">({product.reviews || 0} reviews)</span>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-black text-lg text-slate-950 group-hover:text-brand-600 transition truncate leading-snug mb-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Size/Age Range Info */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
          {(product.sizes || []).map((s, i) => (
            <span key={i} className="whitespace-nowrap px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-tighter rounded-md border border-slate-100">
              {s.includes('Age') ? s.split('(')[0].trim() : s}
            </span>
          ))}
          {(!product.sizes || product.sizes.length === 0) && (
            <span className="px-2 py-0.5 bg-slate-50 text-slate-300 text-[9px] font-black uppercase tracking-tighter rounded-md border border-slate-100">
              Standard Size
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-brand-500/60 uppercase tracking-widest leading-none mb-1">Price Outlet</span>
            <span className="text-xl font-black text-slate-950 tracking-tighter font-space">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <Link 
              to={`/product/${product.id}`}
              className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-brand-50 hover:border-brand-200 transition-all shadow-sm group/btn"
              title="View Details"
            >
              <Eye size={18} className="transition-transform duration-300 group-hover/btn:scale-110" />
            </Link>
            {/* <button
              onClick={handleAddToCart}
              className="w-11 h-11 bg-brand-500 text-white rounded-2xl flex items-center justify-center hover:bg-brand-500 transition-all shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(59,130,246,0.5)] active:scale-95 group/cart"
              title="Add to Cart"
            >
              <ShoppingCart size={18} className="transition-transform duration-300 group-hover/cart:rotate-[-12deg] group-hover/cart:scale-110" />
            </button> */}
          </div>
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className={`absolute bottom-0 left-0 w-full h-1.5 ${categoryTheme.border} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </motion.div>
  );
}
