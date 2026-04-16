"use client"

import { Sun, Cpu, Settings, Moon } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Sun,
    title: "Sensors Detect Sunlight",
    description: "High-precision light sensors measure ambient light levels and direct sunlight intensity in real-time.",
    detail: "Multiple sensors provide 360° coverage",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Microcontroller Processes",
    description: "Our Arduino-based system analyzes sensor data and calculates the optimal blind angle.",
    detail: "Processes data every 30 seconds",
  },
  {
    step: "03",
    icon: Settings,
    title: "Blinds Adjust Automatically",
    description: "Precision motors smoothly rotate the blinds to the calculated position for optimal comfort.",
    detail: "Silent, energy-efficient motors",
  },
  {
    step: "04",
    icon: Moon,
    title: "Night Mode Activates",
    description: "As daylight fades, blinds automatically close to provide privacy and thermal insulation.",
    detail: "Customizable sunset detection",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Simple technology, smart results</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Four seamless steps that work together to create the perfect environment.
          </p>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:left-1/2 lg:block" />

            <div className="space-y-12 lg:space-y-24">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col gap-8 lg:flex-row lg:items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:block" />

                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:pr-24 lg:text-right" : "lg:pl-24"}`}>
                    <div className={`rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg ${index % 2 === 0 ? "lg:ml-auto" : ""} max-w-xl`}>
                      <div className={`mb-6 flex items-center gap-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                          <item.icon className="h-7 w-7 text-primary" />
                        </div>
                        <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-primary/20">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl font-semibold text-card-foreground">
                        {item.title}
                      </h3>
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-primary">{item.detail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
