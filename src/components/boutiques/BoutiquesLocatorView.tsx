import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Sparkles, 
  Video, 
  Navigation 
} from 'lucide-react';
import { BOUTIQUES } from '../../data/storeData';

export const BoutiquesLocatorView: React.FC = () => {
  const {
    setIsBookingModalOpen,
    setPreselectedBoutiqueId
  } = useStore();

  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'New Delhi', 'Mumbai', 'Gurugram', 'Agra'];

  const filteredBoutiques = BOUTIQUES.filter((b) => {
    if (selectedCity === 'All') return true;
    return b.city === selectedCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#5E1A2C] via-[#43101E] to-[#24060F] text-white p-8 sm:p-12 rounded-2xl border border-[#C5A059]/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-cinzel text-[#ECC480] tracking-widest uppercase font-semibold">
            100+ Flagship Boutiques Across India & Global NRI Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Visit Our Flagship Couture Salons
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Walk into any of our flagship boutiques for bespoke master tailoring, Silk Mark laboratory certified drapes, and private bridal trousseau consultations.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setPreselectedBoutiqueId(BOUTIQUES[0].id);
                setIsBookingModalOpen(true);
              }}
              className="gold-shimmer-btn px-6 py-2.5 rounded text-xs font-cinzel uppercase font-bold flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Salon Appointment
            </button>
            <button
              onClick={() => {
                setIsBookingModalOpen(true);
              }}
              className="px-6 py-2.5 rounded text-xs font-cinzel uppercase border border-[#ECC480] text-[#ECC480] hover:bg-[#ECC480]/15 flex items-center gap-2"
            >
              <Video className="w-4 h-4" /> NRI Virtual Drape Session
            </button>
          </div>
        </div>
      </div>

      {/* City Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-cinzel">
        <span className="text-gray-500 font-semibold uppercase mr-2">Filter By City:</span>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCity === city
                ? 'bg-[#5E1A2C] text-white border-[#5E1A2C] font-bold shadow'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#C5A059]'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Boutiques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBoutiques.map((boutique) => (
          <div
            key={boutique.id}
            className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img
                src={boutique.image}
                alt={boutique.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#5E1A2C] text-white text-xs font-cinzel font-bold px-3 py-1 rounded shadow">
                {boutique.city}
              </span>
              {boutique.vipLounge && (
                <span className="absolute top-4 right-4 bg-[#C5A059] text-[#1A1718] text-xs font-cinzel font-bold px-3 py-1 rounded shadow flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> VIP Bridal Suite
                </span>
              )}
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-xl text-[#1A1718] group-hover:text-[#5E1A2C] transition-colors">
                  {boutique.name}
                </h3>
                <p className="text-xs text-gray-600 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{boutique.address}</span>
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{boutique.timings}</span>
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="font-semibold text-gray-800">{boutique.phone}</span>
                </p>

                {/* Experience Highlights */}
                <div className="pt-2">
                  <span className="text-[11px] font-cinzel text-gray-500 uppercase tracking-wider block mb-1.5">
                    Salon Services Available:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {boutique.experienceTypes.map((exp) => (
                      <span
                        key={exp}
                        className="text-[10px] bg-[#FAF7F5] text-[#5E1A2C] border border-[#C5A059]/30 px-2 py-0.5 rounded font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    setPreselectedBoutiqueId(boutique.id);
                    setIsBookingModalOpen(true);
                  }}
                  className="crimson-btn flex-1 py-2.5 rounded text-xs font-cinzel uppercase font-semibold flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" /> Reserve Stylist Slot
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(boutique.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#FAF7F5] border border-gray-200 rounded text-gray-700 hover:text-[#5E1A2C] hover:border-[#C5A059]"
                  title="Open in Google Maps"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
