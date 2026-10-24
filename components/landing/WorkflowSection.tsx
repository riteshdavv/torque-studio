"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type WorkflowEntry = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export const defaultEntries: WorkflowEntry[] = [
  {
    title: "INTAKE.",
    subtitle: "PHASE 01",
    description: "Send us the photos, footage and brand assets you already have.",
    image: "/kickoff.webp",
  },
  {
    title: "STRATEGY.",
    subtitle: "PHASE 02",
    description:
      "We determine what those inputs can become and what the content needs to accomplish.",
    image: "/plan.webp",
  },
  {
    title: "EDIT.",
    subtitle: "PHASE 03",
    description:
      "Video, motion, graphics, carousels, ads and other assets are produced.",
    image: "/production.webp",
  },
  {
    title: "REVIEW.",
    subtitle: "PHASE 04",
    description: "You review the work and we refine it.",
    image: "/review.webp",
  },
  {
    title: "DELIVERY.",
    subtitle: "PHASE 05",
    description: "Everything arrives formatted and ready to publish.",
    image: "/delivery.webp",
  },
];

export interface WorkflowSectionProps {
  title?: string;
  description?: string;
  entries?: WorkflowEntry[];
}

export function WorkflowSection({
  title = "THE WORKFLOW.",
  description = "A meticulous process ensuring speed without sacrificing quality.",
  entries = defaultEntries,
}: WorkflowSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const titleLabelRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);

  // Hover state still managed by React since it's user-interaction driven
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ──────────────────────────────────────────────────────────────────────────
  // Helper: apply active visual state to DOM elements directly (no setState)
  // ──────────────────────────────────────────────────────────────────────────
  const applyActive = (index: number) => {
    const steps = stepRefs.current;
    const images = imageRefs.current;
    const dots = dotRefs.current;

    steps.forEach((step, i) => {
      if (!step) return;
      const isActive = i === index;

      // Phase label
      const phaseLabel = step.querySelector<HTMLElement>("[data-phase]");
      if (phaseLabel) {
        gsap.to(phaseLabel, { color: isActive ? "#ffffff" : "#52525b", duration: 0.35, overwrite: true });
      }

      // Title
      const titleEl = step.querySelector<HTMLElement>("[data-title]");
      if (titleEl) {
        gsap.to(titleEl, { color: isActive ? "#ffffff" : "#52525b", duration: 0.35, overwrite: true });
      }

      // Underline
      const underline = step.querySelector<HTMLElement>("[data-underline]");
      if (underline) {
        gsap.to(underline, { width: isActive ? "100%" : "0%", duration: 0.45, ease: "power2.out", overwrite: true });
      }

      // Description
      const desc = step.querySelector<HTMLElement>("[data-desc]");
      if (desc) {
        gsap.to(desc, { color: isActive ? "#d4d4d8" : "#52525b", duration: 0.35, overwrite: true });
      }

      // Mobile image wrapper
      const mobileImg = step.querySelector<HTMLElement>("[data-mobile-img]");
      if (mobileImg) {
        gsap.to(mobileImg, {
          opacity: isActive ? 1 : 0.35,
          scale: isActive ? 1 : 0.98,
          duration: 0.5,
          overwrite: true,
        });
      }
    });

    // Desktop images
    images.forEach((img, i) => {
      if (!img) return;
      const isActive = i === index;
      gsap.to(img, {
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.04,
        filter: isActive ? "blur(0px)" : "blur(4px)",
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });
    });

    // Progress dots
    dots.forEach((dot, i) => {
      if (!dot) return;
      const isActive = i === index;
      gsap.to(dot, {
        width: isActive ? "2rem" : "1rem",
        backgroundColor: isActive ? "#ffffff" : "#3f3f46",
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    });

    // Overlay labels
    if (subtitleRef.current) subtitleRef.current.textContent = entries[index]?.subtitle ?? "";
    if (titleLabelRef.current) titleLabelRef.current.textContent = entries[index]?.title ?? "";
  };

  // ──────────────────────────────────────────────────────────────────────────
  // GSAP ScrollTrigger setup
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Allow a tick for DOM to settle after hydration
    const ctx = gsap.context(() => {
      const steps = stepRefs.current;

      steps.forEach((step, i) => {
        if (!step) return;

        ScrollTrigger.create({
          trigger: step,
          start: "top 5%",
          end: "bottom 5%",
          onEnter: () => {
            activeRef.current = i;
            applyActive(i);
          },
          onEnterBack: () => {
            activeRef.current = i;
            applyActive(i);
          },
        });
      });

      // Also set initial state
      applyActive(0);
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  // ──────────────────────────────────────────────────────────────────────────
  // Hover: override visuals while hovering, restore scroll-active on leave
  // ──────────────────────────────────────────────────────────────────────────
  const onHoverEnter = (index: number) => {
    setHoveredIndex(index);
    applyActive(index);
  };

  const onHoverLeave = () => {
    setHoveredIndex(null);
    applyActive(activeRef.current);
  };

  return (
    <section
      id="process"
      className="w-full bg-[#111111] text-white py-16 md:py-32 px-6 md:px-12 flex flex-col items-center"
    >
      <div ref={containerRef} className="max-w-6xl w-full flex flex-col">
        {/* Header */}
        <h2 className="font-serif text-4xl md:text-7xl tracking-tighter uppercase mb-6 text-center italic text-zinc-300">
          {title}
        </h2>
        {description && (
          <p className="mb-16 md:mb-24 text-base text-zinc-400 md:text-lg text-center font-sans max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* ── LEFT: step list ── */}
          <div className="flex-1 min-w-0 space-y-0 self-start">
            {entries.map((entry, index) => (
              <div
                key={entry.title}
                ref={(el) => { stepRefs.current[index] = el; }}
                onMouseEnter={() => onHoverEnter(index)}
                onMouseLeave={onHoverLeave}
                className="border-t border-zinc-800 py-8 md:py-10 cursor-default"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
                  <div className="flex items-center gap-6 md:gap-10">
                    {/* Phase label */}
                    <span
                      data-phase
                      className="text-xs lg:text-sm font-sans tracking-[0.2em] uppercase min-w-[90px]"
                      style={{ color: "#52525b" }}
                    >
                      {entry.subtitle}
                    </span>

                    {/* Title */}
                    <h3
                      data-title
                      className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-tight uppercase"
                      style={{ color: "#52525b" }}
                    >
                      <span className="relative inline-block">
                        {entry.title}
                        {/* Underline bar */}
                        <span
                          data-underline
                          className="absolute left-0 -bottom-1 h-[2px] bg-white"
                          style={{ width: "0%" }}
                        />
                      </span>
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    data-desc
                    className="font-sans text-sm md:text-base leading-relaxed md:max-w-[260px] md:text-right"
                    style={{ color: "#52525b" }}
                  >
                    {entry.description}
                  </p>
                </div>

                {/* Mobile image — shown inline below description */}
                <div className="block md:hidden mt-6 w-full overflow-hidden">
                  <div
                    data-mobile-img
                    style={{ opacity: 0.35, transform: "scale(0.98)" }}
                  >
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-auto block object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Bottom border */}
            <div className="border-t border-zinc-800" />
          </div>

          {/* ── RIGHT: sticky image panel (desktop only) ── */}
          <div className="hidden md:block w-[380px] lg:w-[440px] xl:w-[480px] shrink-0 sticky top-28 self-start">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
              {entries.map((entry, index) => (
                <img
                  key={entry.title}
                  ref={(el) => { imageRefs.current[index] = el; }}
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    transform: index === 0 ? "scale(1)" : "scale(1.04)",
                    filter: index === 0 ? "none" : "blur(4px)",
                    willChange: "opacity, transform",
                  }}
                />
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 to-transparent pointer-events-none" />

              {/* Active phase label overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                <span
                  ref={subtitleRef}
                  className="font-sans text-xs tracking-[0.2em] uppercase text-white/60"
                >
                  {entries[0]?.subtitle}
                </span>
                <span
                  ref={titleLabelRef}
                  className="font-serif text-sm italic text-white/60"
                >
                  {entries[0]?.title}
                </span>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-4 justify-center">
              {entries.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="h-[2px]"
                  style={{
                    width: i === 0 ? "2rem" : "1rem",
                    backgroundColor: i === 0 ? "#ffffff" : "#3f3f46",
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
