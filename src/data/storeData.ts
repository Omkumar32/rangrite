export interface Product {
  id: string;
  sku: string;
  name: string;
  tagline: string;
  category: 'Sarees' | 'Lehengas' | 'Suits' | 'Dress Materials' | 'Bridal Regalia' | 'Ready to Wear';
  occasion: 'Bridal Regalia' | 'Sangeet & Mehendi' | 'Festive Puja' | 'Reception & Cocktail' | 'Daily Elegance';
  craft: 'Handcrafted Zardozi' | 'Gota Patti' | 'Mukaish Work' | 'Karchobi' | 'Resham Threadwork' | 'Banarasi Brocade' | 'Bandhani' | 'Chikankari';
  fabric: 'Pure Mulberry Silk' | 'Organza Silk' | 'Banarasi Katan' | 'Chanderi Silk' | 'Georgette' | 'Micro-Velvet' | 'Pure Chanderi Cotton';
  priceINR: number;
  originalPriceINR: number;
  badge?: string;
  silkMarkCertified: boolean;
  dispatchTimeline: 'Ready to Ship (24-48 Hours)' | 'Bespoke Made-to-Order (14-21 Days)';
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  craftDetails: string;
  careInstructions: string;
  inStock: boolean;
  curatedTier: '799' | '1199' | '1499' | '1999' | '2499+';
}

export interface Boutique {
  id: string;
  city: string;
  name: string;
  address: string;
  pincode: string;
  phone: string;
  timings: string;
  experienceTypes: string[];
  image: string;
  vipLounge: boolean;
  masterTailorOnSite: boolean;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  verified: boolean;
  rating: number;
  title: string;
  comment: string;
  productName: string;
  date: string;
}

