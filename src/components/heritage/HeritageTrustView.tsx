import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Award } from 'lucide-react';

export const HeritageTrustView: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in space-y-12">
      {/* 1. Heritage Chronicle Hero */}
      <div className="bg-[#5E1A2C] text-white p-8 sm:p-14 rounded-2xl border border-[#C5A059]/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-cinzel text-[#ECC480] tracking-widest uppercase font-semibold">
            54 Years of Unbroken Indian Craftsmanship
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF7F5] leading-tight">
            The Meena Bazaar Legacy <br />
            <span className="gold-text-gradient italic font-normal">Since 1970, Old Delhi</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Founded by Mr. Anu Manglani in 1970 amidst the historic fabric bazaars of Chandni Chowk, Meena Bazaar was built on a singular conviction: that India’s handloom heritage deserves the same reverence and uncompromising quality as the world’s grandest royal couture.
          </p>
        </div>
      </div>

      {/* 2. Silk Mark Certification Deep-Dive */}
      <section className="bg-white rounded-2xl border border-[#E8DFD8] p-8 sm:p-12 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/3 text-center p-6 bg-[#FAF7F5] rounded-xl border-2 border-[#0F3A5D]/30 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#0F3A5D] text-[#ECC480] flex items-center justify-center mx-auto shadow-lg">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#0F3A5D]">
              Silk Mark Certified Organization
            </h3>
            <p className="text-xs text-gray-600">
              Authorized by the Silk Mark Organisation of India, Ministry of Textiles, Govt. of India.
            </p>
            <div className="pt-2">
              <span className="silk-mark-badge">
                Laboratory Tested 100% Pure Silk
              </span>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-[#5E1A2C]">
              Our Unconditional Quality & Authenticity Guarantee
            </h2>
            <p>
              In an era of synthetic blends and imitation polyester powerlooms, Meena Bazaar preserves the sacred sanctity of pure handlooms. Every pure silk saree, unstitched suit, and bridal ensemble carrying the Silk Mark tag undergoes rigorous microscopic and chemical burn testing to guarantee 100% natural Mulberry, Tussar, or Katan silk threads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="p-4 bg-[#FAF7F5] rounded-lg border border-gray-200">
                <h4 className="font-bold text-[#5E1A2C] mb-1">Authentic Metallic Zari</h4>
                <p className="text-gray-600">Pure silver and electroplated copper electro-spun zari coils that never tarnish over generations.</p>
              </div>
              <div className="p-4 bg-[#FAF7F5] rounded-lg border border-gray-200">
                <h4 className="font-bold text-[#5E1A2C] mb-1">Master Weaver Welfare</h4>
                <p className="text-gray-600">Direct patronage to over 1,200 artisanal families across Varanasi, Chanderi, Kanchipuram & Lucknow.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chronicle Timeline */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-[#5E1A2C] font-bold text-center">
          Milestones in Royal Indian Fashion
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] space-y-2">
            <span className="text-lg font-serif font-bold text-[#C5A059]">1970</span>
            <h3 className="font-serif font-bold text-sm text-[#1A1718]">Old Delhi Genesis</h3>
            <p className="text-gray-600">The first flagship opens in Chandni Chowk, specializing in unstitched silks and royal Banarasi brocades.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] space-y-2">
            <span className="text-lg font-serif font-bold text-[#C5A059]">1995</span>
            <h3 className="font-serif font-bold text-sm text-[#1A1718]">South Extension Flagship</h3>
            <p className="text-gray-600">Establishment of the iconic South Extension-I salon, introducing in-house bespoke bridal blouse tailoring.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] space-y-2">
            <span className="text-lg font-serif font-bold text-[#C5A059]">2010</span>
            <h3 className="font-serif font-bold text-sm text-[#1A1718]">Pan-India & NRI Expansion</h3>
            <p className="text-gray-600">Expanding to 100+ boutiques across major metro malls and inaugurating global insured shipping.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E8DFD8] space-y-2">
            <span className="text-lg font-serif font-bold text-[#C5A059]">2026</span>
            <h3 className="font-serif font-bold text-sm text-[#1A1718]">Digital Omnichannel Flagship</h3>
            <p className="text-gray-600">Launching the digital atelier with 1-on-1 virtual styling, real-time custom tailoring, and Silk Mark authentication.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => {
            setSelectedCategory('Bridal Regalia');
            setCurrentView('catalog');
          }}
          className="gold-shimmer-btn px-8 py-3.5 rounded text-xs font-cinzel uppercase font-bold tracking-wider shadow-lg"
        >
          Explore Heirloom Creations →
        </button>
      </div>
    </div>
  );
};
