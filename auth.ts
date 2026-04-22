import { PrismaAdapter } from "@auth/prisma-adapter"
import { DeviceStatus } from "@prisma/client"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

import authConfig from "@/auth.config"
import { verifyPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials)
        if (!parsed.success) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        })
        if (!user?.passwordHash) {
          return null
        }

        const isValid = await verifyPassword(parsed.data.password, user.passwordHash)
        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      const existingDevices = await prisma.device.count({
        where: { userId: user.id },
      })

      if (existingDevices > 0) {
        return
      }

      await prisma.device.createMany({
        data: [
          {
            userId: user.id,
            name: "Living Room Blinds",
            status: DeviceStatus.CLOSED,
            angle: 0,
            lightLevel: 42,
          },
          {
            userId: user.id,
            name: "Bedroom Blinds",
            status: DeviceStatus.CLOSED,
            angle: 0,
            lightLevel: 57,
          },
        ],
        skipDuplicates: true,
      })
    },
  },
})
