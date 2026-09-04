import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ImageInsertField } from './ImageInsertField';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  Layers, 
  BookOpen, 
  ShoppingBag, 
  Globe, 
  X
} from 'lucide-react';
import type { 
  StoryHighlightItem, 
  CategoryCardItem, 
  LookbookGridCard 
} from '../../data/cmsInitialData';
import type { Product } from '../../data/storeData';

export const AdminStudio: React.FC = () => {
  const {
    setCurrentView,
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
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetAllCmsData
  } = useStore();

  const [activeTab, setActiveTab] = useState<'hero' | 'highlights' | 'categories' | 'lookbooks' | 'products' | 'site'>('hero');

  // Modals / form states
  const [editingHighlight, setEditingHighlight] = useState<StoryHighlightItem | null>(null);
  const [isAddingHighlight, setIsAddingHighlight] = useState(false);
  const [newHighlight, setNewHighlight] = useState<Omit<StoryHighlightItem, 'id'>>({
    emoji: '✨',
    title: '',
    subtitle: '',
    storyImage: '/images/lookbooks/style-edit-yellow.jpg',
    categoryKey: 'All',
    narrative: ''
  });

  const [editingCard, setEditingCard] = useState<CategoryCardItem | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState<Omit<CategoryCardItem, 'id'>>({
    tag: 'NEW COLLECTION',
    title: '',
    subtitle: '',
    ctaText: 'EXPLORE COLLECTION',
    categoryKey: 'All',
    image: '/images/categories/cat-sarees-drapes.jpg'
  });

  const [editingLookbookCard, setEditingLookbookCard] = useState<LookbookGridCard | null>(null);
  const [isAddingLookbookCard, setIsAddingLookbookCard] = useState(false);
  const [newLookbookCard, setNewLookbookCard] = useState<Omit<LookbookGridCard, 'id'>>({
    badge: 'CURATED EDIT',
    tagline: 'HANDCRAFTED LUXURY',
    title: '',
    description: '',
    image: '/images/lookbooks/purple-saree-drapes.jpg',
    ctaText: 'EXPLORE SANCTUARY',
    categoryKey: 'Sarees'
  });

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Sarees',
    occasion: 'Bridal Regalia',
    craft: 'Banarasi Brocade',
    fabric: 'Pure Mulberry Silk',
    priceINR: 18500,
    originalPriceINR: 24000,
    badge: 'New Arrival',
    silkMarkCertified: true,
    description: '',
    images: ['/images/categories/cat-sarees-drapes.jpg'],
    colors: [{ name: 'Royal Crimson', hex: '#5E1A2C' }],
    sizes: ['Free Size']
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1718] pt-28 pb-20 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Top Studio Header & Switcher */}
        <div className="bg-white border border-[#EBE3D7] p-6 sm:p-8 rounded shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-[#997332]" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#997332]">
                ATELIER CONTENT MANAGEMENT STUDIO
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3b080a] font-normal">
              Storefront CMS &amp; Section Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#6E645E] font-light">
              Real-time CRUD management for Hero, Story Highlights, Couture Categories, Lookbooks, Products &amp; Footer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#3b080a] hover:bg-[#520d16] text-white text-xs uppercase font-sans font-semibold tracking-wider transition-colors shadow cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Live Storefront</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all CMS content to default atelier state?')) {
                  resetAllCmsData();
                }
              }}
              className="inline-flex items-center space-x-2 px-4 py-2.5 border border-[#3b080a]/30 hover:border-[#3b080a] text-[#3b080a] hover:bg-stone-50 text-xs uppercase font-sans font-semibold tracking-wider transition-colors cursor-pointer"
              title="Reset all sections back to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar border-b border-[#EBE3D7] pb-1">
          {[
            { id: 'hero', label: '1. Hero Showcase', icon: Sparkles },
            { id: 'highlights', label: '2. Story Highlights', icon: Layers },
            { id: 'categories', label: '3. Couture Categories', icon: ShoppingBag },
            { id: 'lookbooks', label: '4. Editorial Lookbooks', icon: BookOpen },
            { id: 'products', label: '5. Products Catalog', icon: ShoppingBag },
            { id: 'site', label: '6. Site & Footer', icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#3b080a] text-[#3b080a] bg-white shadow-sm'
                    : 'border-transparent text-[#6E645E] hover:text-[#3b080a] hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#997332]' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            TAB 1: HERO SHOWCASE CMS
           ===================================================================== */}
        {activeTab === 'hero' && (
          <div className="bg-white border border-[#EBE3D7] p-6 sm:p-10 rounded shadow-sm space-y-8 animate-fade-in text-left">
            <div className="flex items-center justify-between border-b border-[#EBE3D7] pb-4">
              <div>
                <h3 className="font-serif text-2xl text-[#3b080a]">Hero Showcase Configuration</h3>
                <p className="text-xs text-[#6E645E] font-light mt-0.5">
                  Customize the main entrance banner, headline typography, and model showcase imagery.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Headlines & Text */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1.5">
                    Collection Eyebrow Tag
                  </label>
                  <input
                    type="text"
                    value={heroConfig.collectionTag}
                    onChange={(e) => updateHeroConfig({ collectionTag: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded focus:outline-none focus:border-[#997332] bg-[#FAF7F2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1.5">
                      Main Headline (Black)
                    </label>
                    <input
                      type="text"
                      value={heroConfig.headlineMain}
                      onChange={(e) => updateHeroConfig({ headlineMain: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded focus:outline-none focus:border-[#997332] bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1.5">
                      Accent Words (Gold Italic)
                    </label>
                    <input
                      type="text"
                      value={heroConfig.headlineAccent}
                      onChange={(e) => updateHeroConfig({ headlineAccent: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded focus:outline-none focus:border-[#997332] bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1.5">
                    Narrative Story Description
                  </label>
                  <textarea
                    rows={3}
                    value={heroConfig.bodyDescription}
                    onChange={(e) => updateHeroConfig({ bodyDescription: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded focus:outline-none focus:border-[#997332] bg-[#FAF7F2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1.5">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={heroConfig.primaryCtaText}
                      onChange={(e) => updateHeroConfig({ primaryCtaText: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded focus:outline-none focus:border-[#997332] bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1.5">
                      Secondary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={heroConfig.secondaryCtaText}
                      onChange={(e) => updateHeroConfig({ secondaryCtaText: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded focus:outline-none focus:border-[#997332] bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                {/* Floating Tags Controls */}
                <div className="p-4 bg-[#FAF7F2] border border-[#EBE3D7] rounded space-y-3">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#997332]">
                    Floating Look Tag on Model
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Look Title"
                      value={heroConfig.floatingLookTitle}
                      onChange={(e) => updateHeroConfig({ floatingLookTitle: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Ensemble Name"
                      value={heroConfig.floatingEnsembleName}
                      onChange={(e) => updateHeroConfig({ floatingEnsembleName: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Imagery & Mastercraft Inset */}
              <div className="space-y-6">
                {/* Multi-Image Auto Carousel Manager */}
                <div className="p-4 bg-[#FAF7F2] border border-[#EBE3D7] rounded space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a]">
                        Hero Showcase Images (Auto Cross-Fade Carousel)
                      </span>
                      <p className="text-[11px] text-[#6E645E] font-light mt-0.5">
                        Add multiple images to enable smooth auto-changing transitions on the storefront.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentList = heroConfig.modelImages && heroConfig.modelImages.length > 0
                          ? [...heroConfig.modelImages]
                          : [heroConfig.modelImage];
                        const updated = [...currentList, '/images/categories/cat-lehenga-choli.jpg'];
                        updateHeroConfig({ modelImages: updated, modelImage: updated[0] });
                      }}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#3b080a] text-white text-[11px] uppercase font-semibold tracking-wider rounded shadow-sm hover:bg-[#520d16] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Slide</span>
                    </button>
                  </div>

                  {/* Auto Change Speed Selector */}
                  <div className="flex items-center justify-between pt-2 pb-1 border-t border-[#EBE3D7]">
                    <span className="text-[11px] font-sans text-[#3b080a] font-medium">
                      Auto-Change Interval:
                    </span>
                    <select
                      value={heroConfig.autoSlideInterval || 4000}
                      onChange={(e) => updateHeroConfig({ autoSlideInterval: Number(e.target.value) })}
                      className="text-xs px-2.5 py-1.5 border border-[#EBE3D7] rounded bg-white font-medium text-[#3b080a] focus:outline-none focus:border-[#997332]"
                    >
                      <option value={2500}>Fast (2.5 seconds)</option>
                      <option value={4000}>Normal Smooth (4 seconds)</option>
                      <option value={6000}>Slow (6 seconds)</option>
                      <option value={8000}>Very Slow (8 seconds)</option>
                    </select>
                  </div>

                  {/* List of active slides */}
                  <div className="space-y-3 pt-2">
                    {((heroConfig.modelImages && heroConfig.modelImages.length > 0)
                      ? heroConfig.modelImages
                      : [heroConfig.modelImage]
                    ).map((imgUrl, index) => (
                      <div key={index} className="p-3 bg-white border border-[#EBE3D7] rounded shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-[#997332] uppercase tracking-wider">
                            Slide {index + 1}
                          </span>
                          {((heroConfig.modelImages && heroConfig.modelImages.length > 1) || false) && (
                            <button
                              type="button"
                              onClick={() => {
                                const currentList = [...(heroConfig.modelImages || [])];
                                currentList.splice(index, 1);
                                updateHeroConfig({ modelImages: currentList, modelImage: currentList[0] || '' });
                              }}
                              className="text-stone-400 hover:text-red-700 transition-colors p-1"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <ImageInsertField
                          label={`Slide ${index + 1} Media (Photo or Video)`}
                          value={imgUrl}
                          allowVideo={true}
                          onChange={(newUrl) => {
                            const currentList = heroConfig.modelImages && heroConfig.modelImages.length > 0
                              ? [...heroConfig.modelImages]
                              : [heroConfig.modelImage];
                            currentList[index] = newUrl;
                            updateHeroConfig({ 
                              modelImages: currentList,
                              modelImage: index === 0 ? newUrl : heroConfig.modelImage 
                            });
                          }}
                          helperText="Upload photos or videos (MP4, WebM) — auto-compressed and optimized for smooth web playback."
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inset Detail Embroidery Card */}
                <div className="p-4 bg-[#FAF7F2] border border-[#EBE3D7] rounded space-y-4">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#997332]">
                    Atelier Mastercraft Inset Detail Card
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Inset Badge"
                      value={heroConfig.insetBadge}
                      onChange={(e) => updateHeroConfig({ insetBadge: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Inset Title"
                      value={heroConfig.insetTitle}
                      onChange={(e) => updateHeroConfig({ insetTitle: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Inset Craft Description"
                    value={heroConfig.insetDescription}
                    onChange={(e) => updateHeroConfig({ insetDescription: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
                  />
                  <ImageInsertField
                    label="Inset Thumbnail Photo"
                    value={heroConfig.insetImage}
                    onChange={(url) => updateHeroConfig({ insetImage: url })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: STORY HIGHLIGHTS CMS
           ===================================================================== */}
        {activeTab === 'highlights' && (
          <div className="bg-white border border-[#EBE3D7] p-6 sm:p-10 rounded shadow-sm space-y-8 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE3D7] pb-4">
              <div>
                <h3 className="font-serif text-2xl text-[#3b080a]">Atelier Story Highlights</h3>
                <p className="text-xs text-[#6E645E] font-light mt-0.5">
                  Manage the circular Instagram-style story bubbles, emojis, modal backstories, and photos.
                </p>
              </div>

              <button
                onClick={() => setIsAddingHighlight(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#3b080a] text-white text-xs uppercase font-sans font-semibold tracking-wider rounded shadow hover:bg-[#520d16] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Story Bubble</span>
              </button>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {storyHighlights.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 bg-[#FAF7F2] border border-[#EBE3D7] rounded flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-14 h-14 rounded-full bg-white border border-[#997332]/40 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                      {item.emoji}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-serif text-lg font-bold text-[#3b080a] leading-tight truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[#997332] font-semibold uppercase tracking-wider block truncate">
                        {item.subtitle}
                      </span>
                      <p className="text-[11px] text-[#6E645E] font-light line-clamp-2 mt-1">
                        {item.narrative}
                      </p>
                    </div>
                  </div>

                  <div className="relative aspect-video w-full rounded overflow-hidden border border-[#EBE3D7]">
                    <img src={item.storyImage} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#EBE3D7]">
                    <button
                      onClick={() => setEditingHighlight(item)}
                      className="p-1.5 text-[#3b080a] hover:text-[#997332] hover:bg-white rounded transition-colors cursor-pointer"
                      title="Edit Highlight"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete story highlight "${item.title}"?`)) {
                          deleteStoryHighlight(item.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-white rounded transition-colors cursor-pointer"
                      title="Delete Highlight"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add or Edit Highlight */}
            {(isAddingHighlight || editingHighlight) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white border border-[#EBE3D7] rounded shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#EBE3D7] pb-3">
                    <h4 className="font-serif text-xl text-[#3b080a]">
                      {editingHighlight ? 'Edit Story Highlight' : 'Add New Story Highlight'}
                    </h4>
                    <button 
                      onClick={() => { setIsAddingHighlight(false); setEditingHighlight(null); }}
                      className="p-1 text-stone-400 hover:text-[#3b080a]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {(() => {
                    const current = editingHighlight || newHighlight;
                    const updateField = (key: keyof StoryHighlightItem, val: any) => {
                      if (editingHighlight) {
                        setEditingHighlight({ ...editingHighlight, [key]: val });
                      } else {
                        setNewHighlight({ ...newHighlight, [key]: val });
                      }
                    };

                    return (
                      <div className="space-y-4 text-left">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              Emoji Icon
                            </label>
                            <input
                              type="text"
                              value={current.emoji}
                              onChange={(e) => updateField('emoji', e.target.value)}
                              className="w-full text-center text-xl px-2 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              Title Under Bubble
                            </label>
                            <input
                              type="text"
                              value={current.title}
                              onChange={(e) => updateField('title', e.target.value)}
                              placeholder="e.g. Sarees"
                              className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                            Subtitle Tagline
                          </label>
                          <input
                            type="text"
                            value={current.subtitle}
                            onChange={(e) => updateField('subtitle', e.target.value)}
                            placeholder="e.g. Pure Handlooms"
                            className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                            Modal Backstory Narrative
                          </label>
                          <textarea
                            rows={3}
                            value={current.narrative}
                            onChange={(e) => updateField('narrative', e.target.value)}
                            placeholder="Story narrative shown when modal opens..."
                            className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                          />
                        </div>

                        <ImageInsertField
                          label="Featured Story Photo"
                          value={current.storyImage}
                          onChange={(url) => updateField('storyImage', url)}
                        />

                        <div className="flex justify-end space-x-3 pt-3 border-t border-[#EBE3D7]">
                          <button
                            onClick={() => { setIsAddingHighlight(false); setEditingHighlight(null); }}
                            className="px-4 py-2 border border-stone-300 text-xs text-stone-600 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (editingHighlight) {
                                updateStoryHighlight(editingHighlight.id, editingHighlight);
                                setEditingHighlight(null);
                              } else {
                                addStoryHighlight(newHighlight);
                                setIsAddingHighlight(false);
                                setNewHighlight({
                                  emoji: '✨',
                                  title: '',
                                  subtitle: '',
                                  storyImage: '/images/lookbooks/style-edit-yellow.jpg',
                                  categoryKey: 'All',
                                  narrative: ''
                                });
                              }
                            }}
                            className="px-5 py-2 bg-[#3b080a] hover:bg-[#520d16] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                          >
                            Save Highlight
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 3: COUTURE CATEGORIES CMS
           ===================================================================== */}
        {activeTab === 'categories' && (
          <div className="bg-white border border-[#EBE3D7] p-6 sm:p-10 rounded shadow-sm space-y-8 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE3D7] pb-4">
              <div>
                <h3 className="font-serif text-2xl text-[#3b080a]">Shop By Couture Categories</h3>
                <p className="text-xs text-[#6E645E] font-light mt-0.5">
                  CRUD operations for the 4 featured cards and 4 quick-access category buttons.
                </p>
              </div>

              <button
                onClick={() => setIsAddingCard(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#3b080a] text-white text-xs uppercase font-sans font-semibold tracking-wider rounded shadow hover:bg-[#520d16] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category Card</span>
              </button>
            </div>

            {/* Category Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryCards.map((card) => (
                <div key={card.id} className="border border-[#EBE3D7] rounded overflow-hidden flex flex-col justify-between bg-white shadow-sm group">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-900">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[9px] uppercase tracking-widest text-[#F3E5AB] font-semibold block">
                        {card.tag}
                      </span>
                      <h4 className="font-serif text-xl font-normal leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-stone-300 font-light truncate mt-0.5">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] border-t border-[#EBE3D7] flex items-center justify-between">
                    <span className="text-[10px] text-[#997332] font-semibold uppercase tracking-wider truncate max-w-[120px]">
                      {card.ctaText}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingCard(card)}
                        className="p-1 text-[#3b080a] hover:text-[#997332] cursor-pointer"
                        title="Edit Card"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category card "${card.title}"?`)) {
                            deleteCategoryCard(card.id);
                          }
                        }}
                        className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons Management */}
            <div className="pt-6 border-t border-[#EBE3D7] space-y-4">
              <h4 className="font-serif text-xl text-[#3b080a]">Bottom Quick Buttons</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickButtons.map((btn) => (
                  <div key={btn.id} className="p-3 bg-[#FAF7F2] border border-[#EBE3D7] rounded space-y-2">
                    <span className="text-[10px] text-[#997332] uppercase font-semibold">Icon: {btn.iconType}</span>
                    <input
                      type="text"
                      value={btn.title}
                      onChange={(e) => updateQuickButton(btn.id, { title: e.target.value })}
                      className="w-full text-xs font-semibold uppercase px-2 py-1.5 border border-[#EBE3D7] rounded bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add or Edit Category Card */}
            {(isAddingCard || editingCard) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white border border-[#EBE3D7] rounded shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#EBE3D7] pb-3">
                    <h4 className="font-serif text-xl text-[#3b080a]">
                      {editingCard ? 'Edit Category Card' : 'Add New Category Card'}
                    </h4>
                    <button 
                      onClick={() => { setIsAddingCard(false); setEditingCard(null); }}
                      className="p-1 text-stone-400 hover:text-[#3b080a]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {(() => {
                    const current = editingCard || newCard;
                    const updateField = (key: keyof CategoryCardItem, val: any) => {
                      if (editingCard) {
                        setEditingCard({ ...editingCard, [key]: val });
                      } else {
                        setNewCard({ ...newCard, [key]: val });
                      }
                    };

                    return (
                      <div className="space-y-4 text-left">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              Eyebrow Badge Tag
                            </label>
                            <input
                              type="text"
                              value={current.tag}
                              onChange={(e) => updateField('tag', e.target.value)}
                              placeholder="e.g. PURE HANDLOOMS"
                              className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              Category Key Filter
                            </label>
                            <input
                              type="text"
                              value={current.categoryKey}
                              onChange={(e) => updateField('categoryKey', e.target.value)}
                              placeholder="e.g. Sarees"
                              className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                            Card Headline Title
                          </label>
                          <input
                            type="text"
                            value={current.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            placeholder="e.g. Sarees & Drapes"
                            className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                            Subtitle Description
                          </label>
                          <input
                            type="text"
                            value={current.subtitle}
                            onChange={(e) => updateField('subtitle', e.target.value)}
                            placeholder="e.g. Banarasi, Kanjeevaram & Organza"
                            className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                            CTA Link Text
                          </label>
                          <input
                            type="text"
                            value={current.ctaText}
                            onChange={(e) => updateField('ctaText', e.target.value)}
                            placeholder="e.g. EXPLORE 1,200+ SAREES"
                            className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                          />
                        </div>

                        <ImageInsertField
                          label="Featured Category Photo"
                          value={current.image}
                          onChange={(url) => updateField('image', url)}
                        />

                        <div className="flex justify-end space-x-3 pt-3 border-t border-[#EBE3D7]">
                          <button
                            onClick={() => { setIsAddingCard(false); setEditingCard(null); }}
                            className="px-4 py-2 border border-stone-300 text-xs text-stone-600 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (editingCard) {
                                updateCategoryCard(editingCard.id, editingCard);
                                setEditingCard(null);
                              } else {
                                addCategoryCard(newCard);
                                setIsAddingCard(false);
                                setNewCard({
                                  tag: 'NEW COLLECTION',
                                  title: '',
                                  subtitle: '',
                                  ctaText: 'EXPLORE COLLECTION',
                                  categoryKey: 'All',
                                  image: '/images/categories/cat-sarees-drapes.jpg'
                                });
                              }
                            }}
                            className="px-5 py-2 bg-[#3b080a] hover:bg-[#520d16] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                          >
                            Save Card
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 4: EDITORIAL LOOKBOOKS CMS
           ===================================================================== */}
        {activeTab === 'lookbooks' && (
          <div className="bg-white border border-[#EBE3D7] p-6 sm:p-10 rounded shadow-sm space-y-8 animate-fade-in text-left">
            <div className="border-b border-[#EBE3D7] pb-4">
              <h3 className="font-serif text-2xl text-[#3b080a]">The Lookbooks: Curated Editorial Edits</h3>
              <p className="text-xs text-[#6E645E] font-light mt-0.5">
                Manage the top wide Style Edit showcase and the secondary lookbook cards.
              </p>
            </div>

            {/* Section Header Editor */}
            <div className="p-4 bg-[#FAF7F2] border border-[#EBE3D7] rounded space-y-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#997332]">
                Lookbook Section Header
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Section Eyebrow"
                  value={lookbookConfig.eyebrow}
                  onChange={(e) => updateLookbookHeader(e.target.value, lookbookConfig.sectionTitle, lookbookConfig.narrative)}
                  className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Main Title"
                  value={lookbookConfig.sectionTitle}
                  onChange={(e) => updateLookbookHeader(lookbookConfig.eyebrow, e.target.value, lookbookConfig.narrative)}
                  className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Narrative summary"
                value={lookbookConfig.narrative}
                onChange={(e) => updateLookbookHeader(lookbookConfig.eyebrow, lookbookConfig.sectionTitle, e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-white"
              />
            </div>

            {/* Top Feature Card (Style Edit) */}
            <div className="border border-[#EBE3D7] rounded p-5 space-y-5 bg-white shadow-sm">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#997332]">
                Top Feature Showcase Card (Style Edit)
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Vol Badge"
                      value={lookbookConfig.heroCard.volBadge}
                      onChange={(e) => updateLookbookHero({ volBadge: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                    />
                    <input
                      type="text"
                      placeholder="Tagline"
                      value={lookbookConfig.heroCard.tagline}
                      onChange={(e) => updateLookbookHero({ tagline: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Headline Title"
                    value={lookbookConfig.heroCard.title}
                    onChange={(e) => updateLookbookHero({ title: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                  <textarea
                    rows={3}
                    placeholder="Description text"
                    value={lookbookConfig.heroCard.description}
                    onChange={(e) => updateLookbookHero({ description: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={lookbookConfig.heroCard.buttonText}
                      onChange={(e) => updateLookbookHero({ buttonText: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                    />
                    <input
                      type="text"
                      placeholder="Price Subtitle"
                      value={lookbookConfig.heroCard.priceText}
                      onChange={(e) => updateLookbookHero({ priceText: e.target.value })}
                      className="text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <ImageInsertField
                    label="Style Edit Image Visual"
                    value={lookbookConfig.heroCard.image}
                    onChange={(url) => updateLookbookHero({ image: url })}
                  />
                </div>
              </div>
            </div>

            {/* Lookbook Grid Cards */}
            <div className="space-y-4 pt-4 border-t border-[#EBE3D7]">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl text-[#3b080a]">Lookbook Grid Cards</h4>
                <button
                  onClick={() => setIsAddingLookbookCard(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#3b080a] text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lookbook Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {lookbookConfig.cards.map((card) => (
                  <div key={card.id} className="border border-[#EBE3D7] rounded p-4 bg-[#FAF7F2] space-y-3">
                    <div className="relative aspect-[16/10] rounded overflow-hidden">
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#997332] font-semibold uppercase">{card.tagline}</span>
                      <h4 className="font-serif text-lg text-[#3b080a] font-normal leading-snug">{card.title}</h4>
                      <p className="text-[11px] text-[#6E645E] font-light line-clamp-2">{card.description}</p>
                    </div>
                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#EBE3D7]">
                      <button
                        onClick={() => setEditingLookbookCard(card)}
                        className="p-1 text-[#3b080a] hover:text-[#997332] cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete lookbook card "${card.title}"?`)) {
                            deleteLookbookCard(card.id);
                          }
                        }}
                        className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add or Edit Lookbook Card */}
            {(isAddingLookbookCard || editingLookbookCard) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white border border-[#EBE3D7] rounded shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#EBE3D7] pb-3">
                    <h4 className="font-serif text-xl text-[#3b080a]">
                      {editingLookbookCard ? 'Edit Lookbook Card' : 'Add Lookbook Card'}
                    </h4>
                    <button 
                      onClick={() => { setIsAddingLookbookCard(false); setEditingLookbookCard(null); }}
                      className="p-1 text-stone-400 hover:text-[#3b080a]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {(() => {
                    const current = editingLookbookCard || newLookbookCard;
                    const updateField = (key: keyof LookbookGridCard, val: any) => {
                      if (editingLookbookCard) {
                        setEditingLookbookCard({ ...editingLookbookCard, [key]: val });
                      } else {
                        setNewLookbookCard({ ...newLookbookCard, [key]: val });
                      }
                    };

                    return (
                      <div className="space-y-4 text-left">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              Image Badge
                            </label>
                            <input
                              type="text"
                              value={current.badge}
                              onChange={(e) => updateField('badge', e.target.value)}
                              placeholder="e.g. CURATED DRAPES"
                              className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              Tagline
                            </label>
                            <input
                              type="text"
                              value={current.tagline}
                              onChange={(e) => updateField('tagline', e.target.value)}
                              placeholder="e.g. PURE SILK MARK"
                              className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                            Card Title
                          </label>
                          <input
                            type="text"
                            value={current.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            placeholder="e.g. Saree Edit: Drapes For Every Occasion"
                            className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={current.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            placeholder="Description..."
                            className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              CTA Text
                            </label>
                            <input
                              type="text"
                              value={current.ctaText}
                              onChange={(e) => updateField('ctaText', e.target.value)}
                              placeholder="e.g. EXPLORE SAREE SANCTUARY"
                              className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#3b080a] mb-1">
                              Category Key
                            </label>
                            <input
                              type="text"
                              value={current.categoryKey}
                              onChange={(e) => updateField('categoryKey', e.target.value)}
                              placeholder="e.g. Sarees"
                              className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                            />
                          </div>
                        </div>

                        <ImageInsertField
                          label="Lookbook Card Image"
                          value={current.image}
                          onChange={(url) => updateField('image', url)}
                        />

                        <div className="flex justify-end space-x-3 pt-3 border-t border-[#EBE3D7]">
                          <button
                            onClick={() => { setIsAddingLookbookCard(false); setEditingLookbookCard(null); }}
                            className="px-4 py-2 border border-stone-300 text-xs text-stone-600 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (editingLookbookCard) {
                                updateLookbookCard(editingLookbookCard.id, editingLookbookCard);
                                setEditingLookbookCard(null);
                              } else {
                                addLookbookCard(newLookbookCard);
                                setIsAddingLookbookCard(false);
                                setNewLookbookCard({
                                  badge: 'CURATED EDIT',
                                  tagline: 'HANDCRAFTED LUXURY',
                                  title: '',
                                  description: '',
                                  image: '/images/lookbooks/purple-saree-drapes.jpg',
                                  ctaText: 'EXPLORE SANCTUARY',
                                  categoryKey: 'Sarees'
                                });
                              }
                            }}
                            className="px-5 py-2 bg-[#3b080a] hover:bg-[#520d16] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                          >
                            Save Lookbook Card
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 5: PRODUCTS CATALOG CMS
           ===================================================================== */}
        {activeTab === 'products' && (
          <div className="bg-white border border-[#EBE3D7] p-6 sm:p-10 rounded shadow-sm space-y-8 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE3D7] pb-4">
              <div>
                <h3 className="font-serif text-2xl text-[#3b080a]">Couture Products Catalog</h3>
                <p className="text-xs text-[#6E645E] font-light mt-0.5">
                  Full CRUD: Add new royal ensembles, update pricing, images, fabrics, and inventory.
                </p>
              </div>

              <button
                onClick={() => setIsAddingProduct(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#3b080a] text-white text-xs uppercase font-sans font-semibold tracking-wider rounded shadow hover:bg-[#520d16] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table/List */}
            <div className="divide-y divide-[#EBE3D7] border border-[#EBE3D7] rounded overflow-hidden">
              {products.map((prod) => (
                <div key={prod.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-[#FAF7F2] transition-colors">
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className="w-16 h-20 rounded border border-[#EBE3D7] overflow-hidden bg-stone-100 shrink-0">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] uppercase font-semibold text-[#997332] tracking-wider block">
                        {prod.category} • {prod.fabric}
                      </span>
                      <h4 className="font-serif text-lg font-normal text-[#3b080a] leading-snug truncate">
                        {prod.name}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-semibold text-[#3b080a]">₹{prod.priceINR.toLocaleString('en-IN')}</span>
                        {prod.originalPriceINR > prod.priceINR && (
                          <span className="line-through text-stone-400 text-[11px]">₹{prod.originalPriceINR.toLocaleString('en-IN')}</span>
                        )}
                        {prod.silkMarkCertified && (
                          <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                            Silk Mark
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => {
                        const newPrice = prompt(`Enter new price in INR for "${prod.name}":`, prod.priceINR.toString());
                        if (newPrice && !isNaN(Number(newPrice))) {
                          updateProduct(prod.id, { priceINR: Number(newPrice) });
                        }
                      }}
                      className="px-3 py-1.5 border border-[#3b080a]/30 text-[#3b080a] hover:bg-white text-xs font-semibold rounded cursor-pointer"
                    >
                      Quick Price
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete product "${prod.name}"?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add New Product */}
            {isAddingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white border border-[#EBE3D7] rounded shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-left">
                  <div className="flex items-center justify-between border-b border-[#EBE3D7] pb-3">
                    <h4 className="font-serif text-xl text-[#3b080a]">Add New Product</h4>
                    <button onClick={() => setIsAddingProduct(false)} className="text-stone-400 hover:text-[#3b080a]">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#3b080a] mb-1">Product Title</label>
                      <input
                        type="text"
                        value={newProduct.name || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. Royal Rani Silk Lehenga"
                        className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#3b080a] mb-1">Category</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                          className="w-full text-xs px-2 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                        >
                          <option value="Sarees">Sarees</option>
                          <option value="Lehengas">Lehengas</option>
                          <option value="Suits">Suits</option>
                          <option value="Dress Materials">Dress Materials</option>
                          <option value="Bridal Regalia">Bridal Regalia</option>
                          <option value="Ready to Wear">Ready to Wear</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#3b080a] mb-1">Price (INR ₹)</label>
                        <input
                          type="number"
                          value={newProduct.priceINR || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, priceINR: Number(e.target.value) })}
                          placeholder="24500"
                          className="w-full text-xs px-3 py-2 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                        />
                      </div>
                    </div>

                    <ImageInsertField
                      label="Primary Product Photo"
                      value={newProduct.images?.[0] || ''}
                      onChange={(url) => setNewProduct({ ...newProduct, images: [url] })}
                    />

                    <div className="flex justify-end space-x-3 pt-3 border-t border-[#EBE3D7]">
                      <button
                        onClick={() => setIsAddingProduct(false)}
                        className="px-4 py-2 border border-stone-300 text-xs text-stone-600 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!newProduct.name) return;
                          const created: Product = {
                            id: `prod-${Date.now()}`,
                            sku: `RG-${Date.now().toString().slice(-6)}`,
                            name: newProduct.name || 'New Atelier Piece',
                            tagline: 'Handcrafted Heritage',
                            category: newProduct.category || 'Sarees',
                            occasion: newProduct.occasion || 'Bridal Regalia',
                            craft: newProduct.craft || 'Banarasi Brocade',
                            fabric: newProduct.fabric || 'Pure Mulberry Silk',
                            priceINR: newProduct.priceINR || 19999,
                            originalPriceINR: newProduct.priceINR ? newProduct.priceINR * 1.2 : 24999,
                            silkMarkCertified: !!newProduct.silkMarkCertified,
                            dispatchTimeline: 'Ready to Ship (24-48 Hours)',
                            rating: 4.95,
                            reviewsCount: 1,
                            images: newProduct.images || ['/images/categories/cat-sarees-drapes.jpg'],
                            colors: [{ name: 'Royal Crimson', hex: '#5E1A2C' }],
                            sizes: ['Free Size'],
                            description: 'Exquisite artisan craftsmanship directly from the atelier.',
                            craftDetails: 'Handcrafted with traditional weaving techniques.',
                            careInstructions: 'Dry clean only.',
                            inStock: true,
                            curatedTier: '2499+'
                          };
                          addProduct(created);
                          setIsAddingProduct(false);
                        }}
                        className="px-5 py-2 bg-[#3b080a] hover:bg-[#520d16] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                      >
                        Add To Catalog
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 6: SITE SETTINGS & FOOTER CMS
           ===================================================================== */}
        {activeTab === 'site' && (
          <div className="bg-white border border-[#EBE3D7] p-6 sm:p-10 rounded shadow-sm space-y-8 animate-fade-in text-left">
            <div className="border-b border-[#EBE3D7] pb-4">
              <h3 className="font-serif text-2xl text-[#3b080a]">Site Branding &amp; Footer Settings</h3>
              <p className="text-xs text-[#6E645E] font-light mt-0.5">
                Update brand identity, Instagram handle (@rangriti_vastrra), hotline, and legal disclosures.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={siteFooterConfig.brandName}
                    onChange={(e) => updateSiteFooterConfig({ brandName: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={siteFooterConfig.brandTagline}
                    onChange={(e) => updateSiteFooterConfig({ brandTagline: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1">
                    Brand Narrative Description
                  </label>
                  <textarea
                    rows={4}
                    value={siteFooterConfig.brandDescription}
                    onChange={(e) => updateSiteFooterConfig({ brandDescription: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={siteFooterConfig.instagramHandle}
                    onChange={(e) => updateSiteFooterConfig({ instagramHandle: e.target.value })}
                    placeholder="@rangriti_vastrra"
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1">
                    Instagram Profile Link
                  </label>
                  <input
                    type="text"
                    value={siteFooterConfig.instagramUrl}
                    onChange={(e) => updateSiteFooterConfig({ instagramUrl: e.target.value })}
                    placeholder="https://www.instagram.com/rangriti_vastrra/?hl=en"
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1">
                    VIP Concierge Phone Hotline
                  </label>
                  <input
                    type="text"
                    value={siteFooterConfig.conciergePhone}
                    onChange={(e) => updateSiteFooterConfig({ conciergePhone: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b080a] mb-1">
                    Copyright &amp; Security Disclosure
                  </label>
                  <input
                    type="text"
                    value={siteFooterConfig.copyrightText}
                    onChange={(e) => updateSiteFooterConfig({ copyrightText: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-[#EBE3D7] rounded bg-[#FAF7F2]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
