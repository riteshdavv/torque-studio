import Image from "next/image"
import { BlurFade } from "@/components/BlurFade"

export function ListedSection() {
  return (
    <section id="work" className="w-full bg-[#f8f8f8] text-black pt-16 px-8 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col mb-16 relative">
        {/* Top dividing header */}
        <BlurFade delay={0.25} inView>
          <div className="flex items-center gap-4 text-md tracking-widest text-zinc-700 uppercase mb-20 font-sans mx-auto w-full justify-center">
            <span className="w-8 h-[0.5px] bg-zinc-500"></span>
            <span>COLLECTION // 01 — REAL ESTATE</span>
            <span className="w-8 h-[0.5px] bg-zinc-500"></span>
          </div>
        </BlurFade>

        <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
          <BlurFade delay={0.25 * 2} inView>
            <h2 className="font-serif text-5xl md:text-[8rem] leading-[0.8] tracking-tighter uppercase">
              <span className="italic">LISTED.</span>
            </h2>
          </BlurFade>
          
          <div className="flex flex-col gap-2 mt-8 md:mt-0 max-w-lg">
            <BlurFade delay={0.25 * 3} inView>
              <span className="text-sm tracking-widest text-zinc-700 uppercase font-sans whitespace-nowrap hidden md:block mb-2">01 — STILLS</span>
              <p className="font-sans text-lg leading-relaxed text-zinc-700">
                The same design system, rebuilt for every location in minutes instead of days → so ten doors look like one brand, not ten different ones.
              </p>
            </BlurFade>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 reveal-grid">
        {/* Images */}
        <div className="md:col-span-5 h-[300px] md:h-[450px] relative overflow-hidden reveal-image-container">
          <Image src="/listed1.png" alt="Listed 1" fill className="object-cover" />
        </div>
        <div className="md:col-span-5 h-[300px] md:h-[450px] relative overflow-hidden">
          <Image src="/listed2.png" alt="Listed 2" fill className="object-cover" />
        </div>
        <div className="md:col-span-2 h-[300px] md:h-[450px] relative overflow-hidden reveal-image-container">
          <Image src="/listed3.png" alt="Listed 3" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
