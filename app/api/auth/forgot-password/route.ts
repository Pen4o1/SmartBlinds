import { randomBytes } from "node:crypto"
import { z } from "zod"

import { getBaseUrl, sendAuthEmail } from "@/lib/mailer"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const forgotSchema = z.object({
  email: z.string().trim().email(),
})

function getIdentifier(email: string) {
  return `reset:${email.toLowerCase()}`
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = forgotSchema.safeParse(json)

    if (!parsed.success) {
      return Response.json({ success: true })
    }

    const email = parsed.data.email.toLowerCase()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return Response.json({ success: true })
    }

    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 1000 * 60 * 30)

    await prisma.passwordResetToken.create({
      data: {
        identifier: getIdentifier(email),
        token,
        expires,
      },
    })

    const resetUrl = `${getBaseUrl()}/reset-password?email=${encodeURIComponent(email)}&token=${token}`

    await sendAuthEmail({
      to: email,
      subject: "Reset your SmartBlinds password",
      text: `Reset your password with this link (expires in 30 minutes):\n\n${resetUrl}`,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Forgot password request failed", error)
    return Response.json({ success: true })
  }
}
