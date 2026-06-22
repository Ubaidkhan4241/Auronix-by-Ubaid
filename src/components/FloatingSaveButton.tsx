import React, { useState, useEffect } from "react";
import { Save, Check, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingSaveButton() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ubaid_admin_authenticated") === "true";
    }
    return false;
  });

  const [hasPending, setHasPending] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    const handleAccessUpdate = () => {
      const active = localStorage.getItem("ubaid_admin_authenticated") === "true";
      setIsAdmin(active);
    };

    const handleChangesAlert = () => {
      if (typeof window !== "undefined" && window.ubaidUnsavedChanges) {
        setHasPending(Object.keys(window.ubaidUnsavedChanges).length > 0);
      }
    };

    window.addEventListener("ubaid-access-mode-updated", handleAccessUpdate);
    window.addEventListener("ubaid-pending-changes", handleChangesAlert);

    // Initial check
    if (typeof window !== "undefined" && window.ubaidUnsavedChanges) {
      setHasPending(Object.keys(window.ubaidUnsavedChanges).length > 0);
    }

    return () => {
      window.removeEventListener("ubaid-access-mode-updated", handleAccessUpdate);
      window.removeEventListener("ubaid-pending-changes", handleChangesAlert);
    };
  }, []);

  const handleSaveAll = () => {
    if (typeof window === "undefined") return;
    setSaveStatus("saving");

    try {
      // Gather all previous custom page edits
      const savedObjRaw = localStorage.getItem("ubaid_website_content") || "{}";
      const savedObj = JSON.parse(savedObjRaw);

      // Merge current memory changes
      const currentUnsaved = window.ubaidUnsavedChanges || {};
      const merged = { ...savedObj, ...currentUnsaved };

      // Persist
      localStorage.setItem("ubaid_website_content", JSON.stringify(merged));
      
      // Wipe memory pool
      window.ubaidUnsavedChanges = {};
      setHasPending(false);

      setTimeout(() => {
        setSaveStatus("saved");
        // Broadcast custom update so all contentEditable blocks re-sync
        window.dispatchEvent(new Event("ubaid-portfolio-updated"));
        
        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      }, 800);
    } catch (e) {
      console.error(e);
      setSaveStatus("idle");
      alert("Error saving your configurations: Quota issue.");
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to discard all live text edits and restore original portfolio, hero, and catalog descriptions across the entire platform?")) {
      localStorage.removeItem("ubaid_website_content");
      if (typeof window !== "undefined") {
        window.ubaidUnsavedChanges = {};
      }
      setHasPending(false);
      window.dispatchEvent(new Event("ubaid-portfolio-updated"));
      alert("Original website static configurations restored successfully!");
    }
  };

  if (!isAdmin) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3.5 select-none font-sans">
        
        {/* Helper Instructions tag */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="bg-slate-900 border-2 border-black text-white px-4 py-2.5 rounded-2xl text-[10px] leading-snug font-mono uppercase tracking-wider font-extrabold max-w-xs shadow-[3px_3px_0px_0px_#FFD93D] text-right"
        >
          <div className="text-brand-pink font-black">⚡ ADMIN PRIVILEGES ARMED</div>
          <p className="text-slate-350 text-[9px] font-normal lowercase tracking-normal mt-1 leading-normal">
            Click directly on any title, paragraph, pricing estimate, or badge, rewrite Ubaid's assets, then press Save!
          </p>
        </motion.div>

        <div className="flex items-center gap-2">
          {/* Reset button to clear all custom content keys */}
          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl border-2 border-black bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Reset All Live Text Customizations to Originals"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Floating Save button */}
          <button
            onClick={handleSaveAll}
            className={`flex items-center gap-2.5 px-6 py-4 rounded-2xl border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-95 transition-all cursor-pointer ${
              saveStatus === "saved"
                ? "bg-emerald-400 text-slate-950"
                : hasPending
                  ? "bg-[#6BCB77] text-slate-950 animate-pulse"
                  : "bg-[#FFD93D] text-slate-950"
            }`}
            title="Saves all contentEditable changes permanently to database container"
          >
            {saveStatus === "saving" ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveStatus === "saved" ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>
                  Save All Changes {hasPending && <span className="bg-rose-500 text-white text-[8px] font-mono font-black px-1.5 py-0.5 rounded-full inline-block ml-1 animate-bounce">!</span>}
                </span>
              </>
            )}
          </button>
        </div>

      </div>
    </AnimatePresence>
  );
}
