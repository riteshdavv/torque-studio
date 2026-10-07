import { BlurFade } from "@/components/BlurFade"

export function SectorsSection() {
  return (
    <section className="w-full bg-[#f8f8f8] text-black pt-32 pb-32 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col relative">
        <BlurFade delay={0.1} inView>
          <div className="text-xs md:text-sm tracking-[0.2em] text-zinc-500 uppercase mb-16 md:mb-24 font-sans font-bold text-center">
            05 — WHO WE WORK WITH
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 w-full">
          
          {/* Real Estate */}
          <BlurFade delay={0.2} inView className="flex flex-col gap-8">
            <h2 className="font-serif text-[3.5rem] md:text-[5rem] leading-[0.9] tracking-tighter uppercase border-b border-zinc-300 pb-8">
              <span className="block text-zinc-400 text-base md:text-lg tracking-widest font-sans font-bold mb-4">SECTOR 01</span>
              <span className="block">REAL ESTATE.</span>
            </h2>
            
            <div className="flex flex-col gap-6 font-sans text-lg md:text-xl text-zinc-700 leading-relaxed">
              <p className="font-bold text-xl md:text-2xl text-zinc-400 uppercase">
                MORE FROM EVERY LISTING.
              </p>
              <p>You already have the photos and footage.</p>
              <p className="italic text-zinc-500">We turn them into:</p>
              <p className="font-bold tracking-wider text-sm md:text-base uppercase text-black">
                Listing videos &rarr; Reels &rarr; Carousels &rarr; Ads &rarr; Agent content &rarr; Social
              </p>
              <p className="mt-4">
                So the production doesn't stop when the listing goes live.
              </p>
            </div>
          </BlurFade>

          {/* Multi-Location Brands */}
          <BlurFade delay={0.3} inView className="flex flex-col gap-8">
            <h2 className="font-serif text-[3.5rem] md:text-[5rem] leading-[0.9] tracking-tighter uppercase border-b border-zinc-300 pb-8">
              <span className="block text-zinc-400 text-base md:text-lg tracking-widest font-sans font-bold mb-4">SECTOR 02</span>
              <span className="block italic">MULTI-LOCATION.</span>
            </h2>
            
            <div className="flex flex-col gap-6 font-sans text-lg md:text-xl text-zinc-700 leading-relaxed">
              <p className="font-bold text-xl md:text-2xl text-zinc-400 uppercase">
                ONE SYSTEM. EVERY LOCATION.
              </p>
              <p>Turn existing campaign and location assets into:</p>
              <p className="font-bold tracking-wider text-sm md:text-base uppercase text-black mt-2">
                Social &rarr; Offers &rarr; Ads &rarr; Local content &rarr; Campaign variations
              </p>
              <p className="mt-4">
                Keep the brand consistent without rebuilding every asset from scratch.
              </p>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  )
}
