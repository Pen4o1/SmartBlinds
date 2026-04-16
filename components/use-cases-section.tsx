"use client"

import { Home, Building2, Leaf, ArrowRight } from "lucide-react"

const useCases = [
  {
    icon: Home,
    title: "Smart Homes",
    description: "Transform your living space with automated comfort. Wake up to natural light, enjoy optimal temperatures all day, and relax in perfect privacy at night.",
    benefits: ["Effortless comfort", "Energy savings", "Enhanced privacy"],
    image: "linear-gradient(135deg, oklch(0.75 0.16 85 / 0.3), oklch(0.75 0.16 85 / 0.1))",
  },
  {
    icon: Building2,
    title: "Modern Offices",
    description: "Create the perfect work environment. Reduce screen glare automatically, maintain comfortable temperatures, and boost productivity without distraction.",
    benefits: ["Reduced glare", "Better focus", "Lower costs"],
    image: "linear-gradient(135deg, oklch(0.6 0.1 200 / 0.3), oklch(0.6 0.1 200 / 0.1))",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Living",
    description: "Make a real impact on your carbon footprint. SmartBlinds optimize natural light usage, reducing reliance on artificial lighting and climate control.",
    benefits: ["Lower emissions", "Sustainable tech", "Green living"],
    image: "linear-gradient(135deg, oklch(0.6 0.15 145 / 0.3), oklch(0.6 0.15 145 / 0.1))",
  },
]

export function UseCasesSection() {
  return (
    <section id="use-cases" className="bg-accent py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Use Cases
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Perfect for every space</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            From cozy homes to busy offices, SmartBlinds adapt to your lifestyle.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-primary/50 hover:shadow-2xl"
            >
              {/* Decorative header */}
              <div
                className="h-48 transition-transform duration-500 group-hover:scale-105"
                style={{ background: useCase.image }}
              >
                <div className="flex h-full items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border/50 bg-card/90 shadow-lg backdrop-blur-sm">
                    <useCase.icon className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-card-foreground">
                  {useCase.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {useCase.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
