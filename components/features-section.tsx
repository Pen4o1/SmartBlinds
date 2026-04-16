"use client"

import { Sparkles, SunMedium, Leaf, ShieldCheck, Layers, Zap } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Autonomous Operation",
    description: "Set it and forget it. No manual control needed — your blinds work intelligently on their own.",
  },
  {
    icon: SunMedium,
    title: "Sunlight Tracking",
    description: "Advanced sensors track the sun's position throughout the day for optimal light management.",
  },
  {
    icon: Leaf,
    title: "Energy Efficiency",
    description: "Reduce cooling costs in summer and retain heat in winter with smart positioning.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Automation",
    description: "Automatic closure at night ensures your privacy without any effort.",
  },
  {
    icon: Layers,
    title: "Modular System",
    description: "Built for expansion — add new features and integrations as they become available.",
  },
  {
    icon: Zap,
    title: "Low Power Design",
    description: "Energy-efficient motors and solar-assisted logic minimize power consumption.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-accent py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Everything you need, nothing you don&apos;t</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Thoughtfully designed features that make a real difference in your daily life.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
