import { DeviceStatus } from "@prisma/client"
import { z } from "zod"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const updateDeviceSchema = z
  .object({
    angle: z.number().int().min(0).max(100).optional(),
    lightLevel: z.number().int().min(0).max(100).optional(),
    name: z.string().trim().min(1).max(120).optional(),
    status: z.nativeEnum(DeviceStatus).optional(),
    auto: z.boolean().optional(),
  })
  .refine(
    (value) =>
      value.angle !== undefined ||
      value.status !== undefined ||
      value.auto !== undefined ||
      value.lightLevel !== undefined ||
      value.name !== undefined,
    {
      message: "At least one device field must be provided",
    }
  )

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const json = await request.json()
    const parsed = updateDeviceSchema.safeParse(json)

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().formErrors[0] ?? "Invalid payload" },
        { status: 400 }
      )
    }

    const existing = await prisma.device.findFirst({
      where: { id, userId },
    })

    if (!existing) {
      return Response.json({ error: "Device not found" }, { status: 404 })
    }

    const { angle, status, auto, lightLevel, name } = parsed.data

    const nextStatus =
      auto === true
        ? DeviceStatus.AUTO
        : auto === false
          ? status ?? (existing.status === DeviceStatus.AUTO ? DeviceStatus.CLOSED : existing.status)
          : status ?? existing.status

    const nextAngle = angle ?? existing.angle
    const autoLightLevel =
      nextStatus === DeviceStatus.AUTO
        ? Math.min(100, Math.max(0, 20 + Math.floor(Math.random() * 70)))
        : existing.lightLevel
    const nextLightLevel = lightLevel ?? autoLightLevel

    const updated = await prisma.device.update({
      where: { id: existing.id },
      data: {
        name: name ?? existing.name,
        angle: nextAngle,
        status: nextStatus,
        lightLevel: nextLightLevel,
      },
    })

    return Response.json({ device: updated })
  } catch (error) {
    console.error("Updating device failed", error)
    return Response.json({ error: "Could not update device" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await prisma.device.findFirst({
      where: { id, userId },
    })

    if (!existing) {
      return Response.json({ error: "Device not found" }, { status: 404 })
    }

    await prisma.device.delete({
      where: { id: existing.id },
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Deleting device failed", error)
    return Response.json({ error: "Could not delete device" }, { status: 500 })
  }
}
