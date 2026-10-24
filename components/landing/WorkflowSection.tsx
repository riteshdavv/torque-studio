"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Which index to visually highlight — hovered takes priority over scroll-active
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  const handleScroll = useCallback(() => {
    const viewportMid = window.innerHeight / 2;
    let closest = 0;
    let closestDist = Infinity;

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elMid = rect.top + rect.height / 2;
      const dist = Math.abs(elMid - viewportMid);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    // Run once on mount to set the correct initial active step
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="process"
      className="w-full bg-[#111111] text-white py-16 md:py-32 px-6 md:px-12 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full flex flex-col">
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
            {entries.map((entry, index) => {
              const isActive = displayIndex === index;
              return (
                <div
                  key={entry.title}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="border-t border-zinc-800 py-8 md:py-10 cursor-default group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
                    <div className="flex items-center gap-6 md:gap-10">
                      {/* Phase label */}
                      <span
                        className="text-xs lg:text-sm font-sans tracking-[0.2em] uppercase min-w-[90px] transition-colors duration-300"
                        style={{ color: isActive ? "#ffffff" : "#52525b" }}
                      >
                        {entry.subtitle}
                      </span>

                      {/* Title */}
                      <h3
                        className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-tight uppercase transition-colors duration-300"
                        style={{ color: isActive ? "#ffffff" : "#52525b" }}
                      >
                        <span className="relative inline-block">
                          {entry.title}
                          {/* Underline bar */}
                          <span
                            className="absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-500 ease-out"
                            style={{ width: isActive ? "100%" : "0%" }}
                          />
                        </span>
                      </h3>
                    </div>

                    {/* Description */}
                    <p
                      className="font-sans text-sm md:text-base leading-relaxed md:max-w-[260px] md:text-right transition-colors duration-300"
                      style={{ color: isActive ? "#d4d4d8" : "#52525b" }}
                    >
                      {entry.description}
                    </p>
                  </div>

                  {/* Mobile image — shown inline below description */}
                  <div className="block md:hidden mt-6 w-full overflow-hidden">
                    <div
                      className="transition-all duration-500"
                      style={{
                        opacity: isActive ? 1 : 0.35,
                        transform: isActive ? "scale(1)" : "scale(0.98)",
                      }}
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
              );
            })}
            {/* Bottom border */}
            <div className="border-t border-zinc-800" />
          </div>

          {/* ── RIGHT: sticky image panel (desktop only) ── */}
          <div className="hidden md:block w-[380px] lg:w-[440px] xl:w-[480px] shrink-0 sticky top-28 self-start">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
              {entries.map((entry, index) => (
                <img
                  key={entry.title}
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: displayIndex === index ? 1 : 0,
                    transform: displayIndex === index ? "scale(1)" : "scale(1.04)",
                    filter: displayIndex === index ? "none" : "blur(4px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease",
                    willChange: "opacity, transform",
                  }}
                />
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 to-transparent pointer-events-none" />

              {/* Active phase label overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/60 transition-opacity duration-300">
                  {entries[displayIndex]?.subtitle}
                </span>
                <span className="font-serif text-sm italic text-white/60 transition-opacity duration-300">
                  {entries[displayIndex]?.title}
                </span>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-4 justify-center">
              {entries.map((_, i) => (
                <div
                  key={i}
                  className="h-[2px] transition-all duration-500 ease-out"
                  style={{
                    width: displayIndex === i ? "2rem" : "1rem",
                    backgroundColor: displayIndex === i ? "#ffffff" : "#3f3f46",
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
