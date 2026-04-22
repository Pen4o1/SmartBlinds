"use client"

import { FormEvent, Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Mode = "signIn" | "signUp"

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12" />}>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<Mode>("signIn")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotSent, setForgotSent] = useState(false)

  const router = useRouter()
  const verified = searchParams.get("verified")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === "signUp") {
        const registerResponse = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        })

        if (!registerResponse.ok) {
          const data = (await registerResponse.json()) as { error?: string }
          setError(data.error ?? "Could not create account")
          setLoading(false)
          return
        }

        setLoading(false)
        setError(null)
        setMode("signIn")
        return
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      setLoading(false)

      if (!result) {
        setError("Authentication failed. Please try again.")
        return
      }

      if (result.error) {
        setError("Invalid email or password")
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch {
      setLoading(false)
      setError("Something went wrong. Please try again.")
    }
  }

  async function handleForgotPassword() {
    if (!forgotEmail.trim()) return
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotEmail }),
    })
    setForgotSent(true)
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{mode === "signIn" ? "Sign in" : "Create account"}</CardTitle>
          <CardDescription>
            {mode === "signIn"
              ? "Access your SmartBlinds dashboard."
              : "Create an account to manage your SmartBlinds devices."}
          </CardDescription>
          {verified === "1" ? <p className="text-sm text-green-700">Email verified. You can now sign in.</p> : null}
          {verified === "0" ? <p className="text-sm text-red-600">Verification link is invalid or expired.</p> : null}
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signUp" ? (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Please wait..." : mode === "signIn" ? "Sign in" : "Create account"}
            </Button>

            {mode === "signIn" ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await signIn("google", { callbackUrl: "/dashboard" })
                }}
              >
                Continue with Google
              </Button>
            ) : null}
          </form>

          <div className="text-sm text-center">
            {mode === "signIn" ? "No account yet?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode((prev) => (prev === "signIn" ? "signUp" : "signIn"))
                setError(null)
              }}
              className="text-primary underline underline-offset-4"
            >
              {mode === "signIn" ? "Create one" : "Sign in"}
            </button>
          </div>

          {mode === "signIn" ? (
            <div className="space-y-2 rounded-md border p-3">
              <p className="text-sm font-medium">Forgot password?</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(event) => setForgotEmail(event.target.value)}
                />
                <Button type="button" variant="outline" onClick={() => void handleForgotPassword()}>
                  Send
                </Button>
              </div>
              {forgotSent ? (
                <p className="text-xs text-muted-foreground">If that account exists, a reset email was sent.</p>
              ) : null}
            </div>
          ) : null}

          <div className="text-center text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground underline underline-offset-4">
              Back to homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
