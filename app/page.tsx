import { HeroSection } from "@/components/landing/HeroSection"
import { DirectOfferBlock } from "@/components/landing/DirectOfferBlock"
import { CampaignBanner } from "@/components/landing/CampaignBanner"
import { FranchiseRealEstate } from "@/components/landing/FranchiseRealEstate"
import { ListedSection } from "@/components/landing/ListedSection"
import { WalkthroughSection } from "@/components/landing/WalkthroughSection"
import { SoldSection } from "@/components/landing/SoldSection"
import { OneSystemSection } from "@/components/landing/OneSystemSection"
import { InRotationSection } from "@/components/landing/InRotationSection"
import { NeverStaleSection } from "@/components/landing/NeverStaleSection"
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
      <CampaignBanner />
      <FranchiseRealEstate />
      <ListedSection />
      <WalkthroughSection />
      <SoldSection />
      <OneSystemSection />
      <InRotationSection />
      <NeverStaleSection />
      <WorkflowSection />
      <CraftSection />
      <PricingSection />
      <FifteenMinutesSection />
      <FooterSection />
    </main>
  )
}