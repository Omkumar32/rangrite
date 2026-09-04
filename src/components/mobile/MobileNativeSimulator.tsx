import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Home, 
  Search, 
  Crown, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Star, 
  MapPin 
} from 'lucide-react';
import { PRODUCTS, STORY_CIRCLES, PRICE_THRESHOLDS, BOUTIQUES } from '../../data/storeData';

export const MobileNativeSimulator: React.FC = () => {
  const {
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    setSelectedPriceTier,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    isWishlisted,
    cartCount,
    setIsBookingModalOpen,
    setSelectedProduct,
    setCustomizerProduct,
    setIsCustomizerOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'bridal' | 'wishlist' | 'concierge'>('home');
  const [mobileSearch, setMobileSearch] = useState('');

  const displayProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'bridal') return p.category === 'Bridal Regalia';
    if (activeTab === 'wishlist') return wishlist.includes(p.id);
    if (selectedCategory !== 'All') return p.category === selectedCategory;
    if (mobileSearch.trim()) {
      return p.name.toLowerCase().includes(mobileSearch.toLowerCase()) || p.craft.toLowerCase().includes(mobileSearch.toLowerCase());
    }
    return true;
  });

  return (
    <div className="py-8 px-4 flex justify-center items-center animate-fade-in bg-stone-900/10 min-h-screen">
      {/* Device Frame */}
      <div className="w-[390px] h-[844px] bg-white rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[10px] border-[#2A2526] flex flex-col overflow-hidden relative">
        {/* Dynamic Island / Top Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-gray-700" />
        </div>

        {/* Mobile Header Bar */}
        <div className="pt-8 pb-3 px-4 bg-[#5E1A2C] text-white border-b border-[#C5A059]/30 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="font-serif font-bold text-lg text-white">Meena Bazaar</span>
            <span className="text-[9px] font-cinzel text-[#ECC480] uppercase">Est. 1970</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="text-[10px] font-cinzel text-[#ECC480] bg-white/10 px-2.5 py-1 rounded-full border border-[#ECC480]/40 flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" /> VIP Stylist
            </button>
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-1 text-white"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#1A1718] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile App Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-20 bg-[#FAF7F5]">
          {activeTab === 'home' && (
            <>
              {/* Quick Search */}
              <div className="px-4 pt-3">
                <div className="relative">
                  <input
                    type="text"
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    placeholder="Search silk sarees, bridal lehengas..."
                    className="w-full bg-white border border-[#E8DFD8] rounded-full py-2 pl-3.5 pr-9 text-xs focus:outline-none focus:border-[#C5A059] shadow-sm"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                </div>
              </div>

              {/* Story Circles */}
              <div className="px-4 overflow-x-auto no-scrollbar pt-1">
                <div className="flex items-center gap-3 min-w-max">
                  {STORY_CIRCLES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedCategory(st.category === 'All' ? 'All' : st.category);
                      }}
                      className="flex flex-col items-center gap-1 group text-center"
                    >
                      <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#C5A059] to-[#5E1A2C] shadow">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg">
                          {st.icon}
                        </div>
                      </div>
                      <span className="text-[10px] font-cinzel font-semibold text-gray-700 max-w-[64px] truncate">
                        {st.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Touch Optimized Hero Banner */}
              <div className="px-4">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#43101E] to-[#5E1A2C] text-white p-5 border border-[#C5A059]/40 shadow-lg">
                  <span className="text-[9px] font-cinzel text-[#ECC480] uppercase tracking-widest block font-bold">
                    The Everything Festive Edit
                  </span>
                  <h2 className="font-serif font-bold text-xl text-white mt-1">
                    Royal Bridal Regalia
                  </h2>
                  <p className="text-[11px] text-white/80 mt-1 font-light leading-snug">
                    Certified Silk Mark Banarasi Katan Silks & Zardozi Couture.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setActiveTab('bridal');
                      }}
                      className="gold-shimmer-btn px-3 py-1.5 rounded text-[10px] font-cinzel uppercase font-bold"
                    >
                      Shop Bridal
                    </button>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="px-3 py-1.5 rounded text-[10px] font-cinzel uppercase border border-[#ECC480] text-[#ECC480]"
                    >
                      Salon Booking
                    </button>
                  </div>
                </div>
              </div>

              {/* Curated Threshold Pills */}
              <div className="px-4 space-y-1.5">
                <span className="text-[10px] font-cinzel text-[#C5A059] uppercase tracking-wider font-bold">
                  Curated Price Tiers
                </span>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {PRICE_THRESHOLDS.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => {
                        setSelectedPriceTier(tier.id);
                        setSelectedCategory('All');
                      }}
                      className="bg-white border border-[#E8DFD8] text-[#5E1A2C] text-[11px] font-cinzel font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm hover:border-[#C5A059]"
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-Column Touch Grid */}
              <div className="px-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#1A1718]">Featured Drops</span>
                  <span className="text-[10px] font-cinzel text-[#5E1A2C]">{displayProducts.length} items</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {displayProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl border border-[#E8DFD8] overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative h-44 bg-gray-100">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-gray-700"
                        >
                          <Star className={`w-3.5 h-3.5 ${isWishlisted(p.id) ? 'fill-[#5E1A2C] text-[#5E1A2C]' : ''}`} />
                        </button>
                        {p.silkMarkCertified && (
                          <span className="absolute bottom-1.5 left-1.5 text-[8px] bg-white/90 text-[#0F3A5D] font-bold px-1.5 py-0.5 rounded border border-[#0F3A5D]/30">
                            Silk Mark
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[9px] font-cinzel text-gray-500">{p.craft}</p>
                          <h4 className="font-serif font-bold text-xs text-gray-900 line-clamp-1">{p.name}</h4>
                          <span className="font-bold text-xs text-[#5E1A2C] block mt-0.5">
                            {formatPrice(p.priceINR)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-1 pt-1 border-t border-gray-100">
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              setCustomizerProduct(p);
                              setIsCustomizerOpen(true);
                            }}
                            className="p-1 bg-[#FAF7F5] border border-[#C5A059] text-[#5E1A2C] text-[9px] font-cinzel font-semibold rounded text-center"
                          >
                            Custom
                          </button>
                          <button
                            onClick={() => addToCart({ product: p, quantity: 1, selectedSize: p.sizes[0] })}
                            className="p-1 bg-[#5E1A2C] text-white text-[9px] font-cinzel font-semibold rounded text-center"
                          >
                            + Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'bridal' && (
            <div className="p-4 space-y-4 animate-fade-in">
              <div className="bg-[#5E1A2C] text-white p-4 rounded-xl">
                <h3 className="font-serif font-bold text-base">Royal Bridal Regalia</h3>
                <p className="text-[11px] text-white/80 mt-0.5">Handcrafted Zardozi & Karchobi Couture</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.filter(p => p.category === 'Bridal Regalia').map(p => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-2 space-y-2">
                    <img src={p.images[0]} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
                    <h4 className="font-serif font-bold text-xs line-clamp-1">{p.name}</h4>
                    <p className="text-xs font-bold text-[#5E1A2C]">{formatPrice(p.priceINR)}</p>
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setCustomizerProduct(p);
                        setIsCustomizerOpen(true);
                      }}
                      className="w-full py-1 bg-[#C5A059] text-black text-[10px] font-cinzel font-bold rounded"
                    >
                      Bespoke Fit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'concierge' && (
            <div className="p-4 space-y-4 animate-fade-in text-xs">
              <div className="bg-[#5E1A2C] text-white p-4 rounded-xl">
                <h3 className="font-serif font-bold text-base">VIP Boutique Concierge</h3>
                <p className="text-[11px] text-white/80">Book South Ex, Mumbai, Gurugram or Video Drape</p>
              </div>

              <div className="space-y-3">
                {BOUTIQUES.map((b) => (
                  <div key={b.id} className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-cinzel text-[#5E1A2C] font-bold uppercase">{b.city}</span>
                        <h4 className="font-serif font-bold text-xs">{b.name}</h4>
                      </div>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">Open</span>
                    </div>
                    <p className="text-[11px] text-gray-500">{b.address}</p>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full py-1.5 bg-[#5E1A2C] text-white rounded text-[10px] font-cinzel font-semibold"
                    >
                      Book Stylist Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="p-4 space-y-4 animate-fade-in text-xs">
              <h3 className="font-serif font-bold text-base text-[#5E1A2C]">Saved Wishlist ({wishlist.length})</h3>
              {displayProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your private bridal wishlist is empty.</p>
              ) : (
                <div className="space-y-2">
                  {displayProducts.map((p) => (
                    <div key={p.id} className="bg-white p-2.5 rounded-xl border border-gray-200 flex gap-3 items-center">
                      <img src={p.images[0]} alt={p.name} className="w-14 h-16 rounded object-cover" />
                      <div className="flex-1">
                        <h4 className="font-serif font-bold text-xs">{p.name}</h4>
                        <p className="text-xs font-bold text-[#5E1A2C] mt-0.5">{formatPrice(p.priceINR)}</p>
                      </div>
                      <button
                        onClick={() => addToCart({ product: p, quantity: 1, selectedSize: p.sizes[0] })}
                        className="crimson-btn px-2.5 py-1 text-[10px] rounded font-cinzel"
                      >
                        + Bag
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Persistent 5-Tab Thumb Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8DFD8] py-2 px-3 flex items-center justify-around text-[10px] font-cinzel font-semibold text-gray-600 shadow-lg z-40">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#5E1A2C] font-bold' : ''}`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              setCurrentView('catalog');
            }}
            className="flex flex-col items-center gap-1"
          >
            <Search className="w-4 h-4" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('bridal')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'bridal' ? 'text-[#5E1A2C] font-bold' : ''}`}
          >
            <Crown className="w-4 h-4 text-[#C5A059]" />
            <span>Bridal</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex flex-col items-center gap-1 relative ${activeTab === 'wishlist' ? 'text-[#5E1A2C] font-bold' : ''}`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved</span>
          </button>

          <button
            onClick={() => setActiveTab('concierge')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'concierge' ? 'text-[#5E1A2C] font-bold' : ''}`}
          >
            <MapPin className="w-4 h-4" />
            <span>Salon</span>
          </button>
        </div>
      </div>
    </div>
  );
};
