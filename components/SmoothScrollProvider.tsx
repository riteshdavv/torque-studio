"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


// Register ScrollTrigger once at module level (safe — runs client-side only
// because this file is a 'use client' component)
gsap.registerPlugin(ScrollTrigger)

// ─── Context ────────────────────────────────────────────────────────────────
const LenisContext = createContext<Lenis | null>(null)

/** Access the Lenis instance from any client component. */
export function useLenis() {
  return useContext(LenisContext)
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 3,
      easing: (t: number) => Math.min(10, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    })

    setLenis(lenisInstance) // triggers re-render, context value updates

    lenisInstance.on("scroll", ScrollTrigger.update)

    const gsapTick = (time: number) => lenisInstance.raf(time * 1000)
    gsap.ticker.add(gsapTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(gsapTick)
      lenisInstance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
