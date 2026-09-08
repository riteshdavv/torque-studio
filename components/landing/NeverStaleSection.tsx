import Image from "next/image"
import { BlurFade } from "@/components/BlurFade"
import { BLUR } from "@/lib/blurPlaceholders"

export function NeverStaleSection() {
  return (
    <section className="w-full bg-[#f8f8f8] text-black py-16 md:py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col mb-16 relative">
        <div className="flex flex-col-reverse md:flex-row md:items-end justify-between w-full">
          <div className="flex flex-col gap-4 max-w-lg mt-8 md:mt-0">
            <BlurFade delay={0.25} inView>
              <span className="text-sm tracking-widest text-zinc-700 uppercase font-sans whitespace-nowrap hidden md:block mb-2">03 — ASSETS</span>
              <p className="font-sans text-lg leading-relaxed text-zinc-700">
                Three creative directions from one offer, built to rotate before an audience gets tired of seeing the same ad.
              </p>
            </BlurFade>
          </div>
          
          <BlurFade delay={0.25 * 2} inView>
            <h2 className="font-serif text-5xl md:text-[8rem] leading-[0.8] tracking-tighter uppercase">
              <span className="italic">NEVER &nbsp;STALE.</span>
            </h2>
          </BlurFade>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 reveal-grid">
        {/* Images */}
        <div className="md:col-span-5 h-[250px] md:h-[450px] relative overflow-hidden reveal-image-container">
          <Image src="/neverstale1.webp" alt="Never Stale 1" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" placeholder="blur" blurDataURL={BLUR.neverstale1} />
        </div>
        <div className="md:col-span-5 h-[250px] md:h-[450px] relative overflow-hidden">
          <Image src="/neverstale2.webp" alt="Never Stale 2" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" placeholder="blur" blurDataURL={BLUR.neverstale2} />
        </div>
        <div className="md:col-span-2 h-[250px] md:h-[450px] relative overflow-hidden reveal-image-container">
          <Image src="/neverstale3.webp" alt="Never Stale 3" fill sizes="(max-width: 768px) 100vw, 16vw" className="object-cover" placeholder="blur" blurDataURL={BLUR.neverstale3} />
        </div>
      </div>
    </section>
  )
}

