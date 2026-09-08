import { BlurFade } from "@/components/BlurFade"

export function DirectOfferBlock() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-24 px-6 md:px-12 flex flex-col items-center justify-center border-t border-b border-zinc-900">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <BlurFade delay={0.2} inView className="w-full flex justify-center">
          <div className="w-full max-w-2xl flex flex-col divide-y divide-zinc-800/80 border-y border-zinc-800/80">
            <div className="py-5 md:py-6 flex items-baseline gap-4 md:gap-6 text-left">
              <span className="text-xs md:text-base font-sans tracking-[0.2em] text-zinc-500 uppercase shrink-0">01</span>
              <p className="font-sans text-lg md:text-2xl text-zinc-200 tracking-wide text-left">
                Built entirely from the photos and footage you already have
              </p>
            </div>
            <div className="py-5 md:py-6 flex items-baseline gap-4 md:gap-6 text-left">
              <span className="text-xs md:text-base font-sans tracking-[0.2em] text-zinc-500 uppercase shrink-0">02</span>
              <p className="font-sans text-lg md:text-2xl text-zinc-200 tracking-wide text-left">
                Typical turnaround: 3 business days
              </p>
            </div>
            <div className="py-5 md:py-6 flex items-baseline gap-4 md:gap-6 text-left">
              <span className="text-xs md:text-base font-sans tracking-[0.2em] text-zinc-500 uppercase shrink-0">03</span>
              <p className="font-sans text-lg md:text-2xl text-zinc-200 tracking-wide text-left">
                First deliverable free — if it&apos;s not usable, no charge
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
