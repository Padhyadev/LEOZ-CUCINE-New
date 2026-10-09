/* ==========================================================================
   LEOZ CUCINE — STRICT IMAGE ASSET MAPPING & ART DIRECTION SYSTEM
   ==========================================================================
   RULES:
   1. Category Segregation: Kitchen assets MUST NOT be used in Wardrobes.
   2. Wardrobe assets MUST NOT be used in Kitchens.
   3. Factory assets MUST be real factory / machine photography.
   4. Every entry provides category, desktop, mobile crop/asset, alt text, and section.
   ========================================================================== */

import wardrobeDressingImg from './wardrobe_dressing.webp';
import kitchenOpusImg from './kitchen_opus.webp';
import wardrobeGlassImg from './wardrobe_glass.webp';

export interface ImageAssetItem {
  id: string;
  category: 'kitchen' | 'wardrobe' | 'factory' | 'showroom' | 'director' | 'material';
  desktop: string;
  mobile: string;
  alt: string;
  objectPosition?: string;
  section: string;
}

/* =========================================================================
   1. KITCHEN PHOTOGRAPHY ASSETS (100% Kitchen Only)
   ========================================================================= */
export const kitchenAssets = {
  hero: {
    id: 'kitchen-hero',
    category: 'kitchen' as const,
    desktop: '/Gloss Finish.webp',
    mobile: '/Gloss Finish.webp',
    alt: 'LEOZ Luxury Contemporary Modular Kitchen Island and Architecture',
    objectPosition: 'center 45%',
    section: 'Modular Kitchens Hero & Homepage Hero',
  },
  islandMonolith: {
    id: 'kitchen-island',
    category: 'kitchen' as const,
    desktop: '/Skyline Monolithic Island.webp',
    mobile: '/Skyline Monolithic Island.webp',
    alt: 'Monolithic Italian Dark Marble Kitchen Island with Soft Ambient LED',
    objectPosition: 'center center',
    section: 'Kitchen Island Monolith Focus',
  },
  opusPenthouse: {
    id: 'kitchen-opus-penthouse',
    category: 'kitchen' as const,
    desktop: kitchenOpusImg,
    mobile: kitchenOpusImg,
    alt: 'The Opus Penthouse Luxury Modular Kitchen with German Hardware',
    objectPosition: 'center 50%',
    section: 'Kitchen Case Studies',
  },
  grandVilla: {
    id: 'kitchen-grand-villa',
    category: 'kitchen' as const,
    desktop: '/Grand Villa Estate.webp',
    mobile: '/Grand Villa Estate.webp',
    alt: 'Grand Villa Culinary Atelier Kitchen with High Gloss Lacquer',
    objectPosition: 'center 50%',
    section: 'Featured Kitchen Architecture',
  },
  handleless: {
    id: 'kitchen-handleless',
    category: 'kitchen' as const,
    desktop: '/Architectural Handleless Kitchen.jfif',
    mobile: '/Architectural Handleless Kitchen.jfif',
    alt: 'Architectural Handleless Kitchen with Integrated Appliances',
    objectPosition: 'center center',
    section: 'Minimal Handleless Topology',
  },
  categoryCard: {
    id: 'kitchen-category-card',
    category: 'kitchen' as const,
    desktop: '/modular kitchen.webp',
    mobile: '/modular kitchen.webp',
    alt: 'LEOZ Luxury Modular Kitchen Collection Preview',
    objectPosition: 'center center',
    section: 'Home Collections Split',
  },
  layouts: {
    island: {
      id: 'kitchen-layout-island',
      category: 'kitchen' as const,
      desktop: '/Island Layout.webp',
      mobile: '/Island Layout.webp',
      alt: 'Island Kitchen Spatial Layout',
      section: 'Kitchen Layout Topologies',
    },
    lShape: {
      id: 'kitchen-layout-lshape',
      category: 'kitchen' as const,
      desktop: '/L-Shape Layout.webp',
      mobile: '/L-Shape Layout.webp',
      alt: 'L-Shape Kitchen Spatial Layout',
      section: 'Kitchen Layout Topologies',
    },
    uShape: {
      id: 'kitchen-layout-ushape',
      category: 'kitchen' as const,
      desktop: '/U -Shape Layout.webp',
      mobile: '/U -Shape Layout.webp',
      alt: 'U-Shape Kitchen Spatial Layout',
      section: 'Kitchen Layout Topologies',
    },
    parallel: {
      id: 'kitchen-layout-parallel',
      category: 'kitchen' as const,
      desktop: '/Parallel Layout.webp',
      mobile: '/Parallel Layout.webp',
      alt: 'Parallel Gallery Kitchen Layout',
      section: 'Kitchen Layout Topologies',
    },
    straight: {
      id: 'kitchen-layout-straight',
      category: 'kitchen' as const,
      desktop: '/Straight Layout.webp',
      mobile: '/Straight Layout.webp',
      alt: 'Straight Single-Wall Kitchen Layout',
      section: 'Kitchen Layout Topologies',
    },
  },
};

