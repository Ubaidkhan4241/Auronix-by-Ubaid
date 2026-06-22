import React, { useState, useEffect, useRef } from "react";

interface EditableElementProps {
  storageKey: string;
  defaultText: string;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p" | "li" | "span" | "strong";
  multiline?: boolean;
}

// Global declaration to hold unsaved changes in memory prior to hitting the green "Save All Changes" floating badge.
declare global {
  interface Window {
    ubaidUnsavedChanges?: Record<string, string>;
  }
}

export default function EditableElement({
  storageKey,
  defaultText,
  className = "",
  as = "div",
  multiline = false,
}: EditableElementProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ubaid_admin_authenticated") === "true";
    }
    return false;
  });

  const [text, setText] = useState(() => {
    if (typeof window !== "undefined") {
      const savedObjRaw = localStorage.getItem("ubaid_website_content");
      if (savedObjRaw) {
        try {
          const savedObj = JSON.parse(savedObjRaw);
          if (savedObj[storageKey] !== undefined) {
            return savedObj[storageKey];
          }
        } catch (e) {
          console.error("Error reading saved key: ", storageKey, e);
        }
      }
    }
    return defaultText;
  });

  const elementRef = useRef<HTMLElement>(null);

  // Synchronize dynamic administrative access updates on lock/unlock events
  useEffect(() => {
    const handleAccessUpdate = () => {
      const active = localStorage.getItem("ubaid_admin_authenticated") === "true";
      setIsAdmin(active);
    };

    const handlePortfolioUpdate = () => {
      if (typeof window !== "undefined") {
        const savedObjRaw = localStorage.getItem("ubaid_website_content");
        if (savedObjRaw) {
          try {
            const savedObj = JSON.parse(savedObjRaw);
            if (savedObj[storageKey] !== undefined) {
              setText(savedObj[storageKey]);
            }
          } catch (e) {}
        } else {
          setText(defaultText);
        }
      }
    };

    window.addEventListener("ubaid-access-mode-updated", handleAccessUpdate);
    window.addEventListener("ubaid-portfolio-updated", handlePortfolioUpdate);
    return () => {
      window.removeEventListener("ubaid-access-mode-updated", handleAccessUpdate);
      window.removeEventListener("ubaid-portfolio-updated", handlePortfolioUpdate);
    };
  }, [storageKey, defaultText]);

  // Handle changes when Ubaid edits texts
  const handleInput = () => {
    if (!elementRef.current) return;
    const value = elementRef.current.innerText || "";
    
    // Set to unsaved tracking pool
    if (typeof window !== "undefined") {
      if (!window.ubaidUnsavedChanges) {
        window.ubaidUnsavedChanges = {};
      }
      window.ubaidUnsavedChanges[storageKey] = value;
      // Dispatch a change alert to show the floating Save button has pending edits
      window.dispatchEvent(new Event("ubaid-pending-changes"));
    }
  };

  const Tag = as;

  if (isAdmin) {
    return (
      <Tag
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className={`${className} outline-2 outline-dashed outline-pink-500/80 outline-offset-2 hover:bg-pink-500/5 transition-all cursor-text relative group/editable`}
        title="Admin Mode: Click & Type directly on the page to customize!"
        style={{ minWidth: "20px", display: as === "span" || as === "strong" ? "inline-block" : undefined }}
      >
        {text}
      </Tag>
    );
  }

  return <Tag className={className}>{text}</Tag>;
}
