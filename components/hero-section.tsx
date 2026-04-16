"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const blindsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (blindsRef.current) {
        const blinds = blindsRef.current.querySelectorAll(".blind-slat")
        blinds.forEach((blind, index) => {
          const element = blind as HTMLElement
          const delay = index * 100
          setTimeout(() => {
            element.style.transform = `rotateX(${Math.random() * 30 + 15}deg)`
          }, delay)
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-accent pt-20">
      {/* Animated sun rays background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-20 top-1/2 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/15 blur-3xl" />
        
        {/* Animated light beams */}
        <div className="absolute right-0 top-0 h-full w-1/2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute right-0 origin-right animate-pulse"
              style={{
                top: `${20 + i * 15}%`,
                width: "100%",
                height: "2px",
                background: `linear-gradient(to left, transparent, oklch(0.75 0.16 85 / ${0.1 + i * 0.05}))`,
                transform: `rotate(${-5 + i * 3}deg)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:gap-20 lg:px-8 lg:py-32">
        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Now Available for Pre-Order
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-accent-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block text-balance">Blinds That Think</span>
            <span className="block text-balance text-primary">for Themselves</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0 lg:text-xl">
            Automatically adjust to sunlight using smart sensors and solar-powered logic. 
            Experience effortless comfort and energy savings.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="group rounded-full px-8">
              <a href="#how-it-works">
                See How It Works
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-border bg-card/50 px-8 backdrop-blur-sm"
            >
              <a href="#contact" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Play className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
                </div>
                Get a Quote
              </a>
            </Button>
          </div>
        </div>

        {/* Animated Blinds Visual */}
        <div className="relative flex-1">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
            {/* Window frame */}
            <div className="absolute inset-0 rounded-2xl border-8 border-card bg-gradient-to-b from-primary/20 to-primary/5 shadow-2xl">
              {/* Sun representation */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary blur-2xl" />
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/80" />

              {/* Blinds container */}
              <div ref={blindsRef} className="absolute inset-4 overflow-hidden rounded-lg">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="blind-slat h-[8.33%] border-b border-card/20 bg-card transition-transform duration-1000 ease-out"
                    style={{
                      transformOrigin: "top center",
                      transform: `rotateX(${(25 + Math.sin(i * 0.5) * 10).toFixed(3)}deg)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating info cards */}
            <div className="absolute -left-4 top-1/4 animate-bounce rounded-xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm" style={{ animationDuration: "3s" }}>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm font-medium text-card-foreground">Light Detected</span>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/3 animate-bounce rounded-xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-card-foreground">Adjusting...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30">
            <div className="mx-auto mt-2 h-2 w-1 animate-bounce rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>
    </section>
  )
}
