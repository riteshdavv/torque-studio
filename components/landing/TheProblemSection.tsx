import { BlurFade } from "@/components/BlurFade"

export function TheProblemSection() {
  return (
    <section className="w-full bg-[#111111] text-white pt-32 pb-32 px-6 md:px-24 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-start relative">
        <BlurFade delay={0.1} inView>
          <div className="text-xs md:text-sm tracking-[0.2em] text-zinc-500 uppercase mb-8 md:mb-12 font-sans font-bold">
            02 — THE PROBLEM
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h2 className="font-serif text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.9] tracking-tighter uppercase mb-12 md:mb-20">
            <span className="block">THE SHOOT</span>
            <span className="italic block text-zinc-400">ISN'T THE END.</span>
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full">
          <BlurFade delay={0.3} inView>
            <p className="font-sans text-xl md:text-2xl lg:text-3xl leading-relaxed text-zinc-300">
              A shoot can generate hundreds of photos and minutes — sometimes hours — of footage. <br/><br/>
              <span className="text-zinc-500">But most of it never becomes anything else.</span>
            </p>
          </BlurFade>
          
          <BlurFade delay={0.4} inView>
            <div className="flex flex-col gap-6 font-sans text-lg md:text-xl leading-relaxed text-zinc-400">
              <p>One property video stays one property video.</p>
              <p>One campaign shoot becomes a handful of posts.</p>
              <p>One production day gets used once.</p>
              
              <div className="mt-8 border-l-2 border-zinc-600 pl-6">
                <p className="font-bold text-white mb-2 tracking-widest uppercase text-xs md:text-sm">Torque exists to change that.</p>
                <p className="text-zinc-300 italic text-xl md:text-2xl leading-relaxed">One production input.<br/>More ways to use it.</p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
