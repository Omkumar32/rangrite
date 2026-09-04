import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCY_RATES } from '../data/storeData';
import type { Product, Currency } from '../data/storeData';
import {
  INITIAL_HERO_CONFIG,
  INITIAL_STORY_HIGHLIGHTS,
  INITIAL_CATEGORY_CARDS,
  INITIAL_QUICK_BUTTONS,
  INITIAL_LOOKBOOK_CONFIG,
  INITIAL_SITE_FOOTER_CONFIG
} from '../data/cmsInitialData';
import type {
  HeroConfig,
  StoryHighlightItem,
  CategoryCardItem,
  QuickCategoryButtonItem,
  LookbookConfig,
  LookbookFeatureCard,
  LookbookGridCard,
  SiteFooterConfig
} from '../data/cmsInitialData';

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

export type StoreView = 'home' | 'catalog' | 'boutiques' | 'heritage' | 'customizer' | 'cart' | 'checkout-success' | 'admin';

interface StoreContextType {
  // Navigation & View
  currentView: StoreView;
  setCurrentView: (view: StoreView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  deviceMode: 'desktop' | 'mobile-mock';
  setDeviceMode: (mode: 'desktop' | 'mobile-mock') => void;

  // Currency
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (amountINR: number) => string;

  // Products CRUD
  products: Product[];
  addProduct: (newProd: Product) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

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
  
  wishlist: string[];
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

  // ==========================================
  // CMS DYNAMIC SECTIONS STATE & CRUD MUTATORS
  // ==========================================
  // 1. Hero Showcase
  heroConfig: HeroConfig;
  updateHeroConfig: (fields: Partial<HeroConfig>) => void;

  // 2. Story Highlights
  storyHighlights: StoryHighlightItem[];
  addStoryHighlight: (item: Omit<StoryHighlightItem, 'id'>) => void;
  updateStoryHighlight: (id: string, fields: Partial<StoryHighlightItem>) => void;
  deleteStoryHighlight: (id: string) => void;

  // 3. Couture Categories
  categoryCards: CategoryCardItem[];
  addCategoryCard: (card: Omit<CategoryCardItem, 'id'>) => void;
  updateCategoryCard: (id: string, fields: Partial<CategoryCardItem>) => void;
  deleteCategoryCard: (id: string) => void;
  quickButtons: QuickCategoryButtonItem[];
  updateQuickButton: (id: string, fields: Partial<QuickCategoryButtonItem>) => void;

  // 4. Lookbooks
  lookbookConfig: LookbookConfig;
  updateLookbookHeader: (eyebrow: string, sectionTitle: string, narrative: string) => void;
  updateLookbookHero: (fields: Partial<LookbookFeatureCard>) => void;
  addLookbookCard: (card: Omit<LookbookGridCard, 'id'>) => void;
  updateLookbookCard: (id: string, fields: Partial<LookbookGridCard>) => void;
  deleteLookbookCard: (id: string) => void;

  // 5. Site Footer
  siteFooterConfig: SiteFooterConfig;
  updateSiteFooterConfig: (fields: Partial<SiteFooterConfig>) => void;

  // Reset CMS to defaults
  resetAllCmsData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialView = (): StoreView => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/')) {
        return 'admin';
      }
    }
    return 'home';
  };

  const [currentView, setCurrentViewState] = useState<StoreView>(getInitialView);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile-mock'>('desktop');
  const [currency, setCurrency] = useState<Currency>('INR');

  // Custom setCurrentView that updates the URL pathname seamlessly
  const setCurrentView = (view: StoreView) => {
    setCurrentViewState(view);
    if (typeof window !== 'undefined') {
      const targetPath = view === 'admin' ? '/admin' : '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view }, '', targetPath);
      }
    }
  };

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/')) {
        setCurrentViewState('admin');
      } else {
        setCurrentViewState('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // =========================================================================
  // LOCAL STORAGE PERSISTENCE HELPERS
  // =========================================================================
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return fallback;
  };

  // 1. Products List
  const [products, setProducts] = useState<Product[]>(() => getStored('rg_cms_products', PRODUCTS));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || PRODUCTS[0]);

  // 2. CMS Dynamic Sections
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(() => {
    const stored = getStored<HeroConfig>('rg_cms_hero', INITIAL_HERO_CONFIG);
    // Ensure modelImages array exists and has at least one valid item
    if (!stored.modelImages || !Array.isArray(stored.modelImages) || stored.modelImages.length === 0) {
      return {
        ...INITIAL_HERO_CONFIG,
        ...stored,
        modelImages: stored.modelImage ? [stored.modelImage, ...INITIAL_HERO_CONFIG.modelImages!] : INITIAL_HERO_CONFIG.modelImages
      };
    }
    return { ...INITIAL_HERO_CONFIG, ...stored };
  });
  const [storyHighlights, setStoryHighlights] = useState<StoryHighlightItem[]>(() => getStored('rg_cms_highlights', INITIAL_STORY_HIGHLIGHTS));
  const [categoryCards, setCategoryCards] = useState<CategoryCardItem[]>(() => getStored('rg_cms_categories', INITIAL_CATEGORY_CARDS));
  const [quickButtons, setQuickButtons] = useState<QuickCategoryButtonItem[]>(() => getStored('rg_cms_quick_buttons', INITIAL_QUICK_BUTTONS));
  const [lookbookConfig, setLookbookConfig] = useState<LookbookConfig>(() => getStored('rg_cms_lookbooks', INITIAL_LOOKBOOK_CONFIG));
  const [siteFooterConfig, setSiteFooterConfig] = useState<SiteFooterConfig>(() => getStored('rg_cms_footer', INITIAL_SITE_FOOTER_CONFIG));

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rg_cms_products', JSON.stringify(products));
      localStorage.setItem('rg_cms_hero', JSON.stringify(heroConfig));
      localStorage.setItem('rg_cms_highlights', JSON.stringify(storyHighlights));
      localStorage.setItem('rg_cms_categories', JSON.stringify(categoryCards));
      localStorage.setItem('rg_cms_quick_buttons', JSON.stringify(quickButtons));
      localStorage.setItem('rg_cms_lookbooks', JSON.stringify(lookbookConfig));
      localStorage.setItem('rg_cms_footer', JSON.stringify(siteFooterConfig));
    } catch {
      // storage quota or private mode
    }
  }, [products, heroConfig, storyHighlights, categoryCards, quickButtons, lookbookConfig, siteFooterConfig]);

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
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(products[0] || PRODUCTS[0]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Products CRUD
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added to catalog.`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
    showToast(`Product updated successfully.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product removed.`);
  };

  // Cart Actions
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (ci) => ci.product.id === item.product.id && ci.selectedSize === item.selectedSize
      );
      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += item.quantity;
        return nextCart;
      }
      return [...prevCart, item];
    });
    showToast(`Added ${item.quantity} × "${item.product.name}" to bag`);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) => prev.filter((ci) => !(ci.product.id === productId && ci.selectedSize === selectedSize)));
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((ci) =>
        ci.product.id === productId && ci.selectedSize === selectedSize ? { ...ci, quantity } : ci
      )
    );
  };

  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalINR = cart.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from atelier wishlist');
        return prev.filter((id) => id !== productId);
      }
      showToast('Preserved to atelier wishlist');
      return [...prev, productId];
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Booking Action
  const createBooking = (booking: BookingDetails) => {
    const newBooking = { ...booking, id: `bk-${Date.now()}` };
    setActiveBooking(newBooking);
    setConfirmedBookings((prev) => [...prev, newBooking]);
    showToast(`Bespoke appointment reserved for ${booking.guestName}`);
  };

  // Filters Reset
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

  // Currency Converter
  const formatPrice = (amountINR: number): string => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    const converted = amountINR * rateInfo.rate;
    if (currency === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    } else if (currency === 'USD') {
      return `$${Math.round(converted).toLocaleString('en-US')}`;
    } else if (currency === 'GBP') {
      return `£${Math.round(converted).toLocaleString('en-GB')}`;
    } else if (currency === 'AED') {
      return `AED ${Math.round(converted).toLocaleString('en-AE')}`;
    }
    return `₹${amountINR.toLocaleString('en-IN')}`;
  };

  // =========================================================================
  // CMS MUTATOR FUNCTIONS
  // =========================================================================
  // 1. Hero
  const updateHeroConfig = (fields: Partial<HeroConfig>) => {
    setHeroConfig((prev) => ({ ...prev, ...fields }));
    showToast('Hero section updated live.');
  };

  // 2. Story Highlights
  const addStoryHighlight = (item: Omit<StoryHighlightItem, 'id'>) => {
    const newHighlight: StoryHighlightItem = {
      ...item,
      id: `highlight-${Date.now()}`
    };
    setStoryHighlights((prev) => [...prev, newHighlight]);
    showToast(`Highlight "${item.title}" added.`);
  };

  const updateStoryHighlight = (id: string, fields: Partial<StoryHighlightItem>) => {
    setStoryHighlights((prev) => prev.map((h) => (h.id === id ? { ...h, ...fields } : h)));
    showToast('Highlight updated.');
  };

  const deleteStoryHighlight = (id: string) => {
    setStoryHighlights((prev) => prev.filter((h) => h.id !== id));
    showToast('Highlight removed.');
  };

  // 3. Couture Categories
  const addCategoryCard = (card: Omit<CategoryCardItem, 'id'>) => {
    const newCard: CategoryCardItem = {
      ...card,
      id: `cat-card-${Date.now()}`
    };
    setCategoryCards((prev) => [...prev, newCard]);
    showToast(`Category card "${card.title}" created.`);
  };

  const updateCategoryCard = (id: string, fields: Partial<CategoryCardItem>) => {
    setCategoryCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...fields } : c)));
    showToast('Category card updated.');
  };

  const deleteCategoryCard = (id: string) => {
    setCategoryCards((prev) => prev.filter((c) => c.id !== id));
    showToast('Category card removed.');
  };

  const updateQuickButton = (id: string, fields: Partial<QuickCategoryButtonItem>) => {
    setQuickButtons((prev) => prev.map((b) => (b.id === id ? { ...b, ...fields } : b)));
    showToast('Quick button updated.');
  };

  // 4. Lookbooks
  const updateLookbookHeader = (eyebrow: string, sectionTitle: string, narrative: string) => {
    setLookbookConfig((prev) => ({ ...prev, eyebrow, sectionTitle, narrative }));
    showToast('Lookbook header updated.');
  };

  const updateLookbookHero = (fields: Partial<LookbookFeatureCard>) => {
    setLookbookConfig((prev) => ({
      ...prev,
      heroCard: { ...prev.heroCard, ...fields }
    }));
    showToast('Lookbook feature card updated.');
  };

  const addLookbookCard = (card: Omit<LookbookGridCard, 'id'>) => {
    const newCard: LookbookGridCard = {
      ...card,
      id: `lookbook-card-${Date.now()}`
    };
    setLookbookConfig((prev) => ({
      ...prev,
      cards: [...prev.cards, newCard]
    }));
    showToast(`Lookbook card "${card.title}" added.`);
  };

  const updateLookbookCard = (id: string, fields: Partial<LookbookGridCard>) => {
    setLookbookConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === id ? { ...c, ...fields } : c))
    }));
    showToast('Lookbook card updated.');
  };

  const deleteLookbookCard = (id: string) => {
    setLookbookConfig((prev) => ({
      ...prev,
      cards: prev.cards.filter((c) => c.id !== id)
    }));
    showToast('Lookbook card removed.');
  };

  // 5. Site Footer
  const updateSiteFooterConfig = (fields: Partial<SiteFooterConfig>) => {
    setSiteFooterConfig((prev) => ({ ...prev, ...fields }));
    showToast('Footer & brand info updated.');
  };

  // Safe Reset All CMS Data
  const resetAllCmsData = () => {
    setHeroConfig(INITIAL_HERO_CONFIG);
    setStoryHighlights(INITIAL_STORY_HIGHLIGHTS);
    setCategoryCards(INITIAL_CATEGORY_CARDS);
    setQuickButtons(INITIAL_QUICK_BUTTONS);
    setLookbookConfig(INITIAL_LOOKBOOK_CONFIG);
    setSiteFooterConfig(INITIAL_SITE_FOOTER_CONFIG);
    setProducts(PRODUCTS);
    localStorage.clear();
    showToast('All CMS sections restored to default atelier settings.');
  };

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
        products,
        addProduct,
        updateProduct,
        deleteProduct,
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
        showToast,
        heroConfig,
        updateHeroConfig,
        storyHighlights,
        addStoryHighlight,
        updateStoryHighlight,
        deleteStoryHighlight,
        categoryCards,
        addCategoryCard,
        updateCategoryCard,
        deleteCategoryCard,
        quickButtons,
        updateQuickButton,
        lookbookConfig,
        updateLookbookHeader,
        updateLookbookHero,
        addLookbookCard,
        updateLookbookCard,
        deleteLookbookCard,
        siteFooterConfig,
        updateSiteFooterConfig,
        resetAllCmsData
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
