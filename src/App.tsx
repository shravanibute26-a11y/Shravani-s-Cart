/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, Search, Home, Grid, User, Plus, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRODUCTS = [
  // Girls Fashion
  { id: 1, name: "Floral Cotton Dress", price: 1250, category: "Girls Fashion", image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500&q=80" },
  { id: 3, name: "Pink Tutu Skirt", price: 850, category: "Girls Fashion", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80" },
  { id: 5, name: "Denim Jacket", price: 1800, category: "Girls Fashion", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&q=80" },
  { id: 8, name: "Butterfly Hair Clips", price: 299, category: "Girls Fashion", image: "https://images.unsplash.com/photo-1617391654484-2894196c2cc9?w=500&q=80" },
  { id: 17, name: "Yellow Sundress", price: 950, category: "Girls Fashion", image: "https://images.unsplash.com/photo-1503919919749-646ddc4fddca?w=500&q=80" },
  
  // Ethnic Wear
  { id: 2, name: "Embroidered Silk Kurti", price: 2499, category: "Ethnic Wear", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80" },
  { id: 4, name: "Banarasi Silk Saree", price: 5999, category: "Ethnic Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80" },
  { id: 12, name: "Cotton Chikankari Kurti", price: 999, category: "Ethnic Wear", image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=500&q=80" },
  { id: 16, name: "Silk Blend Dupatta", price: 550, category: "Ethnic Wear", image: "https://images.unsplash.com/photo-1610189012906-440333249053?w=500&q=80" },
  { id: 18, name: "Anarkali Suit Set", price: 3499, category: "Ethnic Wear", image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80" },
  
  // Makeup
  { id: 9, name: "Matte Red Lipstick", price: 450, category: "Makeup", image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=500&q=80" },
  { id: 13, name: "Waterproof Eyeliner", price: 350, category: "Makeup", image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500&q=80" },
  { id: 19, name: "Eyeshadow Palette", price: 899, category: "Makeup", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80" },
  { id: 20, name: "Liquid Foundation", price: 650, category: "Makeup", image: "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=500&q=80" },
  
  // Skincare
  { id: 10, name: "Hydrating Face Wash", price: 299, category: "Skincare", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80" },
  { id: 14, name: "Vitamin C Serum", price: 750, category: "Skincare", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80" },
  { id: 21, name: "Sunscreen SPF 50", price: 499, category: "Skincare", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500&q=80" },
  { id: 22, name: "Aloe Vera Gel", price: 199, category: "Skincare", image: "https://images.unsplash.com/photo-1564020426549-fabfb8c467ad?w=500&q=80" },
  
  // Footwear
  { id: 11, name: "Strappy Summer Sandals", price: 899, category: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80" },
  { id: 15, name: "Casual Canvas Sneakers", price: 1200, category: "Footwear", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80" },
  { id: 23, name: "Ethnic Juttis", price: 750, category: "Footwear", image: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?w=500&q=80" },
  { id: 24, name: "Block Heel Sandals", price: 1499, category: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80" },

  // Accessories
  { id: 6, name: "Designer Leather Tote", price: 3500, category: "Accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80" },
  { id: 7, name: "Pearl Jewelry Set", price: 1200, category: "Accessories", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80" },
  { id: 25, name: "Silk Scarf", price: 450, category: "Accessories", image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=500&q=80" },
];

const CATEGORIES = ["All", "Girls Fashion", "Ethnic Wear", "Makeup", "Skincare", "Footwear", "Accessories"];

type Product = (typeof PRODUCTS)[0];
type CartItem = Product & { cartId: number };

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFFAF5] pb-32 font-sans text-slate-800 selection:bg-orange-100">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-orange-100 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-[#FF7F50] tracking-tight italic"
          >
            Shravani's<span className="text-slate-800 not-italic font-light text-lg ml-1 uppercase tracking-widest">Cart</span>
          </motion.h1>
          <div className="relative flex items-center bg-slate-100 rounded-full px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-orange-200">
            <Search size={18} className="text-slate-400" />
            <input 
              className="bg-transparent border-none focus:outline-none p-1 text-sm w-32 md:w-48 ml-2" 
              placeholder="Search collection..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4">
        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-48 bg-gradient-to-br from-[#FF7F50] via-[#ff8e66] to-[#ff9f7d] rounded-[2.5rem] mb-10 flex items-center p-10 text-white relative overflow-hidden shadow-xl shadow-orange-200/50"
        >
          <div className="z-10">
            <h2 className="text-3xl font-bold mb-2">Shravani's Picks</h2>
            <p className="opacity-90 text-lg font-light">Curated essentials, just for you.</p>
          </div>
          <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute left-[20%] bottom-[-20px] w-32 h-32 bg-orange-300/20 rounded-full blur-2xl"></div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF7F50] text-white shadow-lg shadow-orange-200"
                  : "bg-white text-slate-500 border border-slate-100 hover:border-orange-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {searchQuery || selectedCategory !== "All" 
              ? `Results (${filteredProducts.length})` 
              : 'Featured Collection'}
            <span className="h-1 w-12 bg-orange-200 rounded-full ml-2"></span>
          </h3>
          {selectedCategory === "All" && !searchQuery && (
            <button className="text-sm font-medium text-[#FF7F50] hover:underline">View All</button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="relative overflow-hidden aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3">
                   <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                     <Star size={14} className="text-slate-300 hover:text-yellow-400" />
                   </button>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[10px] text-[#FF7F50] font-bold uppercase tracking-widest mb-1">{product.category}</p>
                <h4 className="font-bold text-base mb-1 text-slate-800">{product.name}</h4>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-[10px] text-slate-400 ml-1">(24)</span>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-black text-lg text-slate-900">₹{product.price}</span>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(product)}
                    className="bg-[#FF7F50] text-white p-2.5 rounded-2xl hover:bg-[#e66d43] shadow-lg shadow-orange-100 transition-colors"
                  >
                    <Plus size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  <p className="text-sm text-slate-400">{cart.length} items selected</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart size={32} className="text-orange-200" />
                    </div>
                    <p className="text-slate-400 italic">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-[#FF7F50] font-bold hover:underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.cartId} 
                        className="flex gap-4 items-center group"
                      >
                        <img 
                          src={item.image} 
                          className="w-20 h-20 rounded-2xl object-cover shadow-sm" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <h5 className="text-sm font-bold text-slate-800">{item.name}</h5>
                          <p className="text-xs text-slate-400 mb-1">{item.category}</p>
                          <p className="text-base font-black text-[#FF7F50]">₹{item.price}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.cartId)} 
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <X size={18}/>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 mt-auto border-t border-slate-100">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-400 font-medium">Order Total</span>
                    <span className="text-3xl font-black text-slate-900">₹{total}</span>
                  </div>
                  <button className="w-full bg-[#FF7F50] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 hover:bg-[#e66d43] transition-all active:scale-[0.98]">
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] p-4 flex justify-around items-center z-40">
        <button className="p-2 text-[#FF7F50]"><Home size={24} /></button>
        <button className="p-2 text-slate-400 hover:text-slate-600"><Grid size={24} /></button>
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="bg-[#FF7F50] p-5 rounded-full -mt-16 border-[6px] border-[#FFFAF5] shadow-2xl shadow-orange-300 transition-transform"
          >
            <ShoppingCart className="text-white" size={28} />
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600"><User size={24} /></button>
        <button className="p-2 text-slate-400 hover:text-slate-600"><Star size={24} /></button>
      </div>
    </div>
  );
}
