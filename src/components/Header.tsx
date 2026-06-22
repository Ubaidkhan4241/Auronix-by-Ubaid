import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Rocket, Sparkles, User, LogIn, LogOut, Lock, Unlock } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  isAdmin?: boolean;
  setIsAdmin?: (val: boolean) => void;
}

export default function Header({ isAdmin = false, setIsAdmin }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth management states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === "ubaidkhan4241@gmail.com" && password === "Ubaid786") {
      setLoginError("");
      setLoginSuccess(true);
      if (setIsAdmin) {
        setIsAdmin(true);
      }
      localStorage.setItem("ubaid_admin_authenticated", "true");
      localStorage.setItem("ubaid_vault_unlocked", "true");
      
      // Dispatch events to instantly sync local states of other components
      window.dispatchEvent(new Event("ubaid-portfolio-updated"));
      window.dispatchEvent(new Event("ubaid-access-mode-updated"));

      setTimeout(() => {
        setIsLoginOpen(false);
        setLoginSuccess(false);
        setEmail("");
        setPassword("");
      }, 1200);
    } else {
      setLoginError("Invalid Administrator Credentials. Please check details and try again.");
    }
  };

  const handleLogout = () => {
    if (setIsAdmin) {
      setIsAdmin(false);
    }
    localStorage.removeItem("ubaid_admin_authenticated");
    localStorage.removeItem("ubaid_vault_unlocked");

    // Dispatch update triggers
    window.dispatchEvent(new Event("ubaid-portfolio-updated"));
    window.dispatchEvent(new Event("ubaid-access-mode-updated"));

    setIsLoginOpen(false);
  };

  return (
    <header
      id="app-header"
      className="fixed top-0 left-0 right-0 z-55 transition-all duration-500 py-4 sm:py-6"
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

          {/* Desktop CTA & Admin Portal Icon */}
          <div className="hidden md:flex items-center gap-4 md:pl-5 lg:pl-7 border-l-2 border-dashed border-slate-100 flex-shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#FFD93D] hover:bg-[#FFD93D]/95 text-slate-900 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:scale-95 transition-all outline-none shrink-0"
              id="header-cta-btn"
            >
              Get Custom Quote
              <Rocket className="w-3.5 h-3.5 text-slate-900" />
            </a>

            {/* Profile circular button for Admin Access Control */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className={`p-2 rounded-xl border-2 border-black transition-all flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:scale-95 cursor-pointer relative ${
                isAdmin 
                  ? "bg-emerald-400 hover:bg-emerald-300 text-slate-950" 
                  : "bg-white hover:bg-slate-50 text-slate-700"
              }`}
              title={isAdmin ? "Logged-in as Admin" : "Authorize Admin Portal"}
              id="admin-login-bell"
            >
              <User className="w-4 h-4" />
              {isAdmin && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse border border-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu Multi-Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Auth button */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className={`p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] cursor-pointer ${
                isAdmin 
                  ? "bg-emerald-400 text-slate-950" 
                  : "bg-white text-slate-700"
              }`}
              title="Admin Mode Portal"
            >
              <User className="w-4 h-4" />
            </button>

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
            className="md:hidden absolute top-24 left-4 right-4 z-[99] rounded-2xl bg-white border-2 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
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

      {/* Admin Authentication Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              id="auth-modal-backdrop"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm bg-white border-3 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 overflow-hidden font-sans text-left"
              id="auth-modal-box"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-pink via-[#FFD93D] to-brand-cyan" />

              <div className="flex items-center justify-between mb-5 select-none">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD93D] border-2 border-black flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-wider">
                    Portal Sign-In
                  </h3>
                </div>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="p-1 rounded-lg border-2 border-black bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {loginSuccess ? (
                <div className="py-6 text-center space-y-3 select-none">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-500 mx-auto flex items-center justify-center animate-bounce">
                    <Unlock className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="font-display font-black text-slate-900 text-sm uppercase">
                    Admin Status Unlocked!
                  </h4>
                  <p className="font-sans text-xs text-slate-505 leading-relaxed font-semibold">
                    Welcome back, Ubaid! Ready for portfolio configurations...
                  </p>
                </div>
              ) : isAdmin ? (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 border-2 border-emerald-550/30 rounded-xl text-center space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-black text-[9px] uppercase tracking-wider mb-1">
                      ADMIN PRIVILEGES ACTIVE
                    </span>
                    <p className="font-sans text-xs font-bold text-slate-805">
                      Session Authenticated
                    </p>
                    <p className="font-mono text-[10px] text-slate-505 font-extrabold">
                      ubaidkhan4241@gmail.com
                    </p>
                  </div>

                  <p className="font-sans text-[11px] text-slate-505 leading-relaxed text-center font-medium">
                    You have unlocked Admin Mode! Inline edit sliders & delete tools are armed over standard showcases.
                  </p>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-black bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Exit Admin Mode</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <p className="font-sans text-[11px] text-slate-505 leading-relaxed font-semibold mb-2">
                    Please provide your specialized master credentials to unlock direct database visual customizations.
                  </p>

                  {loginError && (
                    <div className="p-3 bg-rose-50 border-2 border-rose-550/30 text-[#FF6B6B] rounded-xl font-sans text-[11px] font-bold leading-tight">
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[9px] text-slate-600 font-mono font-black uppercase tracking-wider">
                      ADMIN EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ubaidkhan4241@gmail.com"
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-black rounded-xl text-xs text-slate-900 font-sans font-bold focus:outline-none focus:bg-white focus:border-[#8338EC]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] text-slate-600 font-mono font-black uppercase tracking-wider">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-slate-50 border-2 border-black rounded-xl text-xs text-slate-900 font-sans font-bold focus:outline-none focus:bg-white focus:border-[#8338EC]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border-2 border-black bg-[#FFD93D] hover:bg-[#FFD93D]/95 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer mt-2"
                  >
                    <LogIn className="w-4 h-4 shrink-0" />
                    <span>Authorize Sign-In</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
