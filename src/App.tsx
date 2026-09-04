import React from 'react';
import { useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { StorefrontHome } from './components/home/StorefrontHome';
import { CatalogView } from './components/catalog/CatalogView';
import { BoutiquesLocatorView } from './components/boutiques/BoutiquesLocatorView';
import { HeritageTrustView } from './components/heritage/HeritageTrustView';
import { CartCheckoutView } from './components/cart/CartCheckoutView';
import { MobileNativeSimulator } from './components/mobile/MobileNativeSimulator';
import { AtelierCustomizerModal } from './components/customizer/AtelierCustomizerModal';
import { SalonBookingModal } from './components/concierge/SalonBookingModal';
import { Check } from 'lucide-react';
import './styles/designSystem.css';

export const MainApp: React.FC = () => {
  const { currentView, deviceMode, toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-brand-velvet text-brand-sand selection:bg-brand-gold selection:text-brand-velvet">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1718] text-white px-5 py-3 rounded-xl shadow-2xl border border-brand-gold flex items-center gap-3 animate-fade-in text-xs">
          <div className="w-6 h-6 rounded-full bg-brand-crimson text-brand-champagne flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Global Luxury Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {deviceMode === 'mobile-mock' ? (
          <MobileNativeSimulator />
        ) : (
          <>
            {currentView === 'home' && <StorefrontHome />}
            {currentView === 'catalog' && <CatalogView />}
            {currentView === 'boutiques' && <BoutiquesLocatorView />}
            {currentView === 'heritage' && <HeritageTrustView />}
            {currentView === 'customizer' && <CatalogView />}
            {currentView === 'cart' && <CartCheckoutView />}
          </>
        )}
      </main>

      {/* Omnichannel Salon Booking & Atelier Customizer Modals */}
      <SalonBookingModal />
      <AtelierCustomizerModal />

      {/* Global Luxury Footer */}
      {deviceMode === 'desktop' && currentView !== 'home' && <Footer />}
    </div>
  );
};

export default function App() {
  return <MainApp />;
}
