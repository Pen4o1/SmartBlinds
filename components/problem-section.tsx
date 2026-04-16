"use client"

import { Thermometer, Hand, Zap } from "lucide-react"

const problems = [
  {
    icon: Thermometer,
    title: "Overheating Homes",
    description: "Too much sunlight heats your home, driving up cooling costs and making spaces uncomfortable.",
  },
  {
    icon: Hand,
    title: "Manual Inefficiency",
    description: "Traditional blinds require constant adjustment. Who has time to manage every window?",
  },
  {
    icon: Zap,
    title: "Wasted Energy",
    description: "Without smart control, energy is wasted daily through inefficient light and heat management.",
  },
]

export function ProblemSection() {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            The Problem
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Your windows are working against you</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Traditional blinds can&apos;t adapt to changing conditions, leaving you uncomfortable and wasting energy.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-destructive/5 transition-transform duration-300 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10">
                  <problem.icon className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl font-semibold text-card-foreground">
                  {problem.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
