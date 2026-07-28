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
  const lenisRef = useRef<Lenis | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const instance = new Lenis({ 
      duration: 1.2, 
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), 
      smoothWheel: true, 
      autoRaf: false })
    lenisRef.current = instance
    setReady(true)
    instance.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
      setReady(false)
    }
  }, [])

  return <LenisContext.Provider value={ready ? lenisRef.current : null}>{children}</LenisContext.Provider>
}
