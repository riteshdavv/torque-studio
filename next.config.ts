import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (smallest), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Widths used when generating srcset for fill/responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Widths used for fixed-size images (e.g. width/height props)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 30-day CDN cache for optimized images (default is 60s)
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default nextConfig
