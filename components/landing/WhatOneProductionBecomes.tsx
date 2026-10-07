import Image from "next/image"
import { BlurFade } from "@/components/BlurFade"
import { BLUR } from "@/lib/blurPlaceholders"

export function WhatOneProductionBecomes() {
  return (
    <section className="w-full bg-[#111111] text-white pt-32 pb-32 px-6 md:px-24 flex flex-col items-center border-t border-zinc-900">
      <div className="max-w-7xl w-full flex flex-col relative">
        <BlurFade delay={0.1} inView>
          <div className="text-xs md:text-sm tracking-[0.2em] text-zinc-500 uppercase mb-8 md:mb-12 font-sans font-bold">
            04 — WHAT ONE PRODUCTION BECOMES
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h2 className="font-serif text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-[0.9] tracking-tighter uppercase mb-20">
            <span className="block">ONE PROPERTY SHOOT.</span>
          </h2>
        </BlurFade>

        {/* Original Input Display */}
        <BlurFade delay={0.3} inView className="w-full mb-32">
          <div className="flex flex-col gap-6">
            <p className="font-sans text-sm tracking-[0.15em] text-zinc-500 uppercase font-bold">THE ORIGINAL INPUT</p>
            <div className="w-full h-[40vh] md:h-[65vh] relative overflow-hidden bg-zinc-900 border border-zinc-800">
              <Image src="/originalinput.png" alt="Original Input" fill className="object-cover" />
            </div>
          </div>
        </BlurFade>

        {/* The Outputs Grid */}
        <div className="flex flex-col gap-16 md:gap-24 w-full">
          <BlurFade delay={0.2} inView>
            <div className="font-serif text-4xl md:text-6xl italic text-zinc-400">Becomes...</div>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 w-full">
            <OutputBlock number="01" title="HERO VIDEO" image="/herovideo.png" />
            <OutputBlock number="02" title="SHORT-FORM CUTS" image="/shortformcuts.png" />
            <OutputBlock number="03" title="CAROUSEL" image="/carousel.png" />
            <OutputBlock number="04" title="SOCIAL ASSETS" image="/socialasset.png" />
            <OutputBlock number="05" title="AD CREATIVE" image="/ad.png" objectPosition="object-top" />
            <OutputBlock number="06" title="AGENT CONTENT" image="/agentcontent.png" />
          </div>
        </div>

        {/* Footer argument */}
        <BlurFade delay={0.4} inView className="mt-32 pt-16 flex flex-col md:flex-row items-center justify-center text-center gap-8 border-t border-zinc-800">
          <h3 className="font-serif text-5xl md:text-7xl text-white uppercase tracking-tight leading-[0.9]">
            One shoot.<br/>
            <span className="italic text-zinc-400">More to show.</span>
          </h3>
        </BlurFade>
      </div>
    </section>
  )
}

function OutputBlock({ number, title, image, objectPosition = "object-center" }: { number: string, title: string, image: string, objectPosition?: string }) {
  return (
    <BlurFade delay={0.2} inView className="flex flex-col gap-6">
      <div className="flex items-center gap-4 text-white font-sans tracking-[0.15em] text-sm md:text-base font-bold uppercase">
        <span className="text-zinc-500">&rarr; {number}</span>
        <span>{title}</span>
      </div>
      <div className="w-full h-[350px] md:h-[500px] relative overflow-hidden bg-zinc-900 border border-zinc-800 group">
        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className={`object-cover ${objectPosition} group-hover:scale-[1.03] transition-transform duration-700 ease-out`} />
      </div>
    </BlurFade>
  )
}
