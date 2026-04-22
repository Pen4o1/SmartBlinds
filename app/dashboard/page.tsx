import { redirect } from "next/navigation"
import { LayoutDashboard, Sparkles } from "lucide-react"

import { auth } from "@/auth"
import { DeviceDashboard } from "@/components/device-dashboard"
import { Navigation } from "@/components/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <>
      <Navigation />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 pt-28 pb-10">
        <header className="rounded-2xl border bg-gradient-to-r from-primary/10 via-background to-background p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutDashboard className="h-4 w-4" />
            <span>SmartBlinds Control Center</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold md:text-4xl">SmartBlinds Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Signed in as {session.user.email ?? session.user.name ?? "User"}
            </p>
          </div>
        </header>

        <section className="rounded-2xl border bg-card/50 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Manage devices, automations, and lighting behavior in real time.</span>
          </div>
          <DeviceDashboard />
        </section>
      </main>
    </>
  )
}
