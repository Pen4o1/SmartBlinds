import { z } from "zod"

import { hashPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const resetSchema = z.object({
  email: z.string().trim().email(),
  token: z.string().min(1),
  password: z.string().min(8).max(128),
})

function getIdentifier(email: string) {
  return `reset:${email.toLowerCase()}`
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = resetSchema.safeParse(json)

    if (!parsed.success) {
      return Response.json({ error: "Invalid payload" }, { status: 400 })
    }

    const email = parsed.data.email.toLowerCase()

    const tokenRow = await prisma.passwordResetToken.findFirst({
      where: {
        identifier: getIdentifier(email),
        token: parsed.data.token,
      },
      orderBy: { createdAt: "desc" },
    })

    if (!tokenRow || tokenRow.expires < new Date()) {
      return Response.json({ error: "Invalid or expired reset link" }, { status: 400 })
    }

    const passwordHash = await hashPassword(parsed.data.password)

    await prisma.user.updateMany({
      where: { email },
      data: {
        passwordHash,
        emailVerified: new Date(),
      },
    })

    await prisma.passwordResetToken.deleteMany({
      where: { identifier: getIdentifier(email) },
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Reset password failed", error)
    return Response.json({ error: "Could not reset password" }, { status: 500 })
  }
}
