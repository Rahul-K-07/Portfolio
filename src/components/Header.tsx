"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "WORK", href: "#work", id: "work" },
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "EXPERTISE", href: "#expertise", id: "expertise" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Active section detection
      const sectionElements = NAV_ITEMS.map((item) =>
        document.getElementById(item.id)
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
      <a
        href="#main-content"
        className="pointer-events-auto sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-crimson text-cream font-mono text-xs rounded-full shadow-lg"
      >
        Skip to main content
      </a>
      <nav
        aria-label="Primary Navigation"
        className={cn(
          "pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out",
          "bg-[#161514]/80 backdrop-blur-md border border-[#F1EBDD]/10 text-cream rounded-full shadow-2xl",
          isScrolled
            ? "py-2.5 px-5 sm:px-6 max-w-2xl w-full border-[#F1EBDD]/15 bg-[#161514]/90"
            : "py-3.5 px-6 sm:px-8 max-w-3xl w-full"
        )}
      >
        {/* Editorial Logo */}
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, "#")}
          className="group flex items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson rounded-full"
          aria-label="Rahul K. - Back to top"
        >
          <span className="w-2 h-2 rounded-full bg-crimson transition-transform duration-300 group-hover:scale-125" />
          <span className="font-mono text-xs tracking-widest text-cream uppercase group-hover:text-white transition-colors">
            RAHUL K.
          </span>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-muted/60 pl-1 border-l border-cream/10">
            ED.2026
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={cn(
                  "relative px-3.5 py-1.5 font-mono text-xs tracking-widest transition-all duration-300 rounded-full",
                  "focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson",
                  isActive
                    ? "text-cream bg-white/5"
                    : "text-muted hover:text-cream hover:bg-white/[0.03]"
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-crimson" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Editorial Status / Action */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-cream/90 hover:text-crimson transition-colors py-1 px-3 border border-cream/10 rounded-full hover:border-crimson/50"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-3 h-3 text-crimson" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-muted hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson rounded-full"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-crimson" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 bg-[#1A1918]/95 backdrop-blur-xl border border-cream/15 rounded-3xl p-6 shadow-2xl md:hidden z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between border-b border-cream/10 pb-3">
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              NAVIGATION INDEX
            </span>
            <span className="font-mono text-xs text-crimson tracking-wider">
              [ 04 SECTIONS ]
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={cn(
                    "flex items-center justify-between py-2.5 px-3 rounded-lg font-serif text-2xl transition-colors",
                    isActive
                      ? "text-crimson bg-white/[0.04]"
                      : "text-cream/90 hover:text-crimson hover:bg-white/[0.02]"
                  )}
                >
                  <span className="tracking-tight">{item.label}</span>
                  <span className="font-mono text-xs text-muted">0{idx + 1}</span>
                </a>
              );
            })}
          </div>

          <div className="border-t border-cream/10 pt-4 mt-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted">
              RAHUL K. © 2026
            </span>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="font-mono text-xs text-crimson tracking-wider flex items-center gap-1"
            >
              LET&apos;S TALK <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
