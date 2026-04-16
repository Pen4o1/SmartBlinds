import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="border-b border-border bg-accent/40 pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Start your SmartBlinds project
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Tell us about your space and goals, and we&apos;ll help you find the right setup.
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  )
}
