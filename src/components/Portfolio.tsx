import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_ITEMS } from "../data";
import { PortfolioItem } from "../types";
import { compressImage } from "../utils";
import { 
  Camera, 
  Upload, 
  Sparkles,
  RefreshCw,
  Plus,
  CheckCircle,
  Trash2,
  Sliders,
  Tag,
  Layers,
  Sparkle,
  Image as ImageIcon,
  LayoutGrid,
  Info,
  ExternalLink,
  RotateCcw,
  Video as VideoIcon,
  Play,
  Pause,
  ArrowRight,
  Globe,
  X,
  FileSpreadsheet,
  Check,
  MousePointerClick
} from "lucide-react";

export default function Portfolio() {
  const [isAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get("admin");
      if (adminParam === "true") {
        return true;
      }
      return localStorage.getItem("ubaid_admin_authenticated") === "true";
    }
    return false;
  });

  const [selectedCategory, setSelectedCategory] = useState<"AI Product Images" | "Product Listings" | "Website Projects">("AI Product Images");
  const [itemsList, setItemsList] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // States for live editing fields of selected item
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  // AI Product Images
  const [editBeforeImage, setEditBeforeImage] = useState("");
  const [editAfterImage, setEditAfterImage] = useState("");
  // AI Product Videos
  const [editThumbnailUrl, setEditThumbnailUrl] = useState("");
  const [editVideoUrl, setEditVideoUrl] = useState("");
  // Product Listings
  const [editProductImage, setEditProductImage] = useState("");
  const [editBulletPoints, setEditBulletPoints] = useState<string[]>([]);
  const [newBullet, setNewBullet] = useState("");
  const [editKeywords, setEditKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  // Website Projects
  const [editWebsiteScreenshot, setEditWebsiteScreenshot] = useState("");
  const [editViewButtonLink, setEditViewButtonLink] = useState("");

  // Comparison slider values (tracked per item ID)
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({});
  // Video playing state
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Track video element references
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Toast trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load custom portfolio items from localstorage if available
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem("my_vibrant_dynamic_portfolio_v2");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed) && parsed.length > 0) {
            setItemsList(parsed);
          }
        } catch (err) {
          console.error("Failed to sync custom portfolio", err);
        }
      } else {
        setItemsList(PORTFOLIO_ITEMS);
      }
    };

    handleSync();

    // Set initial selection first time
    const saved = localStorage.getItem("my_vibrant_dynamic_portfolio_v2");
    const initialList = saved ? JSON.parse(saved) : PORTFOLIO_ITEMS;
    const filtered = initialList.filter((item: any) => item.category === "AI Product Images");
    if (filtered.length > 0) {
      setSelectedItemId(filtered[0].id);
    }

    window.addEventListener("ubaid-portfolio-updated", handleSync);
    window.addEventListener("ubaid-access-mode-updated", handleSync);
    return () => {
      window.removeEventListener("ubaid-portfolio-updated", handleSync);
      window.removeEventListener("ubaid-access-mode-updated", handleSync);
    };
  }, []);

  // Update selection when switching category
  useEffect(() => {
    const filtered = itemsList.filter(item => item.category === selectedCategory);
    if (filtered.length > 0) {
      // Keep selection if it exists in the category
      const exists = filtered.some(item => item.id === selectedItemId);
      if (!exists) {
        setSelectedItemId(filtered[0].id);
      }
    } else {
      setSelectedItemId("");
    }
  }, [selectedCategory, itemsList]);

  // Sync edit states when selected item changes
  useEffect(() => {
    const item = itemsList.find(i => i.id === selectedItemId);
    if (item) {
      setEditTitle(item.title || "");
      setEditDesc(item.description || "");
      setEditBeforeImage(item.beforeImage || "");
      setEditAfterImage(item.afterImage || "");
      setEditThumbnailUrl(item.thumbnailUrl || "");
      setEditVideoUrl(item.videoUrl || "");
      setEditProductImage(item.productImage || "");
      setEditBulletPoints(item.bulletPoints || []);
      setEditKeywords(item.keywords || []);
      setEditWebsiteScreenshot(item.websiteScreenshot || "");
      setEditViewButtonLink(item.viewButtonLink || "");
    }
  }, [selectedItemId]);

  // Save list to localstorage helper
  const saveList = (newList: PortfolioItem[]) => {
    setItemsList(newList);
    try {
      localStorage.setItem("my_vibrant_dynamic_portfolio_v2", JSON.stringify(newList));
    } catch (e) {
      console.warn("Storage quota limit reached");
      triggerToast("⚠️ Local storage sync skipped (size limit). Changes remain in-session!");
    }
  };

  // Live fields multi-updater
  const updateActiveCardFields = (fields: Partial<PortfolioItem>) => {
    if (!selectedItemId) return;
    const nextList = itemsList.map(item => {
      if (item.id === selectedItemId) {
        return { ...item, ...fields };
      }
      return item;
    });
    saveList(nextList);
  };

  // Add standard new project card
  const handleAddNewProject = () => {
    const newId = `project-${Date.now()}`;
    let newItem: PortfolioItem = {
      id: newId,
      title: `New ${selectedCategory} Showcase`,
      category: selectedCategory,
      description: "Click on this card to begin typing your custom description and uploading premium assets!"
    };

    if (selectedCategory === "AI Product Images") {
      newItem.beforeImage = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1100&auto=format&fit=crop&q=80";
      newItem.afterImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1100&auto=format&fit=crop&q=80";
    } else if (selectedCategory === "Product Listings") {
      newItem.productImage = "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1100&auto=format&fit=crop&q=80";
      newItem.bulletPoints = [
        "🔥 OPTIMIZED HOOK 1: Focus on premium benefits that immediately convert customers",
        "⚡ MULTI-USE COMFORT: Describe product sizing, organic materials and warranty shields"
      ];
      newItem.keywords = ["Optimized Tags", "My Product Listing", "Top Selling Item"];
    } else if (selectedCategory === "Website Projects") {
      newItem.websiteScreenshot = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1100&auto=format&fit=crop&q=80";
      newItem.viewButtonLink = "https://example.com/project";
    }

    const nextList = [...itemsList, newItem];
    saveList(nextList);
    setSelectedItemId(newId);
    triggerToast(`Added new ${selectedCategory} card! Click elements to edit real-time.`);
  };

  // Delete project card
  const handleDeleteProject = (idToDelete: string) => {
    const filtered = itemsList.filter(item => item.id !== idToDelete);
    saveList(filtered);
    triggerToast("Project deleted successfully!");
  };

  // Restore raw presets
  const handleRestorePresets = () => {
    setItemsList(PORTFOLIO_ITEMS);
    localStorage.removeItem("my_vibrant_dynamic_portfolio_v2");
    const filtered = PORTFOLIO_ITEMS.filter(it => it.category === selectedCategory);
    if (filtered.length > 0) {
      setSelectedItemId(filtered[0].id);
    }
    triggerToast("Restored all premium seed presets!");
  };

  // Handles image filesystem file uploads
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "beforeImage" | "afterImage" | "productImage" | "websiteScreenshot" | "thumbnailUrl") => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        triggerToast("Compressing product image for peak storage speed...");
        const compressedBase64 = await compressImage(file);
        updateActiveCardFields({ [fieldName]: compressedBase64 });
        triggerToast("Upload successfully synchronized!");
      } catch (err) {
        console.error(err);
        triggerToast("Failed to process image file upload.");
      }
    }
  };

  // Handles general local MP4 video file uploading
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Create a local blob url so it plays immediately on the custom HTML5 video tag!
        const localBlobUrl = URL.createObjectURL(file);
        updateActiveCardFields({ videoUrl: localBlobUrl });
        triggerToast("Local MP4 compiled & loaded! Press Play below to pre-view.");
      } catch (err) {
        triggerToast("Failed to compile video file.");
      }
    }
  };

  // Slider position changer
  const handleSliderChange = (itemId: string, val: number) => {
    setSliderPositions(prev => ({ ...prev, [itemId]: val }));
  };

  // Video playback toggle
  const toggleVideoPlayback = (itemId: string) => {
    const videoElem = videoRefs.current[itemId];
    if (videoElem) {
      if (playingVideoId === itemId) {
        videoElem.pause();
        setPlayingVideoId(null);
      } else {
        // Pause any previous video
        if (playingVideoId && videoRefs.current[playingVideoId]) {
          videoRefs.current[playingVideoId]?.pause();
        }
        videoElem.play();
        setPlayingVideoId(itemId);
      }
    }
  };

  // Edit bullets helper
  const addBulletPoint = () => {
    if (!newBullet.trim()) return;
    const list = [...editBulletPoints, newBullet.trim()];
    setEditBulletPoints(list);
    updateActiveCardFields({ bulletPoints: list });
    setNewBullet("");
  };

  const removeBulletPoint = (index: number) => {
    const list = editBulletPoints.filter((_, idx) => idx !== index);
    setEditBulletPoints(list);
    updateActiveCardFields({ bulletPoints: list });
  };

  // Edit keywords helper
  const addKeywordTag = () => {
    if (!newKeyword.trim()) return;
    const list = [...editKeywords, newKeyword.trim()];
    setEditKeywords(list);
    updateActiveCardFields({ keywords: list });
    setNewKeyword("");
  };

  const removeKeywordTag = (tagText: string) => {
    const list = editKeywords.filter(k => k !== tagText);
    setEditKeywords(list);
    updateActiveCardFields({ keywords: list });
  };

  // Filter items in active view
  const categoryItems = itemsList.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-28 bg-white text-slate-800 border-b-4 border-black relative overflow-hidden">
      
      {/* Dynamic Grid Background Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black text-[#8338EC] bg-[#8338EC]/10 border-2 border-black uppercase mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8338EC] animate-spin-slow" />
              Creative Showcase Portfolio
            </motion.div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none uppercase">
              Selected Works
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-slate-700 font-semibold">
              Explore high-converting product listings, immersive before & after sliders, and premium responsive design showcases crafted to maximize sales conversions.
            </p>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 p-2 bg-slate-100 border-3 border-black rounded-2xl mb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {(["AI Product Images", "Product Listings", "Website Projects"] as const).map((cat) => {
            const isActive = selectedCategory === cat;
            let themeColor = "bg-[#FF6B6B]";
            if (cat === "Product Listings") themeColor = "bg-[#00C2FF]";
            if (cat === "Website Projects") themeColor = "bg-[#FFD93D]";

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-3.5 sm:py-4 px-2.5 rounded-xl text-center font-display font-black text-xs md:text-sm tracking-tight transition-all uppercase cursor-pointer border-2 border-transparent ${
                  isActive 
                    ? `${themeColor} text-slate-950 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] scale-[1.01]` 
                    : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Global Toast notifications */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#8338EC] border-2 border-black text-white font-mono font-black px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#00C2FF]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PORTFOLIO GRID CONTAINER */}
        <div className="grid grid-cols-1 gap-8 items-start w-full">
          
          <div className="w-full space-y-6">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#00C2FF]/10 border-3 border-black rounded-2xl px-5 py-4 text-left">
              <span className="text-xs font-mono font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-[#8338EC] shrink-0" />
                Active Showcase ({categoryItems.length} listed) — Crafted Creative Assets
              </span>
            </div>

            {categoryItems.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border-3 border-dashed border-slate-300">
                <Info className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <h3 className="font-display font-black text-lg text-slate-700">No projects added yet</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {categoryItems.map((item) => {
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
                        key={item.id}
                        className="rounded-3xl border-3 border-black overflow-hidden relative group transition-all duration-300 bg-white text-slate-900 flex flex-col justify-between shadow-[6px_6px_0px_0px_#8338EC] hover:shadow-[10px_10px_0px_0px_#FF6B6B]"
                      >


                        {/* CATEGORY VISUALIZER RENDERING CODES */}
                        <div className="flex-grow flex flex-col justify-between">
                          
                          {/* 1. Category: AI Product Images - Comparison Slider */}
                          {selectedCategory === "AI Product Images" && (
                            <BeforeAfterSlider item={item} />
                          )}

                          {/* 3. Category: Product Listings - Case Study Mockup Sheet */}
                          {selectedCategory === "Product Listings" && (
                            <div className="p-5 border-b-3 border-black bg-gradient-to-br from-[#00C2FF]/5 to-slate-200/40 relative overflow-hidden flex flex-col justify-center items-center py-6">
                              {item.productImage ? (
                                <img 
                                  src={item.productImage} 
                                  className="w-40 h-40 object-contain rounded-2xl border-2 border-black bg-white p-2 shadow-lg group-hover:scale-105 transition-transform" 
                                  alt="Product High-rest"
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 font-mono text-[9px]">
                                  <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                                  <span>No image uploaded</span>
                                </div>
                              )}
                              
                              <span className="absolute top-3 left-3 bg-[#00C2FF] border-2 border-black text-[8px] font-mono font-black text-slate-950 px-2 py-0.5 rounded-full">
                                MARKETPLACE LISTING
                              </span>
                            </div>
                          )}

                          {/* 4. Category: Website Projects - Miniature Browser Frame */}
                          {selectedCategory === "Website Projects" && (
                            <div className="p-4 border-b-3 border-black bg-slate-50 flex flex-col">
                              {/* Mock Browser Header Bar */}
                              <div className="flex items-center gap-1.5 pb-2.5 mb-2 border-b-2 border-slate-200">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border border-black/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D] border border-black/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#06D6A0] border border-black/20" />
                                <div className="flex-grow bg-slate-200/90 h-4.5 rounded-lg border border-slate-300 text-[8px] font-mono text-slate-500 flex items-center justify-center overflow-hidden px-4 select-none">
                                  https://ubaidportfolio.click/shop-mockup
                                </div>
                              </div>

                              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-black bg-white group/web">
                                {item.websiteScreenshot ? (
                                  <img 
                                    src={item.websiteScreenshot} 
                                    className="w-full h-full object-cover group-hover/web:scale-102 transition-transform" 
                                    alt="Website Screenshot"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-[#FFD93D]/5 flex flex-col items-center justify-center text-slate-400 font-mono text-[10px]/relaxed">
                                    <Globe className="w-7 h-7 mb-1" />
                                    <span>[ Screenshot Upload Empty ]</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* TEXT METADATA BLOCK FOR CARD DECK */}
                          <div className="p-6 text-left flex flex-col justify-between flex-grow">
                            <div>
                              <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
                                {item.title || "Untitled Project"}
                              </h3>
                              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold leading-relaxed text-slate-600">
                                {item.description || "Replace this text with your custom description outlining the production process and strategy details."}
                              </p>

                              {/* RENDER BULLET POINTS (Product Listings) */}
                              {selectedCategory === "Product Listings" && (item.bulletPoints || []).length > 0 && (
                                <ul className="mt-5 space-y-2 pt-4 border-t-2 border-dashed border-slate-300">
                                  {(item.bulletPoints || []).map((bullet, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[11px] font-bold text-slate-700 leading-relaxed">
                                      <span className="text-emerald-500 text-sm leading-none flex-shrink-0">✓</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* RENDER KEYWORDS (Product Listings) */}
                              {selectedCategory === "Product Listings" && (item.keywords || []).length > 0 && (
                                <div className="mt-5 pt-4 border-t-2 border-slate-200">
                                  <div className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-1.5 select-none">
                                    Target SEO Keywords:
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {(item.keywords || []).map((kw, idx) => (
                                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-black bg-slate-50 text-slate-800 text-[9px] font-mono font-extrabold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                        <Tag className="w-2.5 h-2.5 text-[#FF6B6B]" />
                                        {kw}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* View Project Action (Website Projects) */}
                            {selectedCategory === "Website Projects" && (
                              <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200">
                                <a
                                  href={item.viewButtonLink || "https://example.com"}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-black bg-[#FFD93D] hover:bg-[#FFD93D]/95 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] transition-all"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span>View Live Website</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                                </a>
                              </div>
                            )}

                          </div>

                        </div>

                        {/* Bottom Utility Bar */}
                        {isAdmin && (
                          <div className="px-6 py-4.5 bg-slate-50 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-slate-500 font-extrabold select-none">
                            <span className="tracking-wide">ID: {(item.id).substring(0, 10).toUpperCase()}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(item.id);
                              }}
                              className="px-2.5 py-1 bg-[#FF6B6B] hover:bg-red-500 border-2 border-black text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer font-black leading-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>DELETE</span>
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  
                  {/* Beautiful "+" card inside the responsive grid */}
                  {isAdmin && (
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
                      onClick={handleAddNewProject}
                      className="rounded-3xl border-3 border-dashed border-slate-350 hover:border-[#8338EC] cursor-pointer transition-all duration-300 bg-slate-50/50 hover:bg-[#8338EC]/5 flex flex-col items-center justify-center min-h-[300px] p-6 text-center select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_0px_#8338EC] group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-300 group-hover:border-[#8338EC] flex items-center justify-center text-slate-400 group-hover:text-[#8338EC] mb-4 shadow transition-colors">
                        <Plus className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <h4 className="font-display font-black text-slate-800 group-hover:text-[#8338EC] uppercase text-xs tracking-tight transition-colors">
                        + Add New {selectedCategory} Card
                      </h4>
                      <p className="mt-1.5 font-sans text-[11px] text-slate-505 max-w-[200px] leading-relaxed mx-auto">
                        Click here to instantly create an editable card and upload your custom files/media in the right column!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: THE LIVE WORKSPACE CONTROLLER / EDITOR */}
          {isAdmin && (
            <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#fcfcfc] p-6 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-3xl relative text-left" id="sandbox-uploader">
              
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#8338EC]/10 border-2 border-black flex items-center justify-center text-slate-900 shadow">
                  <Sliders className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-display font-black text-slate-950 text-base uppercase tracking-tight">
                  Visual Playground
                </h3>
              </div>

              {selectedItemId ? (
                <div className="space-y-5">
                  <p className="font-sans text-xs text-slate-700 leading-relaxed font-semibold">
                    You have active card <strong className="text-slate-950 font-black">"{editTitle}"</strong> selected. Replace its text or upload media directly below!
                  </p>

                  {/* MEDIA FILE INPUT ZONE */}
                  <div className="p-4 bg-slate-50 border-2 border-black rounded-2xl space-y-4">
                    <span className="text-[9px] font-mono font-black text-[#8338EC] tracking-widest uppercase block">
                      MEDIA CONTENT LOADER
                    </span>

                    {/* Image uploads block for Images */}
                    {selectedCategory === "AI Product Images" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[8px] text-slate-600 font-mono font-black uppercase mb-1">
                            Before (Raw Shot)
                          </label>
                          <div className="flex gap-2 items-center">
                            <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-dashed border-slate-350 bg-white hover:border-[#FF6B6B] hover:bg-rose-50/20 rounded-xl cursor-pointer font-mono font-black text-[9px] uppercase transition-all">
                              <Camera className="w-3.5 h-3.5 text-[#FF6B6B]" />
                              <span>Raw Photo</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, "beforeImage")} 
                              />
                            </label>
                            {editBeforeImage && (
                              <div className="w-9 h-9 rounded-lg border border-black overflow-hidden bg-white shrink-0">
                                <img src={editBeforeImage} className="w-full h-full object-cover" alt="Before asset" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[8px] text-slate-600 font-mono font-black uppercase mb-1">
                            After (Studio Render)
                          </label>
                          <div className="flex gap-2 items-center">
                            <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-dashed border-slate-350 bg-white hover:border-[#00C2FF] hover:bg-cyan-50/20 rounded-xl cursor-pointer font-mono font-black text-[9px] uppercase transition-all">
                              <Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" />
                              <span>AI Studio Art</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, "afterImage")} 
                              />
                            </label>
                            {editAfterImage && (
                              <div className="w-9 h-9 rounded-lg border border-black overflow-hidden bg-white shrink-0">
                                <img src={editAfterImage} className="w-full h-full object-cover" alt="After asset" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Product Listing high-rest images */}
                    {selectedCategory === "Product Listings" && (
                      <div>
                        <label className="block text-[8px] text-slate-600 font-mono font-black uppercase mb-1">
                          Product Image Uploader
                        </label>
                        <div className="flex gap-2 items-center">
                          <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-dashed border-slate-350 bg-white hover:border-[#00C2FF] hover:bg-cyan-50/20 rounded-xl cursor-pointer font-mono font-black text-[9px] uppercase transition-all">
                            <Upload className="w-3.5 h-3.5 text-[#00C2FF]" />
                            <span>Upload Image</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, "productImage")} 
                            />
                          </label>
                          {editProductImage && (
                            <div className="w-9 h-9 rounded-lg border border-black overflow-hidden bg-white shrink-0">
                              <img src={editProductImage} className="w-full h-full object-cover" alt="Listing preview" referrerPolicy="no-referrer" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Website projects screenshots */}
                    {selectedCategory === "Website Projects" && (
                      <div>
                        <label className="block text-[8px] text-slate-600 font-mono font-black uppercase mb-1">
                          Website Screenshot Image
                        </label>
                        <div className="flex gap-2 items-center">
                          <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-dashed border-slate-350 bg-white hover:hover:border-[#FFD93D] hover:bg-amber-50/10 rounded-xl cursor-pointer font-mono font-black text-[9px] uppercase transition-all">
                            <Camera className="w-3.5 h-3.5 text-[#FFD93D]" />
                            <span>Upload Screenshot</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, "websiteScreenshot")} 
                            />
                          </label>
                          {editWebsiteScreenshot && (
                            <div className="w-9 h-9 rounded-lg border border-black overflow-hidden bg-white shrink-0">
                              <img src={editWebsiteScreenshot} className="w-full h-full object-cover" alt="Screenshot asset" referrerPolicy="no-referrer" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* STANDARD PARAMETER TEXT EDITORS */}
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block">
                      TEXT METADATA DETAILS
                    </span>

                    <div>
                      <label className="block text-[8px] text-slate-600 font-mono font-black uppercase mb-1">
                        Project Title / Heading
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => {
                          setEditTitle(e.target.value);
                          updateActiveCardFields({ title: e.target.value });
                        }}
                        className="w-full px-3, py-2 px-3 bg-white border-2 border-black rounded-xl text-xs text-slate-900 font-sans font-bold focus:outline-none focus:bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-slate-600 font-mono font-black uppercase mb-1">
                        Description Summary
                      </label>
                      <textarea
                        value={editDesc}
                        onChange={(e) => {
                          setEditDesc(e.target.value);
                          updateActiveCardFields({ description: e.target.value });
                        }}
                        rows={3}
                        className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs text-slate-900 font-sans font-bold focus:outline-none focus:bg-slate-50 resize-none leading-relaxed"
                      />
                    </div>

                    {/* Case study attributes for Product Listings (bullet list modifier) */}
                    {selectedCategory === "Product Listings" && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[8px] text-[#00C2FF] font-mono font-black uppercase mb-1">
                            Bullet Points List
                          </label>
                          
                          <div className="space-y-1.5 mb-2.5">
                            {editBulletPoints.map((bullet, idx) => (
                              <div key={idx} className="flex gap-1.5 items-start bg-slate-50 p-2 rounded-lg border border-slate-350 text-[10px] text-slate-700 font-bold">
                                <span className="flex-grow leading-tight mt-0.5">{bullet}</span>
                                <button
                                  type="button"
                                  onClick={() => removeBulletPoint(idx)}
                                  className="text-slate-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all text-[11px] shrink-0 outline-none leading-none"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              placeholder="Add a premium bullet points copy..."
                              value={newBullet}
                              onChange={(e) => setNewBullet(e.target.value)}
                              className="flex-grow px-2.5 py-1.5 bg-white border border-black rounded-lg text-[10px] text-slate-900 font-bold focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={addBulletPoint}
                              className="px-2.5 py-1.5 bg-[#00C2FF] border border-black rounded-lg text-[10px] font-mono font-black uppercase tracking-wider text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00C2FF]/90 cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[8px] text-[#00C2FF] font-mono font-black uppercase mb-1">
                            Listing Tags / Keywords
                          </label>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {editKeywords.map((kw, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 border border-slate-400 rounded-md bg-white text-[9px] font-mono font-bold text-slate-700">
                                <span>{kw}</span>
                                <button
                                  type="button"
                                  onClick={() => removeKeywordTag(kw)}
                                  className="text-[10px] text-slate-400 hover:text-red-500 leading-none shrink-0"
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              placeholder="e.g., Lavender Sleep Aid"
                              value={newKeyword}
                              onChange={(e) => setNewKeyword(e.target.value)}
                              className="flex-grow px-2.5 py-1.5 bg-white border border-black rounded-lg text-[10px] text-slate-900 font-bold focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={addKeywordTag}
                              className="px-2.5 py-1.5 bg-white border border-black rounded-lg text-[10px] font-mono font-black uppercase tracking-wider text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50 cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Web browser frame inputs */}
                    {selectedCategory === "Website Projects" && (
                      <div>
                        <label className="block text-[8px] text-slate-600 font-mono font-black uppercase mb-1">
                          View Project Redirect URL Link
                        </label>
                        <input
                          type="text"
                          value={editViewButtonLink}
                          placeholder="https://example.com/project-link"
                          onChange={(e) => {
                            setEditViewButtonLink(e.target.value);
                            updateActiveCardFields({ viewButtonLink: e.target.value });
                          }}
                          className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs text-slate-950 font-mono font-bold focus:outline-none"
                        />
                      </div>
                    )}

                  </div>
                </div>
              ) : (
                <div className="py-10 text-center text-slate-400 font-semibold text-xs">
                  Please select or add a project card to launch the sandbox editor!
                </div>
              )}

            </div>

            {/* Micro aesthetic callout */}
            <div className="bg-[#FFD93D]/10 rounded-3xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left relative overflow-hidden">
              <span className="text-[20px] text-slate-900 absolute right-4 top-3 select-none opacity-20">❝</span>
              <p className="text-[11px] text-slate-700 italic leading-relaxed font-bold">
                True creative autonomy means allowing you to mock, replace, and load actual marketplace listing copy without touching code layout systems. Enjoy infinite customizable sandboxes side-by-side.
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06D6A0] shrink-0" />
                <span className="text-[8px] font-mono uppercase tracking-wider text-slate-950 font-black">NEXORA INSTANT PLAYGROUND v2</span>
              </div>
            </div>

          </div>
          )}

        </div>

      </div>
    </section>
  );
}

// Highly optimized Before & After image comparison slider with touch + pointer capture for 60 FPS performance
function BeforeAfterSlider({ item }: { item: PortfolioItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Synchronize on item change, default to 50%
  useEffect(() => {
    if (beforeLayerRef.current) {
      beforeLayerRef.current.style.clipPath = "inset(0 50% 0 0)";
    }
    if (handleRef.current) {
      handleRef.current.style.left = "50%";
    }
  }, [item.id]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Direct DOM manipulation guarantees immediate visual update at 60 FPS
    if (beforeLayerRef.current) {
      beforeLayerRef.current.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${percentage}%`;
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // Only drag on left click or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDragging.current = true;
    handleMove(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="relative aspect-square w-full bg-slate-100 overflow-hidden select-none border-b-3 border-black touch-none cursor-ew-resize"
    >
      {/* After Image Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {item.afterImage ? (
          <img 
            src={item.afterImage} 
            className="w-full h-full object-cover select-none" 
            alt="Luxury Studio Enhanced After" 
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#8338EC]/5 flex flex-col items-center justify-center text-slate-400 font-mono text-[10px]">
            <Sparkles className="w-5 h-5 mb-1" />
            <span>[ Studio After Image Empty ]</span>
          </div>
        )}
        <div className="absolute top-3 right-3 z-25">
          <span className="px-2.5 py-0.5 rounded-full bg-[#06D6A0] border-2 border-black text-[8px] font-mono font-black text-slate-950 tracking-wider uppercase">
            After
          </span>
        </div>
      </div>

      {/* Before Image Layer (Clipped) */}
      <div 
        ref={beforeLayerRef}
        className="absolute inset-0 overflow-hidden bg-slate-150 pointer-events-none transition-none"
        style={{ clipPath: `inset(0 50% 0 0)` }}
      >
        {item.beforeImage ? (
          <img 
            src={item.beforeImage} 
            className="absolute inset-0 w-full h-full object-cover select-none animate-none" 
            alt="Raw Supplier Shot Before" 
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-500 font-mono text-[10px]">
            <Camera className="w-5 h-5 mb-1" />
            <span>[ Supplier Raw Image Empty ]</span>
          </div>
        )}
        <div className="absolute top-3 left-3 z-25">
          <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B] border-2 border-black text-[8px] font-mono font-black text-white tracking-wider uppercase">
            Before
          </span>
        </div>
      </div>

      {/* Slider Indicator Drag Handle */}
      <div 
        ref={handleRef}
        className="absolute inset-y-0 w-[4px] bg-black z-30 pointer-events-none transition-none"
        style={{ left: `50%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFD93D] border-2 border-black flex items-center justify-center text-[10px] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          ↔
        </div>
      </div>
    </div>
  );
}
