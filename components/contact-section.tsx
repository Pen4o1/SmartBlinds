"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Contact Info */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contact Us
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">Ready to upgrade your windows?</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Get in touch with our team for a free consultation and quote. 
              We&apos;ll help you find the perfect SmartBlinds solution for your space.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="mt-1 text-muted-foreground">hello@smartblinds.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="mt-1 text-muted-foreground">
                    San Francisco, CA
                    <br />
                    Serving the Bay Area and beyond
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm lg:p-10">
            {isSubmitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-card-foreground">
                  Thank you!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your windows</Label>
                  <Textarea
                    id="message"
                    placeholder="How many windows? What rooms? Any specific needs?"
                    rows={4}
                    className="rounded-xl resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-xl">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  We typically respond within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
