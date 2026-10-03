/* ==========================================================================
   LEOZ CUCINE — LUXURY IMAGE ASSETS CATALOG
   ========================================================================== */


const brandPhilosophyImg = '/PHILOSOPHY.webp';
import wardrobeDressingImg from './wardrobe_dressing.webp';
import kitchenOpusImg from './kitchen_opus.webp';
import wardrobeGlassImg from './wardrobe_glass.webp';

export const images = {
  // Hero Fullscreen Architecture (User Uploaded Hero Banner for Home)
  hero: '/hero banner.webp',

  // Page Specific Banners (No longer shared or same)
  aboutHero: '/about.webp',
  contactHero: kitchenOpusImg,
  franchiseHero: brandPhilosophyImg,

  // Dedicated Modular Kitchen Hero & Philosophy
  modularKitchenHero: '/Gloss Finish.webp',
  modularPhilosophy: '/Metal Accents.webp',

  // Dedicated Modular Wardrobes Assets
  modularWardrobeHero: wardrobeDressingImg,
  wardrobePhilosophy: brandPhilosophyImg,

  // Category & Brand Details for Home page
  brandDetail: brandPhilosophyImg,
  kitchenCategory: '/modular kitchen.webp',
  wardrobeCategory: '/Modular Wardrobe.webp',
  consultationBg: kitchenOpusImg,

  wardrobeTypes: {
    sliding: '/Sliding Wardrobes.webp',
    hinged: '/Hinged Wardrobes.jfif',
    walkIn: '/Walk-in Wardrobes.webp',
  },

  wardrobeFittings: [
    { title: 'Hanging Systems', desc: 'Ergonomic pull-down rails and dual-tier clothing racks.', image: wardrobeDressingImg },
    { title: 'Soft-close Drawers', desc: 'Velvet-lined felt drawers for accessories and delicates.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90' },
    { title: 'Shoe Storage', desc: 'Slanted illuminated shoe displays with glass dividers.', image: wardrobeGlassImg },
    { title: 'Jewellery Organisers', desc: 'Bespoke leather inserts with integrated security locks.', image: wardrobeDressingImg },
    { title: 'Pull-out Accessories', desc: 'Non-slip extendable trouser organisers and tie holders.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=90' },
    { title: 'Adjustable Shelves', desc: 'Modular shelf pin systems for flexible storage layouts.', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=90' },
    { title: 'Internal Lighting', desc: 'Motion-activated warm vertical LED strip lighting.', image: wardrobeGlassImg },
    { title: 'Premium Storage Solutions', desc: 'Custom tailored compartments for modern living.', image: wardrobeDressingImg },
  ],

  wardrobeFinishes: [
    { title: 'Matte Finish', desc: 'Fingerprint-resistant, anti-glare surface.', image: '/Matte Finish wardrobe.jfif' },
    { title: 'High Gloss Finish', desc: 'Reflective, high-shine lacquer.', image: '/High Gloss Finish wardrobe.jfif' },
    { title: 'Wood Veneer', desc: 'Natural oak and walnut veneers.', image: '/Wood Veneer Wardrobes.jfif' },
    { title: 'Glass Finish', desc: 'Tinted and fluted glass panels.', image: '/Glass Finish Wardrobes.jfif' },
    { title: 'Mirror Finish', desc: 'Reflective mirror door fronts.', image: '/Mirror Finish wardrobe.jfif' },
    { title: 'Fluted Panels', desc: 'Tactile grooved wood and metal panels.', image: '/Fluted Panels wardrobe.jfif' },
    { title: 'Textured Laminates', desc: 'Linen and woven-texture surfaces.', image: '/Textured Laminates Wardrobes.jfif' },
    { title: 'Aluminium Profiles', desc: 'Slim anodized door frames.', image: '/Aluminium Profiles wardrobe.jfif' },
  ],

  wardrobeProjects: [
    { id: 'w-01', title: 'Residence Villa 01', tag: 'Walk-In Dressing Room', image: wardrobeDressingImg, alt: 'Residence Villa 01' },
    { id: 'w-02', title: 'Penthouse Suite 02', tag: 'Smoked Glass Sliding System', image: wardrobeGlassImg, alt: 'Penthouse Suite 02' },
    { id: 'w-03', title: 'Estate Master Suite 03', tag: 'Fluted Walnut Hinged Doors', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90', alt: 'Estate Master Suite 03' },
    { id: 'w-04', title: 'Coastal Haven 04', tag: 'Integrated LED Vitrine', image: wardrobeGlassImg, alt: 'Coastal Haven 04' },
    { id: 'w-05', title: 'Metropolitan Apartment 05', tag: 'Matte Charcoal & Velvet Drawers', image: wardrobeDressingImg, alt: 'Metropolitan Apartment 05' },
    { id: 'w-06', title: 'Minimalist Loft 06', tag: 'Custom Leather & Anodized Bronze', image: wardrobeGlassImg, alt: 'Minimalist Loft 06' },
  ],

  layouts: {
    lShape: '/L-Shape Layout.webp',
    uShape: '/U -Shape Layout.webp',
    island: '/Island Layout.webp',
    parallel: '/Parallel Layout.webp',
    straight: '/Straight Layout.webp',
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

  projects: [
    {
      id: 'p-01',
      title: 'Skyline Monolithic Island',
      category: 'LUXURY KITCHEN',
      tag: 'Italian Dark Marble • Soft LED Accent',
      image: '/Skyline Monolithic Island.webp',
      alt: 'Skyline Monolithic Luxury Kitchen',
      link: '/modular-kitchens',
    },
    {
      id: 'p-02',
      title: 'Master Walk-In Dressing Suite',
      category: 'LUXURY WARDROBE',
      tag: 'Velvet Drawers • Sensor Strip LED',
      image: '/Master Walk-In Dressing Suite.webp',
      alt: 'Master Walk-In Dressing Suite Wardrobe',
      link: '/modular-wardrobes',
    },
    {
      id: 'p-03',
      title: 'The Opus Penthouse Kitchen',
      category: 'LUXURY KITCHEN',
      tag: 'Calacatta Marble • Smoked Oak Joinery',
      image: '/The Opus Penthouse Kitchen.jfif',
      alt: 'The Opus Penthouse Luxury Kitchen',
      link: '/modular-kitchens',
    },
    {
      id: 'p-04',
      title: 'Smoked Glass Vitrine Wardrobe',
      category: 'LUXURY WARDROBE',
      tag: 'Tinted Glass • Anodized Bronze Frame',
      image: '/Smoked Glass Vitrine Wardrobe.webp',
      alt: 'Smoked Glass Vitrine Modular Wardrobe',
      link: '/modular-wardrobes',
    },
    {
      id: 'p-05',
      title: 'Grand Villa Culinary Atelier',
      category: 'LUXURY KITCHEN',
      tag: 'High Gloss Lacquer • Fluted Glass',
      image: '/Grand Villa Estate.webp',
      alt: 'Grand Villa Culinary Atelier Kitchen',
      link: '/modular-kitchens',
    },
    {
      id: 'p-06',
      title: 'Fluted Walnut Executive Wardrobe',
      category: 'LUXURY WARDROBE',
      tag: 'Natural Walnut • Soft-Close Joinery',
      image: '/Fluted Walnut Executive Wardrobe.webp',
      alt: 'Fluted Walnut Executive Wardrobe',
      link: '/modular-wardrobes',
    },
    {
      id: 'p-07',
      title: 'Architectural Handleless Kitchen',
      category: 'LUXURY KITCHEN',
      tag: 'Integrated Appliances • Metallic Matte',
      image: '/Architectural Handleless Kitchen.jfif',
      alt: 'Architectural Handleless Kitchen',
      link: '/modular-kitchens',
    },
    {
      id: 'p-08',
      title: 'Contemporary Leather Dressing Suite',
      category: 'LUXURY WARDROBE',
      tag: 'Bespoke Leather • Illuminated Shoe Display',
      image: '/Contemporary Leather Dressing Suite.jfif',
      alt: 'Contemporary Leather Dressing Suite',
      link: '/modular-wardrobes',
    },
  ],
};

export default images;
