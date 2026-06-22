import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS_DATA } from "../data";
import { Plus, Minus, HelpCircle } from "lucide-react";
import EditableElement from "./EditableElement";

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#ffffff] relative border-b-4 border-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="faq-section-container">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest text-[#FF6B6B] bg-[#FF6B6B]/10 border-2 border-black uppercase mb-4 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <EditableElement
              as="span"
              storageKey="faq-badge"
              defaultText="Got Questions?"
            />
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tight uppercase">
            <EditableElement
              as="span"
              storageKey="faq-heading"
              defaultText="Frequently Asked Questions"
            />
          </h2>
          <p className="mt-4 font-sans text-base text-slate-700 font-semibold">
            <EditableElement
              as="span"
              storageKey="faq-intro"
              defaultText="Everything you need to know about our high-impact creative imagery, dynamic comparative grids, and fast delivery structures."
            />
          </p>
        </motion.div>

        {/* Accordions Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4" 
          id="faq-accordion-stack"
        >
          {FAQS_DATA.map((faq) => {
            const isExpanded = faq.id === expandedId;

            return (
              <div
                key={faq.id}
                className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                {/* Accordion Header Trigger */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left px-6 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-5 h-5 text-[#8338EC] shrink-0 mt-0.5" />
                    <span className="font-display font-black text-slate-900 text-sm sm:text-base hover:text-[#8338EC] transition-colors leading-tight">
                      <EditableElement
                        as="span"
                        storageKey={`faq-question-${faq.id}`}
                        defaultText={faq.question}
                      />
                    </span>
                  </div>
                  
                  {/* Plus / Minus Indicator Icon */}
                  <div className="p-1 rounded-lg bg-slate-100 border-2 border-black text-slate-900 shrink-0">
                    {isExpanded ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Animated Body panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t-2 border-dashed border-slate-200 pl-14">
                        <p className="font-sans text-xs sm:text-sm text-slate-650 leading-relaxed font-bold">
                          <EditableElement
                            as="span"
                            storageKey={`faq-answer-${faq.id}`}
                            defaultText={faq.answer}
                          />
                        </p>
                        
                        <div className="mt-4 flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                          <span className="font-black">Category:</span>
                          <span className="text-[#FF6B6B] bg-[#FF6B6B]/10 px-3 py-1 rounded-full border-2 border-black font-mono font-black">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* Helpful contact bridge */}
        <div className="mt-12 text-center">
          <p className="text-slate-800 text-sm font-semibold">
            Have a different question not answered here?{" "}
            <button
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-[#8338EC] font-black underline hover:text-[#FF6B6B] focus:outline-none cursor-pointer"
            >
              Direct chat with Ubaid via WhatsApp &rarr;
            </button>
          </p>
        </div>

      </div>
    </section>
  );
}
