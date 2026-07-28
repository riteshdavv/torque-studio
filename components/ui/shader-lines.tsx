"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let renderer: THREE.WebGLRenderer

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      mouse: { value: new THREE.Vector2(0, 0) },
      mouseStrength: { value: 0 }, // eased 0 -> 1 on hover
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform vec2 mouse;
      uniform float mouseStrength;
      uniform float time;

      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        // distance from this fragment to the cursor, in the same shader-space as uv
        float dist = length(uv - mouse);
        // glow falls off smoothly around the cursor, scaled by hover-in/out easing
        float glow = smoothstep(0.9, 0.0, dist) * mouseStrength;
        // near the cursor the line effect roughly doubles; far away it's untouched
        float boost = 1.0 + glow;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += boost * lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
          }
        }

        gl_FragColor = vec4(color[2],color[1],color[0],1.0);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // hover state, eased rather than snapped for a smooth "power up"
    let targetStrength = 0
    const mouseTarget = new THREE.Vector2(0, 0)

    const onWindowResize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio
      const px = (e.clientX - rect.left) * dpr
      const py = (e.clientY - rect.top) * dpr

      // mirror the same uv formula the shader uses, so mouse and uv line up
      const res = uniforms.resolution.value
      const minDim = Math.min(res.x, res.y)
      mouseTarget.x = (px * 2 - res.x) / minDim
      // flip Y: gl_FragCoord origin is bottom-left, pointer events are top-left
      mouseTarget.y = ((res.y - py) * 2 - res.y) / minDim
    }

    const onPointerEnter = () => { targetStrength = 1 }
    const onPointerLeave = () => { targetStrength = 0 }

    onWindowResize()
    window.addEventListener("resize", onWindowResize)
    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerenter", onPointerEnter)
    container.addEventListener("pointerleave", onPointerLeave)

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05

      // ease mouse position and hover strength toward their targets
      uniforms.mouse.value.lerp(mouseTarget, 0.15)
      uniforms.mouseStrength.value += (targetStrength - uniforms.mouseStrength.value) * 0.08

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onWindowResize)
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerenter", onPointerEnter)
      container.removeEventListener("pointerleave", onPointerLeave)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full absolute" />
}