/* =========================================================================
   2. WARDROBE PHOTOGRAPHY ASSETS (100% Wardrobe Only)
   ========================================================================= */
export const wardrobeAssets = {
  hero: {
    id: 'wardrobe-hero',
    category: 'wardrobe' as const,
    desktop: wardrobeDressingImg,
    mobile: wardrobeDressingImg,
    alt: 'Master Walk-In Dressing Suite with Velvet Drawers and Sensor LED',
    objectPosition: 'center 40%',
    section: 'Modular Wardrobes Hero',
  },
  glassVitrine: {
    id: 'wardrobe-glass-vitrine',
    category: 'wardrobe' as const,
    desktop: wardrobeGlassImg,
    mobile: wardrobeGlassImg,
    alt: 'Smoked Glass Vitrine Modular Wardrobe with Anodized Bronze Frame',
    objectPosition: 'center center',
    section: 'Glass Vitrine Wardrobe Systems',
  },
  flutedWalnut: {
    id: 'wardrobe-fluted-walnut',
    category: 'wardrobe' as const,
    desktop: '/Fluted Walnut Executive Wardrobe.webp',
    mobile: '/Fluted Walnut Executive Wardrobe.webp',
    alt: 'Fluted Walnut Executive Wardrobe with Soft-Close Joinery',
    objectPosition: 'center center',
    section: 'Executive Wardrobe Systems',
  },
  walkInSuite: {
    id: 'wardrobe-walk-in-suite',
    category: 'wardrobe' as const,
    desktop: '/Master Walk-In Dressing Suite.webp',
    mobile: '/Master Walk-In Dressing Suite.webp',
    alt: 'Custom Master Walk-In Dressing Suite Interior Detailing',
    objectPosition: 'center center',
    section: 'Walk-In Wardrobes',
  },
  slidingSystem: {
    id: 'wardrobe-sliding',
    category: 'wardrobe' as const,
    desktop: '/Sliding Wardrobes.webp',
    mobile: '/Sliding Wardrobes.webp',
    alt: 'Full Height Sliding Modular Wardrobe System',
    objectPosition: 'center center',
    section: 'Sliding Wardrobes',
  },
  hingedSystem: {
    id: 'wardrobe-hinged',
    category: 'wardrobe' as const,
    desktop: '/Hinged Wardrobes.jfif',
    mobile: '/Hinged Wardrobes.jfif',
    alt: 'Flush Hinged Wardrobe Doors with Architectural Profile',
    objectPosition: 'center center',
    section: 'Hinged Wardrobes',
  },
  walkInSystem: {
    id: 'wardrobe-walkin',
    category: 'wardrobe' as const,
    desktop: '/Walk-in Wardrobes.webp',
    mobile: '/Walk-in Wardrobes.webp',
    alt: 'Bespoke Walk-In Wardrobe Architecture',
    objectPosition: 'center center',
    section: 'Walk-In Systems',
  },
  categoryCard: {
    id: 'wardrobe-category-card',
    category: 'wardrobe' as const,
    desktop: '/Modular Wardrobe.webp',
    mobile: '/Modular Wardrobe.webp',
    alt: 'LEOZ Bespoke Wardrobe Collection Preview',
    objectPosition: 'center center',
    section: 'Home Collections Split',
  },
  finishes: {
    matte: { id: 'w-finish-matte', desktop: '/Matte Finish wardrobe.jfif', alt: 'Matte Finish Wardrobe Surface' },
    highGloss: { id: 'w-finish-gloss', desktop: '/High Gloss Finish wardrobe.jfif', alt: 'High Gloss Lacquer Wardrobe Door' },
    woodVeneer: { id: 'w-finish-veneer', desktop: '/Wood Veneer Wardrobes.jfif', alt: 'Natural Oak and Walnut Veneer Wardrobe' },
    glassFinish: { id: 'w-finish-glass', desktop: '/Glass Finish Wardrobes.jfif', alt: 'Tinted Fluted Glass Wardrobe Door' },
    mirrorFinish: { id: 'w-finish-mirror', desktop: '/Mirror Finish wardrobe.jfif', alt: 'Reflective Mirror Finish Wardrobe' },
    flutedPanels: { id: 'w-finish-fluted', desktop: '/Fluted Panels wardrobe.jfif', alt: 'Tactile Grooved Fluted Wardrobe Panels' },
    texturedLaminates: { id: 'w-finish-laminate', desktop: '/Textured Laminates Wardrobes.jfif', alt: 'Textured Linen Laminate Wardrobe' },
    aluminiumProfiles: { id: 'w-finish-aluminium', desktop: '/Aluminium Profiles wardrobe.jfif', alt: 'Slim Anodized Aluminium Wardrobe Frame' },
  },
};

/* =========================================================================
   3. FACTORY & MANUFACTURING PHOTOGRAPHY (100% Real Factory/Machines Only)
   ========================================================================= */
