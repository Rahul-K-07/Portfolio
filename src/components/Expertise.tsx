"use client";

import { useRef, useEffect } from "react";
import { SKILL_GROUPS } from "@/data/skills";
import { initGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Terminal, Cpu, Database, Wrench } from "lucide-react";

const GROUP_ICONS = {
  "ai-ml": Cpu,
  "web-dev": Terminal,
  "data-cloud": Database,
  "tools-systems": Wrench,
};

export default function Expertise() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Sequential category cards reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="expertise"
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-b border-cream/10 bg-[#111111]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="border-b border-cream/10 pb-8 sm:pb-12 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-crimson uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
              <span>MY TOOLKIT</span>
              <span className="text-cream/20">/</span>
              <span className="text-muted">4 TECHNICAL DOMAINS</span>
            </div>
            <h2 className="editorial-headline text-5xl sm:text-6xl lg:text-7xl font-light text-cream uppercase">
              &ldquo;A LITTLE BIT OF <span className="italic font-serif text-crimson">EVERYTHING.&rdquo;</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-muted max-w-xs uppercase tracking-wider leading-relaxed">
            NO ARBITRARY PERCENTAGE BARS. A COMPREHENSIVE SET OF TOOLS EMPLOYED IN PRODUCTION &amp; RESEARCH.
          </p>
        </div>

        {/* 4 Editorial Groups Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SKILL_GROUPS.map((group) => {
            const Icon = GROUP_ICONS[group.id as keyof typeof GROUP_ICONS] || Cpu;
            return (
              <div
                key={group.id}
                className="bg-[#181716] border border-cream/10 hover:border-crimson/50 rounded-sm p-8 sm:p-10 transition-colors duration-500 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-cream/10 pb-4 mb-6 font-mono text-xs text-muted">
                    <span className="text-crimson font-medium">{group.code}</span>
                    <Icon className="w-4 h-4 text-cream/40 group-hover:text-crimson transition-colors" />
                  </div>

                  {/* Category Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-cream font-light mb-3 tracking-tight">
                    {group.category}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-muted mb-8 font-light leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Editorial Typography Skills Cloud */}
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-cream/40 uppercase block mb-3">
                    COMPONENTS &amp; LIBRARIES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-3 py-1.5 bg-[#201F1D] border border-cream/10 text-cream/90 rounded-sm group-hover:border-cream/20 transition-all hover:bg-cream hover:text-bg hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Annotation */}
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted tracking-wider uppercase">
          <span>EXPERIMENTING CONSTANTLY WITH NEW ARCHITECTURES</span>
          <span className="text-cream">CURRENT FOCUS: LOCAL LLMs &amp; REASONING PIPELINES</span>
        </div>
      </div>
    </section>
  );
}
