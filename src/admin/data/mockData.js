export const mockProducts = [
  { id: 1, name: "Trek Marlin 7", category: "Mountain Bikes", brand: "Trek", sku: "TRK-MAR-7-BL", price: 89999, mrp: 99999, stock: 12, status: "active", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200", variants: [{size:"M",color:"Blue",gear:"21-speed",stock:6},{size:"L",color:"Red",gear:"21-speed",stock:6}], rating: 4.5, sold: 43 },
  { id: 2, name: "Giant Contend AR", category: "Road Bikes", brand: "Giant", sku: "GNT-CON-AR-WH", price: 124999, mrp: 139999, stock: 5, status: "active", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200", variants: [{size:"S",color:"White",gear:"16-speed",stock:3},{size:"M",color:"Black",gear:"16-speed",stock:2}], rating: 4.7, sold: 28 },
  { id: 3, name: "Hero Sprint Pro", category: "Hybrid Bikes", brand: "Hero", sku: "HRO-SPR-PRO", price: 34999, mrp: 42000, stock: 3, status: "active", image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=200", variants: [{size:"L",color:"Orange",gear:"7-speed",stock:3}], rating: 4.2, sold: 67 },
  { id: 4, name: "Kiddies Cruizer 20", category: "Kids Bikes", brand: "Kiddies", sku: "KID-CRZ-20-PK", price: 8999, mrp: 11999, stock: 0, status: "inactive", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=200", variants: [{size:"S",color:"Pink",gear:"Single",stock:0}], rating: 4.0, sold: 89 },
  { id: 5, name: "Firefox Torpedo", category: "Mountain Bikes", brand: "Firefox", sku: "FFX-TOR-BK", price: 52999, mrp: 62000, stock: 8, status: "active", image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=200", variants: [{size:"M",color:"Black",gear:"24-speed",stock:4},{size:"L",color:"Green",gear:"24-speed",stock:4}], rating: 4.3, sold: 35 },
  { id: 6, name: "Giro Synthe Helmet", category: "Helmets", brand: "Giro", sku: "GIR-SYN-RED", price: 14999, mrp: 17999, stock: 25, status: "active", image: "https://images.unsplash.com/photo-1557425493-6f90ae4659fc?w=200", variants: [], rating: 4.6, sold: 112 },
  { id: 7, name: "Cateye Volt 800 Light", category: "Lights", brand: "Cateye", sku: "CAT-VLT-800", price: 5999, mrp: 7500, stock: 2, status: "active", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200", variants: [], rating: 4.4, sold: 78 },
  { id: 8, name: "Topeak Road Morph Pump", category: "Pumps", brand: "Topeak", sku: "TPK-RMP-G", price: 3499, mrp: 4500, stock: 18, status: "active", image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=200", variants: [], rating: 4.1, sold: 145 },
];

export const mockOrders = [
  { id: "ORD00001", customer: "Raj Kumar", email: "raj@example.com", date: "2026-03-20", items: [{name:"Trek Marlin 7",qty:1,price:89999}], total: 89999, status: "Delivered", payment: "UPI", paymentStatus: "Paid", address: "12, Gandhi St, Chennai" },
  { id: "ORD00002", customer: "Priya Singh", email: "priya@example.com", date: "2026-03-21", items: [{name:"Giant Contend AR",qty:1,price:124999},{name:"Giro Synthe Helmet",qty:1,price:14999}], total: 139998, status: "Shipped", payment: "Card", paymentStatus: "Paid", address: "45, MG Road, Bangalore" },
  { id: "ORD00003", customer: "Arun Patel", email: "arun@example.com", date: "2026-03-22", items: [{name:"Hero Sprint Pro",qty:2,price:34999}], total: 69998, status: "Confirmed", payment: "COD", paymentStatus: "Pending", address: "78, Nehru Nagar, Mumbai" },
  { id: "ORD00004", customer: "Meena Reddy", email: "meena@example.com", date: "2026-03-22", items: [{name:"Kiddies Cruizer 20",qty:1,price:8999}], total: 8999, status: "Pending", payment: "UPI", paymentStatus: "Paid", address: "23, Tank Bund Rd, Hyderabad" },
  { id: "ORD00005", customer: "Suresh Bose", email: "suresh@example.com", date: "2026-03-23", items: [{name:"Firefox Torpedo",qty:1,price:52999}], total: 52999, status: "Pending", payment: "Card", paymentStatus: "Failed", address: "5, Park Ave, Kolkata" },
  { id: "ORD00006", customer: "Kavitha Nair", email: "kavitha@example.com", date: "2026-03-19", items: [{name:"Cateye Volt 800 Light",qty:2,price:5999}], total: 11998, status: "Delivered", payment: "UPI", paymentStatus: "Paid", address: "67, Marine Drive, Kochi" },
  { id: "ORD00007", customer: "Dinesh Sharma", email: "dinesh@example.com", date: "2026-03-18", items: [{name:"Topeak Road Morph Pump",qty:3,price:3499}], total: 10497, status: "Delivered", payment: "COD", paymentStatus: "Paid", address: "9, Rajpur Rd, Dehradun" },
];

export const mockCustomers = [
  { id: 1, name: "Raj Kumar", email: "raj@example.com", phone: "9876543210", joined: "2025-11-10", orders: 5, totalSpent: 289000, status: "active", city: "Chennai" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", phone: "9876543211", joined: "2025-12-05", orders: 3, totalSpent: 189000, status: "active", city: "Bangalore" },
  { id: 3, name: "Arun Patel", email: "arun@example.com", phone: "9876543212", joined: "2026-01-15", orders: 2, totalSpent: 120000, status: "active", city: "Mumbai" },
  { id: 4, name: "Meena Reddy", email: "meena@example.com", phone: "9876543213", joined: "2026-02-20", orders: 1, totalSpent: 8999, status: "active", city: "Hyderabad" },
  { id: 5, name: "Suresh Bose", email: "suresh@example.com", phone: "9876543214", joined: "2026-03-01", orders: 4, totalSpent: 210000, status: "blocked", city: "Kolkata" },
  { id: 6, name: "Kavitha Nair", email: "kavitha@example.com", phone: "9876543215", joined: "2025-10-25", orders: 8, totalSpent: 450000, status: "active", city: "Kochi" },
];

export const mockCoupons = [
  { id: 1, code: "BIKE20", type: "percentage", value: 20, minOrder: 50000, maxUses: 100, used: 43, expiry: "2026-06-30", status: "active" },
  { id: 2, code: "FLAT500", type: "fixed", value: 500, minOrder: 5000, maxUses: 200, used: 178, expiry: "2026-04-15", status: "active" },
  { id: 3, code: "WELCOME10", type: "percentage", value: 10, minOrder: 1000, maxUses: 500, used: 500, expiry: "2026-01-01", status: "expired" },
];

export const mockReviews = [
  { id: 1, customer: "Raj Kumar", product: "Trek Marlin 7", rating: 5, comment: "Excellent bike! Smooth ride on both trails and roads.", date: "2026-03-15", status: "approved" },
  { id: 2, customer: "Priya Singh", product: "Giant Contend AR", rating: 4, comment: "Great road bike, slightly heavy but worth the price.", date: "2026-03-16", status: "pending" },
  { id: 3, customer: "Arun Patel", product: "Hero Sprint Pro", rating: 3, comment: "Buy this bike at the cheapest cost!!!! CLICK HERE", date: "2026-03-17", status: "spam" },
  { id: 4, customer: "Kavitha Nair", product: "Giro Synthe Helmet", rating: 5, comment: "Very comfortable and sturdy. Great fit!", date: "2026-03-18", status: "approved" },
];

export const mockAdmins = [
  { id: 1, name: "Super Admin", email: "admin@bicycleshop.com", role: "super_admin", status: "active", lastLogin: "2026-03-23" },
  { id: 2, name: "Inventory Manager", email: "inventory@bicycleshop.com", role: "manager", status: "active", lastLogin: "2026-03-22" },
  { id: 3, name: "Support Agent", email: "support@bicycleshop.com", role: "support", status: "active", lastLogin: "2026-03-21" },
];

export const mockLogs = [
  { id: 1, admin: "Super Admin", action: "Updated product price", target: "Trek Marlin 7", time: "2026-03-23 09:45", ip: "192.168.1.1" },
  { id: 2, admin: "Inventory Manager", action: "Added stock", target: "Hero Sprint Pro (+10)", time: "2026-03-23 08:30", ip: "192.168.1.2" },
  { id: 3, admin: "Super Admin", action: "Order status updated", target: "ORD00002 → Shipped", time: "2026-03-22 17:20", ip: "192.168.1.1" },
  { id: 4, admin: "Support Agent", action: "Customer blocked", target: "Suresh Bose", time: "2026-03-22 14:10", ip: "192.168.1.3" },
  { id: 5, admin: "Super Admin", action: "Coupon created", target: "BIKE20", time: "2026-03-21 11:00", ip: "192.168.1.1" },
];

export const salesData = [
  { month: "Oct", revenue: 234000, orders: 18 },
  { month: "Nov", revenue: 318000, orders: 27 },
  { month: "Dec", revenue: 490000, orders: 41 },
  { month: "Jan", revenue: 380000, orders: 32 },
  { month: "Feb", revenue: 425000, orders: 36 },
  { month: "Mar", revenue: 512000, orders: 44 },
];

export const categoryData = [
  { name: "Mountain Bikes", value: 38 },
  { name: "Road Bikes", value: 25 },
  { name: "Hybrid Bikes", value: 20 },
  { name: "Kids Bikes", value: 10 },
  { name: "Accessories", value: 7 },
];

export const mockServices = [
  { id: 1, customer: "Raj Kumar", phone: "9876543210", bike: "Trek Marlin 7", issue: "Gear shifting problem", date: "2026-03-25", status: "Pending", technician: "Murugan" },
  { id: 2, customer: "Priya Singh", phone: "9876543211", bike: "Giant Contend AR", issue: "Brake adjustment", date: "2026-03-22", status: "Completed", technician: "Selvam" },
  { id: 3, customer: "Arun Patel", phone: "9876543212", bike: "Hero Sprint Pro", issue: "Full service + chain replacement", date: "2026-03-24", status: "In Progress", technician: "Rajan" },
];

export const mockBanners = [
  { id: 1, title: "Summer Sale - Up to 30% Off!", subtitle: "On all Mountain Bikes", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", link: "/shop", status: "active", order: 1 },
  { id: 2, title: "New Arrivals 2026", subtitle: "Explore the latest collection", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800", link: "/shop?new=true", status: "active", order: 2 },
];

export const mockSpareParts = [
  { id: 1, name: "Shimano Chain 21sp", category: "Drivetrain", sku: "SHM-CHN-21", price: 999, stock: 45, compatible: ["21-speed","24-speed"] },
  { id: 2, name: "Continental Tire 26x2.0", category: "Tires", sku: "CNT-TIR-26", price: 2499, stock: 12, compatible: ["Mountain Bikes"] },
  { id: 3, name: "Promax Brake Pads", category: "Brakes", sku: "PMX-BRK-ST", price: 349, stock: 2, compatible: ["All"] },
  { id: 4, name: "Selle Royal Saddle", category: "Saddle", sku: "SLR-SAD-CM", price: 1299, stock: 8, compatible: ["All"] },
];
