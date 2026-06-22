import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: "listing" | "catalog" | "ai-content" | "web-creation";
  iconName: string; // Used to dynamically map Lucide icons
  deliverables: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "AI Product Images" | "AI Product Videos" | "Product Listings" | "Website Projects" | string;
  description: string;
  // For AI Product Images
  beforeImage?: string;
  afterImage?: string;
  // For AI Product Videos
  videoUrl?: string;
  thumbnailUrl?: string;
  // For Product Listings
  productImage?: string;
  bulletPoints?: string[];
  keywords?: string[];
  // For Website Projects
  websiteScreenshot?: string;
  viewButtonLink?: string;
  // Backwards compatibility
  client?: string;
  platform?: string;
  tags?: string[];
  features?: string[];
  beforeLabel?: string;
  afterLabel?: string;
  beforeImagePlaceholder?: string;
  afterImagePlaceholder?: string;
  link?: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  detailedPoints: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  platformIcon?: "amazon" | "shopify" | "flipkart" | "meesho" | "web";
  rating: number;
  text: string;
  avatarPlaceholderSeed: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
