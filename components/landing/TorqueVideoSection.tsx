"use client"

import { BlurFade } from "@/components/BlurFade"
import VideoPlayer from "@/components/VideoPlayer"

export function TorqueVideoSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-16 md:py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <BlurFade delay={0.2} inView className="w-full">
          <VideoPlayer src="/Torque X Post.mp4#t=0.001" />
        </BlurFade>
      </div>
    </section>
  )
}
