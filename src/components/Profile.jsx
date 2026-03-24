import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Package, MapPin, LogOut, ChevronRight, Mail, Phone, ShieldCheck, ShoppingCart, Calendar, ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';

export default function Profile() {
  const { user, logout, orders, cart, addresses, addAddress, removeAddress } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'profile';

  const [activeTab, setActiveTab] = useState(initialTab);
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
    if (!user) navigate('/login');
  }, [user]);

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
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full xl:w-80 flex-shrink-0"
          >
            <div className="bg-white p-4 lg:p-6 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 sticky top-28 border border-slate-100 flex flex-row xl:flex-col gap-2 xl:gap-0 overflow-x-auto xl:overflow-visible">
               <div className="hidden xl:flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-8">
                  <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-brand-500/30">
                     {(user.name || 'U')[0].toUpperCase()}
                  </div>
                   <div className="overflow-hidden">
                     <p className="font-black text-slate-900 truncate tracking-tight text-sm lg:text-base">{user.name || 'Unknown User'}</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{user.email}</p>
                   </div>
               </div>

               <div className="flex xl:flex-col gap-2 w-full">
                 {tabs.map((tab) => (
                   <button
                    key={tab.id}
                    onClick={() => {
                        setActiveTab(tab.id);
                        navigate(`?tab=${tab.id}`, { replace: true });
                    }}
                    className={`flex-1 xl:w-full flex items-center justify-center xl:justify-start gap-3 xl:gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl font-black transition-all group ${
                        activeTab === tab.id 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-brand-600"
                    }`}
                   >
                     <tab.icon className={activeTab === tab.id ? "text-brand-400" : "text-slate-400 group-hover:text-brand-500"} size={18} />
                     <span className="text-xs lg:text-sm whitespace-nowrap">{tab.label}</span>
                     {activeTab === tab.id && <ChevronRight size={14} className="ml-auto text-white hidden xl:block" />}
                   </button>
                 ))}

                 <div className="hidden xl:block h-px bg-slate-100 my-6 mx-2" />

                 <button 
                  onClick={logout}
                  className="flex xl:w-full items-center justify-center xl:justify-start gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl font-black text-red-500 hover:bg-red-50 transition-all group"
                 >
                    <LogOut size={18} className="text-red-400 group-hover:text-red-500" />
                    <span className="text-xs lg:text-sm whitespace-nowrap">Log Out</span>
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
                  className="bg-white rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                   <div className="flex items-center justify-between mb-8 lg:mb-10">
                      <div>
                         <h2 className="text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter mb-1 lg:mb-2 text-center sm:text-left">My Profile</h2>
                         <p className="text-xs lg:text-sm font-bold text-slate-400 text-center sm:text-left">Update your account settings</p>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                     <div className="space-y-6 lg:space-y-8">
                        <InfoField 
                           icon={User} 
                           label="Full Name" 
                           value={user.name || 'Unknown User'} 
                        />
                        <InfoField 
                           icon={Mail} 
                           label="Email Address" 
                           value={user.email} 
                        />
                        <InfoField 
                           icon={Phone} 
                           label="Phone Number" 
                           value="+91 98765 43210" 
                        />
                     </div>

                     <div className="space-y-6 lg:space-y-8">
                        <div className="bg-brand-50 p-6 rounded-[2rem] border border-brand-100 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                              <ShieldCheck size={100} />
                           </div>
                           <h4 className="text-lg font-black text-brand-700 tracking-tight mb-4">Account Security</h4>
                           <div className="flex items-center gap-3 mb-4">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-sm font-bold text-brand-600">Verification Active</span>
                           </div>
                           <button className="text-[10px] font-black uppercase tracking-widest text-white bg-brand-500 px-5 py-3 rounded-xl shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all">
                              Manage Security
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           <ProfileStat 
                              to="/cart" 
                              icon={ShoppingCart} 
                              value={cart.length} 
                              label="Items in Bag" 
                           />
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
                  className="bg-white rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-10">
                     <div>
                        <h2 className="text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter mb-2">Order History</h2>
                        <p className="text-xs lg:text-sm font-bold text-slate-400">Track and manage your premium purchases</p>
                     </div>
                     <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                        <Package size={24} />
                     </div>
                  </div>

                  {!orders || orders.length === 0 ? (
                    <div className="py-16 text-center">
                       <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                          <Package size={40} />
                       </div>
                       <h3 className="text-xl font-black text-slate-900 mb-2">No Orders Yet</h3>
                       <p className="text-slate-400 font-bold mb-8">Start your journey today and find your ride.</p>
                       <Link to="/shop" className="px-8 py-4 bg-brand-500 text-white rounded-2xl font-black shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all inline-flex items-center gap-2">
                          Explore Collection <ArrowRight size={18} />
                       </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       {orders.map((order, i) => (
                         <div key={i} className="p-5 lg:p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-brand-200 transition-all group">
                            <div className="flex flex-col sm:flex-row justify-between mb-4 lg:mb-6 gap-4">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-500 shadow-sm">
                                     <Calendar size={18} />
                                  </div>
                                  <div>
                                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Order ID: #{order.id}</p>
                                     <p className="font-black text-slate-900 text-sm lg:text-base">{order.date}</p>
                                  </div>
                               </div>
                               <div className="flex items-center justify-between sm:justify-start gap-4 lg:gap-6">
                                  <div>
                                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 sm:text-right">Price</p>
                                     <p className="font-black text-brand-600 font-space text-base lg:text-lg">₹{(order.total || 0).toLocaleString()}</p>
                                  </div>
                                  <div className="px-3 lg:px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                                     {order.status}
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                               <p className="text-[10px] font-bold text-slate-500">Items: <span className="text-slate-900 font-black">{order.items?.length || 0}</span></p>
                               <Link to="/my-orders" className="text-[10px] font-black text-brand-500 uppercase tracking-widest flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                  Details <ChevronRight size={14} />
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
                  className="bg-white rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-10">
                     <h2 className="text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter">My Addresses</h2>
                     {!showAddressForm && (
                        <button 
                          onClick={() => setShowAddressForm(true)}
                          className="flex items-center gap-2 px-4 lg:px-5 py-3 bg-brand-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all"
                        >
                          <MapPin size={16} /> Add New
                        </button>
                     )}
                  </div>

                  {showAddressForm ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-50 p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 mb-10"
                    >
                      <form onSubmit={handleAddressSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Full Name</label>
                              <input 
                                required
                                value={newAddr.name}
                                onChange={(e) => setNewAddr({...newAddr, name: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" 
                                placeholder="Owner Name" 
                              />
                           </div>
                           <div>
                              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Email Address</label>
                              <input 
                                required
                                type="email"
                                value={newAddr.email}
                                onChange={(e) => setNewAddr({...newAddr, email: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" 
                                placeholder="email@example.com" 
                              />
                           </div>
                        </div>

                        <div>
                           <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Street Address</label>
                           <textarea 
                              required
                              value={newAddr.street}
                              onChange={(e) => setNewAddr({...newAddr, street: e.target.value})}
                              rows="3"
                              className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none resize-none transition-all" 
                              placeholder="Enter detail location" 
                           ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div>
                              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Phone Number</label>
                              <input 
                                required
                                value={newAddr.phone}
                                onChange={(e) => setNewAddr({...newAddr, phone: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" 
                                placeholder="Phone" 
                              />
                           </div>
                           <div>
                              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">City / State</label>
                              <input 
                                required
                                value={newAddr.cityState}
                                onChange={(e) => setNewAddr({...newAddr, cityState: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" 
                                placeholder="City" 
                              />
                           </div>
                           <div>
                              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Pincode</label>
                              <input 
                                required
                                value={newAddr.pincode}
                                onChange={(e) => setNewAddr({...newAddr, pincode: e.target.value})}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" 
                                placeholder="000000" 
                              />
                           </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                           <button 
                             type="submit"
                             className="flex-1 bg-slate-900 text-white rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all"
                           >
                             Save Address
                           </button>
                           <button 
                             type="button"
                             onClick={() => setShowAddressForm(false)}
                             className="flex-1 bg-white border border-slate-200 text-slate-400 rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                           >
                             Cancel
                           </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="p-6 lg:p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group border border-slate-800">
                           <div className="absolute top-0 right-0 p-8 opacity-5">
                              <MapPin size={120} />
                           </div>
                           <div className="relative z-10">
                              <div className="flex items-center justify-between mb-8">
                                 <span className="px-4 py-1.5 bg-brand-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest">Saved Address</span>
                                 <button 
                                   onClick={() => removeAddress(addr.id)}
                                   className="p-2.5 bg-white/5 text-white/40 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                 >
                                   <LogOut size={14} className="rotate-45" />
                                 </button>
                              </div>
                              <p className="text-xl font-black text-white mb-2">{addr.name}</p>
                              <p className="text-slate-400 font-medium leading-relaxed text-[13px]">
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
                           <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Add your shipping details</p>
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

function InfoField({ icon: Icon, label, value }) {
  return (
    <div>
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">{label}</label>
      <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl group focus-within:border-brand-500 transition-all">
        <Icon size={18} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
        <span className="font-bold text-slate-900 text-sm lg:text-base truncate">{value}</span>
      </div>
    </div>
  );
}

function ProfileStat({ to, icon: Icon, value, label, active = false }) {
  return (
    <Link to={to} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:bg-brand-50 hover:border-brand-100 transition-all group">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-500 shadow-sm mb-4">
        <Icon size={20} className={active ? "fill-red-500 text-red-500" : ""} />
      </div>
      <p className="text-xl lg:text-2xl font-black text-slate-900">{value}</p>
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 truncate">{label}</p>
    </Link>
  );
}
