"use client"

import { Cpu, Eye, Sun, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const techStack = [
  {
    icon: Cpu,
    title: "Arduino Controller",
    description: "Reliable, proven microcontroller platform with extensive customization options.",
    specs: ["ATmega328P processor", "Low power consumption", "Easy firmware updates"],
  },
  {
    icon: Eye,
    title: "Light Sensors",
    description: "High-precision photoresistors and photodiodes for accurate light measurement.",
    specs: ["Multi-directional sensing", "UV-filtered optics", "Real-time calibration"],
  },
  {
    icon: Sun,
    title: "Solar-Assisted Logic",
    description: "Intelligent algorithms that factor in solar position and intensity.",
    specs: ["Predictive positioning", "Seasonal adjustment", "Weather awareness"],
  },
]

export function TechnologySection() {
  return (
    <section id="technology" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Technology
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">Built on proven, reliable technology</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We chose components that are battle-tested, customizable, and designed for longevity. 
              No proprietary lock-in — just smart engineering.
            </p>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
                  <Cpu className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                    Built for Expansion
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Our modular architecture means you can add new sensors, connectivity options, 
                    and features as they become available. Future-proof by design.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild variant="outline" className="group rounded-full">
                <a href="/contact">
                  Request Technical Specs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>

          {/* Tech Cards */}
          <div className="space-y-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <tech.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-card-foreground">
                      {tech.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {tech.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tech.specs.map((spec, specIndex) => (
                        <li
                          key={specIndex}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
