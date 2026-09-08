"use client"
import { useRef } from "react"
import { useScroll } from "framer-motion"
import dynamic from "next/dynamic"
import { useSpring } from "framer-motion"
import { BlurFade } from "@/components/BlurFade"

const FiniteGallery = dynamic(() => import("./Gallery"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
})

const GALLERY_IMAGES = [
  "/craft1.webp",
  "/craft2.webp",
  "/craft3.webp",
  "/craft4.webp",
  "/craft5.webp",
  "/craft6.webp",
  "/craft7.webp",
  "/craft8.webp",
  "/craft9.webp",
  "/craft10.webp",
  "/craft11.webp",
  "/craft12.webp",
]

export function CraftSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // When container is shorter than screen (like 75vh), we track it from 
    // when its top hits the bottom of the screen, until its bottom hits the top.
    offset: ["start end", "end start"]
  })

  // Heavy spring to prevent rapid jumping when user scrolls fast
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30, // Lower stiffness = slower to catch up
    damping: 15,   // Higher damping = less bounce
    restDelta: 0.001
  })

  return (
    <section id="about" className="w-full bg-[#f8f8f8] text-black pt-16 md:pt-32 flex flex-col items-center overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col items-center px-6 md:px-12 text-center md:text-left">
        <BlurFade delay={0.25} inView>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-8xl uppercase mb-8 font-normal italic text-center md:text-left">
            CRAFT, at SCALE.
          </h2>
        </BlurFade>
        <div className="mt-4">
          <BlurFade delay={0.25 * 2} inView>
            <p className='font-sans text-xl md:text-[1.3rem] text-zinc-700 max-w-2xl text-left'>
              High-volume production is often mistaken for mediocrity.
            </p>
          </BlurFade>
          <BlurFade delay={0.25 * 3} inView>
            <p className='mt-6 font-serif text-xl md:text-2xl text-zinc-900 max-w-xl text-left uppercase tracking-[0.05em]'>
              We reject that.
            </p>
          </BlurFade>
          <BlurFade delay={0.25 * 4} inView>
            <p className='font-sans text-xl md:text-[1.3rem] text-zinc-700 max-w-3xl text-left mt-6'>
              A single luxury listing in a national franchise rollout gets the same obsession over detail → nothing goes out that hasn&apos;t been looked at twice.
            </p>
          </BlurFade>
        </div>
      </div>

      {/* 3D Gallery — 300vh scroll container for finite scrolling */}
      <div ref={containerRef} className="w-full h-[110vh] mt-12">
        <div className="sticky top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden" style={{ background: "transparent" }}>
          <FiniteGallery
            images={GALLERY_IMAGES}
            scrollProgress={smoothProgress}
            className="w-full h-full"
            visibleCount={14}
            fadeSettings={{
              fadeIn: { start: 0.0, end: 0.15 },
              fadeOut: { start: 0.85, end: 1.0 },
            }}
            blurSettings={{
              blurIn: { start: 0.0, end: 0.1 },
              blurOut: { start: 0.9, end: 1.0 },
              maxBlur: 4.0,
            }}
          />
        </div>
      </div>
    </section>
  )
}
