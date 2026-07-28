"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

/**
 * Props for the ParallaxLayer component.
 *
 * @param speed
 *   Controls how fast the layer moves relative to scroll.
 *   - 0     → locked in place (no parallax)
 *   - 0.3   → slow background drift
 *   - 1     → normal scroll speed (moves with page)
 *   - > 1   → faster than scroll (foreground pop)
 *   - < 0   → reverse direction
 *
 * @param direction
 *   "vertical" (default) or "horizontal" — axis of movement.
 *
 * @param range
 *   Pixel range of the offset at full scroll transit.
 *   Defaults to 120px. Increase for more dramatic effects.
 *
 * @param scale
 *   Optional subtle scale [from, to] applied as the element
 *   scrolls through the viewport. e.g. [0.95, 1.05]
 *
 * @param rotate
 *   Optional rotation in degrees [from, to] applied during scroll.
 *   e.g. [-2, 2] for a gentle tilt.
 *
 * @param offset
 *   Framer Motion scroll offset tuple that defines when the animation
 *   starts and ends relative to the viewport.
 *   Defaults to ["start end", "end start"] (element enters → exits).
 */
export interface ParallaxLayerProps {
  children: React.ReactNode
  speed?: number
  direction?: "vertical" | "horizontal"
  range?: number
  scale?: [number, number]
  rotate?: [number, number]
  offset?: [`${string} ${string}`, `${string} ${string}`]
  className?: string
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  direction = "vertical",
  range = 120,
  scale,
  rotate,
  offset = ["start end", "end start"],
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Tie scroll tracking to THIS element's viewport transit, not the page.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  // Pixel offset: maps 0→1 scroll progress to [-range*speed, +range*speed]
  const pixelRange = range * speed
  const yOffset = useTransform(scrollYProgress, [0, 1], [-pixelRange, pixelRange])
  const xOffset = useTransform(scrollYProgress, [0, 1], [-pixelRange, pixelRange])

  // Optional: subtle scale as the element moves through the viewport
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 1],
    scale ?? [1, 1] // no-op if scale not provided
  )

  // Optional: rotation in degrees during scroll
  const rotateValue = useTransform(
    scrollYProgress,
    [0, 1],
    rotate ?? [0, 0] // no-op if rotate not provided
  )

  // Respect prefers-reduced-motion: render plain div, zero motion
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className} style={{ overflow: "visible" }}>
      <motion.div
        style={{
          // Vertical or horizontal positional offset only — no opacity
          y: direction === "vertical" ? yOffset : 0,
          x: direction === "horizontal" ? xOffset : 0,
          // Optional effects — identity values when not configured
          scale: scale ? scaleValue : 1,
          rotate: rotate ? rotateValue : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
