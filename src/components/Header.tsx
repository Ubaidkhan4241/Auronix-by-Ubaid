import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Rocket, Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "My Process", href: "#process" },
    { label: "Why Work With Me", href: "#why-me" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="app-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 sm:py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-6xl px-6 py-3.5 rounded-2xl transition-all duration-500 flex items-center justify-between ${
          isScrolled
            ? "glass-panel shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white border-2 border-black"
            : "bg-white/80 backdrop-blur-md border border-slate-200"
        }`}>
          {/* Logo element */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center group cursor-pointer"
            id="nav-logo"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8" id="desktop-nav">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="font-display text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-black transition-colors py-1 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-brand-pink group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block md:pl-5 lg:pl-7 border-l-2 border-dashed border-slate-100 flex-shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#FFD93D] hover:bg-[#FFD93D]/95 text-slate-900 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:scale-95 transition-all outline-none shrink-0"
              id="header-cta-btn"
            >
              Get Custom Quote
              <Rocket className="w-3.5 h-3.5 text-slate-900" />
            </a>
          </div>

          {/* Mobile Menu Multi-Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 hover:bg-[#FFD93D] focus:outline-none rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:hidden absolute top-24 left-4 right-4 z-50 rounded-2xl bg-white border-2 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            id="mobile-nav-panel"
          >
            <div className="space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-black hover:bg-brand-cyan/25 transition-all border border-transparent hover:border-black"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-[#FF6B6B] border-2 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get Custom Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
