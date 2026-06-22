import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROCESS_STEPS } from "../data";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import EditableElement from "./EditableElement";

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="process" className="py-32 bg-white relative border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="process-timeline-container">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest text-slate-900 bg-[#06D6A0]/30 border-2 border-black uppercase mb-4 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <EditableElement
              as="span"
              storageKey="process-badge"
              defaultText="How we roll"
            />
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none uppercase font-display select-none">
            <EditableElement
              as="span"
              storageKey="process-heading"
              defaultText="The AURONIX Process"
            />
          </h2>
          <p className="mt-4 font-sans text-slate-700 font-semibold text-base sm:text-lg">
            <EditableElement
              as="span"
              storageKey="process-intro"
              defaultText="From raw spreadsheet catalogs or amateur smartphone files to custom, high-converting retail assets. A transparent, fast timeline built to optimize metrics and catalog listings."
            />
          </p>
        </motion.div>

        {/* Timeline Horizontal tracker (Desktop View) */}
        <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto relative mb-20" id="timeline-rail">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-black -translate-y-1/2" />
          <div 
            className="absolute left-0 h-1 bg-[#8338EC] top-1/2 -translate-y-1/2 transition-all duration-500" 
            style={{ width: `${((activeStep - 1) / (PROCESS_STEPS.length - 1)) * 100}%` }}
          />

          {PROCESS_STEPS.map((step) => {
            const isActive = step.stepNumber === activeStep;
            const isCompleted = step.stepNumber < activeStep;

            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(step.stepNumber)}
                className="relative bg-white px-4 cursor-pointer focus:outline-none"
              >
                <div 
                  className={`w-14 h-14 rounded-full border-3 flex items-center justify-center font-display font-black text-sm transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 ${
                    isActive 
                      ? "border-black bg-[#4D96FF] text-slate-950 scale-110"
                      : isCompleted 
                        ? "border-black bg-[#6BCB77] text-slate-950 font-bold"
                        : "border-black bg-white text-slate-800"
                  }`}
                >
                  {isCompleted ? "✓" : `0${step.stepNumber}`}
                </div>
                <span className={`absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-black uppercase tracking-wider font-mono ${
                  isActive ? "text-[#8338EC]" : "text-slate-650"
                }`}>
                  {step.title}
                </span>
                <span className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide font-black">
                  {step.duration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card rendering for horizontal active step */}
        <div className="max-w-4xl mx-auto" id="timeline-detail-panels">
          <AnimatePresence mode="wait">
            {PROCESS_STEPS.map((step) => {
              if (step.stepNumber !== activeStep) return null;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-3 border-black rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#FFD93D] relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
                >
                  {/* Digital watermark */}
                  <div className="absolute right-4 bottom-0 text-[180px] font-display font-black text-slate-900/[0.04] leading-none select-none pointer-events-none">
                    0{step.stepNumber}
                  </div>

                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-black text-slate-950 uppercase bg-[#9D4EDD]/20 px-3.5 py-1 rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        Stage {step.stepNumber}
                      </span>
                      <span className="text-[10px] font-mono font-black text-slate-950 bg-[#06D6A0]/20 px-3.5 py-1 rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-900" />
                        <EditableElement
                          as="span"
                          storageKey={`process-step-duration-${step.stepNumber}`}
                          defaultText={step.duration}
                        />
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2.5xl text-slate-950 mt-5 tracking-tight uppercase">
                      <EditableElement
                        as="span"
                        storageKey={`process-step-title-${step.stepNumber}`}
                        defaultText={step.title}
                      />
                    </h3>
                    <p className="font-sans text-sm text-slate-700 mt-4 leading-relaxed font-bold">
                      <EditableElement
                        as="span"
                        storageKey={`process-step-description-${step.stepNumber}`}
                        defaultText={step.description}
                      />
                    </p>

                    {/* Step navigation trigger links for mobile */}
                    <div className="flex gap-2.5 mt-8 md:hidden">
                      {PROCESS_STEPS.map((s) => (
                        <button
                          key={s.stepNumber}
                          onClick={() => setActiveStep(s.stepNumber)}
                          className={`w-4 h-4 rounded-full border-2 border-black transition-all ${
                            s.stepNumber === activeStep ? "bg-[#8338EC] scale-125" : "bg-white"
                          }`}
                          aria-label={`Go to step ${s.stepNumber}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-[#fafafa] border-2 border-black rounded-2xl p-5 sm:p-6 relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] text-slate-900 uppercase tracking-widest font-mono font-black block mb-4">
                      Execution Checklist
                    </span>
                    <ul className="space-y-3.5">
                      {step.detailedPoints.map((pt, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-slate-800 font-bold">
                          <CheckCircle className="w-4 h-4 text-[#8338EC] shrink-0 mt-0.5" />
                          <span>
                            <EditableElement
                              as="span"
                              storageKey={`process-step-point-${step.stepNumber}-${index}`}
                              defaultText={pt}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile View Sequential steps */}
        <div className="md:hidden mt-8 space-y-6" id="mobile-vertical-timeline">
          {PROCESS_STEPS.map((step) => (
            <div 
              key={step.stepNumber} 
              onClick={() => setActiveStep(step.stepNumber)}
              className={`p-5 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                step.stepNumber === activeStep 
                  ? "bg-[#FFD93D]/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] scale-[1.01]" 
                  : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white border-2 border-black text-slate-900 text-xs font-black flex items-center justify-center">
                  0{step.stepNumber}
                </span>
                <h4 className="font-display font-black text-sm text-slate-900 uppercase">
                  {step.title}
                </h4>
                <span className="ml-auto text-[10px] text-slate-650 font-mono font-black">
                  {step.duration}
                </span>
              </div>
              {step.stepNumber === activeStep && (
                <div className="mt-4 text-xs text-slate-700 pl-2 space-y-3 border-t-2 border-dashed border-slate-300 pt-3">
                  <p className="font-bold">{step.description}</p>
                  <div className="pt-2.5 border-t border-slate-200 space-y-2.5 bg-white p-3 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                    {step.detailedPoints.map((p, pi) => (
                      <div key={pi} className="flex items-center gap-2 font-bold select-none text-slate-800">
                        <span className="w-2 h-2 rounded-full bg-[#8338EC]" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
