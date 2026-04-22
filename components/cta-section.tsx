"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sun } from "lucide-react"

type SessionResponse = {
  user?: {
    id?: string
    email?: string | null
    name?: string | null
  }
}

export function CTASection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (!response.ok) return
        const data = (await response.json()) as SessionResponse
        setIsLoggedIn(Boolean(data?.user?.id))
      } catch {
        setIsLoggedIn(false)
      }
    }

    void run()
  }, [])

  return (
    <section className="relative overflow-hidden bg-accent py-20 lg:py-32">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        
        {/* Sun rays animation */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-0.5 w-1/3 origin-left -translate-y-1/2"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-50%)`,
              background: `linear-gradient(to right, oklch(0.75 0.16 85 / ${0.3 - i * 0.03}), transparent)`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Sun className="h-8 w-8 text-primary" />
        </div>

        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
          <span className="block text-balance">Let Your Home</span>
          <span className="block text-balance text-primary">Adjust Itself</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {isLoggedIn
            ? "Your account is ready. Open the dashboard to control devices, create new ones, and tune automation."
            : "Join the smart home revolution. Create an account, sign in, and start controlling your blinds in seconds."}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="group rounded-full px-8">
            <a href={isLoggedIn ? "/dashboard" : "/login"}>
              {isLoggedIn ? "Access Dashboard" : "Create Account / Sign In"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-border bg-card/50 px-8 backdrop-blur-sm"
          >
            <a href={isLoggedIn ? "/contact" : "/login"}>
              {isLoggedIn ? "Contact Us" : "Required Steps"}
            </a>
          </Button>
        </div>

        {!isLoggedIn ? (
          <div className="mx-auto mt-6 max-w-xl rounded-lg border border-border/60 bg-card/50 p-4 text-left text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Actions required before using dashboard:</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Create your account</li>
              <li>Sign in with email and password</li>
              <li>Open dashboard and manage your devices</li>
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  )
}
