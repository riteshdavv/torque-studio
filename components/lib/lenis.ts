// lib/lenis.ts
import Lenis from "lenis"

let lenis: Lenis | null = null

export function initLenis() {
  if (lenis) return lenis // already initialized, don't double-create

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  function raf(time: number) {
    lenis!.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}

export function getLenis() {
  return lenis
}