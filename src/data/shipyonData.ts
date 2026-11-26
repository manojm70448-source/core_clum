export interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  origin: string;
  specs: {
    grade?: string;
    size?: string;
    moisture?: string;
    purity?: string;
    packaging: string;
    minOrder: string;
    shelfLife?: string;
    temperature?: string;
  };
  description: string;
  image: string;
  features: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  shortDesc: string;
  bannerImage: string;
  iconName: string;
  itemCount: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'vegetables',
    name: 'Fresh Produce & Vegetables',
    shortDesc: 'Farm-fresh bulk vegetables, shallots, drumsticks, coconuts & root crops harvested daily across Tamil Nadu.',
    bannerImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    iconName: 'Carrot',
    itemCount: 6,
  },
  {
    id: 'spices',
    name: 'Spices & Plantation Crops',
    shortDesc: 'World-renowned Guntur chilies, Malabar pepper, Salem turmeric & Alleppey cardamom directly from plantations.',
    bannerImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    iconName: 'Flame',
    itemCount: 6,
  },
  {
    id: 'fruits',
    name: 'Fresh Fruits & Perishables',
    shortDesc: 'Cold-chain protected Cavendish bananas, Alphonso/Banganapalli mangoes & calibrated pomegranates.',
    bannerImage: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    iconName: 'Apple',
    itemCount: 3,
  },
  {
    id: 'processed',
    name: 'Processed & Value-Added Goods',
    shortDesc: 'Dehydrated vegetables, seedless tamarind slabs, cold-pressed virgin coconut oil and spice oleoresins.',
    bannerImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sparkles',
    itemCount: 4,
  },
  {
    id: 'industrial',
    name: 'Industrial & Coir Supplies',
    shortDesc: 'Pattukkottai & Pollachi washed low-EC coir pith blocks, coir geotextiles, erosion control nets & packaging.',
    bannerImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    iconName: 'Boxes',
    itemCount: 3,
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'coconuts',
    name: 'Semi-Husked Fresh Matured Coconuts',
    category: 'vegetables',
    tagline: 'High water volume and thick sweet copra from Pattukkottai & Pollachi groves',
    origin: 'Pattukkottai & Thanjavur Belt, Tamil Nadu',
    specs: {
      grade: 'Export AAA Grade Fully Matured',
      size: 'Weight: 550g - 650g & 650g+ per nut',
      packaging: '25 Nuts per PP mesh bag (Approx 13-14 kg/bag)',
      minOrder: '1 x 40ft HC Container (2050 Bags / 51,250 Nuts)',
      shelfLife: '60 - 75 days in ventilated/reefer containers',
      temperature: '+12°C to +14°C',
    },
    description: 'Pattukkottai in the Cauvery Delta is celebrated as the coconut heartland of South India. Sourced directly from local grove farmers, dehusked, antifungal-treated, dried, and packed in ventilated mesh bags for sea container dispatch.',
    image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80',
    features: ['High Kernel Thickness', 'Naturally Sweet Water', 'Zero Fungus Treatment', 'V.O.C. Tuticorin & Chennai Port Stacking'],
  },
  {
    id: 'shallots',
    name: 'South Indian Shallots (Small Onions)',
    category: 'vegetables',
    tagline: 'Authentic pungent red shallots with rich culinary aroma',
    origin: 'Dharapuram, Dindigul & Perambalur, Tamil Nadu',
    specs: {
      grade: 'Export Grade A (Uniform Shape & Skin)',
      size: '20mm - 30mm & 25mm - 35mm diameter',
      moisture: 'Cured & dry skinned',
      packaging: '5kg, 10kg, 20kg Red Leno Mesh Bags / Jute Bags',
      minOrder: '1 x 20ft / 40ft Reefer Container (14 - 28 MT)',
      shelfLife: '60 - 90 days under controlled ventilation',
      temperature: '+2°C to +4°C in transit',
    },
    description: 'Prized across Southeast Asia, the GCC, and Sri Lanka for intense pungency and medicinal properties. Mechanically cleaned, graded, and cured to eliminate moisture before containerization.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    features: ['Machine Graded & Calibrated', 'Phytosanitary Certified', 'Zero Sprouting Guarantee', 'Reefer Container Stacking'],
  },
  {
    id: 'guntur-chilli',
    name: 'Guntur S4 & Teja Hot Red Chilies',
    category: 'spices',
    tagline: 'High pungent hot red dry chilies with deep crimson color',
    origin: 'Guntur & Prakasam, Andhra Pradesh',
    specs: {
      grade: 'Grade 1 / Premium Stemless or With Stem',
      moisture: 'Below 10%',
      purity: '99.5% Free from extraneous matter',
      packaging: '10kg, 25kg, 50kg Jute Bags or PP bags with inner liner',
      minOrder: '1 x 20ft FCL (6.5 - 7 MT) / 40ft HC (14 MT)',
      shelfLife: '12 Months in cool, dry warehouse',
    },
    description: 'Sourced from Asia’s premier spice market in Guntur. S4/334, Teja (S17), and Byadgi varieties tested for SHU heat units and ASTA color values to satisfy international food safety standards.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    features: ['High Capsaicin (60k - 90k SHU)', 'Aflatoxin Tested (< 5-10 ppb)', 'Sun Dried & Moisture Regulated', 'Spices Board Certified'],
  },
  {
    id: 'drumsticks',
    name: 'Fresh Moringa Drumsticks',
    category: 'vegetables',
    tagline: 'Crisp, slender tender green pods rich in nutrients',
    origin: 'Theni, Dindigul & Karur, Tamil Nadu',
    specs: {
      grade: 'Export AAA Grade',
      size: 'Length 45cm to 65cm, Diameter 15-20mm',
      packaging: '4kg & 5kg Corrugated 5-Ply Export Boxes',
      minOrder: '500 kg (Air Freight) / 1 x 20ft Reefer (Sea)',
      shelfLife: '15 - 20 days under cold chain',
      temperature: '+7°C to +10°C, 85-90% RH',
    },
    description: 'Harvested fresh daily at sunrise, sorted, pre-cooled, and packed in ventilated export cartons to maintain crisp tenderness during air dispatch to the Middle East, Europe, and Singapore.',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
    features: ['Daily Farm Harvest', 'Hydro-Cooled & Sanitized', 'Air Freight Ready in 24h', 'Uniform Tender Thickness'],
  },
  {
    id: 'black-pepper',
    name: 'Malabar Black Pepper (TGSEB)',
    category: 'spices',
    tagline: 'Tellicherry Garbled Extra Bold black peppercorns',
    origin: 'Idukki & Wayanad, Kerala / Coorg, Karnataka',
    specs: {
      grade: 'TGSEB / TGL / 500-550-600 g/l density',
      size: '4.25mm - 4.75mm diameter bold berries',
      moisture: 'Max 11.5%',
      purity: '99.5% Minimum',
      packaging: '25kg & 50kg Multi-wall Kraft Paper or Jute Bags',
      minOrder: '1 x 20ft FCL (15 MT)',
      shelfLife: '24 Months in cool dry storage',
    },
    description: 'The ancient "Black Gold" of South India. Sourced from rain-washed Western Ghats hillsides. Sun-dried, graded by berry size, spiral-cleaned to remove light berries and dust, delivering unmatched piperine aroma.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    features: ['High Piperine (6-7%)', 'High Volatile Oil (> 2%)', 'Certified Machine Garbled', 'Origin Geo-Tagged Traceability'],
  },
  {
    id: 'turmeric',
    name: 'Salem & Erode Polished Turmeric Fingers',
    category: 'spices',
    tagline: 'High curcumin golden yellow dried turmeric fingers',
    origin: 'Erode & Salem, Tamil Nadu',
    specs: {
      grade: 'Double Polished Nizam / Salem Bold Fingers',
      moisture: 'Max 10%',
      purity: 'Curcumin content: 3.5% to 5.2%',
      packaging: '25kg, 50kg Jute bags with inner poly lining',
      minOrder: '1 x 20ft FCL (18 MT)',
      shelfLife: '24 Months',
    },
    description: 'Erode and Salem produce turmeric with the highest natural curcumin levels. Cleaned, boiled, sun-cured, and double polished for export to spice extractors, pharma, and global food importers.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    features: ['3.5% - 5.0% Guaranteed Curcumin', 'Zero Added Color / Lead Free', 'Double Polished Shiny Finish', 'Agmark & Spices Board Certified'],
  },
  {
    id: 'cardamom',
    name: 'Alleppey Green Cardamom (8mm Bold)',
    category: 'spices',
    tagline: 'Queen of Spices with intense floral cineole notes',
    origin: 'Bodinaickanur & Idukki, Cardamom Hills',
    specs: {
      grade: 'AGEB (Alleppey Green Extra Bold) 8mm+',
      moisture: 'Max 10%',
      packaging: 'Aroma-sealed 5kg aluminum foil bags inside master carton',
      minOrder: '500 kg (Air) / 5 MT (Sea)',
      shelfLife: '18 Months vacuum sealed',
    },
    description: 'Harvested by hand from the misty slopes of the Western Ghats. Cured in specialized smokehouses to retain vibrant emerald hue and volatile oils.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    features: ['Uniform 8mm+ Extra Bold Pods', 'Lush Natural Green', 'Vacuum Sealed in Nitrogen', 'Rich in Cineole and Terpinyl'],
  },
  {
    id: 'coir-pith',
    name: 'Low-EC Washed Coco Peat Blocks (5kg)',
    category: 'industrial',
    tagline: 'Premium horticultural growing medium from Pattukkottai & Pollachi',
    origin: 'Pattukkottai & Pollachi, Tamil Nadu',
    specs: {
      grade: 'Low EC (< 0.5 mS/cm washed with fresh water)',
      size: '30 x 30 x 12 cm (5kg block, expands to 75 Liters)',
      moisture: 'Below 15%',
      packaging: 'Palletized & stretch wrapped (220 blocks/pallet)',
      minOrder: '1 x 40ft HC Container (24 - 26 MT / 5200 Blocks)',
      shelfLife: 'Indefinite',
    },
    description: 'Produced from natural coconut husks in the coconut belts of Pattukkottai and Pollachi. Sun-dried on clean concrete floors, triple-washed with sweet water to lower EC, and compressed 5:1 for export.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    features: ['Triple Washed Low EC (<0.5)', 'High Expansion Ratio (>15L/kg)', 'Zero Weed Seeds / Pathogens', 'Palletized Container Loading'],
  },
  {
    id: 'bananas',
    name: 'Cavendish G9 Green Export Bananas',
    category: 'fruits',
    tagline: 'Pesticide-tested, ethylene-regulated dessert bananas',
    origin: 'Tiruchirappalli & Theni, Tamil Nadu',
    specs: {
      grade: 'Class 1 Export Grade (Calibration: 39 - 46 mm)',
      size: 'Finger Length: Minimum 18 - 22 cm',
      packaging: '13.5 kg / 18.14 kg Telescopic Cartons with foam dividers',
      minOrder: '1 x 40ft Reefer (1540 boxes / 20 MT)',
      shelfLife: '30 - 45 days green life in reefer transit',
      temperature: '+13.5°C constant temperature',
    },
    description: 'Grown along the fertile Cauvery basin, our Cavendish G9 bananas are de-handed, washed in food-safe alum bath, foam-padded, vacuum packed, and shipped under cold-chain to Gulf and European ports.',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    features: ['GlobalGAP Compliant', 'Anti-Bruise Packaged', '35+ Days Green Life', 'Ethylene Absorber Sachets'],
  },
  {
    id: 'tamarind',
    name: 'Seedless Pressed Tamarind Slabs',
    category: 'processed',
    tagline: 'Tangy culinary tamarind blocks & pure paste',
    origin: 'Dharmapuri & Krishnagiri, Tamil Nadu',
    specs: {
      grade: 'Seedless Export Grade (Fiber Free)',
      moisture: '15% - 18%',
      packaging: '200g, 500g, 1kg retail packs & 10kg bulk blocks',
      minOrder: '5 MT / 1 x 20ft FCL',
      shelfLife: '18 Months',
    },
    description: 'Matured sour tamarind naturally dehusked, deseeded, defibered, and hydraulic-pressed into dense slabs. No added chemicals, ready for international food processors.',
    image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&w=800&q=80',
    features: ['100% Deseeded & Cleaned', 'Natural Preservative Free', 'Vacuum Sealed Bricks', 'Rich Organic Tartaric Acid'],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Farm-Level Direct Sourcing',
    subtitle: 'From Pattukkottai, Pollachi & Guntur',
    description: 'We partner directly with coconut groves, vegetable clusters, and spice growers across Tamil Nadu and Andhra Pradesh. We monitor cultivation schedules, optimal harvesting, and zero-chemical handling.',
    icon: 'Trees',
    tags: ['Grove Partnerships', 'Harvest Monitoring', 'Origin Traceability'],
    highlight: '500+ Partner Farms',
  },
  {
    step: '02',
    title: 'Multi-Point Grading & QC',
    subtitle: 'Rigorous Lab Testing & Calibration',
    description: 'Harvested commodities pass through mechanized sorting, dry-brushing, moisture auditing, and APEDA/FSSAI laboratory testing. Any unit deviating from export grade is filtered out immediately.',
    icon: 'CheckCircle2',
    tags: ['Size Calibration', 'Aflatoxin & Pesticide Labs', 'Zero Rot Protocol'],
    highlight: '99.8% Approval Rate',
  },
  {
    step: '03',
    title: 'Cold-Chain & Custom Packaging',
    subtitle: 'Reefer Stacking & Modified Atmosphere',
    description: 'Perishables enter automated pre-cooling units within hours of picking. Packaging is tailored to international standards—ventilated leno bags, corrugated telescopic cartons, and palletized vacuum packs.',
    icon: 'Snowflake',
    tags: ['+2°C to +14°C Controlled', 'Ethylene Regulated', 'Palletized Shrink Wrap'],
    highlight: '100% Cold-Chain Continuity',
  },
  {
    step: '04',
    title: 'Global Freight & Customs',
    subtitle: 'Maritime Corridors to 50+ Countries',
    description: 'Complete statutory documentation handled: Phytosanitary Certificates, Certificates of Origin, Bill of Lading, and customs clearings dispatched out of Tuticorin, Chennai, and Cochin container terminals.',
    icon: 'Ship',
    tags: ['APEDA / FSSAI Documentation', 'FOB / CIF / CFR Terms', 'Port-to-Port Tracking'],
    highlight: '50+ Global Destinations',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Direct Farm-to-Freight Traceability',
    description: 'Every shipment is geo-tagged to its farm cluster origin in Pattukkottai and regional belts, guaranteeing freshness, zero adulteration, and transparent agricultural practices.',
    icon: 'Compass',
  },
  {
    title: 'Strategic Maritime Gateways',
    description: 'Proximity to Tuticorin (V.O.C.), Chennai, and Cochin container terminals guarantees rapid container loading and the shortest sailing times to the GCC, SEA, and Europe.',
    icon: 'Anchor',
  },
  {
    title: 'Complete Export Documentation',
    description: 'End-to-end management of Phytosanitary inspections, Certificate of Origin, GST export compliance, customs handling, and ocean bill of lading.',
    icon: 'FileCheck',
  },
  {
    title: 'Advanced Cold-Chain Infrastructure',
    description: 'Pre-cooling facilities, reefer transport, and atmosphere-controlled containerization protect produce crispness across voyages up to 35 days.',
    icon: 'ThermometerSnowflake',
  },
  {
    title: 'Flexible Global Incoterms & Volume',
    description: 'Support for FOB, CIF, CFR, and CNF trade agreements with flexible order sizes—from trial pallet orders to multiple 40ft High Cube container contracts.',
    icon: 'Scale',
  },
  {
    title: 'Dedicated Export Desk',
    description: 'Direct communication channels with Proprietor & Exporter Prabhakaran and trade officers for real-time shipment updates and custom specifications.',
    icon: 'Headphones',
  },
];

