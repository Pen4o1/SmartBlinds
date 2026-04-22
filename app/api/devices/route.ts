import { DeviceStatus } from "@prisma/client"
import { z } from "zod"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

function getSeededDevices(userId: string) {
  return [
    {
      userId,
      name: "Living Room Blinds",
      status: DeviceStatus.CLOSED,
      angle: 0,
      lightLevel: 45,
    },
    {
      userId,
      name: "Bedroom Blinds",
      status: DeviceStatus.CLOSED,
      angle: 0,
      lightLevel: 60,
    },
  ]
}

const createDeviceSchema = z.object({
  name: z.string().trim().min(1).max(120),
})

export async function GET() {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    let devices = await prisma.device.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    })

    if (devices.length === 0) {
      await prisma.device.createMany({
        data: getSeededDevices(userId),
        skipDuplicates: true,
      })

      devices = await prisma.device.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
      })
    }

    return Response.json({ devices })
  } catch (error) {
    console.error("Fetching devices failed", error)
    return Response.json({ error: "Could not load devices" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await request.json()
    const parsed = createDeviceSchema.safeParse(json)

    if (!parsed.success) {
      return Response.json({ error: "Invalid device name" }, { status: 400 })
    }

    const created = await prisma.device.create({
      data: {
        userId,
        name: parsed.data.name,
        status: DeviceStatus.CLOSED,
        angle: 0,
        lightLevel: 50,
      },
    })

    return Response.json({ device: created }, { status: 201 })
  } catch (error) {
    console.error("Creating device failed", error)
    return Response.json({ error: "Could not create device" }, { status: 500 })
  }
}
