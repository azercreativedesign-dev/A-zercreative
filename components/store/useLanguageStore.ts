"use client"
import { create } from 'zustand'

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  client: string;
  year: string;
  results: string;
  tags: string[];
  imageSrc: string;
}

export interface TranslationSchema {
  // Navigation & Core Action Keys
  home: string;
  portfolio: string;
  pricing: string;
  about: string;
  contact: string;
  contactTitle: string;
  services: string;
  serviceList: string[];
  getQuote: string;
  getStarted: string;
  navigation: string;
  submit: string;
  initiating: string;
  concept: string;
  to: string;
  screen: string;
  interactionReady: string;
  
  // Portfolio Specific
  portfolioHeroTop: string;
  portfolioHeroBottom: string;
  visualArchive: string;
  selectedTitle: string;
  artifactsSubtitle: string;
  caseStudy: string;
  closeArchive: string;
  artifactDetails: string;
  partnerLabel: string;
  metricLabel: string;
  startProject: string;
  categories: string[];
  projects: Project[];

  // Pricing Specific
  pricingTiers: string;
  pricingValue: string;
  executionLabel: string;
  bespokeValue: string;
  securityLabel: string;
  verifiedValue: string;
  strategyLabel: string;
  eliteValue: string;
  scalabilityLabel: string;
  infiniteValue: string;
  settlementTitle: string;
  requestProposal: string;
  starterPlan: string;
  growthPlan: string;
  premiumPlan: string;

  // Services, About & Contact
  getIn: string;
  touch: string;
  contactDesc: string;
  secureEmail: string;
  hotline: string;
  presence: string;
  fullName: string;
  emailAddr: string;
  capability: string;
  brief: string;
  vision: string;
  encrypted: string;
  initiate: string;
  transmitting: string;
  success: string;
  legals: string;
  footerDesc: string;
  joinCommunity: string;
  privacy: string;
  terms: string;
  cookies: string;
  license: string;
  protocolTitle: string;
  presenceTitle: string;
  ascent: string;
  identityVerified: string;
  born: string;
  hybrid: string;
  aboutUnit: string;
  neuralEngine: string;
  motion: string;
  motionDesc: string;
  the: string;
  theFounder: string;
  legacyQuote: string;
  founderDesc: string;
  requestPortfolio: string;
  precision: string;
  uptime: string;
  assets: string;
  ratio: string;
  high: string;
  servicesTitle: string;
  servicesSubtitle: string;
  coreTitle: string;
  coreSubtitle: string;
  design: string;
  designDesc: string;
  strategy: string;
  strategyDesc: string;
  production: string;
  productionDesc: string;
  intelligence: string;
  intelligenceDesc: string;
  layering: string;
  layeringDesc: string;
  signal: string;
  signalDesc: string;
  depth: string;
  depthDesc: string;
  final: string;
  output: string;
}

interface LanguageState {
  lang: string;
  t: TranslationSchema;
  setLanguage: (lang: string) => void;
}

const EN_PROJECTS: Project[] = [
  { id: 1, title: "TechVision Identity", category: "Branding", description: "Complete brand overhaul for a tech startup.", client: "TechVision Inc.", year: "2024", results: "40% RECOGNITION BOOST", tags: ["Logo", "Identity"], imageSrc: "/web1.png" },
  { id: 2, title: "GreenLeaf Social", category: "Social Media", description: "Engaging eco-friendly social campaign.", client: "GreenLeaf Co.", year: "2024", results: "150% ENGAGEMENT", tags: ["Strategy", "Animation"], imageSrc: "/web2.png" },
  { id: 3, title: "Urban Eats UI", category: "Web Design", description: "Elite digital experience for food delivery.", client: "Urban Eats", year: "2023", results: "25% CONVERSION", tags: ["Web", "UI"], imageSrc: "/web3.png" },
  { id: 4, title: "Artisan Packaging", category: "Print", description: "Premium specialty coffee packaging.", client: "Artisan Roasters", year: "2024", results: "PACKAGING AWARD", tags: ["Packaging", "Print"], imageSrc: "/branding2.png" },
  { id: 5, title: "FitLife App", category: "Branding", description: "Dynamic identity for fitness tech.", client: "FitLife", year: "2023", results: "500K+ DOWNLOADS", tags: ["App", "Style Guide"], imageSrc: "/hero-sample.png" },
];

