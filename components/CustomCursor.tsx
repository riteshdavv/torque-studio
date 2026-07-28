"use client"

import { useEffect, useRef, useState } from "react"

type CursorVariant = "arrow" | "hand"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<CursorVariant>("arrow")
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let rafId: number
    let mouseX = 0
    let mouseY = 0

    const applyTransform = () => {
      const rotate = variant === "hand" ? 0 : -10
      const scale = variant === "hand" ? 0.9 : 0.85
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${rotate}deg) scale(${scale})`
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.opacity = isNative ? "0" : "1"

      const target = e.target as HTMLElement
      const nativeEl = target.closest('[data-cursor="native"]')
      const handEl = target.closest('[data-cursor="hand"]')

      setIsNative(Boolean(nativeEl))
      setVariant(handEl && !nativeEl ? "hand" : "arrow")

      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(applyTransform)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", () => { cursor.style.opacity = "0" })
    document.addEventListener("mouseenter", () => { cursor.style.opacity = isNative ? "0" : "1" })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", () => { cursor.style.opacity = "0" })
      document.removeEventListener("mouseenter", () => { cursor.style.opacity = isNative ? "0" : "1" })
      cancelAnimationFrame(rafId)
    }
  }, [variant, isNative])

  return (
    <div ref={cursorRef} className="custom-cursor">
      {variant === "arrow" ? (
        <svg width="24" height="36" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.65376 1.15005C5.06734 0.35414 3.79153 0.771614 3.79153 1.76104L3.79153 26.5056C3.79153 27.5256 5.1207 27.9179 5.67926 27.0653L10.9995 18.9431C11.3533 18.403 11.9688 18.0833 12.6111 18.0833H22.0917C23.0812 18.0833 23.4986 16.8075 22.7027 16.2211L5.65376 1.15005Z" fill="currentColor" />
        </svg>
      ) : (
        <svg
          id="hand"
          height="25"
          width="25"
          viewBox="0 0 77 95"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(38.5, 47.5) scale(0.82, 0.9) translate(-38.5, -47.5)">
            <path
              d="M41.9967 9.69231C41.9967 5.45 37.1334 0 32.3044 0C24.4968 0 22.766 9.69231 22.766 9.69231V63.3462L13.4583 51.5385C10.8814 48.2692 6.15059 47.6923 2.88135 50.2692C-0.387877 52.8462 -0.9648 57.5769 1.61212 60.8462L18.5737 82.3462C24.6198 90.0385 33.8044 94.6923 43.9198 94.6923C61.9737 94.6923 76.6121 80.0538 76.6121 62V39C76.6121 34.7577 73.1621 31.3077 68.9198 31.3077C64.6775 31.3077 61.2275 34.7577 61.2275 39V46.6154H59.3044V31.2308C59.3044 26.9885 55.8544 22.5385 51.6121 22.5385C47.3698 22.5385 43.9198 26.9885 43.9198 31.2308V46.6154H41.9967V9.69231Z"
              fill="#D9D9D9"
            />
          </g>
        </svg>
      )}
    </div>
  )
}