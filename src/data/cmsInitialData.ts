export interface HeroConfig {
  collectionTag: string;
  headlineMain: string;
  headlineAccent: string;
  bodyDescription: string;
  primaryCtaText: string;
  primaryCtaCategory: string;
  secondaryCtaText: string;
  modelImage: string;
  modelImages?: string[];
  autoSlideInterval?: number;
  floatingLookTitle: string;
  floatingEnsembleName: string;
  signatureFlareTitle: string;
  signatureFlareSubtitle: string;
  signatureFlareDescription: string;
  insetBadge: string;
  insetTitle: string;
  insetDescription: string;
  insetImage: string;
}

export interface StoryHighlightItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  storyImage: string;
  categoryKey?: string;
  view?: 'home' | 'catalog' | 'boutiques' | 'heritage';
  narrative: string;
}

export interface CategoryCardItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  categoryKey: string;
  image: string;
}

export interface QuickCategoryButtonItem {
  id: string;
  title: string;
  iconType: 'hanger' | 'star' | 'diamond' | 'flower';
  categoryKey?: string;
  view?: 'home' | 'catalog' | 'boutiques' | 'heritage';
}

export interface LookbookFeatureCard {
  volBadge: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  categoryKey: string;
  priceText: string;
}

export interface LookbookGridCard {
  id: string;
  badge: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  categoryKey: string;
}

export interface LookbookConfig {
  eyebrow: string;
  sectionTitle: string;
  narrative: string;
  heroCard: LookbookFeatureCard;
  cards: LookbookGridCard[];
}

export interface SiteFooterConfig {
  brandName: string;
  brandTagline: string;
  brandDescription: string;
  instagramHandle: string;
  instagramUrl: string;
  conciergePhone: string;
  copyrightText: string;
}

export const INITIAL_HERO_CONFIG: HeroConfig = {
  collectionTag: 'Autumn / Winter Bridal Edit 2025',
  headlineMain: 'Timeless Radiance in Handcrafted',
  headlineAccent: 'Gold & Mirror',
  bodyDescription: 'Woven in pure chanderi silk with artisan hand-embroidered mirror craftsmanship, celebrating centuries of royal Indian textile heritage and modern sovereign grace.',
  primaryCtaText: 'Explore The Collection',
  primaryCtaCategory: 'Bridal Regalia',
  secondaryCtaText: 'Book Bespoke Fitting',
  modelImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0rE-sF1BDYoIfwTHOu4tXMWHeLZ3bRhMkHceV5tlKwcxZvBDU9Ee6nP_yuRKWmS-BZXby1FUQyuigrHrO116ONeiUnEhWXyUO9AU7QXW0PNQfumAvDpO1e5fgy5ExLbNeAXBc4JIxc0TtOFjaISyGCQrC-YM6jHc7YAG89KH1_lIo97Luz7VRQa36q6ERdiKuKB1Hx2sAQO3sOGxqNUm4eVjTKDjmIDY2amAk2MZZyzoP6-6Fw7Q8O0F1iam14uTeNhk',
  modelImages: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB0rE-sF1BDYoIfwTHOu4tXMWHeLZ3bRhMkHceV5tlKwcxZvBDU9Ee6nP_yuRKWmS-BZXby1FUQyuigrHrO116ONeiUnEhWXyUO9AU7QXW0PNQfumAvDpO1e5fgy5ExLbNeAXBc4JIxc0TtOFjaISyGCQrC-YM6jHc7YAG89KH1_lIo97Luz7VRQa36q6ERdiKuKB1Hx2sAQO3sOGxqNUm4eVjTKDjmIDY2amAk2MZZyzoP6-6Fw7Q8O0F1iam14uTeNhk',
    '/images/categories/cat-lehenga-choli.jpg',
    '/images/categories/cat-sarees-drapes.jpg',
    '/images/categories/cat-suits-sets.jpg'
  ],
  autoSlideInterval: 4000,
  floatingLookTitle: 'Look 07 • Festive Royale',
  floatingEnsembleName: 'Ivory & Champaca Gold Chanderi Ensemble',
  signatureFlareTitle: 'Signature Flare',
  signatureFlareSubtitle: '36-Kali Architectural Voluminous Kalidar',
  signatureFlareDescription: 'Engineered for lightweight royal twirl movement',
  insetBadge: 'Atelier Mastercraft',
  insetTitle: 'Intricate Zardozi & Mirror Detailing',
  insetDescription: 'Over 180 meticulous hours of artisan handcrafting with faceted glass mirror discs and spun metallic gold threads.',
  insetImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnVsBGV-1Y7JMj9pA6lCN7FH8-kRXkdfEw8TYKbfS8OCia4xmnlMzzjGj8Sg4uVLL50bMGyhCMOwKnO1ed7TCHIaHROYVBS2BHoDD5cejG_z-8VWtd1QSS40VVG9-Ez0c79ebKbhtz5LEOHy1K9BXMm3uxdPOyft9gspYKRdoN73mQqt5PsF7-J4r3c-zOeDOuWQp8W4AWu04gIOKZBzFiuViNGf988JgGw8VACORijn5y0k4So9SrFNtxXVDaYLFFtI0'
};

