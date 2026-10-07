import { BlurFade } from "@/components/BlurFade"
import Link from "next/link"

export function PricingSection() {
    return (
        <section className="w-full bg-[#111111] py-32 px-6 md:px-12 flex flex-col items-center border-t border-zinc-800">
            <div className="max-w-4xl flex flex-col items-center justify-center w-full text-center">
                <BlurFade delay={0.2} inView>
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight mb-8">
                        <span className="block">START WITH</span>
                        <span className="italic block text-zinc-400">ONE PRODUCTION.</span>
                    </h2>
                </BlurFade>
                
                <BlurFade delay={0.3} inView>
                    <p className="font-sans text-lg md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Send us an existing shoot.<br/>
                        We'll turn it into a focused set of content assets so you can see what Torque can do before committing to an ongoing partnership.
                    </p>
                </BlurFade>

                <BlurFade delay={0.4} inView>
                    <p className="font-sans text-xl md:text-2xl text-white tracking-widest uppercase mb-12 font-bold">
                        PILOTS FROM $750
                    </p>
                </BlurFade>

                <BlurFade delay={0.5} inView>
                    <Link data-cursor="hand" href="#contact" className="group flex flex-col items-center gap-2 text-md tracking-[0.15em] uppercase text-zinc-200 font-sans mb-24">
                        <span>START A PILOT &rarr;</span>
                        <span className="w-full h-[1px] bg-zinc-400 group-hover:bg-white transition-colors"></span>
                    </Link>
                </BlurFade>

                <BlurFade delay={0.6} inView>
                    <p className="font-sans text-sm md:text-base text-zinc-500 italic max-w-lg mx-auto">
                        Ongoing partnerships are scoped around content volume, complexity and production inputs.
                    </p>
                </BlurFade>
            </div>
        </section>
    )
}