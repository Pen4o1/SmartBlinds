"use client"

import { useEffect, useMemo, useState } from "react"
import { Blinds, Lightbulb, SlidersHorizontal } from "lucide-react"

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

function formatStatus(status: DeviceStatus) {
  if (status === "AUTO") return "Auto"
  if (status === "OPEN") return "Open"
  return "Closed"
}

export function DeviceDashboard() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingIds, setSavingIds] = useState<Record<string, boolean>>({})
  const [newDeviceName, setNewDeviceName] = useState("")
  const [creating, setCreating] = useState(false)

  const hasDevices = useMemo(() => devices.length > 0, [devices.length])
  const autoDevices = useMemo(() => devices.filter((device) => device.status === "AUTO").length, [devices])
  const avgAngle = useMemo(() => {
    if (devices.length === 0) return 0
    return Math.round(devices.reduce((sum, device) => sum + device.angle, 0) / devices.length)
  }, [devices])
  const avgLightLevel = useMemo(() => {
    if (devices.length === 0) return 0
    return Math.round(devices.reduce((sum, device) => sum + device.lightLevel, 0) / devices.length)
  }, [devices])

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

  async function updateDevice(
    id: string,
    payload: Partial<{
      angle: number
      status: DeviceStatus
      auto: boolean
      lightLevel: number
      name: string
    }>
  ) {
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

  async function createDevice() {
    const name = newDeviceName.trim()
    if (!name) return

    setCreating(true)
    setError(null)
    try {
      const response = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        setError("Could not create device. Name may already exist.")
        setCreating(false)
        return
      }

      const data = (await response.json()) as { device: Device }
      setDevices((prev) => [...prev, data.device])
      setNewDeviceName("")
    } catch {
      setError("Could not create device.")
    }
    setCreating(false)
  }

  async function deleteDevice(id: string) {
    setSavingIds((prev) => ({ ...prev, [id]: true }))
    try {
      const response = await fetch(`/api/devices/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        setError("Could not delete device.")
      } else {
        setDevices((prev) => prev.filter((device) => device.id !== id))
      }
    } catch {
      setError("Could not delete device.")
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
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="gap-2 py-4">
          <CardContent className="flex items-center justify-between px-4">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Devices</p>
              <p className="text-2xl font-semibold">{devices.length}</p>
            </div>
            <Blinds className="text-primary h-5 w-5" />
          </CardContent>
        </Card>
        <Card className="gap-2 py-4">
          <CardContent className="flex items-center justify-between px-4">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Auto Mode</p>
              <p className="text-2xl font-semibold">{autoDevices}</p>
            </div>
            <SlidersHorizontal className="text-primary h-5 w-5" />
          </CardContent>
        </Card>
        <Card className="gap-2 py-4">
          <CardContent className="flex items-center justify-between px-4">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Avg Light</p>
              <p className="text-2xl font-semibold">{avgLightLevel}%</p>
            </div>
            <Lightbulb className="text-primary h-5 w-5" />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row">
        <input
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="New device name (e.g. Kitchen Blinds)"
          value={newDeviceName}
          onChange={(event) => setNewDeviceName(event.target.value)}
        />
        <Button disabled={creating || !newDeviceName.trim()} onClick={() => void createDevice()}>
          {creating ? "Creating..." : "Create Device"}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {devices.map((device) => {
          const isAuto = device.status === "AUTO"
          const isSaving = Boolean(savingIds[device.id])

          return (
            <Card key={device.id} className="overflow-hidden border-primary/10">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{device.name}</CardTitle>
                  <Badge variant={statusBadgeVariant(device.status)}>{formatStatus(device.status)}</Badge>
                </div>
                <CardDescription>
                  Light level: {device.lightLevel}% | Angle: {device.angle}% | Avg angle: {avgAngle}%
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Device name</p>
                  <input
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={device.name}
                    onChange={(event) => {
                      const name = event.target.value
                      setDevices((prev) =>
                        prev.map((entry) => (entry.id === device.id ? { ...entry, name } : entry))
                      )
                    }}
                    onBlur={() => void updateDevice(device.id, { name: device.name })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Angle</p>
                    <p className="text-muted-foreground text-xs">{device.angle}%</p>
                  </div>
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

                <div className="flex items-center justify-between rounded-md border p-2">
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Light level</p>
                    <p className="text-muted-foreground text-xs">{device.lightLevel}%</p>
                  </div>
                  <Slider
                    value={[device.lightLevel]}
                    onValueChange={(value) => {
                      const lightLevel = value[0] ?? 0
                      setDevices((prev) =>
                        prev.map((entry) => (entry.id === device.id ? { ...entry, lightLevel } : entry))
                      )
                    }}
                    onValueCommit={(value) => {
                      const lightLevel = value[0] ?? 0
                      void updateDevice(device.id, { lightLevel })
                    }}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
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
                  <Button variant="destructive" disabled={isSaving} onClick={() => void deleteDevice(device.id)}>
                    Delete
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
