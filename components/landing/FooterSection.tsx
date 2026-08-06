"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import OrbitGallery from "./OrbitGallery"
import { useLenis } from "@/components/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger)

export function FooterSection() {
  const logotypeRef = useRef<HTMLHeadingElement>(null)
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -80 })
    }
  }

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
      y: 60, // starts 60px below, animates up to its natural position
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
    <footer className="w-full bg-[#111111] text-white pt-16 md:pt-32 pb-12 md:pb-24 flex flex-col items-center relative">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-132 bg-gradient-to-b from-[#f8f8f8] to-transparent pointer-events-none z-10"></div>

      {/* OrbitGallery in the gradient space above TORQUE */}
      <div className="relative z-20 w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
        <OrbitGallery className="w-full h-full" />
      </div>

      <div className="w-full flex flex-col relative z-10">
        <div className="flex justify-between overflow-x-clip px-6 md:px-0">
          <h2
            ref={logotypeRef}
            className="font-serif text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] leading-[0.75] tracking-tighter uppercase mb-20 sm:mb-24 md:mb-20 lg:mb-28 xl:mb-32 origin-bottom-left"
          >
            TORQUE.
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-col relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-between gap-8 md:gap-4 px-6 md:px-12">
          <p className="pl-0 md:pl-12 font-sans text-sm md:text-md uppercase tracking-[0.15em] leading-8 text-zinc-600 text-center md:text-left">
            Creative and content production for multi-location brands and real estate teams .
          </p>
          <div className="pr-0 md:pr-12 flex flex-col text-center md:text-right gap-4 md:gap-2 text-sm md:text-md tracking-widest text-zinc-500 uppercase font-sans justify-center">
            <div className="flex gap-4 md:gap-8 justify-center md:justify-end">
              <Link data-cursor="hand" href="#work" onClick={(e) => handleNavClick(e, "#work")} className="hover:text-white transition-colors">WORK</Link>
              <Link data-cursor="hand" href="#process" onClick={(e) => handleNavClick(e, "#process")} className="hover:text-white transition-colors">PROCESS</Link>
              <Link data-cursor="hand" href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-white transition-colors">ABOUT</Link>
            </div>
            <div className="">© 2026</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
