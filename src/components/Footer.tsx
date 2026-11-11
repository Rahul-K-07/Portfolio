"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 sm:px-10 lg:px-16 border-t border-cream/10 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-muted">
        {/* Left: Copyright & Editorial Edition */}
        <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
          <span className="text-cream font-medium">RAHUL K. © 2026</span>
          <span className="text-cream/20">•</span>
          <span className="text-muted">BETWEEN LOGIC &amp; CHAOS</span>
          <span className="text-cream/20 hidden sm:inline">•</span>
          <span className="text-crimson text-[11px] hidden sm:inline">PROD // NEXT.JS + GSAP</span>
        </div>

        {/* Center / Right: Coordinates & Back-to-Top */}
        <div className="flex items-center gap-6">
          <span className="text-muted/60 text-[11px] hidden lg:inline">
            10.5276° N, 76.2144° E
          </span>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-cream hover:text-crimson transition-colors py-2 px-4 rounded-full border border-cream/10 hover:border-crimson/50 bg-[#161514]"
            aria-label="Back to top"
          >
            <span className="text-[11px] tracking-widest uppercase">BACK TO TOP</span>
            <div className="w-5 h-5 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-crimson group-hover:text-cream transition-colors">
              <ArrowUp className="w-3 h-3 text-crimson group-hover:text-cream transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
