import Image from "next/image"
import { BlurFade } from "@/components/BlurFade"

export function OneSystemSection() {
  return (
    <section className="w-full bg-[#f8f8f8] text-black pt-16 px-6 md:px-12 flex flex-col items-center border-t border-t-zinc-500">
      <div className="max-w-7xl w-full flex flex-col mb-16 relative">
        <BlurFade delay={0.25} inView>
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-base tracking-widest text-zinc-700 uppercase mb-12 md:mb-20 font-sans mx-auto w-full justify-center text-center">
            <span className="w-4 md:w-8 h-[0.5px] bg-zinc-500 hidden sm:block"></span>
            <span>COLLECTION // 02 — FRANCHISE</span>
            <span className="w-4 md:w-8 h-[0.5px] bg-zinc-500 hidden sm:block"></span>
          </div>
        </BlurFade>

        <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
          <BlurFade delay={0.25 * 2} inView>
            <h2 className="font-serif text-5xl md:text-[8rem] leading-[0.8] tracking-tighter uppercase">
              <span className="italic">ONE &nbsp;SYSTEM.</span>
            </h2>
          </BlurFade>
          
          <div className="flex flex-col gap-2 mt-8 md:mt-0 max-w-lg">
            <BlurFade delay={0.25 * 3} inView>
              <span className="text-sm tracking-widest text-zinc-700 uppercase font-sans whitespace-nowrap hidden md:block mb-2">01 — STILLS</span>
              <p className="font-sans text-lg leading-relaxed text-zinc-700">
                One shoot becomes a full carousel, a caption set, and a week's worth of posts → ready the same day the listing goes live.
              </p>
            </BlurFade>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 reveal-grid">
        {/* Images */}
        <div className="md:col-span-5 h-[250px] md:h-[400px] relative overflow-hidden reveal-image-container">
          <Image src="/onesystem1.png" alt="One System 1" fill className="object-cover" />
        </div>
        <div className="md:col-span-5 h-[250px] md:h-[400px] relative overflow-hidden">
          <Image src="/onesystem2.png" alt="One System 2" fill className="object-cover" />
        </div>
        <div className="md:col-span-2 h-[250px] md:h-[400px] relative overflow-hidden reveal-image-container">
          <Image src="/onesystem3.png" alt="One System 3" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
