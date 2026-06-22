import { Service, PortfolioItem, ProcessStep, Testimonial, FAQ } from "./types";
import customItems from "./data-custom.json";

export const SERVICES_DATA: Service[] = [
  {
    id: "catalog-management",
    title: "Catalog Management",
    description: "A-to-Z digital catalog oversight. Ongoing price updates, listing health monitoring, suppressed page fixes, and merchant dashboard management.",
    category: "catalog",
    iconName: "Database",
    deliverables: ["Listing Health Audits", "Stranded Inventory Fixes", "Pricing Competitiveness", "Brand-Registry Synchronization"]
  },
  {
    id: "bulk-uploads",
    title: "Bulk Product Uploads",
    description: "Flawless large-scale inventory uploads using platform-specific flat files (Excel/CSV). Zero template errors, rapid ingestion.",
    category: "catalog",
    iconName: "Grid",
    deliverables: ["Custom Feed Template Building", "Flat File Error Diagnostics", "Dynamic Cell Calculations", "Category Node Selection"]
  },
  {
    id: "product-variations",
    title: "Product Variations",
    description: "Complex parent-child multi-variate listings (Size, Color, Pack size). Aggregates star reviews onto a single high-trust sales node.",
    category: "catalog",
    iconName: "Layers",
    deliverables: ["Parent-Child Relationship Mapping", "Variation Theme Setup", "Consistent Swatch Asset Linking", "Variation Specific Barcodes"]
  },
  {
    id: "ai-product-images",
    title: "AI Product Images",
    description: "Convert basic studio photos into premium lifestyle images using cutting-edge AI. Place products in luxury rooms, outdoor nature, or professional studios.",
    category: "ai-content",
    iconName: "Image",
    deliverables: ["High-Res AI Studio Shadows", "Dynamic Scene Generation", "Consistent Product Form Mapping", "Social Media Graphics Ready"]
  },
  {
    id: "ecommerce-web-creation",
    title: "E-commerce Website Creation",
    description: "Fully responsive, optimized Shopify or single-page storefronts built using light, fast code. Focused entirely on clean designs and fast load speeds.",
    category: "web-creation",
    iconName: "Globe",
    deliverables: ["Shopify Store Design", "Responsive Layout Architecture", "Conversion rate optimized checkout", "Custom App integrations"]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = customItems;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Share Requirement",
    description: "Send over your existing raw product imagery, catalog Excel files, store links, or simple text details of the products you want listed or optimized.",
    duration: "Day 1",
    detailedPoints: [
      "Review competitor listings in your niche",
      "Upload raw product smartphone photos",
      "Provide brand style briefs and targeting goals"
    ]
  },
  {
    stepNumber: 2,
    title: "Review & Planning",
    description: "I analyze search volume keywords, design layout themes, and draft a plan mapping target categories and required AI background scenes.",
    duration: "Day 1-2",
    detailedPoints: [
      "Map high-volume Amazon/Flipkart keyword sets",
      "Pitch visual directions for AI-generated scenery",
      "Confirm deliverables list and timeline budget"
    ]
  },
  {
    stepNumber: 3,
    title: "Execution & AI Design",
    description: "Writing listings, building parent-child variations in master flat files, rendering luxury studio AI backgrounds, and styling your store.",
    duration: "Day 2-4",
    detailedPoints: [
      "No-flicker video panning rendering",
      "Draft list-titles and optimized description copies",
      "Generate clean, pixel-perfect 4K product mockups"
    ]
  },
  {
    stepNumber: 4,
    title: "Delivery & Upload Check",
    description: "Checking feeds, uploading to seller profiles or sending final structured files ready for bulk CSV imports. Smooth listing live-checks.",
    duration: "Day 5",
    detailedPoints: [
      "Upload flat spreadsheet feeds with zero template errors",
      "Monitor for dashboard quality approvals",
      "Deliver beautifully organized Google Drive catalog folders"
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
