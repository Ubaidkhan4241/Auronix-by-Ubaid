import { Service, PortfolioItem, ProcessStep, Testimonial, FAQ } from "./types";
import customItems from "./data-custom.json";

export const SERVICES_DATA: Service[] = [
  {
    id: "increase-conversion",
    title: "Increase Product Conversion Rate",
    description: "Convert browsing visitors into active buyers. We design elite A+ Content (EBC), persuasive comparative charts, and thumb-stopping visual flows optimized to double your listing's purchase intent.",
    category: "ai-content",
    iconName: "Zap",
    deliverables: ["A+ Content & EBC Redesigns", "High-Converting Feature Callouts", "Comparative Grid Overlays", "Benefit-Driven Infographics"]
  },
  {
    id: "improve-ctr",
    title: "Improve CTR on Marketplaces",
    description: "Shatter your CTR benchmarks. Stand out on crowded search result feeds (Amazon, Flipkart, Meesho) with high-impact, pixel-perfect click-magnet hero images that compel buyers to stop scrolling and click your listing.",
    category: "ai-content",
    iconName: "Sparkles",
    deliverables: ["Click-Magnet Hero Designs", "Vibrant Visual Prominence Checks", "Platform-Compliant Backgrounds", "Competitor Visual Delta Analysis"]
  },
  {
    id: "boost-seo",
    title: "Boost SEO Ranking",
    description: "Rank higher, sell more. We inject high-intent marketplace search keywords seamlessly into optimized titles, structured backend search terms, and key benefit bullet points to maximize your search visibility.",
    category: "catalog",
    iconName: "Globe",
    deliverables: ["Marketplace Keyword Audits", "Optimized Search Term Tuning", "Natural Search-Dense Listing Copy", "Category Node Fine-Tuning"]
  },
  {
    id: "build-trust",
    title: "Build Trust Through Visuals",
    description: "Ditch raw, boring smartphone snapshots. We build hyper-realistic, premium AI lifestyle product environments—placing your products in luxury studio settings, real-world rooms, or gorgeous outdoor scenery.",
    category: "ai-content",
    iconName: "Image",
    deliverables: ["3D Shadow & Lighting Realism", "Hyper-Realistic AI Lifestyles", "Aesthetic Props & Scenery Matching", "Professional Studio-Grade Mockups"]
  },
  {
    id: "improve-catalog-structure",
    title: "Improve Catalog Structure",
    description: "Organize messy, complex catalogs. We set up parent-child multivariate variation grids (size, color, pack sizes) to aggregate ratings into high-trust listings and debug broken flat-file Excel feed sheets.",
    category: "catalog",
    iconName: "Layers",
    deliverables: ["Multi-Variant Parent-Child Setup", "Flat-File CSV Error Debugging", "Listing Suppression Diagnostics", "Seamless SKU Catalog Mapping"]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = customItems;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Send Product Image",
    description: "Send us just one raw product image via WhatsApp or through our simple brief builder. Tell us which marketplace or platform you target.",
    duration: "Step 01",
    detailedPoints: [
      "Share raw, unedited smartphone photos of your products",
      "Specify your target e-commerce platform (Amazon, Shopify, Meesho)",
      "Zero registration or upfront payment required"
    ]
  },
  {
    stepNumber: 2,
    title: "We Redesign + Optimize Listing",
    description: "We isolate your product, generate high-end, high-converting AI visual backgrounds, and craft keyword-rich, persuasive copy.",
    duration: "Step 02",
    detailedPoints: [
      "Isolate raw products into custom 4K professional studio backgrounds",
      "Design benefit-driven product listing infographic feature calls",
      "Inject high-volume backend marketplace search terms for organic ranking"
    ]
  },
  {
    stepNumber: 3,
    title: "You Get Ready-to-Use Content",
    description: "Receive ready-to-upload high-converting visual assets, compliant listings, and copy ready to skyrocket your conversion rate immediately.",
    duration: "Step 03",
    detailedPoints: [
      "High-res product images ready to drag and drop onto your store listings",
      "Persuasive copywriting deliverables mapped for optimal CTR",
      "Aggressive conversion growth and instant marketplace visual dominance"
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t-1",
    name: "Rajesh Sharma",
    role: "Founder",
    company: "Sharma Kitchenware",
    platformIcon: "amazon",
    rating: 5,
    text: "Ubaid completely restructured our Amazon kitchenware catalog. In less than two weeks, our conversion rate grew from 1.5% to 4.2%. Keyword mapping is incredibly detailed and response is very fast.",
    avatarPlaceholderSeed: "Rajesh"
  },
  {
    id: "t-2",
    name: "Priya Nair",
    role: "E-comm Manager",
    company: "Nair Organics",
    platformIcon: "shopify",
    rating: 4,
    text: "Workspace volume ki wajah se shuru me onboarding thodi slow thhi, but standard of delivery matches international level. Hamare body scrub dynamic backgrounds standard render karke diye. Recommended!",
    avatarPlaceholderSeed: "Priya"
  },
  {
    id: "t-3",
    name: "Aman Verma",
    role: "Proprietor",
    company: "Verma Garments India",
    platformIcon: "meesho",
    rating: 5,
    text: "Meesho templates pe variation size and color feed file options load hone me hume bohot issues high errors aarahe thhe. Ubaid compiled the upload sheets and got our catalog live with zero errors.",
    avatarPlaceholderSeed: "Aman"
  },
  {
    id: "t-4",
    name: "Nandini Rao",
    role: "Creative Partner",
    company: "Aura Essentials",
    platformIcon: "flipkart",
    rating: 4,
    text: "Listing title variations optimization was quick. Ek set pe spelling error aagaya thha draft checking me, par review hone par and immediately feedback support was fantastic. Organic page views are high now.",
    avatarPlaceholderSeed: "Nandini"
  },
  {
    id: "t-5",
    name: "Divya Shrivastav",
    role: "Co-Founder",
    company: "Ziva Activewear",
    platformIcon: "meesho",
    rating: 5,
    text: "Finding high-quality catalog designers under strict budget can be tricky. But Ubaid generated neat sport lifestyle AI setups within 3 days. Our click-through response on catalog images is really strong.",
    avatarPlaceholderSeed: "Divya"
  },
  {
    id: "t-6",
    name: "Kabir Mehra",
    role: "Retail Head",
    company: "Mehra Leather Goods",
    platformIcon: "amazon",
    rating: 4,
    text: "Restructured our product listings on Seller Central to clear active suppression. Charge slightly premium compared to typical Fiverr accounts, but listing quality matches premium brand parameters.",
    avatarPlaceholderSeed: "Kabir"
  },
  {
    id: "t-7",
    name: "Vikram Malhotra",
    role: "Director",
    company: "Malhotra Electronics",
    platformIcon: "web",
    rating: 5,
    text: "Managed bulk listings files representing 1500+ units on our Shopify custom storefront. Zero sheet-structure crashes, correct keyword integrations, and perfect alignment with our warehouse SKUs.",
    avatarPlaceholderSeed: "Vikram"
  },
  {
    id: "t-8",
    name: "Ananya Gupta",
    role: "Creative Artisan",
    company: "Clay & Co. Pottery",
    platformIcon: "shopify",
    rating: 4,
    text: "AI lifestyle rendering output look very professional. Real candles and clay craft ki base details backgrounds me matching organic accessories ke saath align ho gayi. Minor 1-day delay was there but quality is solid.",
    avatarPlaceholderSeed: "Ananya"
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: "faq-1",
    question: "Do I have to give you access to my seller accounts?",
    answer: "No, you don't need to share your sensitive login email and password! I work securely of standard User Access or Employee Access delegation features. You can simply invite me as a guest/employee under your marketplace channels (Amazon Seller Central, Flipkart Seller Hub, Meesho Panel, Shopify, IndiaMART, Alibaba, or Etsy) with restricted catalog rights. Alternatively, I can deliver structured Excel/CSV files and high-res image folders for you to upload yourself.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "What raw files do you need from me for the AI Product Image service?",
    answer: "Just basic smartphone photos of your product! For best results, place your product on a clear table under well-lit, non-blurry settings. I will isolate your product, sharpen it, apply beautiful custom AI-lit scenes (marble countertops, warm room lights, outdoor natural backgrounds), and cast natural shadows.",
    category: "AI Content"
  },
  {
    id: "faq-3",
    question: "How do you handle flat-file CSV upload errors?",
    answer: "I specialize in correcting platform-specific feed errors (like Amazon Error 8572, 5000, mismatching Brand names, parent-child variation link breaks). I debug raw data templates and ensure 100% successful submission feedback on your bulk catalogs.",
    category: "Cataloging"
  },
  {
    id: "faq-4",
    question: "What is your typical turnaround time?",
    answer: "Single listings, variation links, and individual AI content renders are completed in under 24 hours. Comprehensive brand catalog setup or full multi-platform store creations generally take between 2 to 4 working days.",
    category: "General"
  },
  {
    id: "faq-5",
    question: "Do you offer bulk packages for monthly catalog maintenance?",
    answer: "Yes! If you constantly launch new products or have a active inventory with seasonal price changes, I offer tailored monthly retainers where I act as your dedicated catalog team.",
    category: "General"
  }
];
