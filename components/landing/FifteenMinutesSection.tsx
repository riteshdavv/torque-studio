"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlurFade } from "@/components/BlurFade"
import Link from "next/link"
import { InlineWidget } from "react-calendly"

// ScrollTrigger is already registered globally in SmoothScrollProvider,
// but SplitText must be registered here since it is only used in this file.
gsap.registerPlugin(ScrollTrigger, SplitText)

export function FifteenMinutesSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const rootRef = useRef<HTMLDivElement>(null) // Calendly needs a portal root
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shouldLoadCalendly, setShouldLoadCalendly] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  useEffect(() => {
    const headline = headlineRef.current
    const section = sectionRef.current

    if (!headline || !section) return

    // Respect prefers-reduced-motion — BlurFade on the headline is removed,
    // so we keep the element fully visible if motion is disabled.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    // Split into chars only. We remove `mask: "chars"` to prevent clipping
    // the italic serif ascenders/descenders. The opacity fade ensures it still
    // looks like a clean reveal.
    const split = SplitText.create(headline, {
      type: "chars,words",
      // aria: "auto" preserves the original text for screen readers
      aria: "auto",
      charsClass: "fifteen-char",
    })

    // Set initial state before the trigger fires so there is no flash
    gsap.set(split.chars, { y: 56, opacity: 0 })

    const tween = gsap.to(split.chars, {
      y: 0,
      opacity: 1,
      duration: 0.65,
      ease: "expo.out",
      stagger: 0.022,
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // slightly lower so it triggers when more visible
        // toggleActions: play forward on enter, reverse on leave back, etc.
        toggleActions: "play reverse play reverse",
      },
      onComplete: () => {
        // Revert DOM after animation completes to restore clean markup
        // but since we want it to replay when scrolling back up, we shouldn't revert it completely!
        // Actually, if we revert it, the next time it plays it won't have the chars span.
        // We will remove the revert from onComplete so it stays split and can be replayed.
      },
    })

    return () => {
      // Kill the ScrollTrigger and the tween; revert split if still active
      tween.scrollTrigger?.kill()
      tween.kill()
      if (split.isSplit) split.revert()
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-[#f8f8f8] text-black py-16 md:py-32 px-6 md:px-12 flex flex-col items-center"
    >
      <div ref={rootRef} className="max-w-7xl w-full flex flex-col items-start relative">
        {/*
          BlurFade removed from the h2 — GSAP SplitText handles the reveal.
          The headline is rendered at full opacity so the SplitText animation
          controls visibility entirely. Under prefers-reduced-motion the
          element renders fully visible with no animation (see useEffect guard).
        */}
        <h2
          ref={headlineRef}
          className="font-serif text-[4rem] md:text-[8rem] leading-[1] tracking-tighter uppercase mb-16 text-center md:text-left"
        >
          <span className="block text-zinc-900">FIFTEEN MINUTES.</span>
          <span className="block italic">THAT&apos;S IT.</span>
        </h2>

        <div className="mt-8 md:mt-16 max-w-[32rem] text-zinc-700 text-lg md:text-[1.4rem] leading-relaxed tracking-[0.1em] font-sans uppercase text-center md:text-right w-full md:w-auto md:ml-auto">
          <BlurFade delay={0.25 * 2} inView>
            <p>
              Pick a slot and tell us what you&apos;re working on.
            </p>
          </BlurFade>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-8 md:gap-12 mt-8 text-center md:text-left">
          <BlurFade delay={0.25 * 3} inView>
            <p className="font-sans text-base md:text-xl tracking-[0.02em] leading-relaxed text-zinc-700">
              We&apos;ll tell you straight whether it&apos;s a fit → no deck, no pressure, no obligation.<br />
              If your feed isn&apos;t where you want it yet, this is the fastest way to find out what fixing it actually looks like.
            </p>
          </BlurFade>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-16">
        <div className="flex flex-col items-center">
          <button
            onMouseEnter={() => setShouldLoadCalendly(true)}
            onClick={() => {
              setShouldLoadCalendly(true)
              setIsModalOpen(true)
            }}
            className="bg-zinc-800 text-white px-12 py-4 text-lg tracking-[0.2em] uppercase font-sans hover:bg-black transition-colors mb-6"
          >
            BOOK A CALL →
          </button>
          <Link
            href="mailto:hello@torquestudio.co"
            className="font-sans text-base md:text-lg py-4 tracking-widest text-zinc-600"
          >
            prefer email? hello@torquestudio.co
          </Link>
        </div>
      </div>

      {mounted && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
            isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div
            className={`relative w-[95vw] md:w-[80vw] max-w-[1050px] h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden transition-transform duration-500 delay-75 ${
              isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
            }`}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors text-black"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {shouldLoadCalendly && (
              <InlineWidget
                url="https://calendly.com/ritesh-torquestudio/15min"
                styles={{ height: "100%", width: "100%" }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}
