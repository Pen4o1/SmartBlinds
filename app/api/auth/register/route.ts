import { randomBytes } from "node:crypto"
import { z } from "zod"

import { getBaseUrl, sendAuthEmail } from "@/lib/mailer"
import { hashPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const registerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
})

function getIdentifier(email: string) {
  return `verify:${email.toLowerCase()}`
}

export async function POST(request: Request) {
  try {
    let json: unknown
    try {
      json = await request.json()
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const parsed = registerSchema.safeParse(json)

    if (!parsed.success) {
      return Response.json({ error: "Invalid registration payload" }, { status: 400 })
    }

    const email = parsed.data.email.toLowerCase()

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return Response.json({ error: "Email already registered" }, { status: 409 })
    }

    const passwordHash = await hashPassword(parsed.data.password)

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email,
        passwordHash,
      },
    })

    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24)

    await prisma.verificationToken.create({
      data: {
        identifier: getIdentifier(email),
        token,
        expires,
      },
    })

    const verifyUrl = `${getBaseUrl()}/api/auth/verify-email?email=${encodeURIComponent(email)}&token=${token}`

    await sendAuthEmail({
      to: email,
      subject: "Verify your SmartBlinds account",
      text: `Welcome to SmartBlinds!\n\nPlease verify your account by opening this link:\n${verifyUrl}\n\nThis link expires in 24 hours.`,
    })

    return Response.json({ success: true, requiresVerification: true }, { status: 201 })
  } catch (error) {
    console.error("Registration failed", error)
    return Response.json({ error: "Could not create account" }, { status: 500 })
  }
}