export type Currency = 'INR' | 'USD' | 'GBP' | 'AED';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'mb-001',
    sku: 'MB-ROYAL-BD-01',
    name: 'The Rani Padmavati Royal Crimson Bridal Lehenga',
    tagline: 'Heirloom Handcrafted Zardozi on Pure Raw Silk with Antique Gold Metallic Zari',
    category: 'Bridal Regalia',
    occasion: 'Bridal Regalia',
    craft: 'Handcrafted Zardozi',
    fabric: 'Pure Mulberry Silk',
    priceINR: 145000,
    originalPriceINR: 185000,
    badge: 'Flagship Heirloom',
    silkMarkCertified: true,
    dispatchTimeline: 'Bespoke Made-to-Order (14-21 Days)',
    rating: 4.98,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Royal Crimson', hex: '#5E1A2C' },
      { name: 'Rani Magenta', hex: '#881337' },
      { name: 'Empire Emerald', hex: '#1B4D3E' }
    ],
    sizes: ['Bespoke Custom', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    description: 'Immersed in over 54 years of Old Delhi atelier craftsmanship, this regal bridal lehenga is woven from natural high-twist mulberry silk. Hand-embroidered with 24-karat electroplated real metallic dabka, nakshi zardozi, and micro-pearls across 16 kalis.',
    craftDetails: '280 hours of precision needlework by master artisans in Chandni Chowk & Varanasi.',
    careInstructions: 'Dry Clean Only. Preserve in pure cotton heirloom garment shroud provided.',
    inStock: true,
    curatedTier: '2499+'
  },
  {
    id: 'mb-002',
    sku: 'MB-VARANASI-SN-02',
    name: 'Varanasi Heritage Katan Silk Shikarbah Brocade Saree',
    tagline: 'Certified 100% Silk Mark with Antique Gold Kadwa Weave',
    category: 'Sarees',
    occasion: 'Festive Puja',
    craft: 'Banarasi Brocade',
    fabric: 'Banarasi Katan',
    priceINR: 32500,
    originalPriceINR: 42000,
    badge: 'Silk Mark Certified',
    silkMarkCertified: true,
    dispatchTimeline: 'Ready to Ship (24-48 Hours)',
    rating: 4.95,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Temple Vermillion', hex: '#991B1B' },
      { name: 'Peacock Teal', hex: '#115E59' },
      { name: 'Sunlit Mustard', hex: '#D97706' }
    ],
    sizes: ['Free Size (6.4m with Blouse piece)'],
    description: 'A benchmark of Indian handloom legacy. Featuring the timeless Shikarbah motifs (flora, fauna, and royal palanquins) hand-interlocked through the prestigious Kadwa technique.',
    craftDetails: 'Handloom certified warp & weft with Silk Mark seal laboratory authentication.',
    careInstructions: 'Wrap in unbleached muslin. Dry clean only. Air out periodically.',
    inStock: true,
    curatedTier: '2499+'
  },
  {
    id: 'mb-003',
    sku: 'MB-ANARKALI-ST-03',
    name: 'Kashmiri Tilla & Gota Patti Pure Georgette Anarkali Suit',
    tagline: 'Flared Kalidar Silhouette with Scalloped Organza Dupatta',
    category: 'Suits',
    occasion: 'Sangeet & Mehendi',
    craft: 'Gota Patti',
    fabric: 'Georgette',
    priceINR: 24500,
    originalPriceINR: 31000,
    badge: 'Festive Bestseller',
    silkMarkCertified: false,
    dispatchTimeline: 'Ready to Ship (24-48 Hours)',
    rating: 4.9,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Rose Quartz Pink', hex: '#BE185D' },
      { name: 'Sage Mint', hex: '#047857' },
      { name: 'Ivory Gold', hex: '#C5A059' }
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Custom Tailoring'],
    description: 'Breathtaking 24-kali flared Anarkali ensemble highlighted with metallic copper Gota Patti, hand-stitched Kashmiri tilla thread borders, and paired with custom tailored churidar.',
    craftDetails: 'Intricate scalloped hand-cut border with micro pearl edging.',
    careInstructions: 'Professional Steam Iron & Dry Clean.',
    inStock: true,
    curatedTier: '2499+'
  },
  {
    id: 'mb-004',
    sku: 'MB-ORGANZA-SR-04',
    name: 'Hand-Painted Mukaish Sheer Organza Saree with Silk Blouse',
    tagline: 'Lightweight Ethereal Drape with Shimmering Silver Fardi Badla',
    category: 'Sarees',
    occasion: 'Reception & Cocktail',
    craft: 'Mukaish Work',
    fabric: 'Organza Silk',
    priceINR: 18900,
    originalPriceINR: 24000,
    badge: 'Cocktail Edit',
    silkMarkCertified: true,
    dispatchTimeline: 'Ready to Ship (24-48 Hours)',
    rating: 4.88,
    reviewsCount: 37,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Champagne Blush', hex: '#E0A996' },
      { name: 'Lilac Mist', hex: '#8B5CF6' }
    ],
    sizes: ['Free Size + Unstitched Silk Blouse Piece'],
    description: 'An ultra-modern luxury drape made from whisper-light silk organza. Accentuated with genuine silver wire mukaish dots that catch the light effortlessly.',
    craftDetails: 'Hand-hammered silver wire dots embedded directly into silk organza weaves.',
    careInstructions: 'Dry Clean Only. Roll rather than fold to maintain sheer crispness.',
    inStock: true,
    curatedTier: '2499+'
  },
  {
    id: 'mb-005',
    sku: 'MB-CHANDERI-DM-05',
    name: 'Pure Chanderi Silk Zari Border Unstitched Dress Material',
    tagline: 'Includes Pure Silk Jacquard Kurta, Shantoon Bottom & Zari Dupatta',
    category: 'Dress Materials',
    occasion: 'Festive Puja',
    craft: 'Resham Threadwork',
    fabric: 'Chanderi Silk',
    priceINR: 1999,
    originalPriceINR: 3499,
    badge: 'Under ₹1,999 Festive Edit',
    silkMarkCertified: false,
    dispatchTimeline: 'Ready to Ship (24-48 Hours)',
    rating: 4.85,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Turmeric Gold', hex: '#D97706' },
      { name: 'Crimson Wine', hex: '#5E1A2C' },
      { name: 'Royal Indigo', hex: '#1E3A8A' }
    ],
    sizes: ['Unstitched (2.5m Top + 2.5m Bottom + 2.25m Dupatta)'],
    description: 'Unstitched luxury 3-piece suit fabric woven in authentic Chanderi cluster with real zari meenakari booti and fine resham floral motifs.',
    craftDetails: 'Traditional pit-loom weaving with zari border accents.',
    careInstructions: 'Gentle Hand Wash in cold water or Dry Clean.',
    inStock: true,
    curatedTier: '1999'
  },
  {
    id: 'mb-006',
    sku: 'MB-PRET-KT-06',
    name: 'Lucknowi Chikankari Pure Cotton Straight Kurta & Pant Set',
    tagline: 'Breathable Summer Hand-Embroidered Silhouette with Mukaish Highlights',
    category: 'Ready to Wear',
    occasion: 'Daily Elegance',
    craft: 'Chikankari',
    fabric: 'Pure Chanderi Cotton',
    priceINR: 1499,
    originalPriceINR: 2599,
    badge: 'Under ₹1,499 Prêt Pick',
    silkMarkCertified: false,
    dispatchTimeline: 'Ready to Ship (24-48 Hours)',
    rating: 4.92,
    reviewsCount: 154,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Powder Sky Blue', hex: '#0284C7' },
      { name: 'Pastel Peach', hex: '#FB923C' },
      { name: 'Pristine Ivory', hex: '#EAE2DB' }
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    description: 'Designed for effortless workwear and daytime gatherings. Tailored from 100% fine mulmul cotton adorned with authentic Bakhiya and Phanda stitches.',
    craftDetails: 'Handcrafted by female artisans in Lucknow heritage clusters.',
    careInstructions: 'Machine wash delicate cycle in cold water.',
    inStock: true,
    curatedTier: '1499'
  },
  {
    id: 'mb-007',
    sku: 'MB-BANDHANI-ST-07',
    name: 'Jaipuri Bandhani Silk-Blend Kurta Set with Mirrorwork Dupatta',
    tagline: 'Vibrant Tied & Dyed Festive Ensemble with Gota Patti Hemline',
    category: 'Suits',
    occasion: 'Sangeet & Mehendi',
    craft: 'Bandhani',
    fabric: 'Chanderi Silk',
    priceINR: 1199,
    originalPriceINR: 2199,
    badge: 'Under ₹1,199 Steal',
    silkMarkCertified: false,
    dispatchTimeline: 'Ready to Ship (24-48 Hours)',
    rating: 4.86,
    reviewsCount: 96,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Marigold Yellow', hex: '#F59E0B' },
      { name: 'Rani Pink', hex: '#BE185D' }
    ],
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    description: 'Rich ethnic colors combined with artisanal dot-tying technique from Gujarat & Rajasthan. Finished with reflective foil mirrorwork.',
    craftDetails: 'Artisan hand-knotted bandhej resisting dyeing.',
    careInstructions: 'First wash dry clean, subsequently mild cold handwash.',
    inStock: true,
    curatedTier: '1199'
  },
  {
    id: 'mb-008',
    sku: 'MB-MULMUL-KT-08',
    name: 'Block-Printed Pure Mulmul Cotton Floral Tunic Kurti',
    tagline: 'Naturally Dyed Bagru Print with Mandarin Collar & Wooden Buttons',
    category: 'Ready to Wear',
    occasion: 'Daily Elegance',
    craft: 'Resham Threadwork',
    fabric: 'Pure Chanderi Cotton',
    priceINR: 799,
    originalPriceINR: 1499,
    badge: 'Under ₹799 Door-Buster',
    silkMarkCertified: false,
    dispatchTimeline: 'Ready to Ship (24-48 Hours)',
    rating: 4.79,
    reviewsCount: 210,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Indigo Marine', hex: '#1E3A8A' },
      { name: 'Madder Red', hex: '#991B1B' }
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    description: 'Everyday comfort crafted in 60s count pure cotton. Hand-stamped using seasoned teak wood blocks with vegetable dyes.',
    craftDetails: 'Traditional Bagru hand-block printing process.',
    careInstructions: 'Cold hand wash with mild detergents.',
    inStock: true,
    curatedTier: '799'
  },
  {
    id: 'mb-009',
    sku: 'MB-VELVET-BL-09',
    name: 'Imperial Emerald Micro-Velvet Karchobi Bridal Lehenga',
    tagline: 'Opulent Gold Filigree with Dabka, French Knots & Double Dupatta',
    category: 'Bridal Regalia',
    occasion: 'Reception & Cocktail',
    craft: 'Karchobi',
    fabric: 'Micro-Velvet',
    priceINR: 165000,
    originalPriceINR: 210000,
    badge: 'Grand Haute Couture',
    silkMarkCertified: true,
    dispatchTimeline: 'Bespoke Made-to-Order (14-21 Days)',
    rating: 5.0,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Imperial Emerald', hex: '#1B4D3E' },
      { name: 'Royal Maroon', hex: '#5E1A2C' }
    ],
    sizes: ['Bespoke Custom Atelier Fit'],
    description: 'A monument of royal regalia. High-density micro-velvet base with 3D raised Karchobi needlepoint depicting mughal jharokhas and dancing peacocks.',
    craftDetails: 'Over 340 artisanal hours with 18-karat antique gold finished coils.',
    careInstructions: 'Store in padded velvet wardrobe casing. Dry clean only.',
    inStock: true,
    curatedTier: '2499+'
  }
];

