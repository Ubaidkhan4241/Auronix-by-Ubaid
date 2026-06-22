import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS_DATA } from "../data";
import { Star, ChevronLeft, ChevronRight, Quote, ShoppingBag } from "lucide-react";
import EditableElement from "./EditableElement";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Auto scroll testimonials every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (platform: string | undefined) => {
    switch (platform) {
      case "amazon": 
        return <span className="bg-[#FF9900] text-black font-black text-[9px] px-2.5 py-1 rounded-full border-2 border-black tracking-wide uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">AMAZON</span>;
      case "shopify":
        return <span className="bg-[#96bf48] text-black font-black text-[9px] px-2.5 py-1 rounded-full border-2 border-black tracking-wide uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">SHOPIFY</span>;
      case "meesho":
        return <span className="bg-[#f43596] text-white font-black text-[9px] px-2.5 py-1 rounded-full border-2 border-black tracking-wide uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">MEESHO</span>;
      case "flipkart":
        return <span className="bg-[#2874f0] text-white font-black text-[9px] px-2.5 py-1 rounded-full border-2 border-black tracking-wide uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">FLIPKART</span>;
      case "web":
        return <span className="bg-[#00C2FF] text-black font-black text-[9px] px-2.5 py-1 rounded-full border-2 border-black tracking-wide uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">DIRECT WEB</span>;
      default:
        return null;
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#fafafa] border-b-4 border-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="testimonials-main">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest text-slate-900 bg-[#FF8FAB]/30 border-2 border-black uppercase mb-4 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <EditableElement
              as="span"
              storageKey="testimonials-badge"
              defaultText="Approved Energy"
            />
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none uppercase">
            <EditableElement
              as="span"
              storageKey="testimonials-heading"
              defaultText="Loved By Active Brands"
            />
          </h2>
          <p className="mt-4 font-sans text-base text-slate-700 font-semibold max-w-2xl mx-auto">
            <EditableElement
              as="span"
              storageKey="testimonials-intro"
              defaultText="See how merchants & brand directors leverage AURONIX's smart aesthetics to double hook-rates and lift click-through conversion."
            />
          </p>
        </motion.div>

        {/* Highlight Testimonial Deck Carousel */}
        <div className="relative" id="testimonial-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border-3 border-black rounded-3xl p-6 sm:p-12 shadow-[8px_8px_0px_0px_#9D4EDD] relative text-left"
            >
              <Quote className="absolute right-8 top-8 w-16 h-16 text-[#8338EC]/5 stroke-[1.5]" />
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
                {/* Simulated Avatar Sphere */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#FFB703] border-3 border-black flex items-center justify-center font-display font-black text-slate-950 text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  {TESTIMONIALS_DATA[currentIndex].name.slice(0, 2).toUpperCase()}
                </div>

                <div className="space-y-4 w-full">
                  {/* Rating Stars row */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const isFilled = idx < TESTIMONIALS_DATA[currentIndex].rating;
                      return (
                        <Star 
                          key={idx} 
                          className={`w-4 h-4 stroke-2 ${
                            isFilled ? "fill-[#FFD93D] text-slate-950" : "text-slate-300 fill-transparent"
                          }`} 
                        />
                      );
                    })}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="font-sans text-sm sm:text-base text-slate-800 leading-relaxed font-bold italic">
                    "<EditableElement
                      as="span"
                      storageKey={`testimonial-text-${TESTIMONIALS_DATA[currentIndex].id}`}
                      defaultText={TESTIMONIALS_DATA[currentIndex].text}
                    />"
                  </p>

                  {/* Testimonial Signoff Card line */}
                  <div className="pt-4 border-t-2 border-dashed border-slate-300 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="font-display font-black text-slate-900 text-sm">
                        <EditableElement
                          as="span"
                          storageKey={`testimonial-name-${TESTIMONIALS_DATA[currentIndex].id}`}
                          defaultText={TESTIMONIALS_DATA[currentIndex].name}
                        />
                      </h4>
                      <p className="font-sans text-xs text-slate-600 font-bold mt-0.5">
                        <EditableElement
                          as="span"
                          storageKey={`testimonial-role-${TESTIMONIALS_DATA[currentIndex].id}`}
                          defaultText={TESTIMONIALS_DATA[currentIndex].role}
                        />, <span className="text-[#8338EC]">
                          <EditableElement
                            as="span"
                            storageKey={`testimonial-company-${TESTIMONIALS_DATA[currentIndex].id}`}
                            defaultText={TESTIMONIALS_DATA[currentIndex].company}
                          />
                        </span>
                      </p>
                    </div>

                    {/* Channel badge element */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 uppercase font-mono font-black tracking-wider">Indexed:</span>
                      {getPlatformIcon(TESTIMONIALS_DATA[currentIndex].platformIcon)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons below / sides */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="p-3.5 rounded-xl bg-white hover:bg-[#FFD93D] border-2 border-black text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all focus:outline-none cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Micro indicators dot list */}
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all duration-300 ${
                    i === currentIndex ? "w-8 bg-[#00C2FF]" : "bg-white"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3.5 rounded-xl bg-white hover:bg-[#FFD93D] border-2 border-black text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all focus:outline-none cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Small brand listing trust points below */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono font-black">
            Active brand partnerships in categories:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {["Cosmetics & Skin Care", "Apparel & Fashion Wear", "Electronic Accessories", "Home Decors & Kitchenware", "Fitness & Protein Nutrients"].map((tag) => (
              <span key={tag} className="text-[10px] font-mono font-bold px-3 py-1 bg-white text-slate-800 rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
