import Image from "next/image"
import { BlurFade } from "@/components/BlurFade"
import VideoPlayer from "@/components/VideoPlayer"

export function WalkthroughSection() {
  return (
    <section className="w-full bg-[#f8f8f8] text-black pt-16 md:pt-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <BlurFade delay={0.25} inView>
          <h2 className="font-serif text-5xl md:text-[8rem] leading-[0.8] tracking-tighter uppercase mb-8 md:mb-16 text-center">
            <span className="italic">WALKTHROUGH.</span>
          </h2>
        </BlurFade>
        
        <div className="w-full flex flex-col lg:flex-row items-center md:items-start justify-center gap-0 md:gap-12 relative">
          {/* Left small text */}
          <div className="static lg:absolute left-0 top-1/4 max-w-[200px] text-center md:text-left mt-8 lg:mt-0">
            <BlurFade delay={0.25 * 2} inView>
              <p className="text-sm tracking-widest text-zinc-700 uppercase font-sans whitespace-nowrap hidden md:block mb-4">02 — VIDEO</p>
              <p className="font-sans text-base md:text-lg leading-relaxed text-zinc-700">For listings with weak or no footage → a polished walkthrough - style video built without a second shoot.</p>
            </BlurFade>
          </div>

          {/* Center Image */}
          <div className="w-full lg:w-3/5 relative overflow-hidden order-first lg:order-none mb-8 lg:mb-0">
            <VideoPlayer src="/videos/realestate.mp4"/>
          </div>
          
          {/* Right small text */}
          <div className="static md:absolute right-0 bottom-1/4 max-w-[200px] text-center md:text-left mt-8 md:mt-0">
            <BlurFade delay={0.25 * 3} inView>
              <p className="font-sans text-base md:text-lg leading-relaxed text-zinc-700">Every frame is calculated to maximize engagement.</p>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
