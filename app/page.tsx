"use client"

import { observer } from "mobx-react-lite"
import { Header } from "@/components/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedDestinations } from "@/components/home/featured-destinations"
import { SpecialOffers } from "@/components/home/special-offers"
import { WhyFlyWithUs } from "@/components/home/why-fly-with-us"
import { MobileAppPromo } from "@/components/home/mobile-app-promo"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"
import { FlightTracker } from "@/components/home/flight-tracker"
import { TravelTips } from "@/components/home/travel-tips"
import { PageWrapper } from "@/components/layout/page-wrapper"

function HomePage() {
  return (
    <PageWrapper>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedDestinations />

        <div className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <SpecialOffers />
            </div>
            <div className="md:col-span-1">
              <FlightTracker />
            </div>
          </div>
        </div>

        <WhyFlyWithUs />
        <TravelTips />
        <Testimonials />
        <MobileAppPromo />
        <Newsletter />
      </main>
      <Footer />
    </PageWrapper>
  )
}

export default observer(HomePage)
