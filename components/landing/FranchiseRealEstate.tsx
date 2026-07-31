"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BlurFade } from "@/components/BlurFade"

gsap.registerPlugin(ScrollTrigger)

export function FranchiseRealEstate() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    
    if (prefersReduced) return

    const wordmarks = gsap.utils.toArray(".sector-wordmark") as HTMLElement[]
    const triggers: ScrollTrigger[] = []
    const tweens: gsap.core.Tween[] = []

    wordmarks.forEach((wordmark, index) => {
      // Initial state for clip mask reveal
      gsap.set(wordmark, { clipPath: "inset(0 100% 0 0)" })

      const tween = gsap.to(wordmark, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.0,
        ease: "expo.out",
        // add a slight delay to the second one if they trigger at the same time
        delay: index * 0.15,
        scrollTrigger: {
          trigger: wordmark,
          start: "top 85%", // trigger when the wordmark itself is 85% down the viewport
          toggleActions: "play reverse play reverse",
        }
      })
      
      tweens.push(tween)
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })

    return () => {
      triggers.forEach(t => t.kill())
      tweens.forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-white text-black py-16 md:py-32 px-6 md:px-16 flex flex-col md:flex-row gap-16 md:gap-24 justify-center">
      <div className="flex-1 flex flex-col pl-0 md:pl-10">
        <BlurFade delay={0.25} inView>
          <div className="text-lg tracking-widest text-zinc-800 uppercase mb-8 font-sans">
            SECTOR 01 // FRANCHISE
          </div>
        </BlurFade>
        
        <h2 className="sector-wordmark font-serif text-5xl md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tighter uppercase mb-8 md:mb-12">
          <span className="block">FRAN</span>
          <span className="italic block">CHISE.</span>
        </h2>
        
        <BlurFade delay={0.25 * 3} inView>
          <p className="font-sans text-md md:text-xl leading-relaxed text-zinc-600 max-w-md">
            One brand system, deployed cleanly across every location → so a five-door brand and a fifty-door brand run the same playbook without rebuilding it each time.
          </p>
        </BlurFade>
      </div>

      <div className="flex-1 flex flex-col">
        <BlurFade delay={0.25} inView>
          <div className="text-lg tracking-widest text-zinc-800 uppercase mb-8 font-sans">
            SECTOR 02 // REAL ESTATE
          </div>
        </BlurFade>
        
        <h2 className="sector-wordmark font-serif text-5xl md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tighter uppercase mb-8 md:mb-12">
          <span className="block">REAL</span>
          <span className="italic block">ESTATE.</span>
        </h2>
        
        <BlurFade delay={0.25 * 3} inView>
          <p className="font-sans text-md md:text-xl leading-relaxed text-zinc-600 max-w-md">
            Every listing shoot turned into a full week of content → carousels, video, and agent branding that makes a property look like the best one on the market.
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
