"use client"

import { useRef, useCallback } from "react"

/**
 * TiltCard — wraps any content and applies a subtle 3D tilt
 * that follows the cursor within the card's bounds.
 *
 * @param maxTilt      Max rotation in degrees on each axis. Default: 6
 * @param perspective  CSS perspective depth in px. Default: 800
 * @param easeMs       Transition duration in ms for the snap-back on mouse leave. Default: 500
 * @param scale        Scale applied on hover for a lift effect. Default: 1.02
 * @param shadow       Whether to render a neutral monochrome depth shadow. Default: true
 * @param className    Class name for the outer wrapper
 */
export interface TiltCardProps {
  children: React.ReactNode
  maxTilt?: number
  perspective?: number
  easeMs?: number
  scale?: number
  shadow?: boolean
  className?: string
}

export function TiltCard({
  children,
  maxTilt = 6,
  perspective = 800,
  easeMs = 500,
  scale = 1.02,
  shadow = true,
  className = "",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Track whether we're actively hovering to suppress snap-back transition
  // while the cursor is still moving (keeps tracking immediate/jitter-free).
  const isHovering = useRef(false)

  const applyTilt = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return

      const { left, top, width, height } = card.getBoundingClientRect()

      // Normalise cursor position to [-1, 1] within the card
      const normalX = ((e.clientX - left) / width) * 2 - 1
      const normalY = ((e.clientY - top) / height) * 2 - 1

      // rotateY follows cursor X, rotateX is inverted (tilt toward cursor)
      const rotateY = normalX * maxTilt
      const rotateX = -normalY * maxTilt

      // While hovering: no transition so tracking is immediate
      card.style.transition = "transform 0.05s linear"
      card.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `

      if (shadow) {
        // Neutral shadow shifts subtly opposite to tilt direction (depth cue)
        const shadowX = -rotateY * 0.8
        const shadowY = rotateX * 0.8
        card.style.boxShadow = `
          ${shadowX}px ${shadowY}px 24px 0px rgba(0,0,0,0.18),
          0 2px 8px 0 rgba(0,0,0,0.10)
        `
      }
    },
    [maxTilt, perspective, scale, shadow]
  )

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false
    const card = cardRef.current
    if (!card) return

    // Ease back to neutral with the configured duration
    card.style.transition = `transform ${easeMs}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${easeMs}ms ease`
    card.style.transform = `
      perspective(${perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `
    if (shadow) {
      card.style.boxShadow = "0 2px 8px 0 rgba(0,0,0,0.10)"
    }
  }, [easeMs, perspective, shadow])

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={applyTilt}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        // Required for 3D to render correctly
        transformStyle: "preserve-3d",
        // Neutral resting shadow — no color, no glow
        boxShadow: shadow ? "0 2px 8px 0 rgba(0,0,0,0.10)" : undefined,
        // Ensure GPU layer promotion for smooth compositing
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
