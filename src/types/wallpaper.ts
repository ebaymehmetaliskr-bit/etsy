export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface VisualDiagnosis {
  aestheticStyle: string;
  patternElements: string;
  colorPalette: ColorSwatch[];
  targetSpace: string;
  targetAudience: string;
  designVibe: string;
}

export interface OptimizedTitle {
  title: string;
  charCount: number;
  mobilePreview: string;
  searchIntentsCovered: string[];
}

export interface EtsyTag {
  tag: string;
  category: 'Functional & Material' | 'Style & Aesthetic' | 'Pattern & Subject' | 'Room & Target' | string;
  charCount: number;
  searchVolumeTier?: 'Very High' | 'High' | 'Niche Gem' | string;
}

export interface ProductDescription {
  hook: string;
  materialOptions: string;
  sizingPanelGuide: string;
  ecoFriendlyHealth: string;
  applicationRules: string;
  customOrderCta: string;
  fullText: string;
}

export interface SuggestedPriceRange {
  samplePrice: string;
  panelPrice: string;
  largeMuralPrice: string;
  strategyNote: string;
}

export interface ListingAttributes {
  etsyCategoryPath: string;
  primaryColor: string;
  secondaryColor: string;
  roomAttributes: string[];
  materialAttribute: string;
  patternAttribute: string;
  suggestedPriceRange: SuggestedPriceRange;
}

export interface LeadImageGuidance {
  slot: string;
  concept: string;
  whyItConverts: string;
}

export interface MarketingAndMockups {
  leadImages: LeadImageGuidance[];
  midjourneyPrompt: string;
  socialHook: string;
}

export interface EtsyGeoLocalization {
  targetMarket: string; // e.g. "USA (West Coast / National)" or "UK & European Market"
  spellingConvention: 'US' | 'UK';
  unitStandards: string; // e.g. "24\" x 96\" (61cm x 244cm)"
  regionalKeywords: string[]; // e.g. ["Powder Room", "Half Bath", "Renter Friendly"] or ["Feature Wall", "Cloakroom", "En-Suite"]
  regionalAestheticFit: string;
  architecturalCompatibility: string;
}

export interface PinterestViralityPackage {
  top5PinterestKeywords: string[];
  targetBoards: string[];
  pinOverlayTextIdeas: string[];
  visualFramingStrategy: string;
  pinCallToAction: string;
}

export interface EtsyListingPackage {
  id: string;
  createdAt: string;
  imageThumbnail?: string;
  designName: string;
  visualDiagnosis: VisualDiagnosis;
  optimizedTitle: OptimizedTitle;
  tags: EtsyTag[];
  description: ProductDescription;
  listingAttributes: ListingAttributes;
  geoLocalization: EtsyGeoLocalization;
  pinterestPackage: PinterestViralityPackage;
  marketingAndMockups: MarketingAndMockups;
  formattedMarkdownOutput: string;
}

export interface PresetWallpaper {
  id: string;
  title: string;
  niche: string;
  targetRoom: string;
  material: string;
  thumbnail: string;
  description: string;
  precomputed?: EtsyListingPackage;
}
