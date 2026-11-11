"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Terminal, Compass, Cpu, ArrowDownRight } from "lucide-react";
import { initGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const visualColRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      // Text column reveal
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Visual column reveal
      if (visualColRef.current) {
        gsap.fromTo(
          visualColRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
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
      id="about"
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-b border-cream/10 bg-[#161514]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="border-b border-cream/10 pb-6 mb-12 sm:mb-16 flex items-center justify-between font-mono text-xs text-muted tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-cream">THE PERSON BEHIND THE CODE</span>
          </div>
          <span className="text-crimson font-mono">02 // PROFILE</span>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Expressive Typography & Authentic Story */}
          <div ref={textColRef} className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-xs tracking-widest text-crimson uppercase block mb-3">
                PHILOSOPHY &amp; PERSPECTIVE
              </span>
              <h2 className="editorial-headline text-4xl sm:text-5xl lg:text-6xl font-light text-cream uppercase leading-[1.05]">
                &ldquo;ENGINEER BY TRAINING. <br />
                <span className="italic font-serif text-crimson">CURIOUS BY NATURE.&rdquo;</span>
              </h2>
            </div>

            <div className="space-y-6 text-cream/85 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
              <p>
                I&apos;m a B.Tech graduate in Artificial Intelligence and Machine Learning,
                interested in building software that solves real problems.
              </p>

              <p>
                I enjoy experimenting with AI, exploring systems, learning new technologies and
                occasionally wandering into ideas that have nothing to do with code.
              </p>

              <blockquote className="pl-5 border-l-2 border-crimson my-6 py-1 italic font-serif text-xl sm:text-2xl text-cream">
                &ldquo;I don&apos;t want to just use technology. I want to understand how it works
                and what else it can do.&rdquo;
              </blockquote>
            </div>

            {/* Editorial Annotations Pill Grid */}
            <div className="pt-6 border-t border-cream/10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-[#1D1C1A] p-4 border border-cream/10 rounded-sm">
                <span className="text-muted block text-[10px] tracking-wider mb-1">FOUNDATION</span>
                <span className="text-cream font-medium">B.Tech in AI &amp; ML</span>
                <span className="text-crimson text-[11px] block mt-1">VAST — 8.89 CGPA</span>
              </div>

              <div className="bg-[#1D1C1A] p-4 border border-cream/10 rounded-sm">
                <span className="text-muted block text-[10px] tracking-wider mb-1">PRACTICE</span>
                <span className="text-cream font-medium">Applied ML &amp; Systems</span>
                <span className="text-muted text-[11px] block mt-1">Sensors, Cloud, Models</span>
              </div>

              <div className="bg-[#1D1C1A] p-4 border border-cream/10 rounded-sm">
                <span className="text-muted block text-[10px] tracking-wider mb-1">LOCATION</span>
                <span className="text-cream font-medium">Kerala, India</span>
                <span className="text-crimson text-[11px] block mt-1">Open Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Personal Imagery & Editorial Annotations */}
          <div ref={visualColRef} className="lg:col-span-5 relative space-y-6">
            {/* Primary Outdoor Photograph */}
            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#1E1D1B] border border-cream/15 shadow-2xl">
                <Image
                  src="/images/profile-outdoor.jpeg"
                  alt="Rahul K. - Personal Perspective"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:filter-none transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-cream/15 px-2.5 py-1 rounded font-mono text-[9px] tracking-widest text-cream uppercase">
                  <span>EXP. 02 // OUTDOORS</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-cream/90">
                  <span className="tracking-wider">RAHUL K.</span>
                  <span className="text-crimson">BEYOND THE TERMINAL</span>
                </div>
              </div>

              {/* Monospace Graphic Stamp */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#111111] border border-crimson/50 px-4 py-2.5 shadow-xl font-mono text-[10px] tracking-widest text-cream uppercase flex items-center gap-2 select-none">
                <span className="w-2 h-2 rounded-full bg-crimson" />
                <span>OBSERVER &amp; MAKER</span>
              </div>
            </div>

            {/* Secondary Workspace / Lab Diagram Card */}
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-[#141312] border border-cream/10 p-4 flex flex-col justify-between">
              <Image
                src="/images/workspace-placeholder.svg"
                alt="Workspace and experimental environment"
                fill
                className="object-cover opacity-80"
              />
              <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-muted tracking-widest uppercase">
                <span className="bg-black/70 px-2 py-0.5 rounded border border-cream/10">FIG. 02B // LAB</span>
                <span className="text-crimson">ACTIVE EXPERIMENTATION</span>
              </div>
              <div className="relative z-10 font-mono text-xs text-cream/90 bg-black/60 p-2 rounded border border-cream/10 backdrop-blur-sm">
                Focus on combining statistical machine learning with intuitive, reactive user interfaces.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
