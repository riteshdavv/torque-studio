"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useGridReveal() {
  useEffect(() => {
    // If motion is disabled, skip animation
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    // Find all grids on the page
    const grids = document.querySelectorAll(".reveal-grid")
    
    const triggers: ScrollTrigger[] = []

    grids.forEach((grid) => {
      const images = grid.querySelectorAll(".reveal-image-container")
      if (images.length === 0) return

      // Link GSAP tween directly to ScrollTrigger with toggleActions
      const tween = gsap.fromTo(images, 
        { scaleY: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          duration: 0.9,
          ease: "expo.inOut",
          stagger: 0.12,
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      )
      
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])
}
