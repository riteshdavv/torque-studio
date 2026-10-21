"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { BlurFade } from "@/components/BlurFade";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/slide1.png", label: "01" },
  { src: "/slide2.png", label: "02" },
  { src: "/slide3.png", label: "03" },
  { src: "/slide4.png", label: "04" },
  { src: "/slide5.png", label: "05" },
  { src: "/slide6.png", label: "06" },
];

export function ConceptDeckSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + slides.length) % slides.length : 0)),
    []
  );
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % slides.length : 0)),
    []
  );

  // Keyboard navigation
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

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-28 px-6 md:px-12 flex flex-col items-center border-t border-zinc-900">
      <div className="max-w-6xl w-full flex flex-col items-center">

        {/* Header */}
        <BlurFade delay={0.1} inView className="w-full text-center mb-4">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-zinc-500">
            The Concept Deck
          </span>
        </BlurFade>
        <BlurFade delay={0.2} inView className="w-full text-center mb-14">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight italic text-zinc-200">
            SEE THE THINKING.
          </h2>
        </BlurFade>

        {/* Slide grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full">
          {slides.map((slide, index) => (
            <BlurFade key={slide.src} delay={0.1 + index * 0.07} inView>
              <button
                onClick={() => setLightboxIndex(index)}
                className="group relative w-full overflow-hidden bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Open slide ${slide.label}`}
              >
                <div className="w-full overflow-hidden">
                  <img
                    src={slide.src}
                    alt={`Concept deck slide ${slide.label}`}
                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans text-xs tracking-[0.25em] uppercase text-white border border-white/60 px-4 py-2">
                    VIEW
                  </span>
                </div>
                {/* Slide number badge */}
                <span className="absolute top-3 left-3 font-sans text-xs tracking-[0.2em] text-white/40">
                  {slide.label}
                </span>
              </button>
            </BlurFade>
          ))}
        </div>

        {/* Hint */}
        <BlurFade delay={0.6} inView>
          <p className="mt-8 font-sans text-xs tracking-[0.2em] uppercase text-zinc-600 text-center">
            Click any slide to expand
          </p>
        </BlurFade>
      </div>

      {/* Lightbox */}
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
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />

          {/* Image container */}
          <div
            className={`relative z-10 w-[95vw] max-w-5xl transition-all duration-500 ${
              lightboxIndex !== null
                ? "scale-100 opacity-100 translate-y-0"
                : "scale-95 opacity-0 translate-y-4"
            }`}
          >
            {/* Close — inside frame on mobile, outside on desktop */}
            <button
              onClick={closeLightbox}
              className="flex md:absolute md:-top-10 md:right-0 items-center justify-end gap-2 text-zinc-400 hover:text-white transition-colors font-sans text-xs tracking-[0.2em] uppercase mb-3 md:mb-0 ml-auto"
              aria-label="Close lightbox"
            >
              <X className="w-4 h-4" /> Close
            </button>

            {/* Slide image */}
            <div className="w-full bg-zinc-900 overflow-hidden relative" style={{ maxHeight: "75vh" }}>
              {slides.map((slide, i) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={`Concept deck slide ${slide.label}`}
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out"
                  style={{
                    opacity: lightboxIndex === i ? 1 : 0,
                    transform: lightboxIndex === i ? "scale(1)" : "scale(1.03)",
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
                    className={`transition-all duration-300 rounded-none ${
                      lightboxIndex === i
                        ? "w-6 h-[2px] bg-white"
                        : "w-3 h-[2px] bg-zinc-600 hover:bg-zinc-400"
                    }`}
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

            {/* Counter */}
            <p className="text-center mt-3 font-sans text-xs text-zinc-600 tracking-[0.2em]">
              {lightboxIndex !== null ? lightboxIndex + 1 : 1} / {slides.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
