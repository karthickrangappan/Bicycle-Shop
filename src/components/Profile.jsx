import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Package, 
  MapPin, 
  LogOut, 
  ChevronRight, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Calendar,
  Settings,
  Edit,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';

export default function Profile() {
  const { user, logout, orders, cart, wishlist, addresses, addAddress, removeAddress } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'profile';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user?.name || '',
    email: user?.email || '',
    street: '',
    phone: '',
    cityState: '',
    pincode: ''
  });

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    addAddress(newAddr);
    setShowAddressForm(false);
    setNewAddr({ name: user?.name || '', email: user?.email || '', street: '', phone: '', cityState: '', pincode: '' });
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'address', label: 'My Address', icon: MapPin },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <PageHeader 
        title="Account Center"
        subtitle="Manage your personal information, track orders, and configure your shipping preferences here."
        icon={User}
        badge="Master Member"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 sticky top-28 border border-slate-100">
               <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-8">
                  <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-brand-500/30">
                     {(user.name || 'U')[0].toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-black text-slate-900 truncate tracking-tight">{user.name || 'Unknown User'}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{user.email}</p>
                  </div>
               </div>

               <div className="space-y-2">
                 {tabs.map((tab) => (
                   <button
                    key={tab.id}
                    onClick={() => {
                        setActiveTab(tab.id);
                        navigate(`/profile?tab=${tab.id}`, { replace: true });
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all group ${
                        activeTab === tab.id 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-brand-600"
                    }`}
                   >
                     <tab.icon className={activeTab === tab.id ? "text-brand-400" : "text-slate-400 group-hover:text-brand-500"} size={20} />
                     <span className="text-sm">{tab.label}</span>
                     {activeTab === tab.id && <ChevronRight size={14} className="ml-auto text-white" />}
                   </button>
                 ))}

                 <div className="h-px bg-slate-50 my-6 mx-2" />

                 <button 
                  onClick={logout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-red-500 hover:bg-red-50 transition-all group"
                 >
                    <LogOut size={20} className="text-red-400 group-hover:text-red-500" />
                    <span className="text-sm">Log Out</span>
                 </button>
               </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h2 className="text-3xl font-black text-slate-950 tracking-tighter mb-2">My Profile</h2>
                        <p className="text-sm font-bold text-slate-400">Update your membership information and settings</p>
                     </div>
                     <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="p-3 bg-slate-50 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-2xl transition-all"
                     >
                        <Edit size={22} />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-8">
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2 px-1">Full Name</label>
                           <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl group focus-within:border-brand-500 transition-all">
                              <User size={18} className="text-slate-400" />
                              <span className="font-bold text-slate-900">{user.name || 'Unknown User'}</span>
                           </div>
                        </div>

                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2 px-1">Email Address</label>
                           <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl group focus-within:border-brand-500 transition-all">
                              <Mail size={18} className="text-slate-400" />
                              <span className="font-bold text-slate-900">{user.email}</span>
                           </div>
                        </div>

                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2 px-1">Phone Number</label>
                           <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl group focus-within:border-brand-500 transition-all">
                              <Phone size={18} className="text-slate-400" />
                              <span className="font-bold text-slate-900">+91 98765 43210</span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <div className="bg-brand-50 p-6 rounded-[2rem] border border-brand-100 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10">
                              <ShieldCheck size={100} />
                           </div>
                           <h4 className="text-lg font-black text-brand-700 tracking-tight mb-4">Account Security</h4>
                           <div className="flex items-center gap-3 mb-4">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              <span className="text-sm font-bold text-brand-600">Verification Active</span>
                           </div>
                           <button className="text-xs font-black uppercase tracking-widest text-white bg-brand-500 px-5 py-3 rounded-xl shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all">
                              Manage Security
                           </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <Link to="/wishlist" className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:bg-brand-50 hover:border-brand-100 transition-all group">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-red-500 shadow-sm mb-4">
                                 <Heart size={20} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
                              </div>
                              <p className="text-2xl font-black text-slate-900">{wishlist.length}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wishlist Items</p>
                           </Link>
                           <Link to="/cart" className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:bg-brand-50 hover:border-brand-100 transition-all group">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-500 shadow-sm mb-4">
                                 <ShoppingCart size={20} />
                              </div>
                              <p className="text-2xl font-black text-slate-900">{cart.length}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Items in Bag</p>
                           </Link>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h2 className="text-3xl font-black text-slate-950 tracking-tighter mb-2">Order History</h2>
                        <p className="text-sm font-bold text-slate-400">Track and manage your premium cycle purchases</p>
                     </div>
                     <div className="w-12 h-12 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center">
                        <Package size={24} />
                     </div>
                  </div>

                  {!orders || orders.length === 0 ? (
                    <div className="py-16 text-center">
                       <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                          <Package size={40} />
                       </div>
                       <h3 className="text-xl font-black text-slate-900 mb-2">No Orders Yet</h3>
                       <p className="text-slate-400 font-bold mb-8">Start your journey today and find your perfect ride.</p>
                       <Link to="/shop" className="px-8 py-4 bg-brand-500 text-white rounded-2xl font-black shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all inline-flex items-center gap-2">
                          Explore Collection <ArrowRight size={18} />
                       </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                       {orders.map((order, i) => (
                         <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-brand-200 transition-all group">
                            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-500 shadow-sm">
                                     <Calendar size={20} />
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID: #{order.id}</p>
                                     <p className="font-black text-slate-900">{order.date}</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-6 sm:text-right">
                                  <div>
                                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Price</p>
                                     <p className="font-black text-slate-900 font-space text-lg text-brand-600">₹{(order.total || 0).toLocaleString()}</p>
                                  </div>
                                  <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                     {order.status}
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                               <p className="text-xs font-bold text-slate-500">Items: <span className="text-slate-900 font-black">{order.items?.length || 0}</span></p>
                               <Link to="/my-orders" className="text-xs font-black text-brand-500 uppercase tracking-widest flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                  View Full Details <ChevronRight size={14} />
                               </Link>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h2 className="text-3xl font-black text-slate-950 tracking-tighter mb-2">My Addresses</h2>
                        <p className="text-sm font-bold text-slate-400">Configure your shipping and billing locations</p>
                     </div>
                     {!showAddressForm && (
                        <button 
                          onClick={() => setShowAddressForm(true)}
                          className="flex items-center gap-2 px-5 py-3 bg-brand-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all"
                        >
                          <MapPin size={16} /> Add New
                        </button>
                     )}
                  </div>

                  {showAddressForm ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mb-10"
                    >
                      <form onSubmit={handleAddressSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Full Name</label>
                              <input 
                                required
                                value={newAddr.name}
                                onChange={(e) => setNewAddr({...newAddr, name: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none" 
                                placeholder="karthick" 
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Email Address</label>
                              <input 
                                required
                                type="email"
                                value={newAddr.email}
                                onChange={(e) => setNewAddr({...newAddr, email: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none" 
                                placeholder="karthick@gmail.com" 
                              />
                           </div>
                        </div>

                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Street Address</label>
                           <textarea 
                              required
                              value={newAddr.street}
                              onChange={(e) => setNewAddr({...newAddr, street: e.target.value})}
                              rows="3"
                              className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none resize-none" 
                              placeholder="Enter your detailed address" 
                           ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Phone Number</label>
                              <input 
                                required
                                value={newAddr.phone}
                                onChange={(e) => setNewAddr({...newAddr, phone: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none" 
                                placeholder="10-digit number" 
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">City / State</label>
                              <input 
                                required
                                value={newAddr.cityState}
                                onChange={(e) => setNewAddr({...newAddr, cityState: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none" 
                                placeholder="e.g. Chennai, Tamil Nadu" 
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Pincode</label>
                              <input 
                                required
                                value={newAddr.pincode}
                                onChange={(e) => setNewAddr({...newAddr, pincode: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none" 
                                placeholder="000000" 
                              />
                           </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                           <button 
                             type="submit"
                             className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all"
                           >
                             Save Address
                           </button>
                           <button 
                             type="button"
                             onClick={() => setShowAddressForm(false)}
                             className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
                           >
                             Cancel
                           </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8 opacity-5">
                              <MapPin size={120} />
                           </div>
                           <div className="relative z-10">
                              <div className="flex items-center justify-between mb-8">
                                 <span className="px-4 py-1 bg-brand-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Saved Address</span>
                                 <div className="flex gap-2">
                                    <button 
                                      onClick={() => removeAddress(addr.id)}
                                      className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                    >
                                      <LogOut size={14} className="rotate-45" />
                                    </button>
                                 </div>
                              </div>
                              <p className="text-xl font-black text-white mb-2">{addr.name}</p>
                              <p className="text-slate-400 font-medium leading-relaxed text-sm">
                                 {addr.street},<br />
                                 {addr.cityState} - {addr.pincode}<br />
                                 Ph: {addr.phone}
                              </p>
                           </div>
                        </div>
                      ))}

                      {addresses.length === 0 && (
                        <div className="col-span-1 md:col-span-2 py-16 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                           <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                              <MapPin size={32} />
                           </div>
                           <h4 className="text-lg font-black text-slate-900">No Addresses Found</h4>
                           <p className="text-xs font-bold text-slate-400 mt-1">Add your shipping details to speed up checkout.</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

function ArrowRight(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
}
