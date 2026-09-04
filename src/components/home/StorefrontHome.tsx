import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  categoryKey: string;
  image: string;
  badge?: string;
  tagline?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-new-arrivals',
    name: 'New Arrivals',
    categoryKey: 'All',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW DROP',
    tagline: 'Fresh Festive Weaves'
  },
  {
    id: 'cat-exclusive',
    name: 'Exclusive Collection',
    categoryKey: 'Bridal Regalia',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    badge: 'HEIRLOOM',
    tagline: 'Limited 1-of-1 Pieces'
  },
  {
    id: 'cat-signature',
    name: 'Signature Styles',
    categoryKey: 'Bridal Regalia',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    badge: 'ICONIC',
    tagline: 'Couture Handcraft'
  },
  {
    id: 'cat-dress-material',
    name: 'Dress Material',
    categoryKey: 'Dress Materials',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    tagline: 'Unstitched Pure Silks'
  },
  {
    id: 'cat-ready-to-wear',
    name: 'READY TO WEAR',
    categoryKey: 'Ready to Wear',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=600&q=80',
    badge: 'PRÊT',
    tagline: 'Instant Elegance'
  },
  {
    id: 'cat-kurta-sets',
    name: 'Kurta Sets',
    categoryKey: 'Suits',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
    tagline: 'Embroidered & Flared'
  },
  {
    id: 'cat-sarees',
    name: 'Sarees',
    categoryKey: 'Sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    badge: 'SILK MARK',
    tagline: 'Banarasi & Kanjeevaram'
  },
  {
    id: 'cat-lehenga',
    name: 'LEHENGA',
    categoryKey: 'Bridal Regalia',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    badge: 'BRIDAL',
    tagline: '16-Kali Kalidar Cuts'
  },
  {
    id: 'cat-suits',
    name: 'SUITS',
    categoryKey: 'Suits',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    tagline: 'Anarkalis & Shararas'
  },
  {
    id: 'cat-dresses',
    name: 'Dresses',
    categoryKey: 'Ready to Wear',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    tagline: 'Contemporary Silhouettes'
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    categoryKey: 'All',
    image: 'https://images.unsplash.com/photo-1611591475152-47eac984b7c6?auto=format&fit=crop&w=600&q=80',
    tagline: 'Potlis, Dupattas & Zari'
  }
];

