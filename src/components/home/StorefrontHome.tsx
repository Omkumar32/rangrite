import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { CuratedEditorialEdits } from './CuratedEditorialEdits';
import { AtelierStoryHighlights } from './AtelierStoryHighlights';
import { isVideoMedia } from '../../utils/mediaOptimizer';

export const StorefrontHome: React.FC = () => {
  const { 
    setCurrentView, 
    setSelectedCategory, 
    setIsBookingModalOpen,
    setIsCustomizerOpen,
    heroConfig,
    categoryCards,
    quickButtons
  } = useStore();

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setCurrentView('catalog');
  };

  // Compile active hero model images (supports both array and fallback single modelImage, filters empty values)
  const rawList = (heroConfig.modelImages && heroConfig.modelImages.length > 0)
    ? heroConfig.modelImages
    : [heroConfig.modelImage];
  const heroImages = rawList.filter((url) => typeof url === 'string' && url.trim().length > 0).length > 0
    ? rawList.filter((url) => typeof url === 'string' && url.trim().length > 0)
    : ['/images/categories/cat-lehenga-choli.jpg'];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto slide interval with smooth transition
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const intervalMs = heroConfig.autoSlideInterval || 4000;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % heroImages.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [heroImages.length, heroConfig.autoSlideInterval]);

  // Keep index in valid bounds if images are deleted in admin
  useEffect(() => {
    if (activeSlideIndex >= heroImages.length) {
      setActiveSlideIndex(0);
    }
  }, [heroImages.length, activeSlideIndex]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlideIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlideIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1718] font-sans antialiased selection:bg-[#3b080a] selection:text-[#FAF7F2] min-h-screen overflow-x-hidden">
      {/* BEGIN: HeroShowcaseSection (Light Ivory & Cream Theme) */}
      <main className="relative min-h-screen pt-24 pb-12 lg:pt-28 lg:pb-12 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#FAF7F2]" data-purpose="couture-hero">
        {/* Subtle Ambient Lighting Glows */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_70%_40%,rgba(212,175,55,0.12),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />

        {/* Editorial Central Content Composition */}
        <div className="max-w-[1720px] mx-auto px-6 lg:px-14 w-full my-auto py-4 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Editorial Column: Narrative, Typography & Inset */}
            <div className="lg:col-span-6 z-20 order-2 lg:order-1 flex flex-col justify-center text-left" data-purpose="editorial-text-content">
              {/* Collection Label Tag */}
              <div className="inline-flex items-center space-x-3 mb-3">
                <span className="h-px w-8 bg-[#997332]" />
                <span className="text-[11px] lg:text-xs font-sans font-semibold uppercase text-[#997332] tracking-widest-luxury">
                  {heroConfig.collectionTag}
                </span>
              </div>

              {/* Main Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] xl:text-[70px] font-normal text-[#3b080a] leading-[1.05] tracking-tight mb-5">
                {heroConfig.headlineMain}{' '}
                <span className="italic font-normal text-[#997332] underline decoration-[#997332]/40 decoration-1 underline-offset-8">
                  {heroConfig.headlineAccent}
                </span>
              </h1>

              {/* Body Description */}
              <p className="font-serif text-base sm:text-lg lg:text-[19px] text-[#6E645E] font-light leading-relaxed max-w-xl mb-8">
                {heroConfig.bodyDescription}
              </p>

              {/* Interactive Call-To-Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 mb-8" data-purpose="hero-call-to-actions">
                {/* Primary CTA */}
                <button
                  onClick={() => {
                    setSelectedCategory(heroConfig.primaryCtaCategory || 'Bridal Regalia');
                    setCurrentView('catalog');
                  }}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#3b080a] hover:bg-[#520d16] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>{heroConfig.primaryCtaText}</span>
                  <svg className="w-4 h-4 ml-2.5 transform transition-transform duration-300 group-hover:translate-x-1.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                {/* Secondary Bespoke Fitting CTA */}
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#3b080a]/40 text-[#3b080a] hover:border-[#3b080a] hover:bg-[#3b080a]/5 font-sans text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 cursor-pointer"
                >
                  {heroConfig.secondaryCtaText}
                </button>
              </div>

              {/* Editorial Inset Card (Detail Feature) */}
              <div className="relative p-4 rounded bg-white border border-[#EBE3D7] shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-sm max-w-md" data-purpose="detail-embroidery-card">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-28 flex-shrink-0 overflow-hidden rounded border border-[#EBE3D7]">
                    <img 
                      alt={heroConfig.insetTitle} 
                      className="w-full h-full object-cover object-center transform transition duration-700 hover:scale-110" 
                      src={heroConfig.insetImage}
                    />
                  </div>
                  <div className="flex-1 pr-2">
                    <span className="inline-block text-[9px] uppercase tracking-widest text-[#997332] font-sans font-semibold mb-1">
                      {heroConfig.insetBadge}
                    </span>
                    <h4 className="font-serif text-lg text-[#3b080a] leading-snug font-normal">
                      {heroConfig.insetTitle}
                    </h4>
                    <p className="font-sans text-[11px] text-[#6E645E] leading-relaxed mt-1 font-light">
                      {heroConfig.insetDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Column: Dynamic Showcase & Visual Framing */}
            <div className="lg:col-span-6 relative order-1 lg:order-2 flex justify-center lg:justify-end items-center" data-purpose="main-visual-twirl">
              {/* Decorative Circular Accent Halo */}
              <div className="absolute -inset-6 border border-[#997332]/20 rounded-full pointer-events-none transform -rotate-3 scale-95" />

              {/* Main Full Silhouette Container */}
              <div className="relative w-full max-w-[430px] sm:max-w-[460px] lg:max-w-[490px] xl:max-w-[520px] overflow-hidden rounded-sm bg-gradient-to-t from-[#EAE3D6] to-[#F5EFEB] border border-[#EBE3D7] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.1)] group">
                {/* Twirl Imagery Carousel with smooth auto cross-fade */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  {heroImages.map((imgUrl, idx) => {
                    const isVid = isVideoMedia(imgUrl);
                    const isActive = idx === activeSlideIndex;
                    return (
                      <div
                        key={`${imgUrl}-${idx}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                        }`}
                      >
                        {isVid ? (
                          <video
                            src={imgUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover object-top"
                            ref={(el) => {
                              if (el) {
                                el.muted = true;
                                if (isActive) {
                                  el.play().catch(() => {});
                                }
                              }
                            }}
                            onError={() => {
                              console.warn('Hero video failed to load, falling back to image:', imgUrl);
                            }}
                          />
                        ) : (
                          <img 
                            alt={`${heroConfig.floatingEnsembleName} - Slide ${idx + 1}`} 
                            className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] transition-transform duration-1000 ease-out hover:scale-105" 
                            src={imgUrl}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/categories/cat-lehenga-choli.jpg';
                            }}
                          />
                        )}
                        {/* Subtle Vignette Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>
                    );
                  })}

                  {/* Manual Arrow Controls (visible when multiple images) */}
                  {heroImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevSlide}
                        aria-label="Previous Hero Image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer shadow-md"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextSlide}
                        aria-label="Next Hero Image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer shadow-md"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Slide Indicators Dots */}
                  {heroImages.length > 1 && (
                    <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {heroImages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlideIndex(dotIdx);
                          }}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            dotIdx === activeSlideIndex 
                              ? 'w-4 bg-white' 
                              : 'w-1.5 bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Floating Bottom Editorial Tag on Image */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md border border-[#EBE3D7] rounded flex items-center justify-between shadow-xl z-20">
                  <div>
                    <p className="font-display text-xs tracking-[0.2em] text-[#997332] uppercase font-semibold">
                      {heroConfig.floatingLookTitle}
                    </p>
                    <p className="font-serif text-sm italic text-[#3b080a] mt-0.5">
                      {heroConfig.floatingEnsembleName}
                    </p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => setIsCustomizerOpen(true)}
                      className="inline-block px-3.5 py-1.5 text-[10px] uppercase font-sans tracking-widest bg-[#3b080a] text-[#FAF7F2] hover:bg-[#520d16] rounded transition-colors cursor-pointer font-medium"
                    >
                      Made To Measure
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Micro Floating Callout: Signature Flare */}
              <div className="hidden xl:flex absolute -left-10 top-1/3 flex-col bg-white/95 backdrop-blur-md p-4 border-l-2 border-[#997332] border-t border-r border-b border-[#EBE3D7] shadow-xl max-w-[210px] z-30">
                <span className="text-[9px] font-sans uppercase tracking-widest text-[#997332] font-semibold">{heroConfig.signatureFlareTitle}</span>
                <span className="font-serif text-base text-[#3b080a] mt-1 leading-snug">{heroConfig.signatureFlareSubtitle}</span>
                <span className="text-[10px] text-[#6E645E] mt-1.5 font-sans font-light">{heroConfig.signatureFlareDescription}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* END: HeroShowcaseSection */}

      {/* =========================================================================
          BEGIN: ATELIER STORY HIGHLIGHTS (Circular Story Bubble Bar)
         ========================================================================= */}
      <AtelierStoryHighlights />
      {/* END: ATELIER STORY HIGHLIGHTS */}

      {/* =========================================================================
          BEGIN: SHOP BY COUTURE CATEGORIES SECTION (Dynamic CMS Driven)
         ========================================================================= */}
      <section className="relative w-full bg-[#FAF7F2] text-[#1A1718] py-20 px-6 lg:px-14 border-t border-[#EBE3D7]/70">
        <div className="max-w-[1720px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#997332] font-semibold mb-2">
              THE GRAND REPERTOIRE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#3b080a] leading-tight tracking-tight mb-3">
              Shop By Couture Categories
            </h2>
            <p className="font-sans text-xs sm:text-sm lg:text-[14.5px] text-[#6E645E] font-light leading-relaxed">
              Every thread spun with devotion, every drape crafted to honor royal Indian heritage.
            </p>
            {/* Centered Decorative Diamond Divider */}
            <div className="flex items-center justify-center space-x-3 mt-4">
              <span className="w-12 h-px bg-[#D6CBBF]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#997332]" />
              <span className="w-12 h-px bg-[#D6CBBF]" />
            </div>
          </div>

          {/* Dynamic Featured Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-6">
            {categoryCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCategoryClick(card.categoryKey)}
                className="group relative aspect-[3/4] rounded-none overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col justify-end"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transform transition duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a0507] via-[#2a0507]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                <div className="relative z-10 p-6 sm:p-7">
                  <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-[#F3E5AB] block mb-1">
                    {card.tag}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-[26px] font-normal text-white mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-stone-300 text-xs font-light mb-5 leading-relaxed line-clamp-2">
                    {card.subtitle}
                  </p>
                  <div className="flex items-center space-x-2 text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#F3E5AB] group-hover:text-white transition-colors">
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Bottom Category Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {quickButtons.map((btn) => (
              <div
                key={btn.id}
                onClick={() => {
                  if (btn.view) {
                    setCurrentView(btn.view);
                  } else if (btn.categoryKey) {
                    handleCategoryClick(btn.categoryKey);
                  }
                }}
                className="group bg-white border border-[#EBE3D7] px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-[#3b080a]/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <svg className="w-5 h-5 text-[#3b080a] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  <span className="font-sans text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-[#3b080a] group-hover:text-[#6b0d12] transition-colors">
                    {btn.title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#997332] group-hover:text-[#3b080a] transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END: SHOP BY CATEGORY SECTION */}

      {/* =========================================================================
          BEGIN: CURATED EDITORIAL EDITS (LOOKBOOKS)
         ========================================================================= */}
      <CuratedEditorialEdits />
      {/* END: CURATED EDITORIAL EDITS */}
    </div>
  );
};
