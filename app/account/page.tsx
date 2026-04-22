import { redirect } from "next/navigation"
import { UserCircle2 } from "lucide-react"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

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
    <>
      <Navigation />
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 pt-28 pb-10">
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
          </CardContent>
        </Card>
      </main>
    </>
  )
}
