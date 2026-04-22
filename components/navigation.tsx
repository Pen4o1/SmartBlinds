"use client"

import { useState, useEffect } from "react"
import { ChevronDown, LogOut, Menu, Sun, UserCircle2, X } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/#technology", label: "Technology" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (!response.ok) return
        const data = (await response.json()) as { user?: { id?: string; email?: string | null } }
        setIsLoggedIn(Boolean(data?.user?.id))
        setUserEmail(data?.user?.email ?? null)
      } catch {
        setIsLoggedIn(false)
        setUserEmail(null)
      }
    }
    void run()
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sun className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
            SmartBlinds
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-card/70 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full px-5">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  Account
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{userEmail ?? "Signed in"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/account">Account</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/dashboard">Dashboard</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/">Back to Landing</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={async () => {
                    await signOut({ callbackUrl: "/login" })
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="rounded-full px-6">
              <a href="/login">Sign In</a>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-lg lg:hidden">
          <div className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              {isLoggedIn ? (
                <>
                  <Button asChild variant="outline" className="mb-2 w-full rounded-full">
                    <a href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                      Account
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="mb-2 w-full rounded-full">
                    <a href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    className="mb-2 w-full rounded-full"
                    onClick={async () => {
                      setIsMobileMenuOpen(false)
                      await signOut({ callbackUrl: "/login" })
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : null}
              {!isLoggedIn ? (
                <Button asChild className="w-full rounded-full">
                  <a href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
