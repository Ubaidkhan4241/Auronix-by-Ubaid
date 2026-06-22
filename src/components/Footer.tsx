import React from "react";
import { ChevronUp } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-white border-t-4 border-black py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="footer-container">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Column 1 Logo */}
          <div className="md:col-span-5 text-left">
            <a 
              href="#hero" 
              onClick={(e) => handleLinkClick(e, "#hero")}
              className="flex items-center group mb-4"
            >
              <Logo size="sm" />
            </a>
            <p className="font-sans text-xs text-slate-700 max-w-sm leading-relaxed font-bold">
              Designing premium marketplace experiences with compliant catalogs and advanced AI generative scenery. We help brands convert attention into consistent transactions.
            </p>
          </div>

          {/* Column 2 Nav Links */}
          <div className="md:col-span-4 text-left">
            <span className="text-[10px] text-slate-900 font-mono uppercase tracking-widest font-black block mb-4">
              Quick Portals
            </span>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              <a 
                href="#services" 
                onClick={(e) => handleLinkClick(e, "#services")}
                className="text-xs text-slate-600 hover:text-[#8338EC] font-black tracking-wide transition-colors"
              >
                My Services
              </a>
              <a 
                href="#portfolio" 
                onClick={(e) => handleLinkClick(e, "#portfolio")}
                className="text-xs text-slate-600 hover:text-[#8338EC] font-black tracking-wide transition-colors"
              >
                Portfolio
              </a>
              <a 
                href="#process" 
                onClick={(e) => handleLinkClick(e, "#process")}
                className="text-xs text-slate-600 hover:text-[#8338EC] font-black tracking-wide transition-colors"
              >
                Methodology
              </a>
              <a 
                href="#why-me" 
                onClick={(e) => handleLinkClick(e, "#why-me")}
                className="text-xs text-slate-600 hover:text-[#8338EC] font-black tracking-wide transition-colors"
              >
                Why Choose Me
              </a>
              <a 
                href="#faq" 
                onClick={(e) => handleLinkClick(e, "#faq")}
                className="text-xs text-slate-600 hover:text-[#8338EC] font-black tracking-wide transition-colors"
              >
                FAQs
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="text-xs text-slate-600 hover:text-[#8338EC] font-black tracking-wide transition-colors"
              >
                Estimate Brief
              </a>
            </div>
          </div>

          {/* Column 3 Info */}
          <div className="md:col-span-3 text-left">
            <span className="text-[10px] text-slate-900 font-mono uppercase tracking-widest font-black block mb-4">
              AURONIX Credentials
            </span>
            <div className="space-y-2 text-xs text-slate-750 font-bold">
              <p>Email: <a href="mailto:ubaidkhan4241@gmail.com" className="text-slate-900 hover:text-[#8338EC] underline">ubaidkhan4241@gmail.com</a></p>
              <p>Turnaround: <span className="text-slate-900">24h SLA Priority</span></p>
              <p>Platforms: <span className="text-slate-900">Amazon, Flipkart, Meesho, Shopify, IndiaMART, Alibaba, Etsy</span></p>
            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="pt-8 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[10px] text-slate-600 font-mono font-bold">
              &copy; {new Date().getFullYear()} AURONIX by Ubaid Khan. All rights reserved. 
            </span>
            <span className="block sm:inline sm:ml-2 text-[9px] text-slate-500 font-mono uppercase tracking-wide font-bold">
              *All platform logos belong to their respective registered legal owners.
            </span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="p-3.5 rounded-xl bg-white hover:bg-[#FFD93D] border-2 border-black text-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ChevronUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
