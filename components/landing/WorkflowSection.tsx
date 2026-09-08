"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageTrail } from "@/components/ImageTrail";
import { BlurFade } from "@/components/BlurFade";
import Image from "next/image";

export type WorkflowEntry = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const trailImages = [
  "/craft1.webp",
  "/craft2.webp",
  "/craft3.webp",
]

export const defaultEntries: WorkflowEntry[] = [
  {
    title: "KICKOFF.",
    subtitle: "PHASE 01",
    description: "We learn the brand, the market, and what on-brand actually means for you.",
    image: "/kickoff.webp"
  },
  {
    title: "PLAN.",
    subtitle: "PHASE 02",
    description: "Executing the plan with precision. We capture both macro and micro details.",
    image: "/plan.webp"
  },
  {
    title: "PRODUCTION.",
    subtitle: "PHASE 03",
    description: "Design and edits happen on our end, not yours.",
    image: "/production.webp"
  },
  {
    title: "REVIEW.",
    subtitle: "PHASE 04",
    description: "Color grading, retouching, and assembling the final narrative.",
    image: "/review.webp"
  },
  {
    title: "DELIVERY.",
    subtitle: "PHASE 05",
    description: "Assets are handed over, formatted perfectly for all digital channels.",
    image: "/delivery.webp"
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <section
      id="process"
      onMouseMove={handleMouseMove}
      className="w-full bg-[#111111] text-white py-16 md:py-32 px-6 md:px-12 flex flex-col items-center relative overflow-hidden"
    >

      <div className="absolute inset-0 z-0 translate-x-48 translate-y-32">
        <ImageTrail
        containerRef={containerRef}
          rotationRange={0}
          interval={80}
          animationSequence={[
            [{ opacity: 1, scale: 1.2 }, { duration: 0.2, ease: "circOut" }],
            [{ opacity: 0, scale: 0.9 }, { duration: 0.6, ease: "circIn" }],
          ]}
        >
          {trailImages.map((src) => (
            <div
              key={src}
              className="w-32 h-24 md:w-44 md:h-32 overflow-hidden"
            >
              <Image
                src={src}
                alt=""
                width={176}
                height={128}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <div ref={containerRef} className="max-w-5xl w-full flex flex-col relative z-10">
        <h2 className="font-serif text-4xl md:text-7xl tracking-tighter uppercase mb-6 text-center italic text-zinc-300">
          {title}
        </h2>
        {description && (
          <p className="mb-24 text-base text-zinc-400 md:text-lg text-center font-sans max-w-2xl mx-auto">
            {description}
          </p>
        )}

        <div
          className="pointer-events-none absolute z-50 overflow-hidden shadow-2xl translate-x-32 translate-y-40 hidden md:block"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="relative w-[320px] h-[220px] bg-[#151515] overflow-hidden">
            {entries.map((entry, index) => (
              <img
                key={entry.title}
                src={entry.image}
                alt={entry.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.1,
                  filter: hoveredIndex === index ? "none" : "blur(10px)",
                }}
              />
            ))}
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
          </div>
        </div>

        <div className="px-4 space-y-0 w-full relative z-10 bg-[#111111]">
          {entries.map((entry, index) => (
            <div
              key={entry.title}
              className="group block"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative py-8 border-t border-zinc-800 transition-all duration-300 ease-out">
                {/* Background highlight on hover */}
                <div
                  className={`
                    absolute inset-0 -mx-6 px-6 bg-[#151515]
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                  `}
                />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                  <div className="flex items-center gap-6 md:gap-12">
                    {/* Subtitle / Phase */}
                    <span
                      className={`
                        text-xs lg:text-sm font-sans tracking-[0.2em] uppercase transition-all duration-300 ease-out min-w-[100px]
                        ${hoveredIndex === index ? "text-white" : "text-zinc-500"}
                      `}
                    >
                      {entry.subtitle}
                    </span>

                    {/* Title with animated underline */}
                    <div className="inline-flex items-center gap-4">
                      <h3 className="text-white font-serif text-[1.25rem] md:text-4xl lg:text-5xl tracking-tight uppercase">
                        <span className="relative inline-block">
                          {entry.title}
                          {/* Animated underline */}
                          <span
                            className={`
                              absolute left-0 -bottom-1 h-[2px] bg-white
                              transition-all duration-300 ease-out
                              ${hoveredIndex === index ? "w-full" : "w-0"}
                            `}
                          />
                        </span>
                      </h3>

                      {/* Arrow that slides in */}
                      <ArrowUpRight
                        className={`
                          w-6 h-6 text-zinc-400
                          transition-all duration-300 ease-out
                          ${hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-4 translate-y-4"
                          }
                        `}
                      />
                    </div>
                  </div>

                  {/* Description with fade effect */}
                  <div className="md:max-w-[260px] lg:max-w-sm md:text-right mt-4 md:mt-0 ml-0 md:ml-0">
                    <p
                      className={`
                        font-sans text-md leading-relaxed
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-zinc-300" : "text-zinc-600"}
                      `}
                    >
                      {entry.description}
                    </p>
                  </div>
                  
                  {/* Mobile inline image */}
                  <div className="block md:hidden mt-6 w-full">
                    <BlurFade delay={0.1} inView>
                      <img 
                        src={entry.image} 
                        alt={entry.title} 
                        className="w-full h-[220px] object-cover" 
                      />
                    </BlurFade>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom border for last item */}
          <div className="border-t border-zinc-800" />
        </div>
      </div>
    </section>
  );
}