export const COMPANY_STATS = [
  { value: '50+', label: 'Global Destinations', detail: 'Serving importers in GCC, Europe, SEA & North America' },
  { value: '15,000+ MT', label: 'Annual Sourcing Capacity', detail: 'Bulk agricultural produce & commodities moved annually' },
  { value: '500+', label: 'Partner Farmers', detail: 'Contracted growers across Pattukkottai, Pollachi & Guntur' },
  { value: '99.8%', label: 'On-Time Vessel Dispatch', detail: 'Precision logistics with zero port detention record' },
];

export const TRADE_CORRIDORS = [
  {
    region: 'Middle East & GCC',
    countries: ['United Arab Emirates (Jebel Ali)', 'Saudi Arabia (Jeddah / Dammam)', 'Oman (Sohar)', 'Qatar (Hamad Port)', 'Kuwait'],
    transitDays: '4 - 7 Days by Sea / 6 Hours Air',
    leadCommodities: 'Coconuts, Shallots, Drumsticks, Guntur Chilies',
  },
  {
    region: 'Southeast Asia',
    countries: ['Singapore (Jurong / PSA)', 'Malaysia (Port Klang)', 'Indonesia', 'Sri Lanka (Colombo)'],
    transitDays: '5 - 8 Days by Sea',
    leadCommodities: 'Coconuts, Shallots, Black Pepper, Turmeric, Tamarind',
  },
  {
    region: 'Europe & UK',
    countries: ['United Kingdom (Felixstowe / London Gateway)', 'Germany (Hamburg)', 'Netherlands (Rotterdam)', 'France'],
    transitDays: '18 - 24 Days by Sea / 12 Hours Air',
    leadCommodities: 'Alleppey Cardamom, Black Pepper, Coco Peat, Mangoes',
  },
  {
    region: 'North America',
    countries: ['United States (New York / Los Angeles / Houston)', 'Canada (Montreal / Vancouver)'],
    transitDays: '28 - 35 Days by Sea',
    leadCommodities: 'Spices, Dehydrated Foods, Coco Peat Growing Medium',
  },
];

