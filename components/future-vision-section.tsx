"use client"

import { Smartphone, Home, Cloud, Brain, ArrowRight } from "lucide-react"

const futureFeatures = [
  {
    icon: Smartphone,
    title: "App Control",
    description: "Control your blinds from anywhere with our upcoming mobile application.",
    status: "Coming Soon",
  },
  {
    icon: Home,
    title: "Smart Home Integration",
    description: "Seamless connection with Alexa, Google Home, and Apple HomeKit.",
    status: "In Development",
  },
  {
    icon: Cloud,
    title: "Weather Automation",
    description: "Cloud-based weather data for predictive blind positioning.",
    status: "Planned",
  },
  {
    icon: Brain,
    title: "AI Optimization",
    description: "Machine learning that adapts to your preferences over time.",
    status: "Future Vision",
  },
]

export function FutureVisionSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Future Vision
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">This is just the beginning</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our roadmap is full of exciting features that will make SmartBlinds even smarter.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {futureFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-dashed border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {feature.status}
                </span>
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground transition-all duration-300 hover:border-primary hover:shadow-lg"
          >
            Stay Updated on New Features
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
