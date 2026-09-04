import React from 'react';
import { useStore } from '../../context/StoreContext';

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-gold-nav transition-all duration-300">
      <div className="max-w-[1720px] mx-auto px-6 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo Wordmark */}
        <div className="flex flex-col items-start" data-purpose="brand-identity">
          <button 
            onClick={() => setCurrentView('home')}
            className="group inline-block focus:outline-none text-left cursor-pointer"
          >
            <span className="font-display text-2xl lg:text-3xl tracking-[0.24em] font-semibold text-[#EED9B3] group-hover:text-[#D4AF37] transition-colors duration-300">
              RANGRETI
            </span>
            <span className="block font-sans text-[9px] uppercase tracking-[0.42em] text-[#D4AF37]/80 group-hover:text-[#F3E5AB] transition-colors -mt-0.5">
              HAUTE COUTURE
            </span>
          </button>
        </div>

        {/* Center Editorial Navigation Menu */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center space-x-9" data-purpose="primary-navigation">
          <button 
            onClick={() => { setSelectedCategory('Bridal Regalia'); setCurrentView('catalog'); }}
            className="text-xs uppercase font-medium tracking-[0.2em] text-stone-200/90 hover:text-[#D4AF37] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all cursor-pointer"
          >
            Bridal Atelier
          </button>
          <button 
            onClick={() => { setSelectedCategory('Sarees'); setCurrentView('catalog'); }}
            className="text-xs uppercase font-medium tracking-[0.2em] text-stone-200/90 hover:text-[#D4AF37] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all cursor-pointer"
          >
            Lehengas &amp; Sarees
          </button>
          <button 
            onClick={() => { setSelectedCategory('Festive Edit'); setCurrentView('catalog'); }}
            className="text-xs uppercase font-medium tracking-[0.2em] text-stone-200/90 hover:text-[#D4AF37] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all cursor-pointer"
          >
            Heritage Edit
          </button>
          <button 
            onClick={() => setCurrentView('heritage')}
            className="text-xs uppercase font-medium tracking-[0.2em] text-stone-200/90 hover:text-[#D4AF37] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all cursor-pointer"
          >
            The Craft
          </button>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="text-xs uppercase font-medium tracking-[0.2em] text-stone-200/90 hover:text-[#D4AF37] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all cursor-pointer"
          >
            Appointments
          </button>
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center space-x-6 sm:space-x-8" data-purpose="utility-menu">
          {/* Currency Selector */}
          <div className="hidden sm:flex items-center space-x-1.5 text-xs tracking-widest text-stone-300 border-r border-[#D4AF37]/20 pr-6">
            <button 
              onClick={() => setCurrency('INR')}
              className={`transition font-medium cursor-pointer ${currency === 'INR' ? 'text-[#EED9B3]' : 'text-stone-400 hover:text-[#D4AF37]'}`} 
              type="button"
            >
              INR ₹
            </button>
            <span className="text-stone-500 font-light">/</span>
            <button 
              onClick={() => setCurrency('USD')}
              className={`transition font-medium cursor-pointer ${currency === 'USD' ? 'text-[#EED9B3]' : 'text-stone-400 hover:text-[#D4AF37]'}`} 
              type="button"
            >
              USD $
            </button>
          </div>

          {/* Search Action */}
          <button 
            onClick={() => setCurrentView('catalog')}
            aria-label="Search Couture Collection" 
            className="text-stone-300 hover:text-[#D4AF37] transition duration-300 focus:outline-none cursor-pointer" 
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
            className="relative text-stone-300 hover:text-[#D4AF37] transition duration-300 focus:outline-none cursor-pointer"
          >
            <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#D4AF37] text-[#340608] text-[9px] font-semibold rounded-full flex items-center justify-center shadow">
              {wishlist.length || 2}
            </span>
          </button>

          {/* Luxury Shopping Bag */}
          <button 
            onClick={() => setCurrentView('cart')}
            aria-label="Shopping Bag" 
            className="relative text-stone-300 hover:text-[#D4AF37] transition duration-300 flex items-center space-x-2 focus:outline-none cursor-pointer"
          >
            <div className="relative">
              <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#F7F3EE] text-[#340608] text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                {cartCount || 1}
              </span>
            </div>
            <span className="hidden md:inline text-[11px] font-medium tracking-widest text-[#EED9B3]/90 font-sans">
              BAG
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            aria-label="Toggle Mobile Menu" 
            className="xl:hidden text-[#EED9B3] hover:text-[#D4AF37] focus:outline-none cursor-pointer" 
            type="button"
          >
            <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="3" x2="21" y1="7" y2="7"></line>
              <line x1="7" x2="21" y1="12" y2="12"></line>
              <line x1="3" x2="21" y1="17" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
