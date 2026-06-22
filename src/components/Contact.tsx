import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Mail, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  User, 
  Briefcase, 
  Phone, 
  FileText, 
  CheckSquare, 
  Clock, 
  ShieldCheck,
  Globe,
  Plus,
  ChevronRight,
  Send,
  Sparkle
} from "lucide-react";
import EditableElement from "./EditableElement";

export default function Contact() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [serviceRequired, setServiceRequired] = useState("Catalog Management");
  const [projectDetails, setProjectDetails] = useState("");
  const [customServices, setCustomServices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const servicesList = [
    "Catalog Management",
    "Bulk Product Uploads",
    "Product Variations",
    "AI Product Images",
    "AI Product Videos",
    "E-commerce Website Creation"
  ];

  // Listener to auto-select service when clicked from the services card list
  useEffect(() => {
    const handleServiceSelection = (e: Event) => {
      const serviceId = (e as CustomEvent).detail;
      const mapping: Record<string, string> = {
        "catalog-management": "Catalog Management",
        "bulk-uploads": "Bulk Product Uploads",
        "product-variations": "Product Variations",
        "ai-product-images": "AI Product Images",
        "ai-product-videos": "AI Product Videos",
        "ecommerce-web-creation": "E-commerce Website Creation"
      };
      
      const matched = mapping[serviceId];
      if (matched) {
        setServiceRequired(matched);
      }
    };
    window.addEventListener("select-service-estimator", handleServiceSelection);
    return () => window.removeEventListener("select-service-estimator", handleServiceSelection);
  }, []);

  const getMessageBody = () => {
    const servicesText = customServices.length > 0 
      ? [serviceRequired, ...customServices].join(", ") 
      : serviceRequired;

    return `Hi Ubaid! I would like to request a custom e-commerce quote for my business from AURONIX. Here are my project details:\n\n` +
           `• Name: ${name || "Not provided"}\n` +
           `• Business Name: ${businessName || "Not provided"}\n` +
           `• Email: ${email || "Not provided"}\n` +
           `• WhatsApp Number: ${whatsappNumber || "Not provided"}\n` +
           `• Service Required: ${servicesText}\n` +
           `• Project Details:\n${projectDetails || "No additional parameters specified."}\n\n` +
           `*(Note: Secure marketplace access will be delegated via User Access/restricted staff permissions).*`;
  };

  const handleToggleCustomService = (serviceName: string) => {
    if (customServices.includes(serviceName)) {
      setCustomServices(prev => prev.filter(s => s !== serviceName));
    } else {
      setCustomServices(prev => [...prev, serviceName]);
    }
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in at least Name and Email fields so I can contact you properly.");
      return;
    }
    
    setIsSubmitted(true);
    const bodyText = encodeURIComponent(getMessageBody());
    window.open(`https://wa.me/917310835942?text=${bodyText}`, "_blank");
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in at least Name and Email fields so I can contact you properly.");
      return;
    }

    setIsSubmitted(true);
    const subject = encodeURIComponent(`AURONIX Custom Quote Request - ${businessName || name}`);
    const body = encodeURIComponent(getMessageBody());
    window.open(`mailto:ubaidkhan4241@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section id="contact" className="py-32 bg-white border-b-4 border-black overflow-hidden relative">
      {/* Decorative meshes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="contact-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest text-[#FF6B6B] bg-[#FF6B6B]/10 border-2 border-black uppercase mb-4 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <EditableElement
              as="span"
              storageKey="contact-badge"
              defaultText="Connect With AURONIX"
            />
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none uppercase">
            <EditableElement
              as="span"
              storageKey="contact-heading"
              defaultText="Let's Make Something Sick"
            />
          </h2>
          <p className="mt-4 font-sans text-slate-700 font-semibold text-base sm:text-lg">
            <EditableElement
              as="span"
              storageKey="contact-intro"
              defaultText="No rigid corporate packages. Tell us what your brand needs, and Ubaid Khan will personally build a custom layout strategy."
            />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Trust signals and direct channel credentials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 text-left space-y-8" 
            id="trust-and-credentials-block"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#06D6A0]/10 border-2 border-black text-xs font-mono font-bold text-[#06D6A0] uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                <Sparkle className="w-3.5 h-3.5" />
                <EditableElement
                  as="span"
                  storageKey="contact-subbadge"
                  defaultText="High-Performance Guarantee"
                />
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase">
                <EditableElement
                  as="span"
                  storageKey="contact-subheading"
                  defaultText="Work Directly with Ubaid Khan"
                />
              </h3>
              <p className="font-sans text-sm sm:text-base text-slate-750 font-semibold leading-relaxed">
                <EditableElement
                  as="span"
                  storageKey="contact-subintro"
                  defaultText="Whether you sell on Amazon, manage high-volume Shopify stores, or require state-of-the-art AI-powered product backdrops, we deliver compliant, high-end content layout designs fast."
                />
              </p>
            </div>

            {/* Premium Trust Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD93D]/10 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Clock className="w-7 h-7 text-[#FF6B6B] mb-3 stroke-[2.5]" />
                <h4 className="font-display font-black text-sm text-slate-900 uppercase">Rapid Response</h4>
                <p className="font-sans text-xs text-slate-650 mt-1.5 font-bold leading-relaxed">
                  We review custom layout briefs and respond in less than 4 working hours. See rapid updates.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#6BCB77]/10 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <ShieldCheck className="w-7 h-7 text-[#6BCB77] mb-3 stroke-[2.5]" />
                <h4 className="font-display font-black text-sm text-slate-900 uppercase">Secure Access</h4>
                <p className="font-sans text-xs text-slate-650 mt-1.5 font-bold leading-relaxed">
                  We rely on standard restricted Seller Central permissions. Your primary login credentials are safe with us.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00C2FF]/10 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Globe className="w-7 h-7 text-[#00C2FF] mb-3 stroke-[2.5]" />
                <h4 className="font-display font-black text-sm text-slate-900 uppercase">Multi-Platform</h4>
                <p className="font-sans text-xs text-slate-650 mt-1.5 font-bold leading-relaxed">
                  Cross-compliant feeds optimized for Amazon, Flipkart, Shopify, and Etsy.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#9D4EDD]/10 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <CheckSquare className="w-7 h-7 text-[#9D4EDD] mb-3 stroke-[2.5]" />
                <h4 className="font-display font-black text-sm text-slate-900 uppercase">Guaranteed Feed</h4>
                <p className="font-sans text-xs text-slate-650 mt-1.5 font-bold leading-relaxed">
                  Every asset is built following strict web sizing and white-balance specifications. No errors.
                </p>
              </div>
            </div>

            {/* Direct Channels block */}
            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <span className="text-[10px] text-slate-900 font-mono tracking-widest uppercase font-black block">
                Or ping us directly:
              </span>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/917310835942"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex-1 px-5 py-4 rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 border-2 border-black text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950 shrink-0" />
                  WhatsApp Ubaid
                </a>
                
                <a
                  href="mailto:ubaidkhan4241@gmail.com"
                  className="flex-1 px-5 py-4 rounded-xl bg-white hover:bg-slate-100 border-2 border-black text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  Email Studio
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium High-Converting Interactive Lead Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white border-3 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#00C2FF] relative overflow-hidden rounded-[2rem]" 
            id="quote-submission-card"
          >
            {/* success background blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8FAB]/20 rounded-bl-3xl pointer-events-none -mr-12 -mt-12" />

            {/* Success state block */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 space-y-6"
                  key="success"
                >
                  <div className="w-16 h-16 rounded-full bg-[#06D6A0]/10 border-2 border-black text-[#06D6A0] flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-3xl text-slate-900 uppercase">
                    Spec Sent!
                  </h3>
                  <p className="font-sans text-slate-700 text-sm max-w-md mx-auto font-bold leading-relaxed">
                    Thank you for submitting your specifications. An interactive quote outline summary has been structured. Click the option below to immediately synchronize your brief and begin:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        const bodyText = encodeURIComponent(getMessageBody());
                        window.open(`https://wa.me/917310835942?text=${bodyText}`, "_blank");
                      }}
                      className="w-full px-5 py-4 border-2 border-black rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px]"
                    >
                      <MessageSquare className="w-4 h-4 fill-slate-950" />
                      Sync via WhatsApp
                    </button>
                    
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="w-full px-5 py-4 border-2 border-black rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px]"
                    >
                      Back to Form
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmitWhatsApp}
                  className="space-y-6 text-left"
                  key="form"
                >
                  <div className="flex items-center gap-3 pb-6 border-b-2 border-black">
                    <div className="w-11 h-11 rounded-xl bg-[#8338EC]/10 border-2 border-black text-[#8338EC] flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                      <FileText className="w-5 h-5 text-[#8338EC]" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-xl text-slate-950 uppercase">Project Brief Builder</h4>
                      <p className="font-sans text-xs text-slate-600 font-bold">
                        Fill in your parameters for instant analysis:
                      </p>
                    </div>
                  </div>

                  {/* Form fields layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-[9px] font-black text-slate-800 uppercase tracking-widest font-mono mb-2">
                        Your Full Name <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-900">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Utsav Jain"
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-[#00C2FF]/5 font-sans font-bold transition-all"
                        />
                      </div>
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-[9px] font-black text-slate-800 uppercase tracking-widest font-mono mb-2">
                        Business / Brand Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-900">
                          <Briefcase className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Rattan Craft India"
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-[#00C2FF]/5 font-sans font-bold transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[9px] font-black text-slate-800 uppercase tracking-widest font-mono mb-2">
                        Email Address <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-900">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. contact@rattancraft.com"
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-[#00C2FF]/5 font-sans font-bold transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-[9px] font-black text-slate-800 uppercase tracking-widest font-mono mb-2">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-900">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-[#00C2FF]/5 font-sans font-bold transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Service Selector */}
                  <div>
                    <label className="block text-[9px] font-black text-slate-800 uppercase tracking-widest font-mono mb-2">
                      Primary Service Required
                    </label>
                    <div className="relative">
                      <select
                        value={serviceRequired}
                        onChange={(e) => setServiceRequired(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white border-2 border-black rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-[#00C2FF]/5 appearance-none cursor-pointer font-sans font-black"
                      >
                        {servicesList.map((service, idx) => (
                           <option key={idx} value={service} className="text-slate-950 font-sans font-bold">
                             {service}
                           </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-900 border-l-2 border-black bg-slate-100 rounded-r-xl">
                        <ChevronRight className="w-4 h-4 rotate-90 text-slate-950" />
                      </div>
                    </div>
                  </div>

                  {/* Additional services checkbox list */}
                  <div className="space-y-3">
                    <span className="block text-[9px] text-[#8338EC] uppercase font-mono tracking-widest font-black">
                      Combine with other scopes:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {servicesList
                        .filter(s => s !== serviceRequired)
                        .slice(0, 6)
                        .map((serv, index) => {
                          const isAdd = customServices.includes(serv);
                          return (
                            <button
                              type="button"
                              key={index}
                              onClick={() => handleToggleCustomService(serv)}
                              className={`p-3 rounded-xl border-2 text-left flex items-center gap-2.5 transition-all duration-305 cursor-pointer text-xs font-black ${
                                isAdd 
                                  ? "bg-[#8338EC]/10 border-[#8338EC] text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" 
                                  : "bg-white border-slate-300 text-slate-700 hover:border-black"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded border-2 border-black flex items-center justify-center shrink-0 ${
                                isAdd ? "bg-[#06D6A0]" : "bg-white"
                              }`}>
                                {isAdd && <Plus className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                              </div>
                              <span className="truncate">{serv}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest font-mono mb-2">
                      Brief Description / Requirements <span className="text-[#FF6B6B]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="e.g., We have a catalog of 25 wood stands on Amazon and need high impact catalog listings plus custom studio backdrop renders..."
                      className="w-full p-4 bg-white border-2 border-black rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-[#00C2FF]/5 font-sans font-bold transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Form Submission Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button
                      type="submit"
                      onClick={handleSubmitWhatsApp}
                      className="w-full sm:flex-1 px-6 py-4.5 rounded-xl border-2 border-black bg-[#25D366] hover:bg-[#25D366]/90 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-[2px] active:shadow-none"
                    >
                      <MessageSquare className="w-4 h-4 fill-slate-950 shrink-0" />
                      Sync WhatsApp Brief
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmitEmail}
                      className="w-full sm:flex-1 px-6 py-4.5 rounded-xl border-2 border-black bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-[2px] active:shadow-none"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      Email Brief Outline
                    </button>
                  </div>

                  <p className="text-[9px] text-slate-500 font-mono text-center font-bold uppercase tracking-wider">
                    * Ubaid Khan personally drafts catalog visual solutions. Response is dispatched under 4 hours. No upfront payment required.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
