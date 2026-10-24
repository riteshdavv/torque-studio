"use client";

import { useState, useEffect, useCallback } from "react";
import { BlurFade } from "@/components/BlurFade";
import { X, ChevronLeft, ChevronRight, Lock } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

type Slide = { src: string; label: string };

type Deck = {
  id: string;
  label: string;
  subtitle: string;
  linkedInUrl: string;
  slides: Slide[];
  available: boolean;
};

const decks: Deck[] = [
  {
    id: "deck-01",
    label: "Deck 01",
    subtitle: "Gateway Rooftop Content Study",
    linkedInUrl: "https://lnkd.in/p/djnxN4jz", // ← replace with Deck 01 LinkedIn post URL
    available: true,
    slides: [
      { src: "/deck2-slide1.webp", label: "01" },
      { src: "/deck2-slide2.webp", label: "02" },
      { src: "/deck2-slide3.webp", label: "03" },
      { src: "/deck2-slide4.webp", label: "04" },
      { src: "/deck2-slide5.webp", label: "05" },
      { src: "/deck2-slide6.webp", label: "06" },
    ],
  },
  {
    id: "deck-02",
    label: "Deck 02",
    subtitle: "Luma Content Study",
    linkedInUrl: "https://lnkd.in/p/d79pTmqa", // ← replace with Deck 02 LinkedIn post URL
    available: true,
    slides: [
      { src: "/slide1.webp", label: "01" },
      { src: "/slide2.webp", label: "02" },
      { src: "/slide3.webp", label: "03" },
      { src: "/slide4.webp", label: "04" },
      { src: "/slide5.webp", label: "05" },
      { src: "/slide6.webp", label: "06" },
    ],
  },
  {
    id: "deck-03",
    label: "Deck 03",
    subtitle: "Coming Soon",
    linkedInUrl: "#",
    available: false,
    slides: [],
  },
];


// ─── Component ────────────────────────────────────────────────────────────────

export function ConceptDeckSection() {
  const [activeDeckId, setActiveDeckId] = useState(decks[0].id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const activeDeck = decks.find((d) => d.id === activeDeckId) ?? decks[0];
  const slides = activeDeck.slides;

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + slides.length) % slides.length : 0)),
    [slides.length]
  );
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % slides.length : 0)),
    [slides.length]
  );

  // Keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next, closeLightbox]);

  // Close lightbox when switching decks
  const switchDeck = (id: string) => {
    setLightboxIndex(null);
    setActiveDeckId(id);
  };

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-28 px-6 md:px-12 flex flex-col items-center border-t border-zinc-900">
      <div className="max-w-6xl w-full flex flex-col items-center">

        {/* ── Header ── */}
        <BlurFade delay={0.1} inView className="w-full text-center mb-4">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-zinc-500">
            Campaign Decks
          </span>
        </BlurFade>
        <BlurFade delay={0.2} inView className="w-full text-center mb-10">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight italic text-zinc-200">
            SEE THE THINKING.
          </h2>
        </BlurFade>

        {/* ── Tab switcher ── */}
        <BlurFade delay={0.25} inView className="w-full mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {decks.map((deck) => {
              const isActive = activeDeckId === deck.id;
              const isLocked = !deck.available;
              return (
                <button
                  key={deck.id}
                  onClick={() => !isLocked && switchDeck(deck.id)}
                  disabled={isLocked}
                  aria-pressed={isActive}
                  className={[
                    "flex items-center gap-2 px-5 py-2.5 font-sans text-xs tracking-[0.2em] uppercase border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    isLocked
                      ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
                      : isActive
                      ? "border-white text-white bg-white/5"
                      : "border-zinc-700 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300",
                  ].join(" ")}
                >
                  {isLocked && <Lock className="w-3 h-3" />}
                  {deck.label}
                  {isLocked && (
                    <span className="text-[10px] tracking-widest text-zinc-600 normal-case">
                      soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </BlurFade>

        {/* ── Deck meta + LinkedIn CTA ── */}
        <BlurFade delay={0.3} inView className="w-full mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-zinc-600 mb-1">
              {activeDeck.id.replace("-", " ").toUpperCase()}
            </p>
            <p className="font-serif text-xl md:text-2xl italic text-zinc-300">
              {activeDeck.subtitle}
            </p>
          </div>

          {/* LinkedIn button — the ONLY thing that navigates away */}
          <a
            href={activeDeck.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { if (activeDeck.linkedInUrl === "#") e.preventDefault(); }}
            aria-label={`View ${activeDeck.label} on LinkedIn`}
            className="group flex items-center gap-2.5 px-5 py-2.5 border border-zinc-700 hover:border-[#0A66C2] text-zinc-400 hover:text-[#0A66C2] font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 self-start sm:self-auto whitespace-nowrap"
          >
            <LinkedInIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            View on LinkedIn
          </a>
        </BlurFade>

        {/* ── Slide grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full">
          {slides.map((slide, index) => (
            <BlurFade key={`${activeDeckId}-${slide.src}`} delay={0.1 + index * 0.07} inView>
              <button
                onClick={() => setLightboxIndex(index)}
                className="group relative w-full overflow-hidden bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Open slide ${slide.label}`}
              >
                <div className="w-full overflow-hidden">
                  <img
                    src={slide.src}
                    alt={`${activeDeck.label} — slide ${slide.label}`}
                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans text-xs tracking-[0.25em] uppercase text-white border border-white/60 px-4 py-2">
                    VIEW
                  </span>
                </div>
                {/* Slide number */}
                <span className="absolute top-3 left-3 font-sans text-xs tracking-[0.2em] text-white/40">
                  {slide.label}
                </span>
              </button>
            </BlurFade>
          ))}
        </div>

        {/* ── Hint ── */}
        <BlurFade delay={0.6} inView>
          <p className="mt-8 font-sans text-xs tracking-[0.2em] uppercase text-zinc-700 text-center">
            Click any slide to expand · Use ← → keys to navigate
          </p>
        </BlurFade>

      </div>

      {/* ── Lightbox ── */}
      {mounted && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
            lightboxIndex !== null
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/92 backdrop-blur-sm"
            onClick={closeLightbox}
          />

          {/* Frame */}
          <div
            className={`relative z-10 w-[95vw] max-w-5xl transition-all duration-500 ${
              lightboxIndex !== null
                ? "scale-100 opacity-100 translate-y-0"
                : "scale-95 opacity-0 translate-y-4"
            }`}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-zinc-500">
                {activeDeck.label} &mdash; Slide {lightboxIndex !== null ? lightboxIndex + 1 : 1} of {slides.length}
              </span>
              <button
                onClick={closeLightbox}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-sans text-xs tracking-[0.2em] uppercase"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" /> Close
              </button>
            </div>

            {/* Slide display */}
            <div
              className="w-full bg-zinc-950 overflow-hidden relative"
              style={{ height: "72vh", maxHeight: "72vh" }}
            >
              {slides.map((slide, i) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={`${activeDeck.label} — slide ${slide.label}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    opacity: lightboxIndex === i ? 1 : 0,
                    transform: lightboxIndex === i ? "scale(1)" : "scale(1.03)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prev}
                className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-sans text-xs tracking-[0.2em] uppercase"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Prev
              </button>

              {/* Progress pips */}
              <div className="flex gap-2 items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      width: lightboxIndex === i ? "1.5rem" : "0.75rem",
                      height: "2px",
                      backgroundColor: lightboxIndex === i ? "#ffffff" : "#52525b",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-sans text-xs tracking-[0.2em] uppercase"
                aria-label="Next slide"
              >
                Next
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
