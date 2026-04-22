"use client"

import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

type DeviceStatus = "OPEN" | "CLOSED" | "AUTO"

type Device = {
  id: string
  name: string
  status: DeviceStatus
  angle: number
  lightLevel: number
}

function statusBadgeVariant(status: DeviceStatus) {
  if (status === "OPEN") return "secondary"
  if (status === "CLOSED") return "outline"
  return "default"
}

export function DeviceDashboard() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingIds, setSavingIds] = useState<Record<string, boolean>>({})

  const hasDevices = useMemo(() => devices.length > 0, [devices.length])

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/devices")
        if (!response.ok) {
          setError("Could not load devices. Please refresh.")
          setLoading(false)
          return
        }

        const data = (await response.json()) as { devices: Device[] }
        setDevices(data.devices)
        setLoading(false)
      } catch {
        setError("Could not load devices. Please check your connection.")
        setLoading(false)
      }
    }

    void run()
  }, [])

  async function updateDevice(id: string, payload: Partial<{ angle: number; status: DeviceStatus; auto: boolean }>) {
    setSavingIds((prev) => ({ ...prev, [id]: true }))

    try {
      const response = await fetch(`/api/devices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = (await response.json()) as { device: Device }
        setDevices((prev) => prev.map((device) => (device.id === id ? data.device : device)))
      } else {
        setError("Could not save device state.")
      }
    } catch {
      setError("Could not save device state.")
    }

    setSavingIds((prev) => ({ ...prev, [id]: false }))
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading your devices...</p>
  }

  if (!hasDevices) {
    return <p className="text-muted-foreground">No devices found for this account yet.</p>
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {devices.map((device) => {
        const isAuto = device.status === "AUTO"
        const isSaving = Boolean(savingIds[device.id])

        return (
          <Card key={device.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{device.name}</CardTitle>
                <Badge variant={statusBadgeVariant(device.status)}>{device.status}</Badge>
              </div>
              <CardDescription>
                Light level: {device.lightLevel}% | Angle: {device.angle}%
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Angle</p>
                <Slider
                  value={[device.angle]}
                  onValueChange={(value) => {
                    const angle = value[0] ?? 0
                    setDevices((prev) =>
                      prev.map((entry) => (entry.id === device.id ? { ...entry, angle } : entry))
                    )
                  }}
                  onValueCommit={(value) => {
                    const angle = value[0] ?? 0
                    void updateDevice(device.id, { angle })
                  }}
                  max={100}
                  step={1}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Auto mode</p>
                <Switch
                  checked={isAuto}
                  onCheckedChange={(checked) => {
                    setDevices((prev) =>
                      prev.map((entry) =>
                        entry.id === device.id
                          ? { ...entry, status: checked ? "AUTO" : "CLOSED" }
                          : entry
                      )
                    )
                    void updateDevice(device.id, { auto: checked })
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  disabled={isSaving}
                  onClick={() => {
                    setDevices((prev) =>
                      prev.map((entry) =>
                        entry.id === device.id ? { ...entry, status: "OPEN", angle: 100 } : entry
                      )
                    )
                    void updateDevice(device.id, { status: "OPEN", angle: 100 })
                  }}
                >
                  Open
                </Button>
                <Button
                  variant="outline"
                  disabled={isSaving}
                  onClick={() => {
                    setDevices((prev) =>
                      prev.map((entry) =>
                        entry.id === device.id ? { ...entry, status: "CLOSED", angle: 0 } : entry
                      )
                    )
                    void updateDevice(device.id, { status: "CLOSED", angle: 0 })
                  }}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        )
        })}
      </div>
    </div>
  )
}