export const CERTIFICATIONS = [
  { name: 'GOVT RECOGNIZED', desc: 'Ministry of Commerce & Industry Certified Export House' },
  { name: 'APEDA', desc: 'Agricultural & Processed Food Products Export Development Authority' },
  { name: 'Spices Board India', desc: 'Ministry of Commerce & Industry, Govt of India' },
  { name: 'FSSAI Export Certified', desc: 'Food Safety and Standards Authority of India' },
  { name: 'Phytosanitary', desc: 'Plant Quarantine & Sanitary Inspection Clearance' },
  { name: 'IEC Registered', desc: 'Directorate General of Foreign Trade (DGFT)' },
];

export const CONTACT_INFO = {
  name: 'CORE & CULM',
  legalName: 'Core & Culm Global Exports',
  tagline: "Nature's Strength. Global Reach.",
  subTagline: "From Nature to the World",
  proprietor: 'Prabhakaran',
  designation: 'Proprietor & Exporter',
  gst: '33EBBPG3505C1ZH',
  address: {
    street: '100/19, Kandiyan Street',
    city: 'Pattukkottai',
    district: 'Thanjavur District',
    state: 'Tamil Nadu',
    country: 'India',
    fullText: '100/19, Kandiyan Street, Pattukkottai, Tamil Nadu, India.',
  },
  phones: [
    { label: 'Primary Contact', number: '+91 89253 62787', raw: '+918925362787' },
    { label: 'Export Desk', number: '+91 78711 08232', raw: '+917871108232' },
  ],
  emails: ['Coreandculm@gmail.com'],
  whatsapp: '918925362787',
  operatingPorts: ['Tuticorin Port (V.O. Chidambaranar)', 'Chennai Port', 'Cochin Port (Vallarpadam)', 'Tiruchirappalli / Chennai Air Cargo'],
  images: {
    businessCard: '/assets/business_card.png',
    brandBanner: '/assets/brand_banner.png',
    logoEmblem: '/assets/logo_emblem.png',
    logoIcon: '/assets/logo_icon.png',
    logo: '/assets/logo.png',
  },
  pillars: [
    { title: 'NATURAL GOODNESS', desc: 'Directly sourced unadulterated produce' },
    { title: 'PREMIUM QUALITY', desc: 'Strict lab grading & calibration' },
    { title: 'GLOBAL EXPORTS', desc: 'Shipping to 50+ world container ports' },
    { title: 'DELIVERING WORLDWIDE', desc: 'Unbroken cold-chain & documentation' },
  ]
};
