import React, { useState } from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: { w: 32, h: 32 },
    md: { w: 42, h: 42 },
    lg: { w: 64, h: 64 },
    xl: { w: 120, h: 120 },
  };

  const { w, h } = iconSizes[size];
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision Logo Image (Auronix Logo) */}
      {!imageError ? (
        <img
          src="/logo.png"
          alt="AURONIX"
          width={w}
          height={h}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ maxWidth: w, maxHeight: h }}
        />
      ) : (
        /* Original Premium Vector Icon as a robust fallback in case Auronix logo.png is not found on disk yet */
        <svg
          width={w}
          height={h}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 group-hover:scale-105 animate-none"
        >
          <defs>
            <linearGradient id="cyberBlueGrad" x1="20" y1="35" x2="90" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8338EC" />
              <stop offset="50%" stopColor="#00C2FF" />
              <stop offset="100%" stopColor="#06D6A0" />
            </linearGradient>
            
            <linearGradient id="silverGlossGrad" x1="40" y1="35" x2="105" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#d8e2ef" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            
            <filter id="vectorNeonShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          <g filter="url(#vectorNeonShadow)">
            {/* Elegant futuristic pillar graphic stylized to represent A/O of Auronix */}
            <path
              d="M20,30 L38,30 L38,95 L20,95 Z"
              fill="url(#cyberBlueGrad)"
            />
            <path
              d="M38,30 L64,30 L90,95 L64,95 Z"
              fill="url(#cyberBlueGrad)"
              opacity="0.9"
            />
            <path
              d="M20,83 L80,83 L70,95 L20,95 Z"
              fill="url(#cyberBlueGrad)"
              opacity="0.9"
            />
            <path
              d="M48,85 L84,38 L98,38 L62,85 Z"
              fill="url(#silverGlossGrad)"
            />
            <rect x="104" y="24" width="7" height="7" fill="#00C2FF" />
            <rect x="96" y="16" width="5" height="5" fill="#8338EC" />
            <rect x="110" y="14" width="4" height="4" fill="#06D6A0" />
          </g>
        </svg>
      )}

      {/* Styled text block matching AURONIX branding and the "by Ubaid Khan" founder credit */}
      {showText && (
        <div className="flex flex-col text-left select-none leading-none">
          <span className="font-display font-black text-slate-900 text-base sm:text-lg tracking-[0.06em] uppercase group-hover:text-[#8338EC] transition-colors leading-none decoration-clone">
            AURONIX
          </span>
          <span className="font-sans text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-1 block leading-none select-none opacity-80">
            by Ubaid Khan
          </span>
        </div>
      )}
    </div>
  );
}
