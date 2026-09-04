import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ArrowRight, Phone, Calendar, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    setCurrentView,
    currency,
    setCurrency,
    cartCount,
    wishlist,
    setSelectedCategory,
    setIsBookingModalOpen
  } = useStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass-gold-nav transition-all duration-300">
        <div className="max-w-[1720px] mx-auto px-6 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Left: Sleek 3-Line Hamburger Menu Toggle Button (matches reference) */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="group flex items-center space-x-3 p-2 -ml-2 text-[#3b080a] hover:text-[#997332] transition-colors focus:outline-none cursor-pointer"
            >
              <svg className="w-6 h-5" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="2" y1="3" x2="22" y2="3" />
                <line x1="2" y1="10" x2="16" y2="10" />
                <line x1="2" y1="17" x2="22" y2="17" />
              </svg>
              <span className="hidden sm:inline font-sans text-xs uppercase tracking-[0.24em] font-semibold text-[#3b080a] group-hover:text-[#997332] transition-colors">
                MENU
              </span>
            </button>
          </div>

          {/* Center: Brand Logo Wordmark */}
          <div className="flex flex-col items-center text-center" data-purpose="brand-identity">
            <button 
              onClick={() => setCurrentView('home')}
              className="group inline-block focus:outline-none text-center cursor-pointer"
            >
              <span className="font-display text-2xl lg:text-[28px] tracking-[0.26em] font-semibold text-[#3b080a] group-hover:text-[#6b0d12] transition-colors duration-300">
                RANGRETI
              </span>
              <span className="block font-sans text-[8.5px] lg:text-[9px] uppercase tracking-[0.44em] text-[#997332] group-hover:text-[#3b080a] transition-colors -mt-0.5 font-semibold">
                HAUTE COUTURE
              </span>
            </button>
          </div>

          {/* Right: Utility Actions (Currency, Search, Wishlist, Bag) */}
          <div className="flex items-center space-x-5 sm:space-x-8" data-purpose="utility-menu">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center space-x-1.5 text-xs tracking-widest text-[#3b080a]/70 border-r border-[#EBE3D7] pr-6">
              <button 
                onClick={() => setCurrency('INR')}
                className={`transition font-semibold cursor-pointer ${currency === 'INR' ? 'text-[#3b080a]' : 'text-stone-400 hover:text-[#997332]'}`} 
                type="button"
              >
                INR ₹
              </button>
              <span className="text-stone-400 font-light">/</span>
              <button 
                onClick={() => setCurrency('USD')}
                className={`transition font-semibold cursor-pointer ${currency === 'USD' ? 'text-[#3b080a]' : 'text-stone-400 hover:text-[#997332]'}`} 
                type="button"
              >
                USD $
              </button>
            </div>

            {/* Search Action */}
            <button 
              onClick={() => setCurrentView('catalog')}
              aria-label="Search Couture Collection" 
              className="text-[#3b080a] hover:text-[#997332] transition duration-300 focus:outline-none cursor-pointer" 
              type="button"
            >
              <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="16.65" x2="21" y1="16.65" y2="21"></line>
              </svg>
            </button>

            {/* Wishlist with Counter */}
            <button 
              onClick={() => setCurrentView('catalog')}
              aria-label="View Wishlist" 
              className="relative text-[#3b080a] hover:text-[#997332] transition duration-300 focus:outline-none cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#3b080a] text-white text-[9px] font-semibold rounded-full flex items-center justify-center shadow">
                {wishlist.length || 2}
              </span>
            </button>

            {/* Luxury Shopping Bag */}
            <button 
              onClick={() => setCurrentView('cart')}
              aria-label="Shopping Bag" 
              className="relative text-[#3b080a] hover:text-[#997332] transition duration-300 flex items-center space-x-2 focus:outline-none cursor-pointer"
            >
              <div className="relative">
                <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#997332] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                  {cartCount || 1}
                </span>
              </div>
              <span className="hidden md:inline text-[11px] font-semibold tracking-widest text-[#3b080a] font-sans">
                BAG
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SLIDE-OUT LUXURY EDITORIAL MENU DRAWER
         ========================================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-[460px] bg-[#FAF7F2] text-[#1A1718] border-r border-[#EBE3D7] shadow-2xl z-10 flex flex-col justify-between h-full overflow-y-auto animate-slide-right p-6 sm:p-10">
            {/* Top Bar of Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-[#EBE3D7]">
              <div>
                <span className="font-display text-xl tracking-[0.24em] font-semibold text-[#3b080a]">
                  RANGRETI
                </span>
                <span className="block font-sans text-[8px] uppercase tracking-[0.38em] text-[#997332] font-semibold -mt-0.5">
                  HAUTE COUTURE
                </span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white border border-[#EBE3D7] flex items-center justify-center text-[#3b080a] hover:bg-[#3b080a] hover:text-white transition-all cursor-pointer shadow-sm"
                aria-label="Close Navigation Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Category List */}
            <div className="py-8 space-y-5 flex-1">
              <span className="block font-sans text-[10px] uppercase tracking-[0.25em] text-[#997332] font-semibold mb-3">
                THE COUTURE DIRECTORY
              </span>

              <nav className="space-y-1">
                <button
                  onClick={() => handleNavClick(() => { setSelectedCategory('Bridal Regalia'); setCurrentView('catalog'); })}
                  className="w-full text-left py-3 px-3 rounded group hover:bg-white/80 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#3b080a] group-hover:text-[#6b0d12] transition-colors leading-snug block">
                      Bridal Atelier &amp; Regalia
                    </span>
                    <span className="font-sans text-[11px] text-[#6E645E] font-light">
                      Heirloom Lehengas, Zardozi &amp; Velvet
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#997332] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNavClick(() => { setSelectedCategory('Sarees'); setCurrentView('catalog'); })}
                  className="w-full text-left py-3 px-3 rounded group hover:bg-white/80 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#3b080a] group-hover:text-[#6b0d12] transition-colors leading-snug block">
                      Sarees &amp; Handloom Drapes
                    </span>
                    <span className="font-sans text-[11px] text-[#6E645E] font-light">
                      Banarasi Katan, Kanjeevarams &amp; Organzas
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#997332] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNavClick(() => { setSelectedCategory('Suits'); setCurrentView('catalog'); })}
                  className="w-full text-left py-3 px-3 rounded group hover:bg-white/80 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#3b080a] group-hover:text-[#6b0d12] transition-colors leading-snug block">
                      Flared Anarkalis &amp; Suits
                    </span>
                    <span className="font-sans text-[11px] text-[#6E645E] font-light">
                      Gota Patti, Resham &amp; Kalidar Cuts
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#997332] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNavClick(() => { setSelectedCategory('Dress Materials'); setCurrentView('catalog'); })}
                  className="w-full text-left py-3 px-3 rounded group hover:bg-white/80 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#3b080a] group-hover:text-[#6b0d12] transition-colors leading-snug block">
                      Unstitched Dress Materials
                    </span>
                    <span className="font-sans text-[11px] text-[#6E645E] font-light">
                      Pure Silks For Bespoke Tailoring
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#997332] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNavClick(() => { setSelectedCategory('Ready to Wear'); setCurrentView('catalog'); })}
                  className="w-full text-left py-3 px-3 rounded group hover:bg-white/80 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#3b080a] group-hover:text-[#6b0d12] transition-colors leading-snug block">
                      Kurta Sets &amp; Prêt Wear
                    </span>
                    <span className="font-sans text-[11px] text-[#6E645E] font-light">
                      Airy Celebrations &amp; Daily Elegance
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#997332] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNavClick(() => setCurrentView('heritage'))}
                  className="w-full text-left py-3 px-3 rounded group hover:bg-white/80 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#3b080a] group-hover:text-[#6b0d12] transition-colors leading-snug block">
                      The Craft &amp; Silk Mark Trust
                    </span>
                    <span className="font-sans text-[11px] text-[#6E645E] font-light">
                      Authenticity, Weaving Legacy &amp; 54 Years
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#997332] group-hover:translate-x-1 transition-transform" />
                </button>
              </nav>

              {/* Concierge Actions In Menu */}
              <div className="pt-6 border-t border-[#EBE3D7] space-y-3">
                <button
                  onClick={() => handleNavClick(() => setIsBookingModalOpen(true))}
                  className="w-full py-3.5 px-4 bg-[#3b080a] hover:bg-[#520d16] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Bespoke Salon Fitting</span>
                </button>

                <button
                  onClick={() => handleNavClick(() => setCurrentView('boutiques'))}
                  className="w-full py-3 px-4 border border-[#3b080a]/30 hover:border-[#3b080a] text-[#3b080a] font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>Locate 100+ Boutiques</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Info & Currency */}
            <div className="pt-6 border-t border-[#EBE3D7] flex items-center justify-between text-xs text-[#6E645E]">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#997332]" />
                <span className="font-sans font-light">VIP Desk: +91 11 4164 1970</span>
              </div>
              <div className="flex items-center space-x-2 font-semibold">
                <button 
                  onClick={() => setCurrency('INR')}
                  className={currency === 'INR' ? 'text-[#3b080a]' : 'text-stone-400 hover:text-[#3b080a]'}
                >
                  INR ₹
                </button>
                <span>/</span>
                <button 
                  onClick={() => setCurrency('USD')}
                  className={currency === 'USD' ? 'text-[#3b080a]' : 'text-stone-400 hover:text-[#3b080a]'}
                >
                  USD $
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
