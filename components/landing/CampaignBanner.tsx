import { BlurFade } from "@/components/BlurFade"

export function CampaignBanner() {
  return (
    <div className="w-full bg-black/80 text-white pt-24 pb-36 flex flex-col items-center justify-center">
      <BlurFade delay={0.25} inView>
        <div className="flex items-center gap-6 text-3xl tracking-widest text-zinc-200 mb-4 font-sans">
          <span className="justify-items-start">ONE SYSTEM, produced at the speed</span>
        </div>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <h2 className="font-serif text-3xl md:text-8xl tracking-wide">
          <span className="italic">A REAL CAMPAIGN</span>
          <span className="font-sans text-lg md:text-3xl ml-4 text-zinc-200">actually needs.</span>
        </h2>
      </BlurFade>
    </div>
  )
}
