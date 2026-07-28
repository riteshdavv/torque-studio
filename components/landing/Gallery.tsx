"use client";
import type React from 'react';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
	fadeIn: { start: number; end: number };
	fadeOut: { start: number; end: number };
}

interface BlurSettings {
	blurIn: { start: number; end: number };
	blurOut: { start: number; end: number };
	maxBlur: number;
}

interface FiniteGalleryProps {
	images: ImageItem[];
	scrollProgress?: MotionValue<number>;
	visibleCount?: number;
	fadeSettings?: FadeSettings;
	blurSettings?: BlurSettings;
	className?: string;
	style?: React.CSSProperties;
	/** Multiplier applied to BASE_PLANE_SIZE for every image plane. Default 1. */
	imageScale?: number;
}

interface PlaneData {
	index: number;
	initialZ: number;
	imageIndex: number;
	x: number;
	y: number; 
}

const DEFAULT_DEPTH_RANGE = 60;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
// Base plane size (world units) at aspect ratio 1. Change this to resize every
// image in the gallery. A plane's final width/height is BASE_PLANE_SIZE * imageScale,
// scaled further by that image's own aspect ratio (see ImagePlane below).
const BASE_PLANE_SIZE = 2;

const createClothMaterial = () => {
	return new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
			opacity: { value: 1.0 },
			blurAmount: { value: 0.0 },
			scrollForce: { value: 0.0 },
			time: { value: 0.0 },
			isHovered: { value: 0.0 },
		},
		vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
		fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
	});
};

