"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Layers, Sparkles, X, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/projects";
import { initGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ProjectItemProps {
  project: Project;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePreviewImg, setActivePreviewImg] = useState<string>(project.image);

  const prefersReducedMotion = useReducedMotion();
  const isImageRight = project.alignment === "right";

  useEffect(() => {
    if (prefersReducedMotion) return;

    const { gsap, ScrollTrigger } = initGSAP();

    const ctx = gsap.context(() => {
      // Image reveal using clipping mask with ScrollTrigger
      if (imageWrapperRef.current && imageInnerRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          {
            clipPath: isImageRight
              ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
              : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Subtle parallax movement of inner image
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.1, y: 15 },
          {
            scale: 1,
            y: -15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Content reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isImageRight]);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      <div
        ref={containerRef}
        id={`project-${project.id}`}
        className="py-16 sm:py-24 border-b border-cream/10 last:border-b-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Project Media Container */}
          <div
            className={cn(
              "lg:col-span-7",
              isImageRight ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div
              ref={imageWrapperRef}
              className="relative rounded-sm overflow-hidden bg-[#161514] border border-cream/10 group cursor-pointer shadow-2xl"
              onClick={() => setModalOpen(true)}
            >
              {/* Aspect Ratio Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141312]">
                <div
                  ref={imageInnerRef}
                  className="relative w-full h-full will-change-transform"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} - Screenshot & Interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-top filter grayscale contrast-115 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                  {/* Subtle editorial vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Corner Editorial Badges */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-cream/15 px-2.5 py-1 rounded font-mono text-[10px] tracking-widest text-cream uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                  <span>REF. {project.number}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="bg-black/80 backdrop-blur-md border border-cream/15 px-2.5 py-1 rounded font-mono text-[10px] tracking-widest text-muted/80 uppercase">
                    {project.category}
                  </span>
                  <div className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cream text-bg font-mono text-[10px] tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <span>EXPLORE ARCHIVE</span>
                    <ArrowUpRight className="w-3 h-3 text-crimson" />
                  </div>
                </div>
              </div>

              {/* Bottom Monospace Info Strip */}
              <div className="bg-[#1C1B19] px-4 py-2.5 border-t border-cream/10 flex items-center justify-between font-mono text-[10px] text-muted tracking-wider">
                <span className="uppercase">STACK ARCHITECTURE:</span>
                <span className="text-cream/80 truncate max-w-[280px] sm:max-w-md">
                  {project.technologies.slice(0, 4).join(" • ")}
                </span>
              </div>
            </div>
          </div>

          {/* Project Editorial Content */}
          <div
            ref={contentRef}
            className={cn(
              "lg:col-span-5 flex flex-col justify-center",
              isImageRight ? "lg:order-1" : "lg:order-2"
            )}
          >
            {/* Category & Project Index */}
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase mb-3">
              <span className="text-crimson font-medium">PROJECT {project.number}</span>
              <span className="text-cream/20">/</span>
              <span>{project.category}</span>
            </div>

            {/* Oversized Serif Title */}
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-cream tracking-tight mb-4">
              {project.title}
            </h3>

            {/* Editorial Description */}
            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed mb-6 font-light">
              {project.description}
            </p>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6 pt-4 border-t border-cream/10">
                <span className="font-mono text-[10px] tracking-widest text-cream/70 uppercase block mb-2.5">
                  CORE CAPABILITIES //
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-xs text-muted">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-crimson flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technology Tags */}
            <div className="mb-8 pt-4 border-t border-cream/10">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-1 bg-white/[0.03] border border-cream/10 rounded-sm text-cream/80 tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-cream text-bg font-mono text-xs tracking-widest uppercase rounded-full hover:bg-crimson hover:text-cream transition-colors duration-300"
              >
                <span>VIEW CASE DETAILS</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-cream/20 text-cream/80 hover:text-cream hover:border-crimson rounded-full font-mono text-xs tracking-widest uppercase transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-crimson" />
                  <span>SOURCE</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#161514] border border-cream/20 rounded-xl overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream/10 bg-[#1D1C1A]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-crimson">PROJECT {project.number}</span>
                <span className="text-cream/20 font-mono">|</span>
                <h4 className="font-serif text-xl text-cream font-light">{project.title}</h4>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-muted hover:text-cream rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-crimson" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Preview Image Stage */}
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/60 border border-cream/10">
                <Image
                  src={activePreviewImg}
                  alt={project.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Secondary Thumbnails Gallery if available */}
              {project.secondaryImages && project.secondaryImages.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-muted uppercase block mb-2">
                    SYSTEM SCREENSHOTS //
                  </span>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActivePreviewImg(project.image)}
                      className={cn(
                        "relative w-28 h-20 flex-shrink-0 rounded overflow-hidden border transition-all",
                        activePreviewImg === project.image
                          ? "border-crimson ring-1 ring-crimson"
                          : "border-cream/15 opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={project.image}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </button>
                    {project.secondaryImages.map((secImg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePreviewImg(secImg)}
                        className={cn(
                          "relative w-28 h-20 flex-shrink-0 rounded overflow-hidden border transition-all",
                          activePreviewImg === secImg
                            ? "border-crimson ring-1 ring-crimson"
                            : "border-cream/15 opacity-60 hover:opacity-100"
                        )}
                      >
                        <Image
                          src={secImg}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description & Overview */}
              <div>
                <h5 className="font-mono text-xs tracking-widest text-cream uppercase mb-2">
                  OVERVIEW
                </h5>
                <p className="font-sans text-muted leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h5 className="font-mono text-xs tracking-widest text-cream uppercase mb-2">
                  TECHNOLOGIES &amp; FRAMEWORKS
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1 bg-white/[0.04] border border-cream/15 rounded text-cream"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              {project.features && (
                <div>
                  <h5 className="font-mono text-xs tracking-widest text-cream uppercase mb-2">
                    SYSTEM CAPABILITIES
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 font-mono text-xs text-muted"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#1D1C1A] border-t border-cream/10 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">
                CASE ID: {project.id.toUpperCase()}-2026
              </span>
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-crimson hover:underline"
                  >
                    <span>GITHUB REPOSITORY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-1.5 font-mono text-xs bg-cream/10 hover:bg-cream/20 text-cream rounded transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