export const INITIAL_STORY_HIGHLIGHTS: StoryHighlightItem[] = [
  {
    id: 'new-in',
    emoji: '✨',
    title: 'New In',
    subtitle: 'Autumn Drops',
    storyImage: '/images/lookbooks/style-edit-yellow.jpg',
    categoryKey: 'All',
    narrative: 'Freshly unveiled autumn festive weaves in pure Chanderi silk and feather-light Resham embroidery.'
  },
  {
    id: 'bridal',
    emoji: '👑',
    title: 'Bridal',
    subtitle: 'Royal Regalia',
    storyImage: '/images/categories/cat-lehenga-choli.jpg',
    categoryKey: 'Bridal Regalia',
    narrative: 'Flagship 36-kali kalidar lehengas with electroplated gold dabka and antique nakshi zardozi.'
  },
  {
    id: 'sarees',
    emoji: '🥻',
    title: 'Sarees',
    subtitle: 'Pure Handlooms',
    storyImage: '/images/categories/cat-sarees-drapes.jpg',
    categoryKey: 'Sarees',
    narrative: 'Silk Mark certified heirloom Kanjeevarams, Kadwa Banarasi weaves, and sheer tissue drapes.'
  },
  {
    id: 'suits',
    emoji: '👗',
    title: 'Suits',
    subtitle: 'Kalidar Cuts',
    storyImage: '/images/categories/cat-suits-sets.jpg',
    categoryKey: 'Suits',
    narrative: 'Opulent Anarkali ensembles, Shararas, and Ghararas paired with scallop-embroidered organza dupattas.'
  },
  {
    id: 'fabrics',
    emoji: '🧵',
    title: 'Fabrics',
    subtitle: 'Dress Materials',
    storyImage: '/images/categories/cat-dress-materials.jpg',
    categoryKey: 'Dress Materials',
    narrative: 'Unstitched pure mulberry and raw silk suit lengths tailored for your signature bespoke silhouette.'
  },
  {
    id: 'jewels',
    emoji: '💎',
    title: 'Heritage',
    subtitle: 'Artisan Craft',
    storyImage: '/images/lookbooks/bridal-regalia-palace.jpg',
    view: 'heritage',
    narrative: 'Celebrating 54 years of atelier integrity, certified authenticity, and generational mastercraft.'
  },
  {
    id: 'boutiques',
    emoji: '🏛️',
    title: 'Boutiques',
    subtitle: '100+ Flagships',
    storyImage: '/images/lookbooks/purple-saree-drapes.jpg',
    view: 'boutiques',
    narrative: 'Step into our experiential couture salons across Delhi, Mumbai, Hyderabad, Bengaluru, and Dubai.'
  }
];