const ET_PROJECTS: Project[] = [
  { id: 1, title: "ቴክ-ቪዥን መለያ", category: "ብራንዲንግ", description: "ለቴክኖሎጂ ጀማሪ ድርጅት የተሰራ ሙሉ የብራንድ ለውጥ።", client: "ቴክ-ቪዥን", year: "2024", results: "40% የእውቅና እድገት", tags: ["ሎጎ", "መለያ"], imageSrc: "/web1.png" },
  { id: 2, title: "ግሪን-ሊፍ ማህበራዊ", category: "ማህበራዊ ገጽ", description: "ለተፈጥሮ ተስማሚ ምርቶች የቀረበ የማህበራዊ ገጽ ዘመቻ።", client: "ግሪን-ሊፍ", year: "2024", results: "150% ተሳትፎ", tags: ["ስትራቴጂ", "አኒሜሽን"], imageSrc: "/web2.png" },
  { id: 3, title: "አርባን ኢትስ UI", category: "ድረ-ገጽ", description: "ለምግብ ማቅረቢያ መድረክ የተሰራ ዘመናዊ ዲጂታል ተሞክሮ።", client: "አርባን ኢትስ", year: "2023", results: "25% ሽያጭ እድገት", tags: ["ድረ-ገጽ", "UI"], imageSrc: "/web3.png" },
  { id: 4, title: "አርቲሳን ማሸጊያ", category: "ህትመት", description: "ለልዩ ቡና ምርት የተሰራ ከፍተኛ ጥራት ያለው ማሸጊያ።", client: "አርቲሳን ሮስተርስ", year: "2024", results: "የማሸጊያ ሽልማት", tags: ["ማሸጊያ", "ህትመት"], imageSrc: "/branding2.png" },
  { id: 5, title: "ፊት-ላይፍ መተግበሪያ", category: "ብራንዲንግ", description: "ለአካል ብቃት መተግበሪያ የተሰራ ንቁ መለያ።", client: "ፊት-ላይፍ", year: "2023", results: "500ሺ+ ጭነቶች", tags: ["መተግበሪያ", "መመሪያ"], imageSrc: "/hero-sample.png" },
];

