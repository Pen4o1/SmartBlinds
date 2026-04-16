"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "I never thought blinds could make such a difference. My living room stays perfectly comfortable all day without me lifting a finger.",
    author: "Sarah M.",
    role: "Homeowner",
    rating: 5,
  },
  {
    quote: "The energy savings alone have paid for the system. Plus, my team no longer complains about screen glare during afternoon meetings.",
    author: "David L.",
    role: "Office Manager",
    rating: 5,
  },
  {
    quote: "As someone who cares deeply about sustainability, SmartBlinds aligned perfectly with my values. Smart technology that actually reduces waste.",
    author: "Emma K.",
    role: "Environmental Consultant",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-accent py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Early adopters love it</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            See what our beta testers are saying about their SmartBlinds experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
            >
              {/* Quote mark decoration */}
              <div className="absolute -right-4 -top-4 font-serif text-9xl text-primary/10">
                &ldquo;
              </div>

              <div className="relative">
                {/* Star rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="text-lg leading-relaxed text-card-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-[family-name:var(--font-display)] text-lg font-semibold text-primary">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
