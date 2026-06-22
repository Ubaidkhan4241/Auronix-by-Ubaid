import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_ITEMS } from "../data";
import { PortfolioItem } from "../types";
import { compressImage } from "../utils";
import { 
  Lock, 
  Unlock, 
  Upload, 
  CheckCircle, 
  Sparkles,
  Camera,
  Info,
  Plus
} from "lucide-react";

export default function AdminPanel() {
  const [isAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get("admin");
      if (adminParam === "true") {
        localStorage.setItem("ubaid_admin_authenticated", "true");
        return true;
      } else if (adminParam === "false") {
        localStorage.removeItem("ubaid_admin_authenticated");
        return false;
      }
      return localStorage.getItem("ubaid_admin_authenticated") === "true";
    }
    return false;
  });

  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ubaid_vault_unlocked") === "true";
    }
    return false;
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [uploadPresetCategory, setUploadPresetCategory] = useState<PortfolioItem["category"]>("AI Product Images");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadClient, setUploadClient] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadFileBefore, setUploadFileBefore] = useState<string | null>(null);
  const [uploadFileAfter, setUploadFileAfter] = useState<string | null>(null);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  if (!isAdmin) {
    return null;
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple, secure local sandbox administration password
    if (passwordInput === "ubaid_master" || passwordInput === "auronix99") {
      setIsUnlocked(true);
      setErrorMessage("");
      localStorage.setItem("ubaid_vault_unlocked", "true");
    } else {
      setErrorMessage("Access Denied: Invalid Administrative Signature Credentials.");
    }
  };

  const handleFileLoad = async (e: React.ChangeEvent<HTMLInputElement>, type: "before" | "after") => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        if (type === "before") {
          setUploadFileBefore(compressed);
        } else {
          setUploadFileAfter(compressed);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddSample = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle) return;

    const newItem: PortfolioItem = {
      id: `saved-sample-${Date.now()}`,
      title: uploadTitle,
      category: uploadPresetCategory,
      description: uploadDesc || "Handled catalog mapping, compliance structures, and generative photo backdrops.",
      client: uploadClient || "Brand Catalog Client",
      beforeLabel: uploadFileBefore ? "Raw Client Draft" : "Original Sample",
      afterLabel: uploadFileAfter ? "Optimized Ready Live" : "Final E-commerce Ready output",
      tags: ["Admin Verified", uploadPresetCategory.split(" ")[0]],
      features: ["Custom Uploaded Sample", "High Conversion SLA"]
    };

    if (uploadPresetCategory === "AI Product Images") {
      newItem.beforeImage = uploadFileBefore || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1100&auto=format&fit=crop&q=80";
      newItem.afterImage = uploadFileAfter || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1100&auto=format&fit=crop&q=80";
    }

    const existingStr = localStorage.getItem("my_vibrant_dynamic_portfolio_v2");
    let existingList: PortfolioItem[] = [];
    if (existingStr) {
      try {
        existingList = JSON.parse(existingStr);
      } catch (err) {}
    } else {
      existingList = [...PORTFOLIO_ITEMS];
    }

    const updatedList = [newItem, ...existingList];
    try {
      localStorage.setItem("my_vibrant_dynamic_portfolio_v2", JSON.stringify(updatedList));
    } catch (ex) {
      alert("Storage quota exhausted but session active!");
    }

    setUploadTitle("");
    setUploadClient("");
    setUploadDesc("");
    setUploadFileBefore(null);
    setUploadFileAfter(null);
    setIsSuccessMessage(true);
    setTimeout(() => setIsSuccessMessage(false), 4000);

    window.dispatchEvent(new Event("ubaid-portfolio-updated"));
  };

  return (
    <section id="admin-workspace" className="py-16 bg-[#fafafa] border-b-4 border-black relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="admin-panel-container">
        
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* Secure password vault screen inside the private route */
            <motion.div
              key="password-gate"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-md mx-auto p-8 rounded-3xl bg-white border-3 border-black shadow-[6px_6px_0px_0px_#000000] text-center text-left"
            >
              <div className="w-12 h-12 rounded-full bg-[#8338EC]/10 text-[#8338EC] border-2 border-black flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Lock className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-slate-950 uppercase text-lg tracking-tight">
                Secure Vault Authentication
              </h3>
              <p className="mt-2 text-xs text-slate-600 font-sans font-semibold mb-6">
                This is a private administrative dashboard. Enter your master password to unlock the workspace content loaders.
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4 font-bold text-left">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider font-mono font-black text-slate-500 mb-1 leading-none">
                    Administrator Key
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter Private Password Key..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border-2 border-black rounded-xl text-xs text-slate-950 shadow"
                  />
                </div>

                {errorMessage && (
                  <p className="text-[10px] font-mono text-rose-600 font-bold leading-relaxed">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl border-2 border-black bg-slate-950 hover:bg-slate-900 text-white font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] cursor-pointer"
                >
                  Decrypt & Unlock Vault
                </button>
              </form>
            </motion.div>
          ) : (
            /* Locked and secure uploader panel, accessible only to authenticated founder */
            <motion.div
              key="uploader-active"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center bg-[#06D6A0]/10 border-2 border-black p-4 rounded-2xl text-left">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-slate-950 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wide">
                      Creator Session Authenticated
                    </h4>
                    <p className="font-sans text-[10px] text-slate-800 font-bold leading-tight">
                      Locked portfolio sample injector session is now active. Use this module to insert new cases dynamically.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsUnlocked(false);
                    localStorage.removeItem("ubaid_vault_unlocked");
                  }}
                  className="px-3 py-1.5 border-2 border-black bg-white hover:bg-rose-50 text-rose-500 rounded-lg text-[9px] font-mono font-black uppercase cursor-pointer"
                >
                  Lock Vault
                </button>
              </div>

              <div className="bg-[#ffffff] border-3 border-black rounded-3xl p-6 sm:p-8 text-left shadow-[6px_6px_0px_0px_#9D4EDD] max-w-xl mx-auto relative overflow-hidden">
                <div className="flex items-center gap-2.5 mb-6 border-b-2 border-black pb-4">
                  <span className="p-2 rounded-xl bg-[#8338EC]/10 border-2 border-black text-[#8338EC]">
                    <Upload className="w-5 h-5 stroke-[2.5]" />
                  </span>
                  <div>
                    <h3 className="font-display font-black text-slate-950 uppercase text-base leading-tight">
                      Publish Portfolio Showcase Item
                    </h3>
                  </div>
                </div>

                {isSuccessMessage && (
                  <div className="mb-5 p-3 rounded-xl bg-green-500/10 border-2 border-black text-green-700 text-xs font-mono font-bold flex items-center gap-1.5 shadow">
                    <CheckCircle className="w-4 h-4" /> Portfolio item dynamically generated.
                  </div>
                )}

                <form onSubmit={handleAddSample} className="space-y-4 font-bold text-slate-800">
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 mb-1 font-black">
                      Category Selection
                    </label>
                    <select
                      value={uploadPresetCategory}
                      onChange={(e) => setUploadPresetCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs text-slate-950 font-black focus:outline-none"
                    >
                      <option value="AI Product Images">Product Comparison (Before/After Slider)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 mb-1 font-black">
                      Project Showcase Caption
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Handmade Scented Candles Render"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs text-slate-950 font-sans font-bold placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 mb-1 font-black">
                      Brand / Client Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amber Glow Co."
                      value={uploadClient}
                      onChange={(e) => setUploadClient(e.target.value)}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs text-slate-950 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-500 mb-1 font-black">
                      Methodology Brief Description
                    </label>
                    <textarea
                      required
                      placeholder="Explain physical details adjustments..."
                      value={uploadDesc}
                      onChange={(e) => setUploadDesc(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs text-slate-950 placeholder-slate-400 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="block text-[8px] font-mono text-slate-500 uppercase mb-1.5 text-center font-black">BEFORE Raw Photo</span>
                      <label className="flex flex-col items-center justify-center p-3 aspect-video rounded-xl border-2 border-dashed border-slate-300 hover:border-black cursor-pointer bg-slate-50 text-center transition-all shadow-sm">
                        <Camera className="w-4 h-4 text-slate-500 mb-1" />
                        <span className="text-[9px] text-[#8338EC] uppercase font-black font-mono">
                          {uploadFileBefore ? "Loaded ✓" : "Upload Image"}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileLoad(e, "before")} />
                      </label>
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono text-slate-500 uppercase mb-1.5 text-center font-black">AFTER Level Render</span>
                      <label className="flex flex-col items-center justify-center p-3 aspect-video rounded-xl border-2 border-dashed border-slate-300 hover:border-black cursor-pointer bg-slate-50 text-center transition-all shadow-sm">
                        <Camera className="w-4 h-4 text-slate-500 mb-1" />
                        <span className="text-[9px] text-[#06D6A0] uppercase font-black font-mono">
                          {uploadFileAfter ? "Loaded ✓" : "Upload Image"}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileLoad(e, "after")} />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-950 hover:bg-slate-900 border-2 border-black text-white rounded-xl text-xs font-black uppercase tracking-wider mt-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Publish Showcase Slide
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
