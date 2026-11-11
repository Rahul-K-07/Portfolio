"use client";

import { useRef, useEffect, useState } from "react";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/Icons";
import { initGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const { gsap } = initGSAP();

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { y: 40, opacity: 0 },
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

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const copyEmail = () => {
    navigator.clipboard.writeText("rahulk0777111@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 bg-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-crimson uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span>THE NEXT CHAPTER</span>
          <span className="text-cream/20">/</span>
          <span className="text-muted">OPEN TRANSMISSION</span>
        </div>

        {/* Main Headline & Supporting Text */}
        <div ref={headlineRef} className="border-b border-cream/10 pb-12 sm:pb-20 mb-14 sm:mb-20">
          <h2 className="editorial-headline text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light text-cream uppercase leading-[0.92] max-w-5xl mb-8">
            HAVE AN IDEA? <br />
            <span className="italic font-serif text-crimson">LET&apos;S MAKE</span> SOMETHING.
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-cream/80 max-w-2xl font-light leading-relaxed">
            &ldquo;Open to interesting opportunities, collaborations and conversations about technology.&rdquo;
          </p>
        </div>

        {/* Contact Links & Cards Grid */}
        <div ref={linksRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Direct Card */}
          <div className="bg-[#181716] border border-cream/10 hover:border-crimson/50 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-muted mb-4">
                <span>01 // DIRECT TRANSMISSION</span>
                <Mail className="w-4 h-4 text-cream/40 group-hover:text-crimson transition-colors" />
              </div>
              <span className="font-mono text-xs text-muted block mb-1">EMAIL ADDRESS</span>
              <a
                href="mailto:rahulk0777111@gmail.com"
                className="font-serif text-xl sm:text-2xl text-cream hover:text-crimson transition-colors break-all block"
              >
                rahulk0777111@gmail.com
              </a>
            </div>

            <div className="pt-6 mt-6 border-t border-cream/10 flex items-center justify-between">
              <button
                onClick={copyEmail}
                className="font-mono text-xs text-muted hover:text-cream flex items-center gap-1.5 transition-colors"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-crimson" />
                    <span className="text-crimson">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-muted" />
                    <span>COPY ADDRESS</span>
                  </>
                )}
              </button>
              <a
                href="mailto:rahulk0777111@gmail.com"
                className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-cream group-hover:border-crimson group-hover:bg-crimson group-hover:text-cream transition-all"
                aria-label="Send email"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* GitHub Connection */}
          <a
            href="https://github.com/Rahul-K-07"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#181716] border border-cream/10 hover:border-crimson/50 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-muted mb-4">
                <span>02 // SOURCE CODE</span>
                <GithubIcon className="w-4 h-4 text-cream/40 group-hover:text-crimson transition-colors" />
              </div>
              <span className="font-mono text-xs text-muted block mb-1">GITHUB REPOSITORY</span>
              <span className="font-serif text-2xl sm:text-3xl text-cream group-hover:text-crimson transition-colors block">
                @Rahul-K-07
              </span>
              <p className="font-sans text-xs text-muted mt-2">
                Open source repositories, prototypes, and experimental neural models.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-cream/10 flex items-center justify-between font-mono text-xs text-muted group-hover:text-cream transition-colors">
              <span>EXPLORE CODE</span>
              <div className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-cream group-hover:border-crimson group-hover:bg-crimson group-hover:text-cream transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* LinkedIn Connection */}
          <a
            href="https://github.com/Rahul-K-07" /* or linkedin */
            onClick={(e) => {
              e.preventDefault();
              window.open("https://www.linkedin.com/in/rahul-k-a52409353/", "_blank");
            }}
            className="bg-[#181716] border border-cream/10 hover:border-crimson/50 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-muted mb-4">
                <span>03 // PROFESSIONAL NETWORK</span>
                <LinkedInIcon className="w-4 h-4 text-cream/40 group-hover:text-crimson transition-colors" />
              </div>
              <span className="font-mono text-xs text-muted block mb-1">LINKEDIN PROFILE</span>
              <span className="font-serif text-2xl sm:text-3xl text-cream group-hover:text-crimson transition-colors block">
                Rahul K.
              </span>
              <p className="font-sans text-xs text-muted mt-2">
                Professional connections, experience history, and technical updates.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-cream/10 flex items-center justify-between font-mono text-xs text-muted group-hover:text-cream transition-colors">
              <span>CONNECT ON LINKEDIN</span>
              <div className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-cream group-hover:border-crimson group-hover:bg-crimson group-hover:text-cream transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
