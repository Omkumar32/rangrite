import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, Sparkles, MapPin, Award, Phone, ShieldCheck, RefreshCw, Scissors } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setIsBookingModalOpen, siteFooterConfig } = useStore();

  return (
    <footer className="bg-[#FAF8F5] text-[#1A1718] border-t border-[#E8DFD8] font-sans">
      {/* 1. 4 Horizontal Trust Pillar Ribbons */}
      <div className="border-b border-[#E8DFD8] bg-white py-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#997332]/40 flex items-center justify-center text-[#3b080a] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A1718]">100% Pure Natural Silk</h4>
              <p className="text-[11px] text-gray-500 font-light">Silk Mark Organization certified handlooms</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#997332]/40 flex items-center justify-center text-[#3b080a] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A1718]">Insured Worldwide Transit</h4>
              <p className="text-[11px] text-gray-500 font-light">Express delivery to USA, UK, UAE & worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#997332]/40 flex items-center justify-center text-[#3b080a] shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A1718]">Bespoke Blouse Tailoring</h4>
              <p className="text-[11px] text-gray-500 font-light">Custom necklines, sleeve cuts & padding</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#997332]/40 flex items-center justify-center text-[#3b080a] shrink-0">
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
      <div className="border-b border-[#E8DFD8] bg-[#F4EFEA] py-3 text-[11px] font-sans uppercase tracking-wider text-gray-700">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#3b080a]" /> AUTHENTICITY CERTIFICATE INCLUDED</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#997332]" /> 24-KARAT METALLIC ZARI</span>
          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#3b080a]" /> VIP CONCIERGE: {siteFooterConfig.conciergePhone}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#997332]" /> 100+ BOUTIQUES NATIONWIDE</span>
        </div>
      </div>

      {/* 3. Main Footer Links & Newsletter */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-3">
          <div className="cursor-pointer" onClick={() => setCurrentView('home')}>
            <span className="font-serif text-2xl font-bold text-[#3b080a]">{siteFooterConfig.brandName}</span>
            <span className="block font-sans text-[9px] tracking-[0.25em] text-[#997332] uppercase font-semibold">
              {siteFooterConfig.brandTagline}
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed font-light pr-6">
            {siteFooterConfig.brandDescription}
          </p>

          {/* Direct Instagram Link */}
          <div className="pt-2">
            <a 
              href={siteFooterConfig.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-[11px] font-sans font-semibold tracking-wider text-[#3b080a] hover:text-[#997332] transition-colors group"
            >
              <svg className="w-4 h-4 text-[#997332] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Follow @{siteFooterConfig.instagramHandle} on Instagram</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2.5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1A1718]">Haute Couture</h4>
          <ul className="space-y-1.5 text-gray-600 font-light">
            <li><button onClick={() => { setSelectedCategory('Bridal Regalia'); setCurrentView('catalog'); }} className="hover:text-[#3b080a]">Bridal Regalia</button></li>
            <li><button onClick={() => { setSelectedCategory('Sarees'); setCurrentView('catalog'); }} className="hover:text-[#3b080a]">Banarasi Silk Sarees</button></li>
            <li><button onClick={() => { setSelectedCategory('Suits'); setCurrentView('catalog'); }} className="hover:text-[#3b080a]">Flared Anarkali Suits</button></li>
            <li><button onClick={() => { setSelectedCategory('Dress Materials'); setCurrentView('catalog'); }} className="hover:text-[#3b080a]">Unstitched Materials</button></li>
            <li><button onClick={() => { setSelectedCategory('Ready to Wear'); setCurrentView('catalog'); }} className="hover:text-[#3b080a]">Prêt Under ₹1,999</button></li>
          </ul>
        </div>

        {/* VIP Concierge */}
        <div className="space-y-2.5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1A1718]">VIP Concierge</h4>
          <ul className="space-y-1.5 text-gray-600 font-light">
            <li><button onClick={() => setIsBookingModalOpen(true)} className="hover:text-[#3b080a]">Book In-Store Stylist</button></li>
            <li><button onClick={() => setIsBookingModalOpen(true)} className="hover:text-[#3b080a]">NRI Virtual Drape Call</button></li>
            <li><button onClick={() => setCurrentView('boutiques')} className="hover:text-[#3b080a]">Flagship Store Locator</button></li>
            <li><button onClick={() => setCurrentView('heritage')} className="hover:text-[#3b080a]">Silk Mark Verification</button></li>
          </ul>
        </div>

        {/* Newsletter Subscription Form */}
        <div className="space-y-2.5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1A1718]">VIP Atelier Circle</h4>
          <p className="text-[11px] text-gray-500 font-light">
            Join the private circle to receive first access to seasonal bridal edits and bespoke lookbooks.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white border border-[#E8DFD8] p-2 text-xs w-full focus:outline-none focus:border-[#997332]"
            />
            <button className="bg-[#3b080a] hover:bg-[#520d16] text-white px-3 font-sans text-xs font-bold cursor-pointer transition-colors">
              JOIN
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Legal Bar */}
      <div className="border-t border-[#E8DFD8] py-4 text-[10px] text-gray-500 text-center">
        <p>{siteFooterConfig.copyrightText}</p>
      </div>
    </footer>
  );
};
