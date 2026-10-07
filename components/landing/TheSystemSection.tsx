import { BlurFade } from "@/components/BlurFade"

export function TheSystemSection() {
  return (
    <section className="w-full bg-[#f8f8f8] text-black pt-32 pb-32 px-6 md:px-24 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center relative text-center">
        <BlurFade delay={0.1} inView>
          <div className="text-xs md:text-sm tracking-[0.2em] text-zinc-500 uppercase mb-8 md:mb-12 font-sans font-bold">
            03 — THE TORQUE SYSTEM
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h2 className="font-serif text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.9] tracking-tighter uppercase mb-16">
            <span className="block">ONE PRODUCTION.</span>
            <span className="italic block text-zinc-400">A SYSTEM OF OUTPUTS.</span>
          </h2>
        </BlurFade>

        {/* Visual Diagram */}
        <BlurFade delay={0.3} inView className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 my-8">
          <div className="bg-black text-white px-8 py-4 rounded-full font-sans tracking-[0.2em] uppercase text-xs md:text-sm shadow-xl shadow-black/10">
            PHOTOS + FOOTAGE
          </div>
          
          <div className="text-zinc-400 text-2xl">↓</div>
          
          <div className="font-serif text-4xl md:text-6xl italic tracking-tight text-zinc-800">
            TORQUE
          </div>
          
          <div className="text-zinc-400 text-3xl">↓</div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-center font-sans tracking-[0.15em] text-xs md:text-sm font-bold text-zinc-700 w-full mt-4">
            {["VIDEO", "REELS", "CAROUSELS", "ADS", "SOCIAL", "PROPERTY CONTENT", "AGENT / BRAND CONTENT"].map((label) => (
              <div key={label} className="border border-zinc-200 px-6 py-4 bg-white shadow-sm uppercase">
                {label}
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.4} inView className="mt-16 text-center max-w-4xl mx-auto flex flex-col gap-4">
          <p className="font-sans text-xl md:text-3xl text-zinc-800 uppercase tracking-widest font-bold">
            You provide the production inputs.
          </p>
          <p className="font-sans text-lg md:text-2xl text-zinc-500 italic">
            We handle the creative, editing, repurposing and delivery.
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
