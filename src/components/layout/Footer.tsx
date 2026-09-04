import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, Sparkles, MapPin, Award, Phone, ShieldCheck, RefreshCw, Scissors } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setIsBookingModalOpen } = useStore();

  return (
    <footer className="bg-[#FAF8F5] text-[#1A1718] border-t border-[#E8DFD8] font-sans">
      {/* 1. 4 Horizontal Trust Pillar Ribbons */}
      <div className="border-b border-[#E8DFD8] bg-white py-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center text-[#5E1A2C] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A1718]">100% Pure Natural Silk</h4>
              <p className="text-[11px] text-gray-500 font-light">Silk Mark Organization certified handlooms</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center text-[#5E1A2C] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A1718]">Insured Worldwide Transit</h4>
              <p className="text-[11px] text-gray-500 font-light">Express delivery to USA, UK, UAE & worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center text-[#5E1A2C] shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A1718]">Bespoke Blouse Tailoring</h4>
              <p className="text-[11px] text-gray-500 font-light">Custom necklines, sleeve cuts & padding</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center text-[#5E1A2C] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A1718]">Hassle-Free 3-Day Returns</h4>
              <p className="text-[11px] text-gray-500 font-light">Complimentary exchange across 100+ stores</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Secondary Mini Trust Strip */}
      <div className="border-b border-[#E8DFD8] bg-[#F4EFEA] py-3 text-[11px] font-cinzel uppercase tracking-wider text-gray-700">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#5E1A2C]" /> AUTHENTICITY CERTIFICATE INCLUDED</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#8C6D2D]" /> 24-KARAT METALLIC ZARI</span>
          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#5E1A2C]" /> VIP CONCIERGE: +91 11 4164 1970</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#8C6D2D]" /> 100+ BOUTIQUES NATIONWIDE</span>
        </div>
      </div>

      {/* 3. Main Footer Links & Newsletter */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-3">
          <div className="cursor-pointer" onClick={() => setCurrentView('home')}>
            <span className="font-serif text-2xl font-bold text-[#5E1A2C]">Meena Bazaar</span>
            <span className="block font-cinzel text-[9px] tracking-[0.2em] text-[#8C6D2D] uppercase font-semibold">
              EST. 1970 • 54 YEARS OF ROYAL HERITAGE
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed font-light pr-6">
            From the historic Chandni Chowk atelier in 1970 to over 100 flagship boutiques worldwide, Meena Bazaar crafts authentic Banarasi silks, handcrafted Zardozi bridal lehengas, and prêt kurtas for three generations of discerning patrons.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-2.5">
          <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1A1718]">Haute Couture</h4>
          <ul className="space-y-1.5 text-gray-600 font-light">
            <li><button onClick={() => { setSelectedCategory('Bridal Regalia'); setCurrentView('catalog'); }} className="hover:text-[#5E1A2C]">Bridal Regalia</button></li>
            <li><button onClick={() => { setSelectedCategory('Sarees'); setCurrentView('catalog'); }} className="hover:text-[#5E1A2C]">Banarasi Silk Sarees</button></li>
            <li><button onClick={() => { setSelectedCategory('Suits'); setCurrentView('catalog'); }} className="hover:text-[#5E1A2C]">Flared Anarkali Suits</button></li>
            <li><button onClick={() => { setSelectedCategory('Dress Materials'); setCurrentView('catalog'); }} className="hover:text-[#5E1A2C]">Unstitched Materials</button></li>
            <li><button onClick={() => { setSelectedCategory('Ready to Wear'); setCurrentView('catalog'); }} className="hover:text-[#5E1A2C]">Prêt Under ₹1,999</button></li>
          </ul>
        </div>

        {/* VIP Concierge */}
        <div className="space-y-2.5">
          <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1A1718]">VIP Concierge</h4>
          <ul className="space-y-1.5 text-gray-600 font-light">
            <li><button onClick={() => setIsBookingModalOpen(true)} className="hover:text-[#5E1A2C]">Book In-Store Stylist</button></li>
            <li><button onClick={() => setIsBookingModalOpen(true)} className="hover:text-[#5E1A2C]">NRI Virtual Drape Call</button></li>
            <li><button onClick={() => setCurrentView('boutiques')} className="hover:text-[#5E1A2C]">Flagship Store Locator</button></li>
            <li><button onClick={() => setCurrentView('heritage')} className="hover:text-[#5E1A2C]">Silk Mark Verification</button></li>
          </ul>
        </div>

        {/* Newsletter Subscription Form */}
        <div className="space-y-2.5">
          <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1A1718]">VIP Atelier Circle</h4>
          <p className="text-[11px] text-gray-500 font-light">
            Join the private circle to receive first access to seasonal bridal edits and bespoke lookbooks.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white border border-[#E8DFD8] p-2 text-xs w-full focus:outline-none focus:border-[#C5A059]"
            />
            <button className="bg-[#5E1A2C] text-white px-3 font-cinzel text-xs font-bold">
              JOIN
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Legal Bar */}
      <div className="border-t border-[#E8DFD8] py-4 text-[10px] text-gray-500 text-center">
        <p>© 1970–2026 Meena Bazaar Couture Private Limited. All Rights Reserved. • PCI-DSS Level 1 & 256-Bit SSL Encrypted</p>
      </div>
    </footer>
  );
};