export const StorefrontHome: React.FC = () => {
  const { 
    setCurrentView, 
    setSelectedCategory, 
    setIsBookingModalOpen,
    setIsCustomizerOpen
  } = useStore();

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setCurrentView('catalog');
  };

  return (
    <div className="bg-brand-velvet text-brand-sand font-sans antialiased selection:bg-brand-gold selection:text-brand-velvet min-h-screen overflow-x-hidden">
      {/* BEGIN: HeroShowcaseSection */}
      <main className="relative min-h-screen pt-24 pb-12 lg:pt-28 lg:pb-0 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#4a090d] via-[#3b080a] to-[#250406]" data-purpose="couture-hero">
        {/* Ambient Lighting Glows */}
        <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen bg-[radial-gradient(ellipse_at_70%_40%,rgba(164,30,40,0.65),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

        {/* Editorial Central Content Composition */}
        <div className="max-w-[1720px] mx-auto px-6 lg:px-14 w-full my-auto py-4 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Editorial Column: Narrative, Typography & Inset */}
            <div className="lg:col-span-6 z-20 order-2 lg:order-1 flex flex-col justify-center text-left" data-purpose="editorial-text-content">
              {/* Collection Label Tag */}
              <div className="inline-flex items-center space-x-3 mb-3">
                <span className="h-px w-8 bg-brand-gold" />
                <span className="text-[11px] lg:text-xs font-sans font-medium uppercase text-brand-goldLight tracking-widest-luxury">
                  Autumn / Winter Bridal Edit 2025
                </span>
              </div>

              {/* Main Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] xl:text-[70px] font-light text-brand-sand leading-[1.05] tracking-tight mb-5">
                Timeless Radiance in Handcrafted <span className="italic font-normal text-brand-champagne underline decoration-brand-gold/40 decoration-1 underline-offset-8">Gold &amp; Mirror</span>
              </h1>

              {/* Body Description */}
              <p className="font-serif text-base sm:text-lg lg:text-[19px] text-stone-300/90 font-light leading-relaxed max-w-xl mb-8">
                Woven in pure chanderi silk with artisan hand-embroidered mirror craftsmanship, celebrating centuries of royal Indian textile heritage and modern sovereign grace.
              </p>

              {/* Interactive Call-To-Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 mb-8" data-purpose="hero-call-to-actions">
                {/* Primary CTA */}
                <button
                  onClick={() => {
                    setSelectedCategory('Bridal Regalia');
                    setCurrentView('catalog');
                  }}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-brand-velvet font-sans text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 hover:bg-brand-goldLight hover:shadow-gold-glow cursor-pointer"
                >
                  <span>Explore The Collection</span>
                  <svg className="w-4 h-4 ml-2.5 transform transition-transform duration-300 group-hover:translate-x-1.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                {/* Secondary Bespoke Fitting CTA */}
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 border border-brand-champagne/40 text-brand-champagne font-sans text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-crimson/30 cursor-pointer"
                >
                  Book Bespoke Fitting
                </button>
              </div>

              {/* Editorial Inset Card (Detail Feature) */}
              <div className="relative p-4 rounded bg-stone-900/40 border border-brand-gold/25 backdrop-blur-sm max-w-md shadow-luxury" data-purpose="detail-embroidery-card">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-28 flex-shrink-0 overflow-hidden rounded border border-brand-gold/30">
                    <img 
                      alt="Detail of hand-embroidered mirror work and gold thread blouse" 
                      className="w-full h-full object-cover object-center transform transition duration-700 hover:scale-110" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnVsBGV-1Y7JMj9pA6lCN7FH8-kRXkdfEw8TYKbfS8OCia4xmnlMzzjGj8Sg4uVLL50bMGyhCMOwKnO1ed7TCHIaHROYVBS2BHoDD5cejG_z-8VWtd1QSS40VVG9-Ez0c79ebKbhtz5LEOHy1K9BXMm3uxdPOyft9gspYKRdoN73mQqt5PsF7-J4r3c-zOeDOuWQp8W4AWu04gIOKZBzFiuViNGf988JgGw8VACORijn5y0k4So9SrFNtxXVDaYLFFtI0"
                    />
                  </div>
                  <div className="flex-1 pr-2">
                    <span className="inline-block text-[9px] uppercase tracking-widest text-brand-gold font-sans font-medium mb-1">
                      Atelier Mastercraft
                    </span>
                    <h4 className="font-serif text-lg text-brand-champagne leading-snug">
                      Intricate Zardozi &amp; Mirror Detailing
                    </h4>
                    <p className="font-sans text-[11px] text-stone-300/80 leading-relaxed mt-1 font-light">
                      Over 180 meticulous hours of artisan handcrafting with faceted glass mirror discs and spun metallic gold threads.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Column: Dynamic Showcase & Visual Framing */}
            <div className="lg:col-span-6 relative order-1 lg:order-2 flex justify-center lg:justify-end items-center" data-purpose="main-visual-twirl">
              {/* Decorative Circular Accent Halo */}
              <div className="absolute -inset-6 border border-brand-gold/15 rounded-full pointer-events-none transform -rotate-3 scale-95" />

              {/* Main Full Silhouette Container */}
              <div className="relative w-full max-w-[430px] sm:max-w-[460px] lg:max-w-[490px] xl:max-w-[520px] archival-frame overflow-hidden rounded-sm bg-gradient-to-t from-brand-velvet to-brand-crimson">
                {/* Twirl Imagery with subtle zoom hover */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    alt="Haute couture model spinning in ivory hand-embroidered flare lehenga" 
                    className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] transition-transform duration-1000 ease-out hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0rE-sF1BDYoIfwTHOu4tXMWHeLZ3bRhMkHceV5tlKwcxZvBDU9Ee6nP_yuRKWmS-BZXby1FUQyuigrHrO116ONeiUnEhWXyUO9AU7QXW0PNQfumAvDpO1e5fgy5ExLbNeAXBc4JIxc0TtOFjaISyGCQrC-YM6jHc7YAG89KH1_lIo97Luz7VRQa36q6ERdiKuKB1Hx2sAQO3sOGxqNUm4eVjTKDjmIDY2amAk2MZZyzoP6-6Fw7Q8O0F1iam14uTeNhk"
                  />
                  {/* Vignette Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-velvet via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-velvet/40 via-transparent to-transparent" />
                </div>

                {/* Floating Bottom Editorial Tag on Image */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-stone-950/80 backdrop-blur-md border border-brand-gold/30 rounded flex items-center justify-between shadow-2xl">
                  <div>
                    <p className="font-display text-xs tracking-[0.2em] text-brand-champagne uppercase">
                      Look 07 • Festive Royale
                    </p>
                    <p className="font-serif text-sm italic text-stone-300 mt-0.5">
                      Ivory &amp; Champaca Gold Chanderi Ensemble
                    </p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => setIsCustomizerOpen(true)}
                      className="inline-block px-3 py-1 text-[10px] uppercase font-sans tracking-widest bg-brand-gold/20 text-brand-goldLight border border-brand-gold/30 rounded hover:bg-brand-gold/30 transition-colors cursor-pointer"
                    >
                      Made To Measure
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Micro Floating Callout: Signature Flare */}
              <div className="hidden xl:flex absolute -left-10 top-1/3 flex-col bg-brand-crimson/90 backdrop-blur-md p-4 border-l-2 border-brand-gold shadow-2xl max-w-[210px] z-30">
                <span className="text-[9px] font-sans uppercase tracking-widest text-brand-gold">Signature Flare</span>
                <span className="font-serif text-base text-stone-100 mt-1 leading-snug">36-Kali Architectural Voluminous Kalidar</span>
                <span className="text-[10px] text-stone-300/80 mt-1.5 font-sans font-light">Engineered for lightweight royal twirl movement</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* END: HeroShowcaseSection */}

      {/* =========================================================================
          BEGIN: SHOP BY CATEGORY SECTION
         ========================================================================= */}
      <section className="relative w-full bg-[#2a0507] border-t border-brand-gold/20 py-20 px-6 lg:px-14">
        {/* Subtle Ambient Light Wash */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06),transparent_60%)]" />

        <div className="max-w-[1720px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="h-px w-8 bg-brand-gold" />
                <span className="text-[11px] font-sans font-medium uppercase text-brand-goldLight tracking-widest-luxury">
                  The Curated Repertoire
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-sand leading-tight">
                Shop By Category
              </h2>
            </div>
            <button
              onClick={() => handleCategoryClick('All')}
              className="group inline-flex items-center space-x-2 text-xs uppercase font-sans tracking-[0.2em] text-brand-champagne hover:text-brand-gold transition duration-300 border-b border-brand-gold/30 pb-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Quick-Scroll Circular Story Bar (as seen in Meena Bazaar reference) */}
          <div className="mb-14 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex items-center space-x-6 sm:space-x-8 min-w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.categoryKey)}
                  className="flex flex-col items-center space-y-3 group cursor-pointer focus:outline-none"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-tr from-brand-gold/30 via-brand-gold to-brand-goldLight group-hover:shadow-gold-glow transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-brand-velvet border-2 border-brand-velvet">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover object-center transform transition duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <span className="font-sans text-[11px] uppercase tracking-wider text-stone-200 group-hover:text-brand-gold transition-colors duration-300 text-center max-w-[90px] line-clamp-1 font-medium">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Category Grid (11 Luxury Showcase Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={`card-${cat.id}`}
                onClick={() => handleCategoryClick(cat.categoryKey)}
                className="group relative bg-[#200305] border border-brand-gold/20 hover:border-brand-gold rounded overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-luxury hover:-translate-y-1 flex flex-col justify-end min-h-[280px] sm:min-h-[320px] p-5"
              >
                {/* Background Category Imagery */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-75 group-hover:opacity-90 transform transition duration-700 group-hover:scale-105"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b0204] via-[#1b0204]/60 to-transparent" />

                {/* Optional Gold Top Badge */}
                {cat.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-2.5 py-0.5 text-[8.5px] uppercase font-sans tracking-[0.2em] font-semibold bg-brand-gold/25 text-brand-goldLight border border-brand-gold/40 rounded backdrop-blur-sm">
                      {cat.badge}
                    </span>
                  </div>
                )}

                {/* Content Details */}
                <div className="relative z-10 space-y-1">
                  {cat.tagline && (
                    <span className="text-[10px] font-sans text-stone-300/80 font-light tracking-wide block">
                      {cat.tagline}
                    </span>
                  )}
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-brand-sand group-hover:text-brand-champagne transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <div className="pt-2 flex items-center space-x-1.5 text-[10px] font-sans uppercase tracking-widest text-brand-gold group-hover:text-brand-goldLight transition-colors font-medium">
                    <span>Explore</span>
                    <ChevronRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END: SHOP BY CATEGORY SECTION */}
    </div>
  );
};
