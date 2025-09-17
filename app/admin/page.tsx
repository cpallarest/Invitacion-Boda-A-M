"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NOTIFICATION_TYPES } from "@/lib/push-config"
import { getNotificationSchedule } from "@/lib/notification-scheduler"

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [customTitle, setCustomTitle] = useState("")
  const [customBody, setCustomBody] = useState("")
  const [schedule, setSchedule] = useState<any>(null)

  useEffect(() => {
    setSchedule(getNotificationSchedule())
  }, [])

  const sendNotification = async (type?: string) => {
    setIsLoading(true)

    try {
      const payload = type
        ? { type }
        : {
            customMessage: {
              title: customTitle,
              body: customBody,
              icon: "/icon-192x192.png",
              badge: "/icon-192x192.png",
            },
          }

      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        alert("Notificación enviada correctamente")
        setCustomTitle("")
        setCustomBody("")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al enviar notificación")
    } finally {
      setIsLoading(false)
    }
  }

  const checkScheduledNotifications = async () => {
    try {
      const response = await fetch("/api/notifications/check-schedule", {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || "test"}`,
        },
      })
      const result = await response.json()
      alert(result.message)
    } catch (error) {
      console.error("Error:", error)
      alert("Error al verificar notificaciones programadas")
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (date: Date) => {
    const now = new Date()
    if (date < now) {
      return <Badge variant="secondary">Pasado</Badge>
    } else if (date.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
      return <Badge variant="destructive">Próximo</Badge>
    } else {
      return <Badge variant="outline">Programado</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light text-center mb-8 text-gray-700">Panel de Administración - Notificaciones</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cronograma de recordatorios */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Cronograma de Recordatorios
                <Button onClick={checkScheduledNotifications} size="sm" variant="outline">
                  Verificar Ahora
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schedule && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">3 meses antes</h4>
                      <p className="text-sm text-gray-600">{formatDate(schedule.threeMonthsBefore)}</p>
                    </div>
                    {getStatusBadge(schedule.threeMonthsBefore)}
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">1 mes antes</h4>
                      <p className="text-sm text-gray-600">{formatDate(schedule.oneMonthBefore)}</p>
                    </div>
                    {getStatusBadge(schedule.oneMonthBefore)}
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">1 semana antes</h4>
                      <p className="text-sm text-gray-600">{formatDate(schedule.oneWeekBefore)}</p>
                    </div>
                    {getStatusBadge(schedule.oneWeekBefore)}
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">1 día antes</h4>
                      <p className="text-sm text-gray-600">{formatDate(schedule.oneDayBefore)}</p>
                    </div>
                    {getStatusBadge(schedule.oneDayBefore)}
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">1 hora antes de ceremonia</h4>
                      <p className="text-sm text-gray-600">{formatDate(schedule.oneHourBeforeCeremony)}</p>
                    </div>
                    {getStatusBadge(schedule.oneHourBeforeCeremony)}
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Inicio de recepción</h4>
                      <p className="text-sm text-gray-600">{formatDate(schedule.receptionTime)}</p>
                    </div>
                    {getStatusBadge(schedule.receptionTime)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Notificaciones predefinidas */}
            <Card>
              <CardHeader>
                <CardTitle>Envío Manual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(NOTIFICATION_TYPES).map(([key, notification]) => (
                  <div key={key} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{notification.body}</p>
                    <Button size="sm" onClick={() => sendNotification(key)} disabled={isLoading}>
                      Enviar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notificación personalizada */}
            <Card>
              <CardHeader>
                <CardTitle>Notificación Personalizada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Título de la notificación"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Mensaje de la notificación"
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  rows={3}
                />
                <Button
                  onClick={() => sendNotification()}
                  disabled={isLoading || !customTitle || !customBody}
                  className="w-full"
                >
                  Enviar Personalizada
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
