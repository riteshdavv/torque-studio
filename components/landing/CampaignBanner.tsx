import { BlurFade } from "@/components/BlurFade"

export function CampaignBanner() {
  return (
    <div className="w-full bg-black/80 text-white pt-24 pb-36 flex flex-col items-center justify-center">
      <BlurFade delay={0.25} inView>
        <div className="flex flex-col lg:flex-row items-center gap-6 text-xl md:text-3xl tracking-widest text-zinc-200 mb-4 font-sans text-center">
          <span className="justify-items-start">ONE SYSTEM,</span>
          <span className="justify-items-start">produced at the speed</span>
        </div>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide text-center flex flex-col md:flex-row items-baseline">
          <span className="italic">A REAL CAMPAIGN</span>
          <span className="font-sans text-lg md:text-3xl mt-2 md:mt-0 md:ml-4 text-zinc-200">actually needs.</span>
        </h2>
      </BlurFade>
    </div>
  )
}
