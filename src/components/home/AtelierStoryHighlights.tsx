import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import type { StoryHighlightItem } from '../../data/cmsInitialData';

export const AtelierStoryHighlights: React.FC = () => {
  const { setCurrentView, setSelectedCategory, storyHighlights } = useStore();
  const [activeStory, setActiveStory] = useState<StoryHighlightItem | null>(null);

  const handleOpenHighlight = (item: StoryHighlightItem) => {
    setActiveStory(item);
  };

  const handleExploreStory = (item: StoryHighlightItem) => {
    if (item.view) {
      setCurrentView(item.view);
    } else if (item.categoryKey) {
      setSelectedCategory(item.categoryKey);
      setCurrentView('catalog');
    }
    setActiveStory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* =========================================================================
          HIGHLIGHTS STORY BUBBLE BAR
         ========================================================================= */}
      <section className="relative w-full bg-[#FAF7F2] py-6 sm:py-8 border-t border-b border-[#EBE3D7]/70 overflow-hidden">
        <div className="max-w-[1720px] mx-auto px-6 lg:px-14">
          
          {/* Scrollable Row of Highlights */}
          <div className="flex items-center justify-start lg:justify-center space-x-6 sm:space-x-8 md:space-x-10 overflow-x-auto no-scrollbar py-2">
            {storyHighlights.map((item) => (
              <button
                key={item.id}
                onClick={() => handleOpenHighlight(item)}
                className="group flex flex-col items-center flex-shrink-0 focus:outline-none cursor-pointer transition-transform duration-300"
              >
                {/* Highlight Circle Frame */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#997332]/40 via-[#D4AF37] to-[#F3E5AB] group-hover:shadow-[0_0_22px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-sm border border-stone-100 transition-colors group-hover:bg-[#FAF7F2]">
                    <span className="text-2xl sm:text-3xl select-none transform transition-transform duration-300 group-hover:scale-115">
                      {item.emoji}
                    </span>
                  </div>
                </div>

                {/* Title and Subtitle Under Circle */}
                <div className="text-center mt-2.5 space-y-0.5 max-w-[85px] sm:max-w-[100px]">
                  <span className="block font-sans text-[11px] uppercase tracking-wider font-semibold text-[#3b080a] group-hover:text-[#997332] transition-colors truncate">
                    {item.title}
                  </span>
                  <span className="block font-sans text-[9px] text-[#6E645E] font-light truncate">
                    {item.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE STORY VIEW MODAL (When a highlight is clicked)
         ========================================================================= */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Dark Backdrop */}
          <div 
            onClick={() => setActiveStory(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
          />

          {/* Story Card Container */}
          <div className="relative w-full max-w-[420px] bg-white rounded-none border border-[#EBE3D7] shadow-2xl overflow-hidden z-10 animate-slide-up flex flex-col max-h-[85vh]">
            
            {/* Story Top Header Bar */}
            <div className="p-4 bg-white border-b border-[#EBE3D7] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#997332]/40 flex items-center justify-center text-lg shadow-sm">
                  {activeStory.emoji}
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#3b080a] leading-tight">
                    {activeStory.title}
                  </h4>
                  <span className="font-sans text-[10px] text-[#997332] font-semibold uppercase tracking-wider">
                    {activeStory.subtitle}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#3b080a] hover:text-white text-[#3b080a] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Featured Visual */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-900">
              <img
                src={activeStory.storyImage}
                alt={activeStory.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0204] via-transparent to-transparent opacity-80" />
              
              {/* Overlay narrative */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#997332] text-white text-[9px] font-sans font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  <span>Highlight Story</span>
                </div>
                <p className="font-serif text-sm sm:text-base text-stone-100 font-light leading-relaxed">
                  {activeStory.narrative}
                </p>
              </div>
            </div>

            {/* Story Action Footer */}
            <div className="p-4 bg-white border-t border-[#EBE3D7]">
              <button
                onClick={() => handleExploreStory(activeStory)}
                className="w-full py-3.5 px-6 bg-[#3b080a] hover:bg-[#520d16] text-white font-sans text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <span>Explore {activeStory.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
