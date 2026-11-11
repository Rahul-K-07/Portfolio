"use client";

import { useRef, useEffect } from "react";
import { PROJECTS } from "@/data/projects";
import ProjectItem from "@/components/ProjectItem";
import { initGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-b border-cream/10 bg-[#111111]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="border-b border-cream/10 pb-10 sm:pb-14 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-crimson uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
              <span>SELECTED WORK</span>
              <span className="text-cream/20">/</span>
              <span className="text-muted">INDEX [ 03 CASES ]</span>
            </div>
            <h2 className="editorial-headline text-5xl sm:text-6xl lg:text-7xl font-light text-cream uppercase">
              SELECTED <span className="italic font-serif text-crimson">WORK</span>
            </h2>
          </div>

          <div className="max-w-xs text-left md:text-right">
            <p className="font-serif italic text-xl sm:text-2xl text-cream/80">
              &ldquo;Things I&apos;ve made.&rdquo;
            </p>
            <span className="font-mono text-[11px] text-muted tracking-wider uppercase block mt-1">
              PROTOTYPES, INTELLIGENCE &amp; WEB PLATFORMS
            </span>
          </div>
        </div>

        {/* Project Items List with Alternating Layouts */}
        <div className="space-y-4">
          {PROJECTS.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Section Bottom Annotation */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-muted tracking-wider uppercase">
          <span>GITHUB REPOSITORIES &amp; RESEARCH IN PROGRESS</span>
          <a
            href="https://github.com/Rahul-K-07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream hover:text-crimson transition-colors flex items-center gap-1.5"
          >
            <span>VIEW MORE REPOSITORIES ON GITHUB</span>
            <span className="text-crimson">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
