"use client"

import { Sun, Cpu, RotateCw, Moon } from "lucide-react"

const solutionSteps = [
  {
    icon: Sun,
    title: "Light Detection",
    description: "Advanced sensors continuously monitor sunlight intensity throughout the day.",
  },
  {
    icon: Cpu,
    title: "Solar Processing",
    description: "Solar input helps determine the optimal blind position for maximum efficiency.",
  },
  {
    icon: RotateCw,
    title: "Auto Adjustment",
    description: "Blinds rotate automatically throughout the day, tracking the sun's movement.",
  },
  {
    icon: Moon,
    title: "Night Privacy",
    description: "Blinds close automatically at night for complete privacy and insulation.",
  },
]

export function SolutionSection() {
  return (
    <section className="relative overflow-hidden bg-accent py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            The Solution
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Intelligent automation that adapts</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            SmartBlinds work seamlessly in the background, creating the perfect environment without any effort.
          </p>
        </div>

        {/* Solution diagram */}
        <div className="relative mt-16 lg:mt-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {solutionSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < solutionSteps.length - 1 && (
                  <div className="absolute left-full top-10 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                )}
                
                <div className="group rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-primary/40 transition-colors duration-300 group-hover:text-primary/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
