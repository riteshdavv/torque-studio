"use client"

import { useRef, useMemo, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTexture, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

export function ParticleSphere() {
  const PARTICLE_COUNT = 1500
  const PARTICLE_SIZE_MIN = 0.005
  const PARTICLE_SIZE_MAX = 0.010
  const SPHERE_RADIUS = 16
  const POSITION_RANDOMNESS = 4
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.0005
  const PARTICLE_OPACITY = 1

  const IMAGE_COUNT = 18
  const IMAGE_SIZE = 4

  const groupRef = useRef<THREE.Group>(null)

  const textures = useTexture([
    "/listed1.webp",
    "/listed2.webp",
    "/listed3.webp",
    "/walkthrough.webp",
    "/sold1.webp",
    "/sold2.webp",
    "/sold3.webp",
    "/onesystem1.webp",
    "/onesystem2.webp",
    "/onesystem3.webp",
    "/inrotation.webp",
    "/neverstale1.webp",
    "/neverstale2.webp",
    "/neverstale3.webp",
  ])

  useEffect(() => {
    textures.forEach((texture) => {
      if (texture) {
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
      }
    })
  }, [textures])

  const particles = useMemo(() => {
    const list = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi
      const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS
      const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
      const y = radiusVariation * Math.cos(phi)
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi)
      list.push({
        position: [x, y, z] as [number, number, number],
        scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.8, 0.6 + Math.random() * 0.3),
      })
    }
    return list
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const orbitingImages = useMemo(() => {
    const list = []
    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = 0
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      // Look at origin to face inwards
      matrix.lookAt(position, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)

      list.push({
        position: [x, y, z] as [number, number, number],
        rotation: [euler.x, euler.y + Math.PI, euler.z] as [number, number, number],
        textureIndex: i % textures.length,
      })
    }
    return list
  }, [textures.length]) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
      groupRef.current.rotation.x += ROTATION_SPEED_X
    }
  })

  return (
    <group ref={groupRef} data-cursor="hand">
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={particle.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {orbitingImages.map((image, index) => (
        <mesh key={`image-${index}`} position={image.position} rotation={image.rotation}>
          <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE]} />
          <meshBasicMaterial map={textures[image.textureIndex]} opacity={1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export default function OrbitGallery({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={className} style={{ background: "transparent" }}>
      <Canvas
        camera={{ position: [0, 2, 11], fov: 24 }}
        gl={{ antialias: true, alpha: true }}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ParticleSphere/>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <p className="absolute top-80 text-center w-full font-sans text-zinc-400 uppercase tracking-[0.08em]">Click and drag to explore the gallery</p>
    </div>
  )
}