const translations: Record<string, TranslationSchema> = {
  EN: {
    home: "Home", 
    portfolio: "Portfolio", 
    pricing: "Pricing", 
    about: "About", 
    contact: "Contact",
    contactTitle: "Get in Touch", 
    services: "Services", 
    serviceList: ["Full Branding", "Social Growth", "UI/UX Design", "Print Assets"],
    getQuote: "Get Quote", 
    getStarted: "LAUNCH", 
    navigation: "Navigation", 
    submit: "Submit",
    initiating: "Initiating_Render", 
    concept: "CONCEPT", 
    to: "TO", 
    screen: "SCREEN", 
    interactionReady: "Interaction_Ready",
    portfolioHeroTop: "DEFINING", 
    portfolioHeroBottom: "LEGACY.",
    visualArchive: "Visual Archive", 
    selectedTitle: "Selected", 
    artifactsSubtitle: "Artifacts",
    caseStudy: "Case Study", 
    closeArchive: "Close_Archive", 
    artifactDetails: "Artifact Details",
    partnerLabel: "Partner", 
    metricLabel: "Metric", 
    startProject: "Start_Project",
    categories: ["All", "Branding", "Social Media", "Web Design", "Print"],
    projects: EN_PROJECTS,
    pricingTiers: "TIERS.", 
    pricingValue: "VALUE", 
    executionLabel: "Execution",
    bespokeValue: "Bespoke", 
    securityLabel: "Security", 
    verifiedValue: "Verified",
    strategyLabel: "Strategy", 
    eliteValue: "Elite", 
    scalabilityLabel: "Scalability",
    infiniteValue: "Infinite", 
    settlementTitle: "Settlement Gateways",
    requestProposal: "Request Proposal", 
    starterPlan: "Starter",
    growthPlan: "Growth", 
    premiumPlan: "Premium",
    getIn: "GET", 
    touch: "IN TOUCH", 
    contactDesc: "Ready to elevate your brand?",
    secureEmail: "SECURE EMAIL", 
    hotline: "DIRECT HOTLINE", 
    presence: "DIGITAL PRESENCE",
    fullName: "FULL NAME", 
    emailAddr: "EMAIL ADDRESS", 
    capability: "SELECTED CAPABILITY",
    brief: "THE PROJECT BRIEF", 
    vision: "Tell us about your vision...",
    encrypted: "ENCRYPTED SESSION ACTIVE", 
    initiate: "INITIATE PROJECT",
    transmitting: "TRANSMITTING...", 
    success: "✦ Transmission Successful.",
    legals: "Legals", 
    footerDesc: "High-fidelity digital engineering.",
    joinCommunity: "JOIN_COMMUNITY", 
    privacy: "Privacy", 
    terms: "Terms",
    cookies: "Cookies", 
    license: "License", 
    protocolTitle: "COMMUNICATION_PROTOCOL",
    presenceTitle: "Digital_Presence", 
    ascent: "Initialize_Ascent",
    identityVerified: "IDENTITY_VERIFIED // A-ZER_PROTOCOL", 
    born: "BORN",
    hybrid: "HYBRID", 
    aboutUnit: "A DIGITAL ARCHITECT.", 
    neuralEngine: "NEURAL_ENGINE_STACK",
    motion: "Motion", 
    motionDesc: "Kinetic Energy.", 
    the: "THE",
    theFounder: "FOUNDER", 
    legacyQuote: "Synthesis of science and art.",
    founderDesc: "General Practitioner & Digital Strategist.", 
    requestPortfolio: "REQUEST_ACCESS_PORTFOLIO",
    precision: "PRECISION", 
    uptime: "UPTIME", 
    assets: "ASSETS_GENERATED",
    ratio: "SIGMA_RATIO", 
    high: "HIGH", 
    servicesTitle: "CAPABILITIES",
    servicesSubtitle: "Expertise scales with vision.", 
    coreTitle: "CORE",
    coreSubtitle: "SOLUTIONS", 
    design: "Design", 
    designDesc: "Visual languages.",
    strategy: "Strategy", 
    strategyDesc: "Data-driven roadmaps.", 
    production: "Production",
    productionDesc: "High-fidelity execution.", 
    intelligence: "Intelligence",
    intelligenceDesc: "Deep analysis.", 
    layering: "Layering", 
    layeringDesc: "Visual Stacking.",
    signal: "Signal", 
    signalDesc: "Precision Output.", 
    depth: "Depth",
    depthDesc: "Spatial Identity.", 
    final: "THE FINAL", 
    output: "OUTPUT",
  },
  ET: {
    home: "መነሻ", 
    portfolio: "ስራዎች", 
    pricing: "ዋጋ", 
    about: "ስለ እኛ", 
    contact: "ይገናኙ",
    contactTitle: "ያግኙን", 
    services: "አገልግሎቶች", 
    serviceList: ["ሙሉ ብራንዲንግ", "የማህበራዊ ገጽ እድገት", "UI/UX ዲዛይን", "የህትመት ስራዎች"],
    getQuote: "ዋጋ ይጠይቁ", 
    getStarted: "ጀምር", 
    navigation: "አሰሳ", 
    submit: "ላክ",
    initiating: "አተገባበር_በመጀመር_ላይ", 
    concept: "ሀሳብ", 
    to: "ወደ", 
    screen: "ስክሪን", 
    interactionReady: "ለግንኙነት_ዝግጁ",
    portfolioHeroTop: "ታላቅነትን", 
    portfolioHeroBottom: "መቅረጽ.",
    visualArchive: "የእይታ ማህደር", 
    selectedTitle: "የተመረጡ", 
    artifactsSubtitle: "ስራዎች",
    caseStudy: "ጥልቅ ትንተና", 
    closeArchive: "ዝጋ_ማህደር", 
    artifactDetails: "የስራው ዝርዝር",
    partnerLabel: "አጋር", 
    metricLabel: "ውጤት", 
    startProject: "ፕሮጀክት_ጀምር",
    categories: ["ሁሉም", "ብራንዲንግ", "ማህበራዊ ገጽ", "ድረ-ገጽ", "ህትመት"],
    projects: ET_PROJECTS,
    pricingTiers: "ደረጃዎች.", 
    pricingValue: "ዋጋ", 
    executionLabel: "አተገባበር",
    bespokeValue: "ልዩ", 
    securityLabel: "ደህንነት", 
    verifiedValue: "የተረጋገጠ",
    strategyLabel: "ስትራቴጂ", 
    eliteValue: "ምርጥ", 
    scalabilityLabel: "መጠነ-ሰፊነት",
    infiniteValue: "ወሰን የለሽ", 
    settlementTitle: "የክፍያ አማራጮች",
    requestProposal: "ጥያቄ ያቅርቡ", 
    starterPlan: "ጀማሪ",
    growthPlan: "እድገት", 
    premiumPlan: "ከፍተኛ",
    getIn: "ያግኙን", 
    touch: "", 
    contactDesc: "ብራንድዎን ለማሳደግ ተዘጋጅተዋል?",
    secureEmail: "ደህንነቱ የተጠበቀ ኢሜይል", 
    hotline: "ቀጥታ ስልክ", 
    presence: "ማህበራዊ ገጾች",
    fullName: "ሙሉ ስም", 
    emailAddr: "የኢሜይል አድራሻ", 
    capability: "የተመረጠ አገልግሎት",
    brief: "የፕሮጀክቱ መግለጫ", 
    vision: "ራዕይዎን ይንገሩን...",
    encrypted: "የተመሰጠረ ግንኙነት ንቁ ነው", 
    initiate: "ፕሮጀክቱን ጀምር",
    transmitting: "በመላክ ላይ...", 
    success: "✦ መልእክቱ በተሳካ ሁኔታ ተልኳል።",
    legals: "ህጋዊ", 
    footerDesc: "ከፍተኛ ጥራት ያለው ዲጂታል ምህንድስና።",
    joinCommunity: "ማህበረሰቡን ይቀላቀሉ", 
    privacy: "ግላዊነት", 
    terms: "ውሎች",
    cookies: "ኩኪዎች", 
    license: "ፈቃድ", 
    protocolTitle: "የግንኙነት_ስርዓት",
    presenceTitle: "ዲጂታል_መገኘት", 
    ascent: "ወደ_ላይ_ተመለስ",
    identityVerified: "ማንነት_ተረጋግጧል // A-ZER_PROTOCOL", 
    born: "የተወለደ",
    hybrid: "ድብልቅ", 
    aboutUnit: "ዲጂታል አርክቴክት።", 
    neuralEngine: "የቴክኖሎጂ_ቁልል",
    motion: "እንቅስቃሴ", 
    motionDesc: "ከፍተኛ ጥራት እንቅስቃሴ።", 
    the: "",
    theFounder: "መስራች", 
    legacyQuote: "የሳይንስ ትክክለኛነት ከጥበብ ነፍስ ጋር።",
    founderDesc: "አጠቃላይ ሐኪም እና ዲጂታል ስትራቴጂስት።", 
    requestPortfolio: "የስራ_ማህደር_ጠይቅ",
    precision: "ትክክለኛነት", 
    uptime: "የስራ_ሰዓት", 
    assets: "የተፈጠሩ_ንብረቶች",
    ratio: "ጥምርታ", 
    high: "ከፍተኛ", 
    servicesTitle: "ችሎታዎች",
    servicesSubtitle: "ከራዕይ ጋር የሚመጣጠን ሙያ።", 
    coreTitle: "ዋና",
    coreSubtitle: "መፍትሄዎች", 
    design: "ንድፍ", 
    designDesc: "የእይታ ቋንቋዎች።",
    strategy: "ስትራቴጂ", 
    strategyDesc: "የመረጃ የመንገድ ካርታዎች።", 
    production: "ምርት",
    productionDesc: "ከፍተኛ ጥራት አፈፃፀም።", 
    intelligence: "ብልህነት",
    intelligenceDesc: "ጥልቅ ትንተና።", 
    layering: "ደረጃ ማድረግ", 
    layeringDesc: "የእይታ መደራረብ።",
    signal: "ምልክት", 
    signalDesc: "ንጹህ ግንኙነት።", 
    depth: "ጥልቀት",
    depthDesc: "ባለ ሶስት አቅጣጫዊ ተሞክሮዎች።", 
    final: "የመጨረሻው", 
    output: "ውጤት",
  },
};

const DEFAULT_LANGUAGE = 'EN';

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: DEFAULT_LANGUAGE,
  t: translations[DEFAULT_LANGUAGE]!,
  setLanguage: (selectedLang: string) => {
    const targetKey = translations[selectedLang] ? selectedLang : DEFAULT_LANGUAGE;
    set({ lang: targetKey, t: translations[targetKey]! });
  },
}));