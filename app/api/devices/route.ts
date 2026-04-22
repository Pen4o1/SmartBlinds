import { DeviceStatus } from "@prisma/client"

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
