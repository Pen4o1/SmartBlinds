import Link from "next/link"
import { redirect } from "next/navigation"

import { auth, signOut } from "@/auth"
import { DeviceDashboard } from "@/components/device-dashboard"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">SmartBlinds Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Signed in as {session.user.email ?? session.user.name ?? "User"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>

          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/login" })
            }}
          >
            <Button type="submit">Sign out</Button>
          </form>
        </div>
      </header>

      <DeviceDashboard />
    </main>
  )
}
