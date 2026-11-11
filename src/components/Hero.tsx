"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, CornerDownRight, Sparkles } from "lucide-react";
import { initGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLDivElement>(null);
  const designationRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // 1. Headline line-by-line reveal
      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
        { y: "115%", opacity: 0, rotate: 1 },
        {
          y: "0%",
          opacity: 1,
          rotate: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power4.out",
        }
      );

      // 2. Portrait reveal through clip-path and subtle scale down
      if (portraitWrapperRef.current && portraitImgRef.current) {
        tl.fromTo(
          portraitWrapperRef.current,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.7"
        );

        tl.fromTo(
          portraitImgRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          "<"
        );
      }

      // 3. Supporting text and annotations stagger
      tl.fromTo(
        [designationRef.current, bioRef.current, annotationsRef.current],
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
        },
        "-=0.6"
      );

      // 4. Scroll indicator reveal
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-cream/10"
    >
      {/* Editorial Watermark / Background Texture Accents */}
      <div
        className="absolute top-20 right-4 sm:right-12 font-mono text-[10px] sm:text-xs text-muted/30 tracking-widest uppercase pointer-events-none select-none"
        aria-hidden="true"
      >
        <span>FOLIO // 2026</span>
        <span className="mx-2 text-crimson/50">/</span>
        <span>INDEX 01-05</span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        {/* Top Editorial Label Row */}
        <div
          ref={annotationsRef}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/10 pb-4 mb-8 sm:mb-12 font-mono text-[11px] sm:text-xs tracking-wider text-muted uppercase"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
            <span className="text-cream">EDITORIAL PORTFOLIO</span>
            <span className="text-cream/20">|</span>
            <span className="text-muted hidden sm:inline">CONCEPT: LOGIC &amp; CHAOS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted/70">10°31&apos;N 76°12&apos;E</span>
            <span className="text-crimson font-medium">AVAILABLE FOR ROLES</span>
          </div>
        </div>

        {/* Main Composition Grid: Overlapping Headline & Asymmetric Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center relative">
          {/* Left / Center Typography (Oversized Serif) */}
          <div className="lg:col-span-8 z-20">
            <h1
              className="editorial-headline text-[16vw] sm:text-[13vw] lg:text-[7.8rem] xl:text-[8.8rem] font-light text-cream uppercase select-none"
              aria-label="Between Logic and Chaos"
            >
              {/* Line 1 */}
              <span className="block overflow-hidden py-1">
                <span ref={headlineLine1Ref} className="block will-change-transform">
                  BETWEEN
                </span>
              </span>

              {/* Line 2 with Crimson Accent */}
              <span className="block overflow-hidden py-1">
                <span
                  ref={headlineLine2Ref}
                  className="block will-change-transform text-cream flex items-baseline gap-2 sm:gap-4 flex-wrap"
                >
                  <span className="italic font-serif font-normal text-crimson pr-2">
                    LOGIC
                  </span>
                  <span className="font-serif font-light text-cream/70 text-[0.7em]">&amp;</span>
                </span>
              </span>

              {/* Line 3 */}
              <span className="block overflow-hidden py-1">
                <span
                  ref={headlineLine3Ref}
                  className="block will-change-transform tracking-tight text-cream"
                >
                  CHAOS<span className="text-crimson">.</span>
                </span>
              </span>
            </h1>

            {/* Sub-headline & Professional Designation */}
            <div
              ref={designationRef}
              className="mt-6 sm:mt-8 pt-4 border-t border-cream/10 max-w-xl flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 font-mono text-xs sm:text-sm tracking-wider"
            >
              <div className="flex items-center gap-2 text-crimson">
                <CornerDownRight className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold text-cream">AI &amp; ML ENGINEER</span>
              </div>
              <span className="hidden sm:inline text-cream/20">•</span>
              <span className="text-muted">SOFTWARE DEVELOPER</span>
            </div>
          </div>

          {/* Right / Overlapping Asymmetric Duotone Portrait */}
          <div className="lg:col-span-4 relative mt-4 lg:mt-0 z-10 lg:-ml-16 xl:-ml-24">
            <div
              ref={portraitWrapperRef}
              className="relative w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm bg-[#181716] border border-cream/15 shadow-2xl group"
            >
              {/* Crimson Accent Graphic Frame & Duotone Layer */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
                <div ref={portraitImgRef} className="relative w-full h-full will-change-transform">
                  <Image
                    src="/images/profile.png"
                    alt="Rahul K. - Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 35vw"
                    priority
                    className="object-cover object-top filter grayscale contrast-125 brightness-95 group-hover:filter-none transition-all duration-700 ease-out"
                  />
                  {/* Subtle Crimson Gradient Duotone Glow Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-black/80 via-[#B34A43]/20 to-transparent mix-blend-multiply pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-crimson/10 mix-blend-color pointer-events-none group-hover:opacity-0 transition-opacity duration-700"
                    aria-hidden="true"
                  />
                </div>

                {/* Editorial Photo Callouts & Decorative Tags */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm border border-cream/15 px-2 py-1 rounded font-mono text-[9px] tracking-widest text-cream uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                  <span>FIG 01 // ARCHIVE</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm border border-cream/15 px-2.5 py-1 rounded font-mono text-[9px] tracking-widest text-cream/80 uppercase">
                  <span>RAHUL K. — VAST &apos;24</span>
                </div>
              </div>

              {/* Monospace Editorial Bar Beneath Image */}
              <div className="bg-[#1D1C1A] px-4 py-2.5 border-t border-cream/10 flex items-center justify-between font-mono text-[10px] text-muted tracking-wider">
                <span>PORTRAIT // OVERLAP REF. 01</span>
                <span className="text-crimson">8.89 CGPA GRAD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction Narrative & Action Bar */}
        <div
          ref={bioRef}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-8 border-t border-cream/10"
        >
          <div className="md:col-span-7 lg:col-span-6">
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-cream/90 leading-relaxed">
              &ldquo;I build intelligent systems and digital experiences, exploring the space between engineering and creativity.&rdquo;
            </p>
          </div>

          <div className="md:col-span-5 lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start md:justify-end gap-4">
            <button
              onClick={scrollToWork}
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-cream text-bg font-mono text-xs tracking-widest uppercase rounded-full hover:bg-crimson hover:text-cream transition-all duration-300 shadow-lg"
            >
              <span>EXPLORE SELECTED WORK</span>
              <CornerDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-cream/20 text-cream/80 hover:text-cream hover:border-crimson font-mono text-xs tracking-widest uppercase rounded-full transition-colors"
            >
              <span>THE PERSON</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Bar with Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-muted font-mono text-[10px] sm:text-xs tracking-widest uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="text-crimson">[ SCROLL ]</span>
          <span className="hidden sm:inline">TO UNCOVER WORK &amp; EXPERIMENTS</span>
        </div>

        <button
          onClick={scrollToWork}
          className="flex items-center gap-2 text-cream hover:text-crimson transition-colors group cursor-pointer focus:outline-none"
          aria-label="Scroll down to projects"
        >
          <span className="hidden sm:inline">PROCEED</span>
          <div className="w-7 h-7 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-crimson group-hover:bg-crimson/10 transition-all">
            <ArrowDown className="w-3.5 h-3.5 text-crimson group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
}
