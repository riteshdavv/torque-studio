import { BlurFade } from "@/components/BlurFade"
import Link from "next/link"

export function PricingSection() {
    return (
        <section className="w-full bg-[#111111] py-32 px-6 md:px-12 flex flex-col items-center border-t border-zinc-800">
            <div className="max-w-4xl flex flex-col items-center justify-center w-full text-center">
                <BlurFade delay={0.2} inView>
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight mb-8">
                        <span className="block">THE 7-DAY</span>
                        <span className="italic block text-zinc-400">PROOF OF CONCEPT.</span>
                    </h2>
                </BlurFade>
                
                <BlurFade delay={0.3} inView>
                    <p className="font-sans text-lg md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Test our speed with a single raw asset.<br/>
                        One week, $750 — no long-term commitments required upfront.<br></br>Loved the result? Scale into a monthly partnership.
                    </p>
                </BlurFade>

                <BlurFade delay={0.4} inView>
                    <p className="font-sans text-xl md:text-2xl text-white tracking-widest uppercase mb-12 font-bold">
                        7-DAY PILOT — FROM $750
                    </p>
                </BlurFade>

                <BlurFade delay={0.5} inView>
                    <Link data-cursor="hand" href="#contact" className="group flex flex-col items-center gap-2 text-md tracking-[0.15em] uppercase text-zinc-200 font-sans mb-24">
                        <span>START THE 7-DAY PILOT &rarr;</span>
                        <span className="w-full h-[1px] bg-zinc-400 group-hover:bg-white transition-colors"></span>
                    </Link>
                </BlurFade>

                <BlurFade delay={0.6} inView>
                    <p className="font-sans text-base md:text-lg text-zinc-400 max-w-lg mx-auto">
                        Loved the week? Scale into our monthly partnerships.
                    </p>
                </BlurFade>
            </div>
        </section>
    )
}