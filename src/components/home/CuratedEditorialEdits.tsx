import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const CuratedEditorialEdits: React.FC = () => {
  const { setCurrentView, setSelectedCategory, lookbookConfig } = useStore();

  const handleNavigate = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#FAF7F2] text-[#1A1718] py-16 sm:py-20 lg:py-24 px-6 lg:px-14 border-t border-[#EBE3D7]/70 overflow-hidden">
      <div className="max-w-[1720px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-1">
            <span className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#997332] font-semibold">
              {lookbookConfig.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#3b080a] leading-tight tracking-tight">
              {lookbookConfig.sectionTitle}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm lg:text-[14.5px] text-[#6E645E] font-light leading-relaxed max-w-sm sm:max-w-md sm:text-right">
            {lookbookConfig.narrative}
          </p>
        </div>

        {/* Top Feature Card (Style Edit: Craft Your Perfect Fit) */}
        <div className="bg-white border border-[#EBE3D7] shadow-[0_10px_35px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Image Showcase */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[460px] overflow-hidden bg-[#F0EBE1] group">
              <img
                src={lookbookConfig.heroCard.image}
                alt={lookbookConfig.heroCard.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block bg-[#3b080a] text-white text-[9.5px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 shadow-sm">
                  {lookbookConfig.heroCard.volBadge}
                </span>
              </div>
            </div>

            {/* Right Narrative Content */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-14 flex flex-col justify-center bg-white">
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#997332] font-semibold mb-3">
                {lookbookConfig.heroCard.tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal text-[#3b080a] leading-[1.15] tracking-tight mb-4">
                {lookbookConfig.heroCard.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm lg:text-[14px] text-[#6E645E] font-light leading-relaxed mb-8 max-w-lg">
                {lookbookConfig.heroCard.description}
              </p>

              {/* Call to action & price */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                <button
                  onClick={() => handleNavigate(lookbookConfig.heroCard.categoryKey)}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-[#3b080a] hover:bg-[#520d16] text-[#F7F3EE] font-sans text-[11px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-sm cursor-pointer"
                >
                  {lookbookConfig.heroCard.buttonText}
                </button>
                <span className="font-sans text-xs sm:text-sm text-[#6E645E] font-light tracking-wide">
                  {lookbookConfig.heroCard.priceText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Lookbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
          {lookbookConfig.cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleNavigate(card.categoryKey)}
              className="group bg-white border border-[#EBE3D7] shadow-[0_10px_35px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col cursor-pointer transition-all duration-500 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              {/* Image Box */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE3D6]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Badge */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-[#3b080a] text-[9.5px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 shadow-sm">
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Narrative Info */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 bg-white">
                <span className="font-sans text-[10.5px] uppercase tracking-[0.22em] text-[#997332] font-semibold mb-2">
                  {card.tagline}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-normal text-[#3b080a] leading-snug mb-3 group-hover:text-[#6b0d12] transition-colors">
                  {card.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6E645E] font-light leading-relaxed mb-6 flex-1">
                  {card.description}
                </p>

                {/* Action Link */}
                <div className="pt-2 flex items-center space-x-2 text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#3b080a] group-hover:text-[#6b0d12] transition-colors">
                  <span>{card.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
