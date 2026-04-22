import bcrypt from "bcryptjs"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

const registerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = registerSchema.safeParse(json)

    if (!parsed.success) {
      return Response.json({ error: "Invalid registration payload" }, { status: 400 })
    }

    const email = parsed.data.email.toLowerCase()

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return Response.json({ error: "Email already registered" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10)

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email,
        passwordHash,
      },
    })

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Registration failed", error)
    return Response.json({ error: "Could not create account" }, { status: 500 })
  }
}
