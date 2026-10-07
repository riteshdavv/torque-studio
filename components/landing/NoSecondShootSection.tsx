import { BlurFade } from "@/components/BlurFade"

export function NoSecondShootSection() {
  return (
    <section className="w-full bg-[#111111] text-white pt-32 pb-40 px-6 md:px-24 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center relative text-center">
        <BlurFade delay={0.1} inView>
          <div className="text-xs md:text-sm tracking-[0.2em] text-zinc-500 uppercase mb-8 md:mb-16 font-sans font-bold">
            06 — THE APPROACH
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h2 className="font-serif text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-[0.9] tracking-tighter uppercase mb-16">
            <span className="block">NOT EVERYTHING NEEDS</span>
            <span className="italic block text-zinc-400">ANOTHER SHOOT.</span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="font-sans text-xl md:text-3xl leading-relaxed text-zinc-300 max-w-4xl mx-auto">
            When the production already exists, we work from the footage and photography you've already captured — turning it into new formats without starting from scratch.
          </p>
        </BlurFade>
        
      </div>
    </section>
  )
}