export const factoryAssets = {
  hero: {
    id: 'factory-hero',
    category: 'factory' as const,
    desktop: '/factory_precision_plant.webp',
    mobile: '/factory_precision_plant.webp',
    alt: 'LEOZ 20,000 Sq. Ft. Precision Manufacturing Plant in Gandhinagar, Gujarat',
    objectPosition: 'center center',
    section: 'Factory & Craftsmanship Hero',
  },
  cutting: {
    id: 'factory-cutting-machine',
    category: 'factory' as const,
    desktop: '/factory_step_cutting.webp',
    mobile: '/factory_step_cutting.webp',
    alt: 'Automated Beam Saw and Precision Panel Sizing at LEOZ Factory',
    objectPosition: 'center center',
    section: 'Factory Step 01: Cutting',
  },
  edgeProcessing: {
    id: 'factory-edge-processing',
    category: 'factory' as const,
    desktop: '/factory_step_edge_banding.webp',
    mobile: '/factory_step_edge_banding.webp',
    alt: 'PUR Seamless Edge Banding and Contour Milling at LEOZ Facility',
    objectPosition: 'center center',
    section: 'Factory Step 02: Edge Processing',
  },
  componentPrep: {
    id: 'factory-component-prep',
    category: 'factory' as const,
    desktop: '/factory_step_cnc_drilling.webp',
    mobile: '/factory_step_cnc_drilling.webp',
    alt: 'Multi-Spindle CNC Drilling and Hardware Routing at LEOZ Factory',
    objectPosition: 'center center',
    section: 'Factory Step 03: Component Preparation',
  },
  assembly: {
    id: 'factory-assembly',
    category: 'factory' as const,
    desktop: '/factory_step_assembly.webp',
    mobile: '/factory_step_assembly.webp',
    alt: 'Hydraulic Carcass Clamp and Pre-Assembly Verification',
    objectPosition: 'center center',
    section: 'Factory Step 04: Assembly',
  },
  qualityControl: {
    id: 'factory-quality-control',
    category: 'factory' as const,
    desktop: '/factory_step_quality_control.webp',
    mobile: '/factory_step_quality_control.webp',
    alt: '0.1mm Tolerance Inspection and Protective Protective Wrapping',
    objectPosition: 'center center',
    section: 'Factory Step 05: Quality Control',
  },
  directorPortrait: {
    id: 'director-portrait',
    category: 'director' as const,
    desktop: '/director.webp',
    mobile: '/director.webp',
    alt: 'Mr. Mayur Vadhia — Director of Kitchens, Wardrobes & Manufacturing at LEOZ',
    objectPosition: 'top center',
    section: 'Meet the Director (About Page)',
  },
};

/* =========================================================================
   4. SHOWROOM & CONSULTATION ASSETS
   ========================================================================= */
export const showroomAssets = {
  flagship: {
    id: 'showroom-flagship',
    category: 'showroom' as const,
    desktop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    mobile: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
    alt: 'LEOZ Luxury Showroom Kitchen and Consultation Space in Ahmedabad',
    objectPosition: 'center center',
    section: 'Franchise & Showrooms Page',
  },
  materialsArchive: {
    id: 'materials-archive',
    category: 'material' as const,
    desktop: '/PHILOSOPHY.webp',
    mobile: '/PHILOSOPHY.webp',
    alt: 'Tactile Material Library, Fluted Glass and European Hardware Archive',
    objectPosition: 'center center',
    section: 'Materials & Finishes Archive',
  },
};

/* Backwards compatibility bundle */
export const images = {
  hero: kitchenAssets.hero.desktop,
  aboutHero: '/about.webp',
  contactHero: kitchenOpusImg,
  franchiseHero: showroomAssets.flagship.desktop,
  modularKitchenHero: kitchenAssets.hero.desktop,
  modularPhilosophy: '/Metal Accents.webp',
  modularWardrobeHero: wardrobeAssets.hero.desktop,
  wardrobePhilosophy: wardrobeAssets.walkInSuite.desktop,
  brandDetail: showroomAssets.materialsArchive.desktop,
  kitchenCategory: kitchenAssets.categoryCard.desktop,
  wardrobeCategory: wardrobeAssets.categoryCard.desktop,
  consultationBg: kitchenOpusImg,

  wardrobeTypes: {
    sliding: wardrobeAssets.slidingSystem.desktop,
    hinged: wardrobeAssets.hingedSystem.desktop,
    walkIn: wardrobeAssets.walkInSystem.desktop,
  },

  layouts: {
    lShape: kitchenAssets.layouts.lShape.desktop,
    uShape: kitchenAssets.layouts.uShape.desktop,
    island: kitchenAssets.layouts.island.desktop,
    parallel: kitchenAssets.layouts.parallel.desktop,
    straight: kitchenAssets.layouts.straight.desktop,
  },

  materials: {
    matte: '/Matte Finish.webp',
    gloss: '/Gloss Finish.webp',
    woodVeneer: '/Wood Veneer.webp',
    marble: '/Italian Marble.webp',
    quartz: '/Quartz Stone.webp',
    glass: '/Glass Vitrines.webp',
    metal: '/Metal Accents.webp',
  },
};

export default images;
