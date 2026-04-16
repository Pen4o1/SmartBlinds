"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { TechnologySection } from "@/components/technology-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { FutureVisionSection } from "@/components/future-vision-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TechnologySection />
      <UseCasesSection />
      <FutureVisionSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  )
}
