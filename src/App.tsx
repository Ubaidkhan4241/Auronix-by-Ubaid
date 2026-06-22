import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AdminPanel from "./components/AdminPanel";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import WhyChooseMe from "./components/WhyChooseMe";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Sync portfolio changes automatically to the backend server to make changes hardcoded in the repository
  useEffect(() => {
    const syncPortfolioData = async () => {
      try {
        const localDataStr = localStorage.getItem("my_vibrant_dynamic_portfolio_v2");
        if (!localDataStr) return;
        
        let parsedData;
        try {
          parsedData = JSON.parse(localDataStr);
        } catch (e) {
          return;
        }

        if (Array.isArray(parsedData) && parsedData.length > 0) {
          console.log("[AURONIX AUTO-SYNC] Synchronizing local browser portfolio customization...");
          const res = await fetch("/api/save-portfolio", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: localDataStr,
          });
          const result = await res.json();
          if (result && result.success) {
            console.log(`[AURONIX AUTO-SYNC] Successfully hardcoded ${result.count} portfolio items to disk!`);
          }
        }
      } catch (err) {
        console.info("[AURONIX AUTO-SYNC] Backend offline (or static server), skipping persistent hardcode sync.");
      }
    };

    syncPortfolioData();
    window.addEventListener("ubaid-portfolio-updated", syncPortfolioData);
    return () => {
      window.removeEventListener("ubaid-portfolio-updated", syncPortfolioData);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-vibrant-mesh text-slate-800 antialiased selection:bg-brand-yellow selection:text-slate-900 overflow-hidden font-sans">
      
      {/* Background Interactive Cursor Ambient Light Spot (Desktop Only) */}
      {!isMobile && (
        <div
          className="pointer-events-none fixed z-35 w-[650px] h-[650px] rounded-full bg-gradient-radial from-brand-pink/25 via-brand-cyan/10 to-transparent blur-[130px] transition-transform duration-200 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* Massive Ambient Organic Glowing Blobs (Aurora Style - Playful Gen-Z Colors) */}
      <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full bg-brand-coral/15 blur-[120px] animate-blob-1 pointer-events-none z-10" />
      <div className="absolute top-[25%] right-[5%] w-[600px] h-[600px] rounded-full bg-brand-cyan/12 blur-[140px] animate-blob-2 pointer-events-none z-10" />
      <div className="absolute bottom-[20%] left-[10%] w-[550px] h-[550px] rounded-full bg-brand-purple/15 blur-[130px] animate-blob-3 pointer-events-none z-10" />
      <div className="absolute bottom-[2%] right-[10%] w-[450px] h-[450px] rounded-full bg-brand-yellow/15 blur-[110px] animate-blob-1 pointer-events-none z-10" />

      {/* Deep Cybernetic Grid Backing (Playful, dark grid on light) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none z-0" />

      {/* Global Navigation Header overlay */}
      <Header />

      {/* Structured Single-Page sections */}
      <main className="relative z-10">
        <Hero />
        <Services />
        {isAdmin && <AdminPanel />}
        <Portfolio />
        <Process />
        <WhyChooseMe />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      {/* Global conversion footer */}
      <Footer />
    </div>
  );
}
