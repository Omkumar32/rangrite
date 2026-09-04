import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Calendar, 
  MapPin, 
  Video, 
  CheckCircle2 
} from 'lucide-react';
import { BOUTIQUES } from '../../data/storeData';

export const SalonBookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    preselectedBoutiqueId,
    createBooking
  } = useStore();

  if (!isBookingModalOpen) return null;

  const [isVirtual, setIsVirtual] = useState(false);
  const [selectedBoutique, setSelectedBoutique] = useState(
    preselectedBoutiqueId || BOUTIQUES[0].id
  );
  const [experienceType, setExperienceType] = useState('Bridal Trousseau Styling');
  const [date, setDate] = useState('2026-09-08');
  const [timeSlot, setTimeSlot] = useState('02:00 PM – 03:00 PM');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeBoutiqueObj = BOUTIQUES.find((b) => b.id === selectedBoutique) || BOUTIQUES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    createBooking({
      boutiqueId: isVirtual ? 'virtual-salon' : activeBoutiqueObj.id,
      boutiqueName: isVirtual ? 'NRI Global Virtual HD Video Salon' : activeBoutiqueObj.name,
      experienceType,
      date,
      timeSlot,
      guestName,
      guestPhone,
      guestEmail,
      isVirtualStyling: isVirtual
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 border-[#C5A059]/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5E1A2C] to-[#3B0E1B] text-white p-5 sm:px-8 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ECC480]/20 flex items-center justify-center text-[#ECC480]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-cinzel text-[#ECC480] uppercase tracking-widest block">
                Omnichannel Concierge
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold">
                Reserve VIP Salon Appointment
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#5E1A2C]">
              VIP Reservation Confirmed!
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              We have reserved your consultation for <strong className="text-gray-900">{isVirtual ? 'NRI Virtual Video Salon' : activeBoutiqueObj.name}</strong> on <strong className="text-gray-900">{date}</strong> at <strong className="text-gray-900">{timeSlot}</strong>.
            </p>
            <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#E8DFD8] text-xs text-left max-w-md mx-auto space-y-1.5">
              <p><span className="text-gray-500 font-medium">Guest:</span> {guestName}</p>
              <p><span className="text-gray-500 font-medium">Experience:</span> {experienceType}</p>
              <p><span className="text-gray-500 font-medium">Stylist Coordinator:</span> Master Drapist & Couture Specialist</p>
              <p className="text-[11px] text-[#5E1A2C] pt-1">A calendar invitation & WhatsApp confirmation has been dispatched to {guestPhone}.</p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsBookingModalOpen(false);
              }}
              className="crimson-btn px-6 py-2.5 rounded text-xs font-cinzel uppercase font-semibold"
            >
              Done & Return to Boutique
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {/* Consultation Mode Toggle */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-[#FAF7F5] rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setIsVirtual(false)}
                className={`py-2 px-3 rounded-lg font-cinzel font-semibold transition-all flex items-center justify-center gap-2 ${
                  !isVirtual ? 'bg-[#5E1A2C] text-white shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" /> Physical Boutique
              </button>
              <button
                type="button"
                onClick={() => setIsVirtual(true)}
                className={`py-2 px-3 rounded-lg font-cinzel font-semibold transition-all flex items-center justify-center gap-2 ${
                  isVirtual ? 'bg-[#5E1A2C] text-white shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Virtual Video Drape (NRI)
              </button>
            </div>

            {/* Boutique Selector (if Physical) */}
            {!isVirtual ? (
              <div className="space-y-1.5">
                <label className="font-serif font-bold text-gray-800 uppercase tracking-wider block">
                  Select Flagship Salon
                </label>
                <select
                  value={selectedBoutique}
                  onChange={(e) => setSelectedBoutique(e.target.value)}
                  className="w-full bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                >
                  {BOUTIQUES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.city} — {b.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-500">{activeBoutiqueObj.address}</p>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 text-xs">
                ✨ Complimentary HD Video consultation scheduled in your local timezone (US, UK, UAE, Australia).
              </div>
            )}

            {/* Experience Type */}
            <div className="space-y-1.5">
              <label className="font-serif font-bold text-gray-800 uppercase tracking-wider block">
                Couture Experience Desired
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Bridal Trousseau Styling',
                  'Master Tailoring Consultation',
                  'Silk Mark Saree Draping',
                  'Cocktail & Sangeet Ensembles'
                ].map((exp) => (
                  <button
                    type="button"
                    key={exp}
                    onClick={() => setExperienceType(exp)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      experienceType === exp ? 'border-[#5E1A2C] bg-[#5E1A2C]/5 font-semibold text-[#5E1A2C]' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-serif font-bold text-gray-800 uppercase tracking-wider block">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-serif font-bold text-gray-800 uppercase tracking-wider block">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                >
                  <option>11:30 AM – 12:30 PM (Morning Slot)</option>
                  <option>02:00 PM – 03:00 PM (Afternoon VIP)</option>
                  <option>04:30 PM – 05:30 PM (Tea & Trousseau)</option>
                  <option>06:30 PM – 07:30 PM (Evening Fitting)</option>
                </select>
              </div>
            </div>

            {/* Patron Details */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="font-serif font-bold text-gray-800 uppercase tracking-wider">
                Patron Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Phone Number *"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address (for calendar invitation)"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full bg-[#FAF7F5] border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-cinzel uppercase text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="gold-shimmer-btn px-6 py-2.5 rounded text-xs font-cinzel uppercase font-bold shadow"
              >
                Confirm VIP Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