export const INITIAL_CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'cat-sarees',
    tag: 'PURE HANDLOOMS',
    title: 'Sarees & Drapes',
    subtitle: 'Banarasi, Kanjeevaram, Organza & Chiffon',
    ctaText: 'EXPLORE 1,200+ SAREES',
    categoryKey: 'Sarees',
    image: '/images/categories/cat-sarees-drapes.jpg'
  },
  {
    id: 'cat-lehenga',
    tag: 'BRIDAL & SANGEET',
    title: 'Lehenga Choli',
    subtitle: 'Grand silhouettes tailored for royal celebrations',
    ctaText: 'VIEW LEHENGAS',
    categoryKey: 'Bridal Regalia',
    image: '/images/categories/cat-lehenga-choli.jpg'
  },
  {
    id: 'cat-suits',
    tag: 'READY-TO-WEAR',
    title: 'Suits & Sets',
    subtitle: 'Anarkalis, Shararas, Ghararas & Palazzos',
    ctaText: 'BROWSE SUITS',
    categoryKey: 'Suits',
    image: '/images/categories/cat-suits-sets.jpg'
  },
  {
    id: 'cat-fabrics',
    tag: 'CUSTOM FIT',
    title: 'Dress Materials',
    subtitle: 'Pure unstitched weaves for bespoke tailoring',
    ctaText: 'EXPLORE FABRICS',
    categoryKey: 'Dress Materials',
    image: '/images/categories/cat-dress-materials.jpg'
  }
];

export const INITIAL_QUICK_BUTTONS: QuickCategoryButtonItem[] = [
  {
    id: 'btn-kurtas',
    title: 'KURTA SETS & KURTIS',
    iconType: 'hanger',
    categoryKey: 'Ready to Wear'
  },
  {
    id: 'btn-signature',
    title: 'SIGNATURE STYLES',
    iconType: 'star',
    categoryKey: 'Bridal Regalia'
  },
  {
    id: 'btn-jewellery',
    title: 'HERITAGE JEWELLERY',
    iconType: 'diamond',
    view: 'heritage'
  },
  {
    id: 'btn-fragrances',
    title: 'ARTISANAL FRAGRANCES',
    iconType: 'flower',
    categoryKey: 'All'
  }
];

export const INITIAL_LOOKBOOK_CONFIG: LookbookConfig = {
  eyebrow: 'THE LOOKBOOKS',
  sectionTitle: 'Curated Editorial Edits',
  narrative: 'Distinct seasonal style narratives curated by our senior couture salon directors.',
  heroCard: {
    volBadge: 'COLLECTION VOL. 24',
    tagline: 'EVERYDAY MODERNITY',
    title: 'Style Edit: Craft Your Perfect Fit',
    description: 'Contemporary silhouettes meet ancestral hand-block printing and feather-light resham embroidery. Curated for airy daytime celebrations and elegant poise.',
    image: '/images/lookbooks/style-edit-yellow.jpg',
    buttonText: 'DISCOVER THE EDIT',
    categoryKey: 'Ready to Wear',
    priceText: 'Starting from ₹1,299'
  },
  cards: [
    {
      id: 'lookbook-sarees',
      badge: 'CURATED DRAPES',
      tagline: 'PURE SILK MARK CERTIFIED',
      title: 'Saree Edit: Drapes For Every Occasion',
      description: 'Discover heirloom Kanjeevarams, feather-weight Organzas, and pre-draped cocktail silhouettes meant to accompany life\'s grandest memories.',
      image: '/images/lookbooks/purple-saree-drapes.jpg',
      ctaText: 'EXPLORE SAREE SANCTUARY',
      categoryKey: 'Sarees'
    },
    {
      id: 'lookbook-festive',
      badge: 'BRIDAL REGALIA',
      tagline: 'HAUTE COUTURE',
      title: 'Elegance Reimagined: Festive Edit',
      description: 'A celebration of royal velvets, zardozi needlework, and heirloom gota-patti accents created for auspicious rituals, sangeet, and reception soirées.',
      image: '/images/lookbooks/bridal-regalia-palace.jpg',
      ctaText: 'VIEW COUTURE LOOKBOOK',
      categoryKey: 'Bridal Regalia'
    }
  ]
};

export const INITIAL_SITE_FOOTER_CONFIG: SiteFooterConfig = {
  brandName: 'Rangriti Vastrra',
  brandTagline: 'HAUTE COUTURE • ETHNIC ELEGANCE',
  brandDescription: 'Rangriti Vastrra crafts authentic Banarasi silks, handcrafted festive lehengas, royal embroidered anarkalis, and prêt ethnic wear. Curated for modern celebrations and inspired by rich Indian textile heritage.',
  instagramHandle: '@rangriti_vastrra',
  instagramUrl: 'https://www.instagram.com/rangriti_vastrra/?hl=en',
  conciergePhone: '+91 11 4164 1970',
  copyrightText: '© 2026 Rangriti Vastrra Haute Couture Private Limited. All Rights Reserved.'
};