export const BOUTIQUES: Boutique[] = [
  {
    id: 'boutique-delhi-south-ex',
    city: 'New Delhi',
    name: 'South Extension - I Flagship Couture Salon',
    address: 'E-19, South Extension Part 1, Ring Road, New Delhi, Delhi 110049',
    pincode: '110049',
    phone: '+91 11 4164 1970',
    timings: '10:30 AM – 8:30 PM (Open All 7 Days)',
    experienceTypes: ['Bridal Trousseau Styling', 'Master Tailoring Atelier', 'Silk Mark Certified Saree Vault', 'VIP Private Lounge Consultation'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    vipLounge: true,
    masterTailorOnSite: true
  },
  {
    id: 'boutique-mumbai-rcity',
    city: 'Mumbai',
    name: 'R City Mall Luxury Flagship',
    address: 'Ground Floor, Luxury Wing, R City Mall, LBS Marg, Ghatkopar West, Mumbai 400086',
    pincode: '400086',
    phone: '+91 22 6127 1970',
    timings: '11:00 AM – 9:30 PM (Open All 7 Days)',
    experienceTypes: ['Bridal & Sangeet Styling', 'Express Blouse Tailoring', 'NRI Virtual drape pickup'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    vipLounge: true,
    masterTailorOnSite: true
  },
  {
    id: 'boutique-gurugram-dt',
    city: 'Gurugram',
    name: 'DT Mega Mall Couture Atelier',
    address: 'Shop No. 12-15, Upper Ground Floor, Golf Course Road, DLF Phase 1, Gurugram 122002',
    pincode: '122002',
    phone: '+91 124 405 1970',
    timings: '11:00 AM – 9:00 PM (Open All 7 Days)',
    experienceTypes: ['Destination Wedding Styling', 'Cocktail & Gown Fitting', 'Same-day Saree Fall-Pico'],
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    vipLounge: true,
    masterTailorOnSite: true
  },
  {
    id: 'boutique-agra-sanjay',
    city: 'Agra',
    name: 'Sanjay Place Heritage Boutique',
    address: '42, Block 38/4, Commercial Complex, Sanjay Place, Civil Lines, Agra, UP 282002',
    pincode: '282002',
    phone: '+91 562 252 1970',
    timings: '10:30 AM – 8:00 PM (Closed on Tuesdays)',
    experienceTypes: ['Heirloom Zardozi Collection', 'Pure Banarasi Handlooms', 'Master Drape Specialist'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    vipLounge: false,
    masterTailorOnSite: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Sunaina Singhania',
    city: 'New Delhi (South Ex Salon)',
    verified: true,
    rating: 5,
    title: 'The Rani Padmavati Lehenga made my wedding royal',
    comment: 'The craftsmanship on the pure raw silk lehenga was beyond words. The South Extension master tailor took my measurements and delivered a flawless fit in just 18 days. The Silk Mark seal gave my family complete peace of mind.',
    productName: 'The Rani Padmavati Royal Crimson Bridal Lehenga',
    date: 'February 2026'
  },
  {
    id: 'rev-02',
    author: 'Meera Kapadia-Shah',
    city: 'London, UK (Global NRI Client)',
    verified: true,
    rating: 5,
    title: 'Virtual stylist video session was seamless for my London wedding',
    comment: 'Living abroad in the UK, I was nervous about buying a Banarasi Katan silk saree without touching it. The stylist on video call draped it in 3 styles, showed high-def closeups of the zari, and it arrived in London in 4 days!',
    productName: 'Varanasi Heritage Katan Silk Shikarbah Brocade Saree',
    date: 'January 2026'
  },
  {
    id: 'rev-03',
    author: 'Rhea Oberoi',
    city: 'Mumbai (R City Boutique)',
    verified: true,
    rating: 5,
    title: 'Unmatched prêt quality under ₹1,999',
    comment: 'Meena Bazaar has been my mother’s favourite for decades, and their ready to wear suit sets and unstitched fabrics are simply the finest quality in this price range.',
    productName: 'Pure Chanderi Silk Zari Border Unstitched Dress Material',
    date: 'February 2026'
  }
];

export const PRICE_THRESHOLDS = [
  { id: '799', label: 'Under ₹799', min: 0, max: 799, badge: 'Prêt Picks' },
  { id: '1199', label: 'Under ₹1,199', min: 800, max: 1199, badge: 'Best Value' },
  { id: '1499', label: 'Under ₹1,499', min: 1200, max: 1499, badge: 'Trending' },
  { id: '1999', label: 'Under ₹1,999', min: 1500, max: 1999, badge: 'Festive Steal' },
  { id: '2499+', label: '₹2,499+ Luxury', min: 2000, max: 999999, badge: 'Couture & Heirloom' }
];

export const STORY_CIRCLES = [
  { id: 'all', name: 'All Drops', icon: '✨', category: 'All' },
  { id: 'bridal', name: 'Bridal Regalia', icon: '👑', category: 'Bridal Regalia' },
  { id: 'sarees', name: 'Silk Sarees', icon: '🥻', category: 'Sarees' },
  { id: 'suits', name: 'Flared Suits', icon: '👗', category: 'Suits' },
  { id: 'dress-materials', name: 'Dress Material', icon: '🧵', category: 'Dress Materials' },
  { id: 'ready-to-wear', name: 'Prêt Under 1.5K', icon: '💎', category: 'Ready to Wear' },
  { id: 'salons', name: 'VIP Salons', icon: '🏛️', category: 'Salons' }
];
