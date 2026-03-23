import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ShoppingCart, ArrowRight, Wallet, CheckCircle2, MapPin, Box, Wrench, Building2, Home } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PageHeader from '../layout/PageHeader';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Checkout() {
   const { cart, placeOrder, user, addresses, products } = useShop();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [paymentMethod, setPaymentMethod] = useState('online');
   const [selectedAddressId, setSelectedAddressId] = useState(null);
   
   // New Shipping Logic states
   const [assemblyTier, setAssemblyTier] = useState('Standard'); // 'Standard' or 'ReadyToRide'
   const [addressType, setAddressType] = useState('Residential'); // 'Residential' or 'Commercial'
   const [mechanicAvailable, setMechanicAvailable] = useState(null);
   const [isValidatingAddress, setIsValidatingAddress] = useState(false);

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zip: ''
   });

   useEffect(() => {
      if (user) {
         setFormData(prev => ({ ...prev, name: user.name || '', email: user.email || '' }));
      }
   }, [user]);

   useEffect(() => {
      if (selectedAddressId) {
         const addr = addresses.find(a => a.id === selectedAddressId);
         if (addr) {
            setFormData({
               name: addr.name,
               email: addr.email,
               phone: addr.phone,
               address: addr.street,
               city: addr.cityState,
               zip: addr.pincode
            });
         }
      }
   }, [selectedAddressId, addresses]);

   // Mock Address Validation API
   const validateAddressAttributes = async (pincode) => {
      setIsValidatingAddress(true);
      // Simulate API delay
      await new Promise(r => setTimeout(r, 1200));
      
      // Mock Logic: Even pincodes are residential, odds are commercial
      const isResidential = parseInt(pincode) % 2 === 0;
      setAddressType(isResidential ? 'Residential' : 'Commercial');
      
      // Mock Logic: Pincodes starting with "6" have Mobile Mechanics
      const isMechanicAvail = pincode.startsWith('6');
      setMechanicAvailable(isMechanicAvail);
      
      setIsValidatingAddress(false);
   };

   useEffect(() => {
     if (formData.zip.length === 6) {
        validateAddressAttributes(formData.zip);
     }
   }, [formData.zip]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const subtotal = useMemo(() => {
      return cart.reduce((acc, item) => {
         const price = parseFloat(String(item.price).replace(/[^\d.]/g, '')) || 0;
         return acc + (price * (item.quantity || 1));
      }, 0);
   }, [cart]);

   // Dimensional Weight Logic & Bulky Factor
   const shippingCosts = useMemo(() => {
      let totalDimWeightCost = 0;
      let assemblyFee = assemblyTier === 'ReadyToRide' ? 1499 : 499;

      cart.forEach(item => {
         // Default bicycle box dimensions if not provided (LxWxH in cm)
         const L = item.length || 150;
         const W = item.width || 25;
         const H = item.height || 80;
         const dimWeight = (L * W * H) / 5000; // standard factor
         totalDimWeightCost += dimWeight * 20; // ₹20 per dim kg
      });

      // Commercial surcharge
      const surcharge = addressType === 'Commercial' ? 250 : 0;

      return {
         freight: Math.round(totalDimWeightCost),
         assembly: assemblyFee,
         total: Math.round(totalDimWeightCost + assemblyFee + surcharge)
      };
   }, [cart, assemblyTier, addressType]);

   const totalInvestment = subtotal + shippingCosts.total;

   const validateForm = () => {
      const phoneRegex = /^[0-9]{10}$/;
      const pincodeRegex = /^[0-9]{6}$/;

      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zip) {
         toast.error("Please fill all shipping details");
         return false;
      }

      if (!phoneRegex.test(formData.phone)) {
         toast.error("Enter valid 10-digit phone number");
         return false;
      }

      if (!pincodeRegex.test(formData.zip)) {
         toast.error("Enter valid 6-digit pincode");
         return false;
      }

      if (!cart.length) {
         toast.error("Cart is empty");
         return false;
      }

      if (assemblyTier === 'ReadyToRide' && mechanicAvailable === false) {
         toast.error("Ready-to-Ride is not available in your zip code. Please select Standard Boxed.");
         return false;
      }

      return true;
   };

   const loadRazorpay = () =>
      new Promise((resolve) => {
         if (window.Razorpay) return resolve(true);
         const script = document.createElement("script");
         script.src = "https://checkout.razorpay.com/v1/checkout.js";
         script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
         document.body.appendChild(script);
      });

   const handleCheckout = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      setLoading(true);

      // Final Inventory Check: Re-verify stock at the millisecond of "Place Order"
      for(const item of cart) {
        const prodRef = doc(db, 'products', item.id);
        const prodSnap = await getDoc(prodRef);
        if(!prodSnap.exists() || (prodSnap.data().stock || 0) < 0) {
          toast.error(`Critical Stock Error: ${item.name} is no longer available.`);
          setLoading(false);
          return;
        }
      }

      const orderPayload = {
         ...formData,
         shippingCost: shippingCosts.total,
         assemblyTier,
         addressType,
         subtotal,
         total: totalInvestment,
         status: 'Pending'
      };

      if (paymentMethod === 'cod') {
         const res = await placeOrder({
            ...orderPayload,
            paymentMethod: "COD",
            paymentId: "COD",
         });
         
         if(res) {
            toast.success("Order placed successfully 🚚 (Cash on Delivery)");
            setTimeout(() => navigate('/my-orders'), 300);
         }
         setLoading(false);
         return;
      }

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
         toast.error("Razorpay SDK failed to load. Check internet.");
         setLoading(false);
         return;
      }

      const options = {
         key: "rzp_test_2ORD27rb7vGhwj",
         amount: Math.round(totalInvestment * 100),
         currency: "INR",
         name: "MyShop",
         description: "Order Payment",
         handler: async function (response) {
            const res = await placeOrder({
               ...orderPayload,
               paymentMethod: "Razorpay",
               paymentId: response.razorpay_payment_id,
               status: "Paid",
            });
            if(res) {
               toast.success("Payment successful ✅");
               setTimeout(() => navigate('/my-orders'), 300);
            }
            setLoading(false);
         },
         modal: {
            ondismiss: function () {
               toast.error("Payment cancelled ❌");
               setLoading(false);
            },
         },
         prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
         },
         theme: { color: "#22c55e" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
   };

   const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
         style: 'currency', currency: 'INR', maximumFractionDigits: 0
      }).format(amount);
   };

   if (cart.length === 0) {
      navigate('/shop');
      return null;
   }

   return (
      <div className="min-h-screen bg-slate-50 pb-20">
         <PageHeader
            title="Premium Checkout"
            subtitle="Finalize your elite performance selection and logistics."
            icon={ShieldCheck}
            badge="Secure Protocol"
         />

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <form onSubmit={handleCheckout} className="space-y-8">
                     
                     {/* Shipping Logistics */}
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                           <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900">
                              <Truck className="text-brand-500" size={28} /> Logistics & Tiers
                           </h3>
                           <AnimatePresence>
                             {isValidatingAddress && (
                               <motion.div 
                                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                 className="flex items-center gap-2 text-[10px] font-black text-brand-500 uppercase tracking-widest"
                               >
                                 <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 border-2 border-brand-500 border-t-transparent rounded-full" />
                                 Validating Address
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>

                        {/* Assembly Tiers Overlay */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <button
                              type="button"
                              onClick={() => setAssemblyTier('Standard')}
                              className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-3 text-left ${assemblyTier === 'Standard' ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                           >
                              <Box size={24} />
                              <div>
                                 <p className="font-black text-lg">Standard Boxed</p>
                                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Professional Factory Packaging</p>
                                 <p className="mt-2 text-sm font-black">₹499</p>
                              </div>
                           </button>

                           <button
                              type="button"
                              onClick={() => setAssemblyTier('ReadyToRide')}
                              className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-3 text-left relative overflow-hidden ${assemblyTier === 'ReadyToRide' ? 'border-brand-500 bg-brand-500 text-white shadow-xl' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                           >
                              <Wrench size={24} />
                              <div>
                                 <p className="font-black text-lg">Ready-to-Ride</p>
                                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">White-Glove Assembly Delivery</p>
                                 {mechanicAvailable === false && <p className="text-[10px] font-black text-red-200 uppercase mt-1">Not available in your area</p>}
                                 <p className="mt-2 text-sm font-black">₹1,499</p>
                              </div>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                              <input type="text" name="name" value={formData.name} required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all" onChange={handleChange} />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                              <input type="email" name="email" value={formData.email} required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all" onChange={handleChange} />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Pincode</label>
                              <div className="relative">
                                <input type="text" name="zip" value={formData.zip} required maxLength="6" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all" placeholder="6-digit pincode" onChange={handleChange} />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                  {addressType === 'Residential' ? <Home size={16} className="text-brand-500" /> : <Building2 size={16} className="text-orange-500" />}
                                  <span className={`text-[8px] font-black uppercase tracking-widest ${addressType === 'Residential' ? 'text-brand-500' : 'text-orange-500'}`}>{addressType}</span>
                                </div>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                              <input type="tel" name="phone" value={formData.phone} required className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all" placeholder="10-digit number" onChange={handleChange} />
                           </div>
                           <div className="space-y-2 md:col-span-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Street Address</label>
                              <textarea name="address" value={formData.address} required rows="2" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all" placeholder="Detailed address details..." onChange={handleChange} />
                           </div>
                        </div>
                     </div>

                     {/* Payment & Action */}
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                        <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 border-b border-slate-50 pb-6">
                           <ShieldCheck className="text-brand-500" size={28} /> Payment Portal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <button type="button" onClick={() => setPaymentMethod('online')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-3 text-left ${paymentMethod === 'online' ? 'border-brand-500 bg-brand-50/50' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                              <CreditCard size={28} />
                              <div><p className="font-black text-lg">Razorpay</p><p className="text-[10px] font-bold uppercase tracking-widest">Cards, UPI, Emis</p></div>
                           </button>
                           <button type="button" onClick={() => setPaymentMethod('cod')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-3 text-left ${paymentMethod === 'cod' ? 'border-brand-500 bg-brand-50/50' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                              <Wallet size={28} />
                              <div><p className="font-black text-lg">C.O.D</p><p className="text-[10px] font-bold uppercase tracking-widest">Pay on Arrival</p></div>
                           </button>
                        </div>
                     </div>

                     <button disabled={loading} className="w-full py-6 bg-brand-500 text-white rounded-[2rem] text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95 disabled:grayscale">
                        {loading ? 'Authorizing Transaction...' : (paymentMethod === 'online' ? `Secure Investment ${formatCurrency(totalInvestment)}` : 'Confirm Elite Order')}
                        {!loading && <ArrowRight size={24} />}
                     </button>
                  </form>
               </motion.div>

               {/* Summary */}
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 sticky top-32 overflow-hidden ring-1 ring-slate-100">
                     <h2 className="text-2xl font-black text-slate-900 mb-10 tracking-tight flex items-center gap-3">
                        Investment Summary <span className="px-4 py-1.5 bg-slate-900 text-[11px] rounded-full text-white">{cart.length}</span>
                     </h2>

                     <div className="space-y-6 mb-12">
                        {cart.map(item => (
                           <div key={item.id} className="flex gap-4 items-center">
                              <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 p-2">
                                 <img src={item.image} className="w-full h-full object-contain" />
                              </div>
                              <div className="flex-grow">
                                 <p className="text-slate-900 font-black text-xs line-clamp-1">{item.name}</p>
                                 <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{item.selectedSize} × {item.quantity}</p>
                              </div>
                              <p className="text-slate-900 font-black text-xs">₹{item.price}</p>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-4 pt-10 border-t border-dashed border-slate-200">
                        <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                           <span>Base Subtotal</span>
                           <span className="text-slate-950 font-black tracking-tight">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                           <span>Bulky Freight Fee</span>
                           <span className="text-slate-950 font-black tracking-tight">{formatCurrency(shippingCosts.freight)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                           <span>Assembly Tier ({assemblyTier})</span>
                           <span className="text-slate-950 font-black tracking-tight">{formatCurrency(shippingCosts.assembly)}</span>
                        </div>
                        {addressType === 'Commercial' && (
                           <div className="flex justify-between text-orange-500 font-bold text-xs uppercase tracking-widest">
                              <span>Comm. Surcharge</span>
                              <span className="font-black tracking-tight">+ ₹250</span>
                           </div>
                        )}
                        <div className="flex justify-between items-center pt-6">
                           <span className="text-xl font-black text-slate-900">Total Investment</span>
                           <span className="text-4xl font-black text-brand-600 font-space tracking-tighter">{formatCurrency(totalInvestment)}</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
   );
}
