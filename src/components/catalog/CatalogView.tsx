import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  RotateCcw, 
  Star, 
  ShoppingBag, 
  Scissors, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { PRODUCTS, PRICE_THRESHOLDS } from '../../data/storeData';

export const CatalogView: React.FC = () => {
  const {
    selectedCategory,
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
    sortBy,
    setSortBy,
    resetFilters,
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProduct,
    setCustomizerProduct,
    setIsCustomizerOpen,
    setCurrentView
  } = useStore();

  const occasions = ['All', 'Bridal Regalia', 'Sangeet & Mehendi', 'Festive Puja', 'Reception & Cocktail', 'Daily Elegance'];
  const crafts = ['All', 'Handcrafted Zardozi', 'Banarasi Brocade', 'Gota Patti', 'Mukaish Work', 'Karchobi', 'Resham Threadwork', 'Bandhani', 'Chikankari'];
  const fabrics = ['All', 'Pure Mulberry Silk', 'Banarasi Katan', 'Georgette', 'Organza Silk', 'Chanderi Silk', 'Micro-Velvet', 'Pure Chanderi Cotton'];

  // Filter products dynamically
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedOccasion !== 'All' && product.occasion !== selectedOccasion) return false;
    if (selectedCraft !== 'All' && product.craft !== selectedCraft) return false;
    if (selectedFabric !== 'All' && product.fabric !== selectedFabric) return false;
    if (onlySilkMark && !product.silkMarkCertified) return false;
    if (onlyReadyToShip && !product.dispatchTimeline.includes('Ready to Ship')) return false;

    if (selectedPriceTier !== 'All') {
      const tierConfig = PRICE_THRESHOLDS.find((t) => t.id === selectedPriceTier);
      if (tierConfig) {
        if (product.priceINR < tierConfig.min || product.priceINR > tierConfig.max) return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCraft = product.craft.toLowerCase().includes(q);
      const matchFabric = product.fabric.toLowerCase().includes(q);
      const matchTag = product.tagline.toLowerCase().includes(q);
      if (!matchName && !matchCraft && !matchFabric && !matchTag) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
    if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in space-y-8">
      {/* 1. Category Header & Banner */}
      <div className="bg-gradient-to-r from-[#5E1A2C] to-[#3B0E1B] text-white p-8 rounded-2xl border border-[#C5A059]/40 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-cinzel text-[#ECC480] tracking-widest uppercase">
            Curated Artisanal Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            {selectedCategory === 'All' ? 'Festive, Bridal & Ready-to-Wear Catalog' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Every weave is authenticated with Silk Mark laboratory certification and backed by 54 years of Old Delhi heritage tailoring.
          </p>
        </div>
      </div>

      {/* 2. Main Grid with Faceted Sticky Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Faceted Filter Drawer */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-xl border border-[#E8DFD8] shadow-sm space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#5E1A2C]" />
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1A1718]">
                Faceted Refinements
              </h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-[11px] text-gray-500 hover:text-[#5E1A2C] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>

          {/* Curated Price Thresholds */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider">
              Price Thresholds
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setSelectedPriceTier('All')}
                className={`text-xs py-1.5 px-2 rounded text-left transition-colors ${
                  selectedPriceTier === 'All' ? 'bg-[#5E1A2C] text-white font-medium' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Tiers
              </button>
              {PRICE_THRESHOLDS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedPriceTier(tier.id)}
                  className={`text-xs py-1.5 px-2 rounded text-left transition-colors ${
                    selectedPriceTier === tier.id ? 'bg-[#5E1A2C] text-white font-medium' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Facet */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider">
              Auspicious Occasion
            </h4>
            <div className="space-y-1">
              {occasions.map((occ) => (
                <label key={occ} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-[#5E1A2C]">
                  <input
                    type="radio"
                    name="occasion"
                    checked={selectedOccasion === occ}
                    onChange={() => setSelectedOccasion(occ)}
                    className="accent-[#5E1A2C]"
                  />
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Artisanal Craft Facet */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider">
              Artisanal Craft
            </h4>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {crafts.map((craft) => (
                <label key={craft} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-[#5E1A2C]">
                  <input
                    type="radio"
                    name="craft"
                    checked={selectedCraft === craft}
                    onChange={() => setSelectedCraft(craft)}
                    className="accent-[#5E1A2C]"
                  />
                  <span>{craft}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fabric Authenticity Facet */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider">
              Heirloom Fabric
            </h4>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {fabrics.map((fab) => (
                <label key={fab} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-[#5E1A2C]">
                  <input
                    type="radio"
                    name="fabric"
                    checked={selectedFabric === fab}
                    onChange={() => setSelectedFabric(fab)}
                    className="accent-[#5E1A2C]"
                  />
                  <span>{fab}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Quality Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <h4 className="font-serif font-bold text-xs text-[#5E1A2C] uppercase tracking-wider">
              Authentication & Speed
            </h4>
            <label className="flex items-center gap-2 text-xs text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlySilkMark}
                onChange={(e) => setOnlySilkMark(e.target.checked)}
                className="accent-[#5E1A2C] w-4 h-4 rounded"
              />
              <span className="font-semibold text-[#0F3A5D]">Silk Mark Certified Only</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyReadyToShip}
                onChange={(e) => setOnlyReadyToShip(e.target.checked)}
                className="accent-[#5E1A2C] w-4 h-4 rounded"
              />
              <span className="text-[#1B4D3E] font-medium">Ready to Ship (24-48 Hrs)</span>
            </label>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Sort & Results Counter Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#E8DFD8] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-gray-600">
              Showing <span className="font-bold text-[#5E1A2C]">{filteredProducts.length}</span> luxury creations
              {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-cinzel">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#FAF7F5] border border-[#E8DFD8] rounded px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="featured">Editorial Highlights</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Patron Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-[#E8DFD8] space-y-4">
              <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#5E1A2C]">No matching creations found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Try adjusting your selected craft, fabric, or price threshold to browse other pieces in our heritage archive.
              </p>
              <button
                onClick={resetFilters}
                className="gold-shimmer-btn px-6 py-2.5 rounded text-xs uppercase font-cinzel font-semibold"
              >
                Reset All Refinements
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-[#E8DFD8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-84 overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setCustomizerProduct(product);
                        setCurrentView('customizer');
                      }}
                    />

                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#5E1A2C] text-white text-[10px] font-cinzel font-semibold px-2.5 py-1 rounded-sm shadow">
                        {product.badge}
                      </span>
                    )}

                    {product.silkMarkCertified && (
                      <span className="absolute bottom-3 left-3 silk-mark-badge shadow">
                        Silk Mark
                      </span>
                    )}

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isWishlisted(product.id) ? 'bg-[#5E1A2C] text-white' : 'bg-white/80 text-gray-700 hover:text-[#5E1A2C]'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Star className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#C5A059] font-cinzel font-semibold">
                        <span>{product.craft}</span>
                        <span>•</span>
                        <span>{product.fabric}</span>
                      </div>
                      <h3
                        onClick={() => {
                          setSelectedProduct(product);
                          setCustomizerProduct(product);
                          setCurrentView('customizer');
                        }}
                        className="font-serif font-bold text-sm text-[#1A1718] mt-1 line-clamp-2 hover:text-[#5E1A2C] cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-1 font-light">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-[#5E1A2C]">
                            {formatPrice(product.priceINR)}
                          </span>
                          {product.originalPriceINR > product.priceINR && (
                            <span className="text-xs text-gray-400 line-through">
                              {formatPrice(product.originalPriceINR)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          {product.dispatchTimeline.includes('24-48') ? '24hr Dispatch' : 'Bespoke Fit'}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setCustomizerProduct(product);
                            setIsCustomizerOpen(true);
                          }}
                          className="px-2.5 py-2 text-[11px] font-cinzel font-semibold border border-[#C5A059] text-[#5E1A2C] hover:bg-[#C5A059]/10 rounded transition-colors flex items-center justify-center gap-1"
                        >
                          <Scissors className="w-3 h-3" /> Customise
                        </button>
                        <button
                          onClick={() => {
                            addToCart({ product, quantity: 1, selectedSize: product.sizes[0] });
                          }}
                          className="crimson-btn px-2.5 py-2 text-[11px] font-cinzel font-semibold rounded flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" /> Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
