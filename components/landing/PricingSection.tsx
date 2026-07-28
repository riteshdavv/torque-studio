import { BlurFade } from "@/components/BlurFade"

export function PricingSection() {
    return (
        <section className="w-full bg-[#000000 py-32 px-8 md:px-12 flex flex-col items-center overflow-hidden ">
            <div className="flex flex-col items-center justify-center w-full">
                <BlurFade delay={0.25} inView>
                    <p className="font-sans text-3xl tracking-[0.02em] text-zinc-300 text-center mb-4">
                        Pilots start at $750. Ongoing partnerships from there.
                    </p>
                </BlurFade>
                <BlurFade delay={0.25 * 2} inView>
                    <p className="font-sans text-[1.4rem] text-zinc-300 text-center">
                        No tiers to decode → we'll figure out the right scope on the call.
                    </p>
                </BlurFade>
            </div>
        </section>
    )
}