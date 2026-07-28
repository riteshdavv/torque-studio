import { useCallback, useEffect, useRef, useState } from "react"

interface MousePosition {
  x: number
  y: number
}

interface MouseVector {
  x: number
  y: number
  magnitude: number
}

interface UseMouseVectorResult {
  position: MousePosition
  vector: MouseVector
}

export function useMouseVector(
  containerRef?: React.RefObject<HTMLElement | null>
): UseMouseVectorResult {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [vector, setVector] = useState<MouseVector>({ x: 0, y: 0, magnitude: 0 })
  const lastPositionRef = useRef<MousePosition>({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const target = containerRef?.current

      let x: number
      let y: number

      if (target) {
        const rect = target.getBoundingClientRect()
        x = event.clientX - rect.left
        y = event.clientY - rect.top
      } else {
        x = event.clientX
        y = event.clientY
      }

      const dx = x - lastPositionRef.current.x
      const dy = y - lastPositionRef.current.y
      const magnitude = Math.sqrt(dx * dx + dy * dy)

      lastPositionRef.current = { x, y }

      setPosition({ x, y })
      setVector({ x: dx, y: dy, magnitude })
    },
    [containerRef]
  )

  useEffect(() => {
    const element = containerRef?.current ?? window

    element.addEventListener("mousemove", handleMouseMove as EventListener)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove as EventListener)
    }
  }, [containerRef, handleMouseMove])

  return { position, vector }
}
