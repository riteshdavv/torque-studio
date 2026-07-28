"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlurFade } from "@/components/BlurFade"

// ScrollTrigger is already registered globally in SmoothScrollProvider,
// but SplitText must be registered here since it is only used in this file.
gsap.registerPlugin(ScrollTrigger, SplitText)

export function FifteenMinutesSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

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
      className="w-full bg-[#f8f8f8] text-black py-32 px-8 md:px-12 flex flex-col items-center"
    >
      <div className="max-w-7xl w-full flex flex-col items-start relative">
        {/*
          BlurFade removed from the h2 — GSAP SplitText handles the reveal.
          The headline is rendered at full opacity so the SplitText animation
          controls visibility entirely. Under prefers-reduced-motion the
          element renders fully visible with no animation (see useEffect guard).
        */}
        <h2
          ref={headlineRef}
          className="font-serif text-6xl md:text-[8rem] leading-[1] tracking-tighter uppercase mb-16"
        >
          <span className="block text-zinc-900">FIFTEEN MINUTES.</span>
          <span className="block italic">THAT&apos;S IT.</span>
        </h2>

        <div className="justify-items-end items-end mt-16 max-w-[40rem] text-zinc-700 text-[1.4rem] leading-relaxed tracking-[0.1em] font-sans absolute -right-16 bottom-43 uppercase">
          <BlurFade delay={0.25 * 2} inView>
            <p>
              Pick a slot and tell us what you&apos;re working on.
            </p>
          </BlurFade>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-12 mt-8">
          <BlurFade delay={0.25 * 3} inView>
            <p className="font-sans text-xl tracking-[0.02em] leading-relaxed text-zinc-700">
              We&apos;ll tell you straight whether it&apos;s a fit → no deck, no pressure, no obligation.<br />
              If your feed isn&apos;t where you want it yet, this is the fastest way to find out what fixing it actually looks like.
            </p>
          </BlurFade>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-16">
        <div className="flex flex-col items-center">
          <button data-cursor="hand" className="bg-zinc-800 text-white px-12 py-4 text-lg tracking-[0.2em] uppercase font-sans hover:bg-black transition-colors mb-6">
            BOOK A CALL →
          </button>
          <p className="font-sans text-md tracking-widest text-zinc-600">
            prefer email? [hello@torque.com]
          </p>
        </div>
      </div>
    </section>
  )
}
