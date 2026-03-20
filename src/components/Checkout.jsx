import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ShoppingCart, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import PageHeader from '../layout/PageHeader';

export default function Checkout() {
   const { cart, placeOrder, user, addresses } = useShop();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'cod'
   const [selectedAddressId, setSelectedAddressId] = useState(null);

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zip: ''
   });

   // ✅ Prefill user data & handle saved address selection
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

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const subtotal = cart.reduce((acc, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return acc + (price * (item.quantity || 1));
   }, 0);

   // ✅ Validation Logic
   const validateForm = () => {
      const phoneRegex = /^[0-9]{10}$/;
      const pincodeRegex = /^[0-9]{6}$/;

      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zip) {
         alert("Please fill all shipping details");
         return false;
      }

      if (!phoneRegex.test(formData.phone)) {
         alert("Enter valid 10-digit phone number");
         return false;
      }

      if (!pincodeRegex.test(formData.zip)) {
         alert("Enter valid 6-digit pincode");
         return false;
      }

      if (!cart.length) {
         alert("Cart is empty");
         return false;
      }

      return true;
   };

   // ✅ Razorpay Script Loader
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

      if (paymentMethod === 'cod') {
         setTimeout(() => {
            placeOrder({
               ...formData,
               paymentMethod: 'COD',
               paymentStatus: 'Pending',
               paymentId: `COD-${Date.now()}`
            });
            alert("Order placed successfully 🚚 (Cash on Delivery)");
            setLoading(false);
            navigate('/my-orders');
         }, 1500);
         return;
      }

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
         alert("Razorpay SDK failed to load. Check internet.");
         setLoading(false);
         return;
      }

      const options = {
         key: "rzp_test_2ORD27rb7vGhwj",
         amount: subtotal * 100,
         currency: "INR",
         name: "CycleCore Premium",
         description: "Order Payment",
         handler: function (response) {
            placeOrder({
               ...formData,
               paymentMethod: 'Razorpay',
               paymentStatus: 'Paid',
               paymentId: response.razorpay_payment_id
            });
            alert("Payment successful ✅");
            setLoading(false);
            navigate('/my-orders');
         },
         modal: {
            ondismiss: function () {
               alert("Payment cancelled ❌");
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
            title="Secure Checkout"
            subtitle="Complete your elite acquisition with professional white-glove delivery."
            icon={ShieldCheck}
            badge="PCI Compliant"
         />

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <form onSubmit={handleCheckout} className="space-y-8">
                     {/* Saved Address Selection */}
                     {addresses.length > 0 && (
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-6 mb-8">
                           <h3 className="text-xl font-black flex items-center gap-3 text-slate-900 border-b border-slate-50 pb-4">
                              <MapPin className="text-brand-500" size={24} /> Select Saved Address
                           </h3>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {addresses.map(addr => (
                                 <button
                                    key={addr.id}
                                    type="button"
                                    onClick={() => setSelectedAddressId(addr.id)}
                                    className={`p-5 rounded-2xl border-2 text-left transition-all relative ${selectedAddressId === addr.id
                                          ? 'border-brand-500 bg-brand-50/50'
                                          : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                                       }`}
                                 >
                                    <p className="font-black text-slate-900 text-sm">{addr.name}</p>
                                    <p className="text-[10px] font-bold text-slate-500 mt-1 line-clamp-1">{addr.street}</p>
                                    {selectedAddressId === addr.id && (
                                       <div className="absolute top-3 right-3 w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center">
                                          <CheckCircle2 size={10} className="text-white" />
                                       </div>
                                    )}
                                 </button>
                              ))}
                              <button
                                 type="button"
                                 onClick={() => {
                                    setSelectedAddressId(null);
                                    setFormData({ ...formData, address: '', city: '', zip: '', phone: '' });
                                 }}
                                 className={`p-5 rounded-2xl border-2 border-dashed text-left transition-all ${!selectedAddressId ? 'border-brand-500 bg-brand-50/50' : 'border-slate-200 bg-white text-slate-400'
                                    }`}
                              >
                                 <p className="font-black text-sm">Use New Address</p>
                                 <p className="text-[10px] font-bold mt-1">Manually enter details</p>
                              </button>
                           </div>
                        </div>
                     )}

                     {/* Shipping Details */}
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                        <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 border-b border-slate-50 pb-6">
                           <Truck className="text-brand-500" size={28} /> Delivery Logistics
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                              <input
                                 type="text" name="name" value={formData.name} required
                                 className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                              <input
                                 type="email" name="email" value={formData.email} required
                                 className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="space-y-2 md:col-span-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Street Address</label>
                              <textarea
                                 name="address" value={formData.address} required
                                 rows="2"
                                 className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                                 placeholder="Enter your detailed address"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                              <input
                                 type="tel" name="phone" value={formData.phone} required
                                 className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                                 placeholder="10-digit number"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">City / State</label>
                              <input
                                 type="text" name="city" value={formData.city} required
                                 className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                                 placeholder="e.g. Chennai, Tamil Nadu"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Pincode</label>
                              <input
                                 type="text" name="zip" value={formData.zip} required
                                 className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                                 placeholder="6-digit pincode"
                                 onChange={handleChange}
                              />
                           </div>
                        </div>
                     </div>

                     {/* Payment Selection */}
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                        <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 border-b border-slate-50 pb-6">
                           <ShieldCheck className="text-brand-500" size={28} /> Payment Portal
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <button
                              type="button"
                              onClick={() => setPaymentMethod('online')}
                              className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-3 text-left ${paymentMethod === 'online' ? 'border-brand-500 bg-brand-50/50 shadow-xl shadow-brand-500/10' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                                 }`}
                           >
                              <div className="flex items-center justify-between">
                                 <CreditCard size={28} className={paymentMethod === 'online' ? 'text-brand-600' : 'text-slate-300'} />
                                 {paymentMethod === 'online' && <CheckCircle2 size={20} className="text-brand-600" />}
                              </div>
                              <div>
                                 <p className={`font-black text-lg tracking-tight ${paymentMethod === 'online' ? 'text-slate-950' : ''}`}>Razorpay</p>
                                 <p className="text-[10px] font-bold uppercase tracking-widest">Cards, UPI, Wallets</p>
                              </div>
                           </button>

                           <button
                              type="button"
                              onClick={() => setPaymentMethod('cod')}
                              className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-3 text-left ${paymentMethod === 'cod' ? 'border-brand-500 bg-brand-50/50 shadow-xl shadow-brand-500/10' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                                 }`}
                           >
                              <div className="flex items-center justify-between">
                                 <Wallet size={28} className={paymentMethod === 'cod' ? 'text-brand-600' : 'text-slate-300'} />
                                 {paymentMethod === 'cod' && <CheckCircle2 size={20} className="text-brand-600" />}
                              </div>
                              <div>
                                 <p className={`font-black text-lg tracking-tight ${paymentMethod === 'cod' ? 'text-slate-950' : ''}`}>C.O.D</p>
                                 <p className="text-[10px] font-bold uppercase tracking-widest">Cash on Delivery</p>
                              </div>
                           </button>
                        </div>
                     </div>

                     <button
                        disabled={loading}
                        className="w-full py-6 bg-brand-500 text-white rounded-[2rem] text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95 disabled:grayscale"
                     >
                        {loading ? 'Processing Transaction...' : (paymentMethod === 'online' ? `Pay Securely ${formatCurrency(subtotal)}` : 'Confirm Elite Order')}
                        {!loading && <ArrowRight size={24} />}
                     </button>
                  </form>
               </motion.div>

               {/* Sidebar Summary */}
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
                  <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 sticky top-32 overflow-hidden ring-1 ring-slate-100">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 blur-[80px] rounded-full"></div>

                     <h2 className="text-2xl font-black text-slate-900 mb-10 tracking-tight flex items-center gap-3 relative z-10">
                        Investment Summary <span className="px-4 py-1.5 bg-slate-900 text-[11px] rounded-full text-white">{cart.length}</span>
                     </h2>

                     <div className="space-y-8 mb-12 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar relative z-10">
                        {cart.map(item => (
                           <div key={item.id} className="flex gap-6 items-center">
                              <div className="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 flex-shrink-0 group">
                                 <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex-grow">
                                 <p className="text-slate-900 font-black text-sm tracking-tight">{item.name}</p>
                                 <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-slate-900 font-black font-space">{item.price}</p>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-5 pt-10 border-t border-dashed border-slate-200 relative z-10">
                        <div className="flex justify-between text-slate-500 font-bold text-sm">
                           <span>Subtotal Selection</span>
                           <span className="text-slate-950">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-bold text-sm">
                           <span>Express Shipping</span>
                           <span className="text-green-600 font-black uppercase tracking-widest text-xs">Complimentary</span>
                        </div>
                        <div className="flex justify-between items-center pt-6">
                           <span className="text-xl font-black text-slate-900 tracking-tight">Total Investment</span>
                           <span className="text-4xl lg:text-5xl font-black text-brand-600 font-space tracking-tighter">{formatCurrency(subtotal)}</span>
                        </div>
                     </div>
                  </div>
               </motion.div>

            </div>
         </div>
      </div>
   );
}
