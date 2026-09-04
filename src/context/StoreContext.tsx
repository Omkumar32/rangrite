import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS, CURRENCY_RATES } from '../data/storeData';
import type { Product, Currency } from '../data/storeData';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customBlouseDetails?: {
    neckline: string;
    sleeve: string;
    backCut: string;
    padded: boolean;
    bustSize: string;
  };
}

export interface BookingDetails {
  id?: string;
  boutiqueId: string;
  boutiqueName: string;
  experienceType: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  isVirtualStyling: boolean;
  notes?: string;
}

interface StoreContextType {
  // Navigation & View
  currentView: 'home' | 'catalog' | 'boutiques' | 'heritage' | 'customizer' | 'cart' | 'checkout-success';
  setCurrentView: (view: 'home' | 'catalog' | 'boutiques' | 'heritage' | 'customizer' | 'cart' | 'checkout-success') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  deviceMode: 'desktop' | 'mobile-mock';
  setDeviceMode: (mode: 'desktop' | 'mobile-mock') => void;

  // Currency
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (amountINR: number) => string;

  // Filters state
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;
  selectedCraft: string;
  setSelectedCraft: (craft: string) => void;
  selectedFabric: string;
  setSelectedFabric: (fabric: string) => void;
  selectedPriceTier: string;
  setSelectedPriceTier: (tier: string) => void;
  onlySilkMark: boolean;
  setOnlySilkMark: (val: boolean) => void;
  onlyReadyToShip: boolean;
  setOnlyReadyToShip: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  resetFilters: () => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotalINR: number;
  
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Omnichannel Booking
  activeBooking: BookingDetails | null;
  confirmedBookings: BookingDetails[];
  createBooking: (booking: BookingDetails) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  preselectedBoutiqueId: string | null;
  setPreselectedBoutiqueId: (id: string | null) => void;

  // Atelier Customizer Modal
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  customizerProduct: Product | null;
  setCustomizerProduct: (prod: Product | null) => void;

  // Quick Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'boutiques' | 'heritage' | 'customizer' | 'cart' | 'checkout-success'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile-mock'>('desktop');
  const [currency, setCurrency] = useState<Currency>('INR');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedCraft, setSelectedCraft] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('All');
  const [onlySilkMark, setOnlySilkMark] = useState<boolean>(false);
  const [onlyReadyToShip, setOnlyReadyToShip] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['mb-001', 'mb-004']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Booking & Modals
  const [activeBooking, setActiveBooking] = useState<BookingDetails | null>(null);
  const [confirmedBookings, setConfirmedBookings] = useState<BookingDetails[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [preselectedBoutiqueId, setPreselectedBoutiqueId] = useState<string | null>(null);
  
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(PRODUCTS[0]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const formatPrice = (amountINR: number) => {
    const config = CURRENCY_RATES[currency];
    const converted = amountINR * config.rate;
    if (currency === 'INR') {
      return `${config.symbol}${amountINR.toLocaleString('en-IN')}`;
    }
    return `${config.symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === item.product.id && i.selectedSize === item.selectedSize
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
    showToast(`Added "${item.product.name.slice(0, 32)}..." to your Luxury Bag`);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === productId && i.selectedSize === selectedSize)));
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((i) => {
        if (i.product.id === productId && i.selectedSize === selectedSize) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your private wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your private bridal wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedCraft('All');
    setSelectedFabric('All');
    setSelectedPriceTier('All');
    setOnlySilkMark(false);
    setOnlyReadyToShip(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const createBooking = (booking: BookingDetails) => {
    const bookingWithId = {
      ...booking,
      id: `MB-VIP-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setActiveBooking(bookingWithId);
    setConfirmedBookings((prev) => [bookingWithId, ...prev]);
    setIsBookingModalOpen(false);
    showToast(`VIP Salon appointment confirmed for ${booking.boutiqueName}!`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalINR = cart.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        deviceMode,
        setDeviceMode,
        currency,
        setCurrency,
        formatPrice,
        selectedCategory,
        setSelectedCategory,
        selectedOccasion,
        setSelectedOccasion,
        selectedCraft,
        setSelectedCraft,
        selectedFabric,
        setSelectedFabric,
        selectedPriceTier,
        setSelectedPriceTier,
        onlySilkMark,
        setOnlySilkMark,
        onlyReadyToShip,
        setOnlyReadyToShip,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        resetFilters,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotalINR,
        wishlist,
        toggleWishlist,
        isWishlisted,
        activeBooking,
        confirmedBookings,
        createBooking,
        isBookingModalOpen,
        setIsBookingModalOpen,
        preselectedBoutiqueId,
        setPreselectedBoutiqueId,
        isCustomizerOpen,
        setIsCustomizerOpen,
        customizerProduct,
        setCustomizerProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
