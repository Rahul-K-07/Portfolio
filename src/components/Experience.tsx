"use client";

import { useRef, useEffect } from "react";
import { TIMELINE } from "@/data/experience";
import { initGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Timeline items staggered entrance
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll(".timeline-card"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
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
      id="experience"
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-b border-cream/10 bg-[#161514]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="border-b border-cream/10 pb-8 sm:pb-12 mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-crimson uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span>CHRONOLOGY</span>
            <span className="text-cream/20">/</span>
            <span className="text-muted">MILESTONES</span>
          </div>
          <h2 className="editorial-headline text-5xl sm:text-6xl lg:text-7xl font-light text-cream uppercase">
            THE JOURNEY <span className="italic font-serif text-crimson">SO FAR.</span>
          </h2>
        </div>

        {/* Minimal Vertical Timeline */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10 space-y-12 sm:space-y-16">
          {/* Vertical Crimson Spine Line */}
          <div
            className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-crimson via-crimson/50 to-cream/10"
            aria-hidden="true"
          />

          {TIMELINE.map((item, idx) => {
            const isEducation = item.type === "EDUCATION";
            return (
              <div key={item.id} className="timeline-card relative group">
                {/* Crimson Marker Node */}
                <div
                  className="absolute -left-[23px] sm:-left-[35px] top-1.5 w-4 h-4 rounded-full bg-bg border-2 border-crimson flex items-center justify-center group-hover:scale-125 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                </div>

                {/* Card Container */}
                <div className="bg-[#1C1B19] border border-cream/10 hover:border-crimson/40 rounded-sm p-6 sm:p-8 transition-colors duration-300 shadow-xl">
                  {/* Card Meta Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs mb-3 text-muted">
                    <span className="text-crimson tracking-widest font-semibold flex items-center gap-1.5">
                      {isEducation ? (
                        <GraduationCap className="w-3.5 h-3.5" />
                      ) : (
                        <Briefcase className="w-3.5 h-3.5" />
                      )}
                      {item.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-cream/70">
                      <Calendar className="w-3 h-3 text-crimson" />
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-cream font-light mb-1">
                    {item.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted mb-4">
                    <span className="text-cream/90 font-medium">{item.organization}</span>
                    {item.location && (
                      <>
                        <span className="text-cream/20">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-crimson/70" />
                          {item.location}
                        </span>
                      </>
                    )}
                    {item.metrics && (
                      <>
                        <span className="text-cream/20">•</span>
                        <span className="text-crimson font-medium bg-crimson/10 px-2 py-0.5 rounded border border-crimson/30">
                          {item.metrics}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-muted font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Skills / Focus tags */}
                  {item.skills && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-cream/10">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[11px] px-2.5 py-1 bg-black/40 border border-cream/10 rounded-sm text-cream/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
