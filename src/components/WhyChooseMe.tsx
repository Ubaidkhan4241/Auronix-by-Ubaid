import { motion } from "motion/react";
import { Zap, MessageSquare, Target, Cpu, TrendingUp, Sparkles, Clock, Percent, Smile, ChevronRight } from "lucide-react";
import EditableElement from "./EditableElement";

export default function WhyChooseMe() {
  
  const pillars = [
    {
      id: "conversion-strategy",
      title: "Conversion Focused Strategy",
      subtitle: "Persuasion-Led Catalog Engineering",
      description: "We don't just make pretty pictures. Every pixel, title keyword, comparison grid, and EBC layout is calculated to convert passing traffic into high-value sales.",
      metric: "2.5x",
      metricLabel: "Average Listing CTR Lift",
      icon: Target,
      colorClass: "bg-white border-2 border-black shadow-[6px_6px_0px_0px_#8338EC]",
      accent: "#8338EC"
    },
    {
      id: "ai-workflow",
      title: "AI Powered Workflow",
      subtitle: "Next-Gen Generative Aesthetics",
      description: "No expensive physical studios or rent delays. We utilize high-fidelity AI render chains to mock up your raw mobile phone snapshots into 4K elite lifestyle scenes.",
      metric: "10x",
      metricLabel: "Reduction in Studio Fees",
      icon: Cpu,
      colorClass: "bg-white border-2 border-black shadow-[6px_6px_0px_0px_#FF6B6B]",
      accent: "#FF6B6B"
    },
    {
      id: "fast-delivery",
      title: "Fast Delivery",
      subtitle: "Insanely Quick SLA Turns",
      description: "Quick turns keep your storefront inventory flowing. We dispatch listing reviews, optimization audits, and visual background drafts within 24 hours.",
      metric: "24h",
      metricLabel: "Typical SLA Turnaround",
      icon: Clock,
      colorClass: "bg-white border-2 border-black shadow-[6px_6px_0px_0px_#FFD93D]",
      accent: "#FFD93D"
    },
    {
      id: "marketplace-optimized",
      title: "Marketplace Optimized Content",
      subtitle: "100% Platform Compliant Feeds",
      description: "Tailored to respect the strict white-balance and title keyword guidelines of Amazon Seller Central, Flipkart Seller Hub, Shopify, and Meesho panels.",
      metric: "100%",
      metricLabel: "Upload Compliance Score",
      icon: Zap,
      colorClass: "bg-white border-2 border-black shadow-[6px_6px_0px_0px_#00C2FF]",
      accent: "#00C2FF"
    },
    {
      id: "beginner-support",
      title: "Beginner Friendly Support",
      subtitle: "Zero Jargon, Direct WhatsApp Syncs",
      description: "Never feel lost in complex technical dashboards. You get friendly, direct-to-founder support on WhatsApp to help you set up restricted catalog access safely.",
      metric: "1-on-1",
      metricLabel: "Owner Accountability",
      icon: MessageSquare,
      colorClass: "bg-white border-2 border-black shadow-[6px_6px_0px_0px_#6BCB77]",
      accent: "#6BCB77"
    }
  ];

  return (
    <section id="why-me" className="py-24 bg-white relative overflow-hidden text-slate-900 border-b-4 border-black">
      {/* Decorative dots background */}
      <div className="absolute inset-0 bg-[#00000003] bg-[radial-gradient(#0000000b_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="why-work-with-me-container">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest text-[#FF6B6B] bg-[#FF6B6B]/10 border-2 border-black uppercase mb-4 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <EditableElement
              as="span"
              storageKey="why-badge"
              defaultText="High Impact Benefits"
            />
          </span>
          <h2 className="font-display font-black text-[6.5vw] min-[390px]:text-[5vw] sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none uppercase whitespace-nowrap overflow-visible">
            <EditableElement
              as="span"
              storageKey="why-heading"
              defaultText="Why Work With Me"
            />
          </h2>
          <p className="mt-4 font-sans text-base text-slate-700 font-semibold leading-relaxed">
            <EditableElement
              as="span"
              storageKey="why-intro"
              defaultText="We combine expert e-commerce store knowledge with cutting edge generative graphics to produce visuals that feel premium and sell instantly."
            />
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="why-me-grid">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={pillar.id}
                className={`group ${pillar.colorClass} rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300 text-left ${index === 4 ? "md:col-span-2" : ""}`}
              >
                <div>
                  {/* Top line mapping icons & metrics */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-950">
                      <IconComponent className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    {/* Visual Large Metric badge */}
                    <div className="text-right">
                      <span className="font-display font-black text-3.5xl sm:text-4xl text-slate-950 leading-none block">
                        <EditableElement
                          as="span"
                          storageKey={`why-pillar-metric-${pillar.id}`}
                          defaultText={pillar.metric}
                        />
                      </span>
                      <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-wider block mt-1">
                        <EditableElement
                          as="span"
                          storageKey={`why-pillar-metriclabel-${pillar.id}`}
                          defaultText={pillar.metricLabel}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <h3 className="font-display font-black text-xl sm:text-2xl text-slate-950 mt-8 tracking-tight uppercase">
                    <EditableElement
                      as="span"
                      storageKey={`why-pillar-title-${pillar.id}`}
                      defaultText={pillar.title}
                    />
                  </h3>
                  <p className="font-mono text-[9px] text-[#8338EC] mt-1 font-black uppercase tracking-widest bg-[#8338EC]/10 border border-transparent border-dashed px-2 py-0.5 rounded-md inline-block">
                    <EditableElement
                      as="span"
                      storageKey={`why-pillar-sub-${pillar.id}`}
                      defaultText={pillar.subtitle}
                    />
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-bold">
                    <EditableElement
                      as="span"
                      storageKey={`why-pillar-desc-${pillar.id}`}
                      defaultText={pillar.description}
                    />
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-slice border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-550 font-mono font-bold">
                  <span className="flex items-center gap-1.5 ">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06D6A0]" />
                    <span>
                      <EditableElement
                        as="span"
                        storageKey={`why-pillar-footer-${pillar.id}`}
                        defaultText="Always compliant, always premium"
                      />
                    </span>
                  </span>
                  <Smile className="w-4.5 h-4.5 text-slate-400 group-hover:text-slate-900 group-hover:rotate-12 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Banner stat metrics row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#fafafa] border-3 border-black text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" 
          id="value-stats"
        >
          <div>
            <span className="block font-display font-black text-3.5xl text-[#8338EC] uppercase leading-none">
              <EditableElement
                as="span"
                storageKey="why-stat-num-1"
                defaultText="24 HOUR"
              />
            </span>
            <span className="block text-[10px] text-slate-650 uppercase font-mono font-black tracking-wider mt-2.5">
              <EditableElement
                as="span"
                storageKey="why-stat-lbl-1"
                defaultText="Typical SLA turnaround"
              />
            </span>
          </div>
          <div className="border-t-2 md:border-t-0 md:border-l-2 border-dashed border-slate-350 pt-6 md:pt-0">
            <span className="block font-display font-black text-3.5xl text-[#06D6A0] uppercase leading-none">
              <EditableElement
                as="span"
                storageKey="why-stat-num-2"
                defaultText="99.8%"
              />
            </span>
            <span className="block text-[10px] text-slate-650 uppercase font-mono font-black tracking-wider mt-2.5">
              <EditableElement
                as="span"
                storageKey="why-stat-lbl-2"
                defaultText="Compliant Upload Feed"
              />
            </span>
          </div>
          <div className="border-t-2 md:border-t-0 md:border-l-2 border-dashed border-slate-350 pt-6 md:pt-0">
            <span className="block font-display font-black text-3.5xl text-[#FF6B6B] uppercase leading-none">
              <EditableElement
                as="span"
                storageKey="why-stat-num-3"
                defaultText="10x"
              />
            </span>
            <span className="block text-[10px] text-slate-650 uppercase font-mono font-black tracking-wider mt-2.5">
              <EditableElement
                as="span"
                storageKey="why-stat-lbl-3"
                defaultText="Cheaper than raw studios"
              />
            </span>
          </div>
          <div className="border-t-2 md:border-t-0 md:border-l-2 border-dashed border-slate-350 pt-6 md:pt-0">
            <span className="block font-display font-black text-3.5xl text-[#00C2FF] uppercase leading-none">
              <EditableElement
                as="span"
                storageKey="why-stat-num-4"
                defaultText="15+"
              />
            </span>
            <span className="block text-[10px] text-slate-650 uppercase font-mono font-black tracking-wider mt-2.5">
              <EditableElement
                as="span"
                storageKey="why-stat-lbl-4"
                defaultText="Niches Optimized"
              />
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
