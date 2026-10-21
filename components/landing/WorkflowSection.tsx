"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const steps = stepRefs.current;
    if (!steps.length) return;

    const triggers: ScrollTrigger[] = [];

    steps.forEach((step, i) => {
      if (!step) return;

      const trigger = ScrollTrigger.create({
        trigger: step,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [entries]);

  return (
    <section
      id="process"
      ref={sectionRef}
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
          <div className="flex-1 min-w-0 space-y-0">
            {entries.map((entry, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={entry.title}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className="border-t border-zinc-800 py-8 md:py-10 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
                    <div className="flex items-center gap-6 md:gap-10">
                      {/* Phase label */}
                      <span
                        className={`text-xs lg:text-sm font-sans tracking-[0.2em] uppercase transition-colors duration-500 min-w-[90px] ${
                          isActive ? "text-white" : "text-zinc-600"
                        }`}
                      >
                        {entry.subtitle}
                      </span>

                      {/* Title */}
                      <h3
                        className={`font-serif text-2xl md:text-4xl lg:text-5xl tracking-tight uppercase transition-colors duration-500 ${
                          isActive ? "text-white" : "text-zinc-600"
                        }`}
                      >
                        <span className="relative inline-block">
                          {entry.title}
                          <span
                            className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-500 ease-out ${
                              isActive ? "w-full" : "w-0"
                            }`}
                          />
                        </span>
                      </h3>
                    </div>

                    {/* Description */}
                    <p
                      className={`font-sans text-sm md:text-base leading-relaxed md:max-w-[260px] md:text-right transition-colors duration-500 ${
                        isActive ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      {entry.description}
                    </p>
                  </div>

                  {/* Mobile image — shown inline below description */}
                  <div className="block md:hidden mt-6 w-full overflow-hidden">
                    <div
                      className={`transition-all duration-500 ${
                        isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.98]"
                      }`}
                    >
                      <img
                        src={entry.image}
                        alt={entry.title}
                        className="w-full h-auto block object-cover"
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
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? "scale(1)" : "scale(1.04)",
                    filter: activeIndex === index ? "none" : "blur(4px)",
                  }}
                />
              ))}

              {/* Gradient overlay for polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 to-transparent pointer-events-none" />

              {/* Active phase label overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/60">
                  {entries[activeIndex]?.subtitle}
                </span>
                <span className="font-serif text-sm italic text-white/60">
                  {entries[activeIndex]?.title}
                </span>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-4 justify-center">
              {entries.map((_, i) => (
                <div
                  key={i}
                  className={`h-[2px] transition-all duration-500 ease-out ${
                    activeIndex === i
                      ? "w-8 bg-white"
                      : "w-4 bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