function ImagePlane({
	textures,
	plane,
	material,
	imageScale = 1,
}: {
	textures: THREE.Texture[];
	plane: PlaneData;
	material: THREE.ShaderMaterial;
	imageScale?: number;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [isHovered, setIsHovered] = useState(false);
	// Tracks whether we've already sized this plane from the image's natural
	// aspect ratio, so it happens exactly once and never gets overwritten again.
	const didSetScaleRef = useRef(false);

	// This is the ONLY place the texture is assigned to the material, and it
	// also sizes the plane to the image's real aspect ratio in the same step.
	// Previously the texture was assigned here AND (redundantly) inside
	// useFrame, and only the useFrame path computed the aspect-correct scale.
	// Because this effect usually ran first, it satisfied useFrame's
	// `map.value !== currentTexture` check before useFrame ever ran, so the
	// scale line in useFrame silently never fired — the plane was left at its
	// default 1x1 (square) geometry, stretching the image. Whether that race
	// went one way or the other each mount is what made the squish look random.
	useEffect(() => {
		const currentTexture = textures[plane.imageIndex];
		if (!material || !currentTexture) return;

		material.uniforms.map.value = currentTexture;

		if (meshRef.current && !didSetScaleRef.current) {
			const image = currentTexture.image as
				| { width?: number; height?: number }
				| undefined;
			const aspect =
				image?.width && image?.height ? image.width / image.height : 1;
			const size = BASE_PLANE_SIZE * imageScale;

			meshRef.current.scale.set(
				aspect > 1 ? size * aspect : size,
				aspect > 1 ? size : size / aspect,
				1
			);
			didSetScaleRef.current = true;
		}
	}, [material, textures, plane.imageIndex, imageScale]);

	useEffect(() => {
		if (material && material.uniforms) {
			material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
		}
	}, [material, isHovered]);

	useFrame(() => {
		if (meshRef.current) {
			// plane.z is updated dynamically by the parent GalleryScene
			meshRef.current.position.set(plane.x, plane.y, (plane as any).currentZ);
		}
	});

	return (
		<mesh
			ref={meshRef}
			material={material}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
		>
			<planeGeometry args={[1, 1, 32, 32]} />
		</mesh>
	);
}

function GalleryScene({
	images,
	scrollProgress,
	visibleCount = 14,
	fadeSettings = {
		fadeIn: { start: 0.05, end: 0.15 },
		fadeOut: { start: 0.85, end: 0.95 },
	},
	blurSettings = {
		blurIn: { start: 0.0, end: 0.1 },
		blurOut: { start: 0.9, end: 1.0 },
		maxBlur: 3.0,
	},
	imageScale = 1,
}: Omit<FiniteGalleryProps, 'className' | 'style'>) {
	const normalizedImages = useMemo(
		() =>
			images.map((img) =>
				typeof img === 'string' ? { src: img, alt: '' } : img
			),
		[images]
	);

	const textures = useTexture(normalizedImages.map((img) => img.src));

	const materials = useMemo(
		() => Array.from({ length: visibleCount }, () => createClothMaterial()),
		[visibleCount]
	);

	const spatialPositions = useMemo(() => {
		const positions: { x: number; y: number }[] = [];
		const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
		const maxVerticalOffset = MAX_VERTICAL_OFFSET;

		for (let i = 0; i < visibleCount; i++) {
			const horizontalAngle = (i * 2.618) % (Math.PI * 2); 
			const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2); 
			const horizontalRadius = (i % 3) * 1.2; 
			const verticalRadius = ((i + 1) % 4) * 0.8; 

			const x = (Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) / 3;
			const y = (Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;
			positions.push({ x, y });
		}
		return positions;
	}, [visibleCount]);

	const totalImages = normalizedImages.length;
	const depthRange = DEFAULT_DEPTH_RANGE;
	const startZ = -10; 
	// At progress=0, first plane is at -10, last plane is at -10 - depthRange.
	// We want the last plane to reach +5 (past camera) at progress=1.
	const totalTravel = Math.abs(startZ - depthRange) + 5; 

	const planesData = useRef<(PlaneData & { currentZ: number })[]>(
		Array.from({ length: visibleCount }, (_, i) => ({
			index: i,
			initialZ: startZ - ((depthRange / Math.max(visibleCount, 1)) * i),
			currentZ: startZ - ((depthRange / Math.max(visibleCount, 1)) * i),
			imageIndex: totalImages > 0 ? i % totalImages : 0,
			x: spatialPositions[i]?.x ?? 0, 
			y: spatialPositions[i]?.y ?? 0, 
		}))
	);

	const smoothedProgress = useRef(0);

	useFrame((state, delta) => {
		const targetProgress = scrollProgress ? scrollProgress.get() : 0;
		// Smooth out the scroll slightly
		smoothedProgress.current += (targetProgress - smoothedProgress.current) * Math.min(delta * 10, 1);
		
		const offsetZ = smoothedProgress.current * totalTravel;

		// We can calculate a simulated "scroll force" based on how fast progress is changing
		const progressDelta = targetProgress - smoothedProgress.current;
		const scrollForce = progressDelta * 50;

		const time = state.clock.getElapsedTime();
		
		materials.forEach((material) => {
			if (material && material.uniforms) {
				material.uniforms.time.value = time;
				material.uniforms.scrollForce.value = scrollForce;
			}
		});

		planesData.current.forEach((plane, i) => {
			const currentZ = plane.initialZ + offsetZ;
			plane.currentZ = currentZ;

			// Fade out as it passes the camera (z > -2) and fade in from far away
			// The normalized position is based on where it is relative to the viewable range
			// Let's define viewable range from startZ - depthRange to +5
			const viewRange = depthRange + 15;
			const distanceInView = currentZ - (startZ - depthRange);
			const normalizedPosition = 1.0 - (distanceInView / viewRange);

			let opacity = 1;
			if (normalizedPosition >= fadeSettings.fadeIn.start && normalizedPosition <= fadeSettings.fadeIn.end) {
				opacity = (normalizedPosition - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
			} else if (normalizedPosition < fadeSettings.fadeIn.start) {
				opacity = 0;
			} else if (normalizedPosition >= fadeSettings.fadeOut.start && normalizedPosition <= fadeSettings.fadeOut.end) {
				opacity = 1 - (normalizedPosition - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
			} else if (normalizedPosition > fadeSettings.fadeOut.end) {
				opacity = 0;
			}

			// Add a sharp fade out right when it crosses the camera
			if (currentZ > -1) {
				opacity *= Math.max(0, 1 - (currentZ + 1) * 0.5);
			}
			opacity = Math.max(0, Math.min(1, opacity));

			let blur = 0;
			if (normalizedPosition >= blurSettings.blurIn.start && normalizedPosition <= blurSettings.blurIn.end) {
				blur = blurSettings.maxBlur * (1 - (normalizedPosition - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start));
			} else if (normalizedPosition < blurSettings.blurIn.start) {
				blur = blurSettings.maxBlur;
			} else if (normalizedPosition >= blurSettings.blurOut.start && normalizedPosition <= blurSettings.blurOut.end) {
				blur = blurSettings.maxBlur * ((normalizedPosition - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start));
			} else if (normalizedPosition > blurSettings.blurOut.end) {
				blur = blurSettings.maxBlur;
			}

			// Also blur when it gets close to camera
			if (currentZ > -2) {
				blur = Math.max(blur, (currentZ + 2) * 2.0);
			}
			blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

			const material = materials[i];
			if (material && material.uniforms) {
				material.uniforms.opacity.value = opacity;
				material.uniforms.blurAmount.value = blur;
			}
		});
	});

	if (normalizedImages.length === 0) return null;

	return (
		<>
			{planesData.current.map((plane, i) => {
				const material = materials[i];
				if (!material || textures.length === 0) return null;

				return (
					<ImagePlane
						key={plane.index}
						textures={textures}
						plane={plane}
						material={material}
						imageScale={imageScale}
					/>
				);
			})}
		</>
	);
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
	const normalizedImages = useMemo(
		() =>
			images.map((img) =>
				typeof img === 'string' ? { src: img, alt: '' } : img
			),
		[images]
	);

	return (
		<div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
			<p className="text-gray-600 mb-4">
				WebGL not supported. Showing image list:
			</p>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
				{normalizedImages.map((img, i) => (
					<img
						key={i}
						src={img.src || '/placeholder.svg'}
						alt={img.alt}
						className="w-full h-32 object-cover rounded"
					/>
				))}
			</div>
		</div>
	);
}

export default function FiniteGallery({
	images,
	scrollProgress,
	className = 'h-96 w-full',
	style,
	visibleCount = 14,
	fadeSettings = {
		fadeIn: { start: 0.05, end: 0.15 },
		fadeOut: { start: 0.85, end: 0.95 },
	},
	blurSettings = {
		blurIn: { start: 0.0, end: 0.1 },
		blurOut: { start: 0.9, end: 1.0 },
		maxBlur: 3.0,
	},
	imageScale = 1,
}: FiniteGalleryProps) {
	const [webglSupported, setWebglSupported] = useState(true);

	useEffect(() => {
		try {
			const canvas = document.createElement('canvas');
			const gl =
				canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
			if (!gl) {
				setWebglSupported(false);
			}
		} catch (e) {
			setWebglSupported(false);
		}
	}, []);

	if (!webglSupported) {
		return (
			<div className={className} style={style}>
				<FallbackGallery images={images} />
			</div>
		);
	}

	return (
		<div className={className} style={style}>
			<Canvas
				camera={{ position: [0, 0, 10], fov: 15 }}
				gl={{ antialias: true, alpha: true }}
				style={{ background: 'transparent' }}
			>
				<Suspense fallback={null}>
					<GalleryScene
						images={images}
						scrollProgress={scrollProgress}
						visibleCount={visibleCount}
						fadeSettings={fadeSettings}
						blurSettings={blurSettings}
						imageScale={imageScale}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
