import { HeroSection } from "@/components/landing/HeroSection"
import { DirectOfferBlock } from "@/components/landing/DirectOfferBlock"
import { TorqueVideoSection } from "@/components/landing/TorqueVideoSection"
import { TheProblemSection } from "@/components/landing/TheProblemSection"
import { TheSystemSection } from "@/components/landing/TheSystemSection"
import { WhatOneProductionBecomes } from "@/components/landing/WhatOneProductionBecomes"
import { SectorsSection } from "@/components/landing/SectorsSection"
import { NoSecondShootSection } from "@/components/landing/NoSecondShootSection"
import { WorkflowSection } from "@/components/landing/WorkflowSection"
import { CraftSection } from "@/components/landing/CraftSection"
import { FifteenMinutesSection } from "@/components/landing/FifteenMinutesSection"
import { FooterSection } from "@/components/landing/FooterSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { GridRevealClient } from "@/components/GridRevealClient"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0a0a0a]">
      <GridRevealClient />
      <HeroSection />
      <DirectOfferBlock />
      <TorqueVideoSection />
      <TheProblemSection />
      <TheSystemSection />
      <WhatOneProductionBecomes />
      <SectorsSection />
      <NoSecondShootSection />
      <WorkflowSection />
      <CraftSection />
      <PricingSection />
      <FifteenMinutesSection />
      <FooterSection />
    </main>
  )
}