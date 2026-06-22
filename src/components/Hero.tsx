import { motion } from "motion/react";
import { ArrowRight, Sparkles, Eye, Star, Image, Video, ShoppingBag, Globe, Rocket, HelpCircle } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (id: string) => {
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
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-white"
    >
      {/* Decorative vertical grid lines like Figma/Notion Calendar layout */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 pointer-events-none opacity-[0.03] z-0">
        <div className="border-r border-black" />
        <div className="border-r border-black" />
        <div className="border-r border-black" />
        <div className="border-r border-black" />
        <div className="border-r border-black" />
        <div className="border-r border-black animate-pulse" />
        <div className="border-r border-black" />
        <div className="border-r border-black" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center z-10 w-full">
        
        {/* Animated Badge - Neo-Brutalist Duolingo style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFB703] border-3 border-black text-slate-900 text-xs font-bold uppercase tracking-widest mb-8 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-pointer"
          id="hero-badge"
          onClick={() => handleScrollTo("#process")}
        >
          <Sparkles className="w-4 h-4 text-slate-900 animate-spin-slow shrink-0" />
          <span>YOUR PRODUCTS DESERVE BETTER</span>
        </motion.div>

        {/* Massive Headline (Gen-Z Duolingo/Spotify Wrapped Look: Giant, Bold, Colorful) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl"
        >
          <h1 
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900 tracking-tighter leading-[0.87]"
            id="hero-headline"
          >
            Your Products <br />
            <span className="text-white px-4 py-2 my-2 inline-block bg-gradient-to-r from-[#8338EC] via-[#FF6B6B] to-[#FFD93D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase -rotate-1 hover:rotate-1 transition-transform">
              Deserve
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#8338EC] to-[#00C2FF] animate-pulse inline-block leading-tight">
              Better.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 font-sans text-base sm:text-xl text-slate-700 max-w-2xl font-semibold leading-relaxed"
        >
          We construct thumb-stopping graphics & smart AI-powered transformations that double conversions. No boring SaaS templates, only raw creative energy.
        </motion.p>

        {/* Glowing CTA Buttons section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
          id="hero-ctas"
        >
          <button
            onClick={() => handleScrollTo("#portfolio")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-white text-slate-900 border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer"
            id="hero-samples-btn"
          >
            <Eye className="w-4 h-4 text-[#8338EC]" />
            View Portfolio Grid
          </button>
          
          <button
            onClick={() => handleScrollTo("#contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#FF6B6B] text-white border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF6B6B]/95 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer"
            id="hero-contact-btn"
          >
            Let's Collaborate
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Trust elements with vibrant pill badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-x-4 gap-y-3 justify-center text-[10px] text-slate-800 font-mono tracking-wider font-bold uppercase border-t-3 border-dashed border-black pt-8 w-full max-w-4xl"
          id="hero-platforms"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6BCB77]/20 border-2 border-black text-slate-900">
            <Star className="w-3.5 h-3.5 text-[#FFB703] fill-[#FFB703]" />
            100% Platform Compliant
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C2FF]/20 border-2 border-black text-slate-900">
            <Sparkles className="w-3.5 h-3.5 text-[#8338EC]" />
            Supercharged AI Pipelines
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8FAB]/30 border-2 border-black text-slate-900">
            <Rocket className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Conversion Multiplied
          </span>
        </motion.div>
      </div>

      {/* Floating Animated Product Mockups (Desktop Only - Bright Playful aesthetics with solid black borders) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" id="hero-floating-elements">
        {/* Mockup 1: Product Render Bottle */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[4%] w-60 p-4 rounded-3xl bg-white border-3 border-black shadow-[6px_6px_0px_0px_#9D4EDD]"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFD93D] to-[#FF8FAB] mb-3 border-2 border-black">
            <img 
              src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
              alt="Premium Oil"
            />
            <span className="absolute bottom-2 right-2 bg-[#FF6B6B] border-2 border-black text-[8px] font-mono uppercase font-black text-white px-2 py-0.5 rounded-full">AI SCENERY</span>
          </div>
          <div className="text-left">
            <span className="text-[10px] text-[#8338EC] font-mono font-black uppercase tracking-wider">Luxe Cosmetics</span>
            <h4 className="text-sm font-display font-extrabold text-slate-900 mt-0.5 truncate">Organic Hair Serum</h4>
          </div>
        </motion.div>

        {/* Mockup 2: Shoe Float */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [-1, 3, -1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[15%] right-[4%] w-64 p-4 rounded-3xl bg-white border-3 border-black shadow-[6px_6px_0px_0px_#00C2FF]"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#06D6A0] to-[#4D96FF] mb-3 border-2 border-black">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
              alt="Active Trainers"
            />
            <span className="absolute bottom-2 right-2 bg-[#8338EC] border-2 border-black text-[8px] font-mono uppercase font-black text-white px-2 py-0.5 rounded-full">SHADOW 3D</span>
          </div>
          <div className="text-left">
            <span className="text-[10px] text-[#FF6B6B] font-mono font-black uppercase tracking-wider">Aero Kinetics</span>
            <h4 className="text-sm font-display font-extrabold text-slate-900 mt-0.5 truncate">Speed Runner Red</h4>
          </div>
        </motion.div>
      </div>

      {/* Marquee Row Section as requested for campaign feel */}
      <div className="w-full overflow-hidden bg-black py-4 mt-20 relative z-20 -rotate-1 border-y-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] flex items-center">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest">
          {Array(10).fill([
            "✨ NO BORING CODE",
            "🚀 DOUBLE YOUR CONVERSIONS",
            "⚡ NEXT-GEN DESIGN CO",
            "🎨 SPOTIFY WRAPPED VIBES",
            "💖 100% AMZ COMPLIANT",
            "🔥 CREATIVE DESTRUCTION",
          ]).flat().map((text, idx) => (
            <span key={idx} className="flex items-center gap-4">
              <span>{text}</span>
              <span className="text-[#FFD93D] font-bold">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
