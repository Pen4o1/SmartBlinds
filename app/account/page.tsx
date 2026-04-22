import Link from "next/link"
import { redirect } from "next/navigation"
import { UserCircle2 } from "lucide-react"

import { auth, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AccountPage() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect("/login")
  }

  const [user, deviceCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
      },
    }),
    prisma.device.count({
      where: { userId },
    }),
  ])
  const googleAccount = await prisma.account.findFirst({
    where: {
      userId,
      provider: "google",
    },
    select: { provider: true },
  })

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/40">
          <div className="flex items-center gap-3">
            <UserCircle2 className="text-primary h-6 w-6" />
            <CardTitle>Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Name</p>
              <p className="font-medium">{user?.name ?? "Not set"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Email</p>
              <p className="font-medium">{user?.email ?? "Not set"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Email status</p>
              <Badge
                variant={googleAccount ? "secondary" : user?.emailVerified ? "secondary" : "outline"}
              >
                {googleAccount ? "Logged in with Google" : user?.emailVerified ? "Verified" : "Not verified"}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Devices</p>
              <p className="font-medium">{deviceCount}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Landing Page</Link>
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
        </CardContent>
      </Card>
    </main>
  )
}
