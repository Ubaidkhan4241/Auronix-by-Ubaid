import React, { useState } from "react";
import { motion } from "motion/react";
import { SERVICES_DATA } from "../data";
import { Service } from "../types";
import { 
  ShoppingCart, 
  Sparkles, 
  Zap, 
  FileSpreadsheet, 
  Database, 
  Grid, 
  Layers, 
  Image as LucideImage, 
  Video, 
  Globe, 
  Check,
  ChevronRight,
  ArrowRight,
  PhoneCall
} from "lucide-react";
import EditableElement from "./EditableElement";

// Lucide mapping lookup to stay light and typesafe
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Sparkles,
  Zap,
  FileSpreadsheet,
  Database,
  Grid,
  Layers,
  Image: LucideImage,
  Video,
  Globe
};

const ACCENT_COLORS = [
  { bg: "bg-[#FF6B6B]/10", border: "border-[#FF6B6B]", text: "text-[#FF6B6B]", shadow: "shadow-[6px_6px_0px_0px_#FF6B6B]", badge: "bg-[#FF6B6B]/20 text-slate-900" },
  { bg: "bg-[#8338EC]/10", border: "border-[#8338EC]", text: "text-[#8338EC]", shadow: "shadow-[6px_6px_0px_0px_#8338EC]", badge: "bg-[#8338EC]/20 text-slate-00" },
  { bg: "bg-[#00C2FF]/10", border: "border-[#00C2FF]", text: "text-[#00C2FF]", shadow: "shadow-[6px_6px_0px_0px_#00C2FF]", badge: "bg-[#00C2FF]/20 text-slate-900" },
  { bg: "bg-[#FFD93D]/15", border: "border-[#FFD93D]", text: "text-[#FFB703]", shadow: "shadow-[6px_6px_0px_0px_#FFD93D]", badge: "bg-[#FFD93D]/40 text-slate-950" },
  { bg: "bg-[#6BCB77]/10", border: "border-[#6BCB77]", text: "text-[#6BCB77]", shadow: "shadow-[6px_6px_0px_0px_#6BCB77]", badge: "bg-[#6BCB77]/20 text-slate-900" },
  { bg: "bg-[#FF8FAB]/15", border: "border-[#FF8FAB]", text: "text-[#FF8FAB]", shadow: "shadow-[6px_6px_0px_0px_#FF8FAB]", badge: "bg-[#FF8FAB]/40 text-slate-900" },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<"all" | "catalog" | "ai" | "web">("all");

  const filterTabs = [
    { id: "all", label: "All Services" },
    { id: "catalog", label: "Catalog & Variations" },
    { id: "ai", label: "AI Product Content" },
    { id: "web", label: "E-comm Creation" },
  ];

  const filteredServices = SERVICES_DATA.filter(service => {
    if (activeTab === "all") return true;
    if (activeTab === "catalog") return service.category === "catalog";
    if (activeTab === "ai") return service.category === "ai-content";
    if (activeTab === "web") return service.category === "web-creation";
    return true;
  });

  const handleInquiryScroll = (serviceId?: string) => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      if (serviceId) {
        window.dispatchEvent(new CustomEvent("select-service-estimator", { detail: serviceId }));
      }
      const offsetTop = contactSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-32 bg-[#fafafa] border-t-4 border-b-4 border-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="services-container">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest text-[#8338EC] bg-[#8338EC]/10 border-2 border-black uppercase mb-4 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <EditableElement
              as="span"
              storageKey="services-badge"
              defaultText="High-Ticket Solutions"
            />
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none">
            <EditableElement
              as="span"
              storageKey="services-heading"
              defaultText="Our Elite Services"
            />
          </h2>
          <p className="mt-4 font-sans text-slate-700 font-semibold text-base sm:text-lg">
            <EditableElement
              as="span"
              storageKey="services-intro"
              defaultText="Slashing production costs, building beautiful visuals, and optimizing listing assets. We help brands launch bulletproof catalogs that command premium conversion."
            />
          </p>
        </motion.div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16" id="services-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wide transition-all duration-300 outline-none cursor-pointer border-2 border-black ${
                activeTab === tab.id
                  ? "bg-[#00C2FF] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                  : "bg-white text-slate-750 hover:bg-[#FFD93D] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid with Animation layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="services-grid"
        >
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || ShoppingCart;
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                key={service.id}
                className={`group relative bg-white border-3 border-black p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 rounded-3xl ${accent.shadow}`}
              >
                <div>
                  {/* Icon Block */}
                  <div className={`w-14 h-14 rounded-2xl ${accent.bg} border-2 border-black text-slate-900 flex items-center justify-center mb-6 shadow group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Badge */}
                  <div className="flex flex-col gap-y-2 mb-3">
                    <h3 className="font-display font-black text-xl text-slate-905">
                      <EditableElement
                        as="span"
                        storageKey={`service-title-${service.id}`}
                        defaultText={service.title}
                      />
                    </h3>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-[8px] font-bold font-mono tracking-widest uppercase border-2 border-black ${accent.badge}`}>
                        Premium Asset Output
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                    <EditableElement
                      as="span"
                      storageKey={`service-desc-${service.id}`}
                      defaultText={service.description}
                    />
                  </p>

                  {/* Deliverables checklist */}
                  <div className="mt-6 pt-5 border-t-2 border-dashed border-black">
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider font-mono font-black block mb-3">
                      Core Deliverables
                    </span>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-semibold">
                          <Check className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                          <span>
                            <EditableElement
                              as="span"
                              storageKey={`service-deliverable-${service.id}-${idx}`}
                              defaultText={item}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleInquiryScroll(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#8338EC] hover:text-[#FF6B6B] transition-colors group/btn cursor-pointer"
                  >
                    Inquire for Custom Quote
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium CTA Section */}
        <div id="premium-cta" className="mt-24 relative rounded-[2rem] border-3 border-black bg-[#FFD93D] p-8 sm:p-12 md:p-16 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest text-[#FF6B6B] bg-white border-2 border-black uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" /> Let's Collaborate
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-none uppercase">
              Have a Specific Vision?
            </h3>
            <p className="mt-4 font-sans text-slate-900 font-bold text-base sm:text-lg">
              Get a custom designed active solution engineered specifically for your brand’s catalogs, listing visuals, or custom web portals.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={() => handleInquiryScroll()}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-[#FF6B6B] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] transition-all cursor-pointer"
              >
                Get Custom Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="https://wa.me/917310835942?text=Hello%20Ubaid,%20I'm%20interested%20in%20a%20custom%20e-commerce%20quote%20for%20my%20business."
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                WhatsApp Direct
              </a>
            </div>
            
            <p className="mt-5 text-[10px] text-slate-800 font-mono tracking-widest uppercase font-extrabold">
              Fast • Response within 2-4 working hours
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
