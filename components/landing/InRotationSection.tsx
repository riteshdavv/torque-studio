import Image from "next/image"
import { BlurFade } from "@/components/BlurFade"
import VideoPlayer from "@/components/VideoPlayer"

export function InRotationSection() {
  return (
    <section className="w-full bg-[#f8f8f8] text-black pt-24 px-8 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <BlurFade delay={0.25} inView>
          <h2 className="font-serif text-5xl md:text-[8rem] leading-[0.8] tracking-tighter uppercase mb-16 text-center">
            <span className="italic">IN &nbsp;ROTATION.</span>
          </h2>
        </BlurFade>

        <div className="w-full flex flex-col md:flex-row items-start justify-center gap-12 relative">
          {/* Left small text */}
          <div className="md:absolute left-0 top-1/4 max-w-[200px]">
            <BlurFade delay={0.25 * 2} inView>
              <p className="text-sm tracking-widest text-zinc-700 uppercase font-sans whitespace-nowrap hidden md:block mb-4">02 — VIDEO</p>
              <p className="font-sans text-lg leading-relaxed text-zinc-700">A seasonal offer turned into a scroll-stopping video → fast enough to actually run while the offer is still live.
              </p>
            </BlurFade>
          </div>

          {/* Center Image */}
          <div className="w-full md:w-3/5 h-[400px] md:h-[500px] relative overflow-hidden">
            <VideoPlayer src="/videos/franchise.mp4"/>
          </div>

          {/* Right small text */}
          <div className="md:absolute right-0 bottom-1/4 max-w-[200px]">
            <BlurFade delay={0.25 * 3} inView>
              <p className="font-sans text-lg leading-relaxed text-zinc-700">Every frame is engineered for maximium retention.</p>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
