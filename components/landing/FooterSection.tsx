"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import OrbitGallery from "./OrbitGallery"

gsap.registerPlugin(ScrollTrigger)

export function FooterSection() {
  const logotypeRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const logotype = logotypeRef.current
    if (!logotype) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    
    if (prefersReduced) return

    const tween = gsap.from(logotype, {
      scale: 0.92,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: logotype,
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <footer className="w-full bg-[#111111] text-white pt-32 pb-24 flex flex-col items-center relative">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-132 bg-gradient-to-b from-[#f8f8f8] to-transparent pointer-events-none z-10"></div>

      {/* OrbitGallery in the gradient space above TORQUE */}
      <div className="relative z-20 w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
        <OrbitGallery className="w-full h-full" />
      </div>

      <div className="w-full flex flex-col relative z-10">
        <div className="flex justify-between">
          <h2
            ref={logotypeRef}
            className="font-serif text-[6rem] md:text-[12rem] lg:text-[18rem] leading-[0.75] tracking-tighter uppercase mb-16 origin-bottom-left"
          >
            TORQUE.
          </h2>
          <div className="absolute bottom-16 right-0 pr-12 flex flex-col text-right gap-4 text-md tracking-widest text-zinc-500 uppercase font-sans">
            <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS OF USE</Link>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col relative z-10">
        <div className="w-full flex justify-between gap-4">
          <p className="pl-12 font-sans text-md uppercase tracking-[0.15em] leading-8 text-zinc-600">
            Creative and content production for multi-location brands<br />and real estate teams .
          </p>
          <div className="pr-12 flex flex-col text-right gap-2 text-md tracking-widest text-zinc-500 uppercase font-sans">
            <div className="flex gap-8 justify-end">
              <Link href="#" className="hover:text-white transition-colors">INSTAGRAM</Link>
              <Link href="#" className="hover:text-white transition-colors">LINKEDIN</Link>
            </div>
            <Link href="#" className="hover:text-white transition-colors">© 2026</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
