"use client"
import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BlurFade } from "@/components/BlurFade"
import { ImageTrail } from "@/components/ImageTrail"
import { useLenis } from "@/components/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger)

// All images available in /public (excluding hero.png which is the background)
const trailImages = [
  "/craft1.png",
  "/craft2.png",
  "/craft3.png",
]

export function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const heroImageRef = useRef<HTMLImageElement>(null)
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -80 })
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    const heroImage = heroImageRef.current
    if (!section || !heroImage) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    // Mobile: disable parallax on small screens because it can cause content
    // clipping and momentum-scroll jank on older iOS devices.
    const mm = gsap.matchMedia()

    mm.add("(min-width: 769px)", () => {
      gsap.to(heroImage, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    })

    return () => {
      mm.revert() // cleans up all ScrollTriggers created in matchMedia
    }
  }, [])

  return (
    <section id="#" ref={sectionRef} className="relative flex min-h-screen w-full flex-col bg-black text-white overflow-hidden">
      {/* Background Image */}
      <BlurFade duration={1.8} className="absolute inset-0 z-0" yOffset={0} blur="0px">
        <Image
          ref={heroImageRef}
          src="/hero.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover scale-[1.08] object-center"
        />
        {/* Flat black overlay */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </BlurFade>

      {/* Navigation */}
      <BlurFade delay={0.3} yOffset={-24} className="relative z-20 transition ease-out">
        <header className="flex w-full items-center justify-between px-6 pt-3 pb-8 md:pb-14 md:px-24">
          <div className="text-lg md:text-2xl font-serif">TORQUE.</div>

          <nav className="hidden md:flex items-center gap-12 text-xs lg:text-[14px] uppercase tracking-[0.12em] text-zinc-300 font-sans">
            <Link data-cursor="hand" href="#work" onClick={(e) => handleNavClick(e, "#work")} className="hover:text-white transition-colors">01 / WORK</Link>
            <Link data-cursor="hand" href="#process" onClick={(e) => handleNavClick(e, "#process")} className="hover:text-white transition-colors">02 / PROCESS</Link>
            <Link data-cursor="hand" href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-white transition-colors">03 / ABOUT</Link>
            <Link href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="border border-zinc-300 text-zinc-300 px-5 py-2.5 hover:bg-white hover:text-black transition ease-in-out ml-4">
              CONTACT
            </Link>
          </nav>
        </header>
      </BlurFade>

      {/* Main Content */}
      <div className="flex flex-1 flex-col px-6 md:px-24 w-full relative z-10 pt-6 pb-24">
        <div className="flex flex-col md:flex-row">
          {/* Headline with Image Trail */}
          <div
            ref={titleRef}
            className="overflow-visible relative"
          >
            {/* Image trail layer — sits behind the text */}
            <div className="absolute inset-0 z-0">
              <ImageTrail
                containerRef={titleRef}
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

            {/* The actual headline — always on top, pointer-events active */}
            <BlurFade delay={0.5} yOffset={0}>
              <h1 className="relative z-10 font-serif text-[5.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] leading-[0.95] tracking-tight max-w-6xl cursor-none">
                <span className="italic">Content, made for rooms and doors that matter.</span>
              </h1>
            </BlurFade>
          </div>

          {/* Sub-copy */}
          <BlurFade delay={1} className="justify-items-end items-end mt-12 md:mt-16 max-w-[18rem] xl:max-w-[30rem] text-zinc-300 text-xs lg:text-base pt-8 md:pt-0 leading-relaxed tracking-[0.15em] font-sans static md:absolute md:right-24 xl:right-40 md:bottom-51">
            <p>
              WE BUILD CONTENT, VIDEO, AND AD CREATIVE FOR MULTI-LOCATION BRANDS AND REAL ESTATE TEAMS.
            </p>
          </BlurFade>
        </div>

        {/* CTA link */}
        <BlurFade delay={1.2} yOffset={16} className="flex items-center justify-center md:justify-start">
          <Link data-cursor="hand" href="#process" onClick={(e) => handleNavClick(e, "#process")} className="group flex flex-col items-start gap-2 text-md tracking-[0.1em] mt-12 md:mt-16 uppercase text-zinc-200 font-sans">
            <span>VIEW PROCESS &rarr;</span>
            <span className="w-full h-[1px] bg-zinc-400 group-hover:bg-white transition-colors"></span>
          </Link>
        </BlurFade>
      </div>
    </section>
  )
}
