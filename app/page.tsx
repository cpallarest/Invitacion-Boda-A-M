"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, Camera, MessageCircle, Bell, Church, Wine } from "lucide-react"
import { WEDDING_CONFIG } from "@/lib/wedding-config"

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = WEDDING_CONFIG.date.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center max-w-md mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-green-100 transition-all duration-300 hover:shadow-md"
        >
          <div className="text-3xl md:text-4xl font-light text-gray-600">{value}</div>
          <div className="text-sm text-gray-400 capitalize font-light">{unit}</div>
        </div>
      ))}
    </div>
  )
}

function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: null as boolean | null,
    hasCompanion: null as boolean | null,
    companionName: "",
    companionAllergies: "",
    allergies: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se conectaría con Supabase
    console.log(formData)
    setSubmitted(true)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-green-50 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-amber-200 rounded-full opacity-60"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-2xl font-light mb-4 text-gray-700">¡Gracias por confirmar!</h3>
          <p className="text-gray-500 font-light">
            Nos emociona saber que estarás con nosotros en nuestro día especial.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-50 shadow-sm">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full opacity-60"></div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
          </div>
          <h3 className="text-2xl font-light text-gray-700">Confirma tu asistencia</h3>
          <p className="text-gray-500 font-light mt-2">Por favor, completa este formulario antes del 15 de febrero</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Nombre completo"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              required
              className="border-green-100 focus:border-green-300"
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
              className="border-green-100 focus:border-green-300"
            />
          </div>

          <Input
            type="tel"
            placeholder="Teléfono (opcional)"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className="border-green-100 focus:border-green-300"
          />

          <div className="space-y-3">
            <p className="text-sm font-light text-gray-600">¿Podrás acompañarnos?</p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={formData.attending === true ? "default" : "outline"}
                onClick={() => updateFormData("attending", true)}
                className="flex-1 font-light"
              >
                ¡Sí, estaré ahí!
              </Button>
              <Button
                type="button"
                variant={formData.attending === false ? "default" : "outline"}
                onClick={() => updateFormData("attending", false)}
                className="flex-1 font-light"
              >
                No podré asistir
              </Button>
            </div>
          </div>

          {formData.attending === true && (
            <>
              <div className="space-y-3">
                <p className="text-sm font-light text-gray-600">¿Vienes acompañado/a?</p>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={formData.hasCompanion === true ? "default" : "outline"}
                    onClick={() => updateFormData("hasCompanion", true)}
                    className="flex-1 font-light"
                  >
                    Sí
                  </Button>
                  <Button
                    type="button"
                    variant={formData.hasCompanion === false ? "default" : "outline"}
                    onClick={() => updateFormData("hasCompanion", false)}
                    className="flex-1 font-light"
                  >
                    No
                  </Button>
                </div>
              </div>

              {formData.hasCompanion === true && (
                <>
                  <div>
                    <label className="text-sm font-light text-gray-600">Nombre de tu acompañante</label>
                    <Input
                      placeholder="Nombre completo del acompañante"
                      value={formData.companionName}
                      onChange={(e) => updateFormData("companionName", e.target.value)}
                      required
                      className="border-green-100 focus:border-green-300 mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-light text-gray-600">Alergias o intolerancias del acompañante</label>
                    <Textarea
                      placeholder="Especifica alergias o intolerancias alimentarias del acompañante..."
                      value={formData.companionAllergies}
                      onChange={(e) => updateFormData("companionAllergies", e.target.value)}
                      rows={2}
                      className="border-green-100 focus:border-green-300 mt-1"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-sm font-light text-gray-600">Tus alergias o intolerancias</label>
                <Textarea
                  placeholder="Especifica tus alergias o intolerancias alimentarias..."
                  value={formData.allergies}
                  onChange={(e) => updateFormData("allergies", e.target.value)}
                  rows={2}
                  className="border-green-100 focus:border-green-300 mt-1"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm font-light text-gray-600">Mensaje para los novios (opcional)</label>
            <Textarea
              placeholder="Comparte tus buenos deseos..."
              value={formData.message}
              onChange={(e) => updateFormData("message", e.target.value)}
              rows={3}
              className="border-green-100 focus:border-green-300 mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-light bg-gradient-to-r from-green-400 to-amber-400 hover:from-green-500 hover:to-amber-500"
            disabled={
              !formData.name ||
              !formData.email ||
              formData.attending === null ||
              (formData.attending && formData.hasCompanion === null) ||
              (formData.hasCompanion && !formData.companionName)
            }
          >
            Confirmar asistencia
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function PhotoGallery() {
  const [photos, setPhotos] = useState<string[]>([])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPhotos((prev) => [...prev, result])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-50 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Galería de momentos</h3>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Sube tus fotos del gran día</p>
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function MessagesSection() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ name: string; message: string }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages((prev) => [...prev, { name: "Invitado", message }])
      setMessage("")
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-50 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Mensajes para los novios</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Textarea
            placeholder="Escribe un mensaje especial para Andrea y Marcos..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
          <Button type="submit" className="w-full">
            Enviar mensaje
          </Button>
        </form>

        {messages.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Mensajes recibidos:</h4>
            {messages.map((msg, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 italic">"{msg.message}"</p>
                <p className="text-xs text-gray-500 mt-1">- {msg.name}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function NotificationManager() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Verificar si ya está suscrito
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          setIsSubscribed(!!subscription)
        })
      })
    }
  }, [])

  const handleSubscribe = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      alert("Tu navegador no soporta notificaciones push")
      return
    }

    setIsLoading(true)

    try {
      // Registrar service worker
      const registration = await navigator.serviceWorker.register("/sw.js")

      // Solicitar permiso para notificaciones
      const permission = await Notification.requestPermission()

      if (permission !== "granted") {
        alert("Necesitas permitir las notificaciones para recibir recordatorios")
        return
      }

      // Crear suscripción
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      })

      // Enviar suscripción al servidor
      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubscribed(true)
        alert("¡Recordatorios activados! Recibirás notificaciones importantes sobre la boda.")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error al suscribirse:", error)
      alert("Error al activar recordatorios. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        await subscription.unsubscribe()
        setIsSubscribed(false)
        alert("Recordatorios desactivados")
      }
    } catch (error) {
      console.error("Error al desuscribirse:", error)
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-50 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Recordatorios de Boda</h3>
        </div>

        {!isSubscribed ? (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Recibe recordatorios importantes:</p>
            <ul className="text-xs text-gray-500 mb-6 space-y-1">
              <li>• Tres meses antes de la boda</li>
              <li>• Un mes antes de la boda</li>
              <li>• Una semana antes de la boda</li>
              <li>• El día anterior</li>
              <li>• 1 hora antes de la ceremonia</li>
              <li>• Cuando comience la recepción</li>
            </ul>
            <Button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-400 to-amber-400 hover:from-green-500 hover:to-amber-500"
            >
              {isLoading ? "Activando..." : "Activar recordatorios"}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-green-600 mb-4">✓ Recordatorios activados</p>
            <Button onClick={handleUnsubscribe} variant="outline" size="sm">
              Desactivar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function WeddingInvitation() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)

  useEffect(() => {
    // Abrir el sobre después de 3 segundos
    const timer = setTimeout(() => {
      setEnvelopeOpened(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!envelopeOpened) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-green-50 flex items-center justify-center overflow-hidden">
        {/* Envelope Animation */}
        <div className="relative">
          {/* Envelope Back */}
          <div className="w-72 h-48 sm:w-80 sm:h-56 bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg shadow-2xl transform perspective-1000 animate-pulse">
            {/* Envelope Flap */}
            <div
              className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-green-200 to-amber-200 origin-top transform transition-transform duration-2000 ease-out animate-[flip_2s_ease-out_1.5s_forwards] rounded-t-lg"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Wax Seal */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-rose-300 to-amber-300 rounded-full shadow-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Invitation Card */}
            <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-inner opacity-0 animate-[fadeIn_1s_ease-out_2.5s_forwards] flex flex-col items-center justify-center p-6">
              <div className="w-8 h-8 mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-amber-200 rounded-full opacity-60"></div>
                <div className="absolute inset-1 bg-white rounded-full"></div>
              </div>
              <h1 className="text-xl sm:text-2xl font-light text-gray-700 mb-2">Andrea & Marcos</h1>
              <p className="text-xs sm:text-sm text-gray-500 text-center">Te invitamos a celebrar nuestro amor</p>
              <div className="mt-4 text-xs text-gray-400">7 de marzo, 2026</div>
            </div>
          </div>

          {/* Sparkles */}
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-amber-300 rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-6 w-1 h-1 bg-rose-300 rounded-full animate-ping animation-delay-300"></div>
          <div className="absolute -bottom-4 -right-2 w-2 h-2 bg-green-300 rounded-full animate-ping animation-delay-500"></div>
          <div className="absolute -bottom-2 -left-6 w-1 h-1 bg-amber-300 rounded-full animate-ping animation-delay-700"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-25 via-amber-25 to-rose-25 animate-[fadeIn_1s_ease-out]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-amber-50 to-rose-50">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-12">
            {/* Thai-inspired lotus-like decoration */}
            <div className="w-20 h-20 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-amber-200 rounded-full opacity-60"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-rose-200 to-amber-100 rounded-full opacity-80"></div>
              <div className="absolute inset-4 bg-white rounded-full shadow-sm"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-gray-700 mb-6 tracking-wide">
              {WEDDING_CONFIG.couple.bride} & {WEDDING_CONFIG.couple.groom}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light">Celebramos nuestro amor contigo</p>
          </div>

          <CountdownTimer />

          <div className="mt-12 text-gray-500 font-light">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-1 h-1 bg-green-300 rounded-full"></div>
              <span className="text-lg">
                {WEDDING_CONFIG.date.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="w-1 h-1 bg-green-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Timeline */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-16 text-gray-700">Línea de tiempo del día</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-200 via-amber-200 to-rose-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {/* Ceremony */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <Card className="bg-white/90 backdrop-blur-sm border-green-100 shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-end gap-3 mb-4">
                        <h3 className="text-xl font-light text-gray-700">Ceremonia Religiosa</h3>
                        <Church className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-sm text-gray-500 font-light mb-4 text-right">
                        Nos uniremos en matrimonio en una ceremonia íntima y especial
                      </p>
                      <div className="space-y-2 text-gray-600 text-sm">
                        <p className="flex items-center justify-end gap-2">
                          <span>{WEDDING_CONFIG.venue.ceremony.time}</span>
                          <Clock className="w-4 h-4 text-green-400" />
                        </p>
                        <p className="flex items-center justify-end gap-2">
                          <span>{WEDDING_CONFIG.venue.ceremony.name}</span>
                          <MapPin className="w-4 h-4 text-green-400" />
                        </p>
                        <Button variant="outline" size="sm" asChild className="mt-3 bg-transparent">
                          <a href={WEDDING_CONFIG.venue.ceremony.mapUrl} target="_blank" rel="noopener noreferrer">
                            Ver en mapa
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-300 rounded-full border-4 border-white shadow-sm"></div>

                <div className="flex-1 pl-8"></div>
              </div>

              {/* Travel time */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-200 rounded-full border-2 border-white"></div>

                <div className="flex-1 pl-8">
                  <div className="bg-amber-50/80 backdrop-blur-sm rounded-lg p-4 border border-amber-100">
                    <p className="text-sm text-gray-600 font-light text-center">⏱️ Tiempo libre para traslado y fotos</p>
                  </div>
                </div>
              </div>

              {/* Reception */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <Card className="bg-white/90 backdrop-blur-sm border-amber-100 shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-end gap-3 mb-4">
                        <h3 className="text-xl font-light text-gray-700">Banquete y Fiesta</h3>
                        <Wine className="w-5 h-5 text-amber-400" />
                      </div>
                      <p className="text-sm text-gray-500 font-light mb-4 text-right">
                        Continuaremos la celebración con una comida especial y baile
                      </p>
                      <div className="space-y-2 text-gray-600 text-sm">
                        <p className="flex items-center justify-end gap-2">
                          <span>{WEDDING_CONFIG.venue.reception.time}</span>
                          <Clock className="w-4 h-4 text-amber-400" />
                        </p>
                        <p className="flex items-center justify-end gap-2">
                          <span>{WEDDING_CONFIG.venue.reception.name}</span>
                          <MapPin className="w-4 h-4 text-amber-400" />
                        </p>
                        <Button variant="outline" size="sm" asChild className="mt-3 bg-transparent">
                          <a href={WEDDING_CONFIG.venue.reception.mapUrl} target="_blank" rel="noopener noreferrer">
                            Ver en mapa
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-300 rounded-full border-4 border-white shadow-sm"></div>

                <div className="flex-1 pl-8"></div>
              </div>

              {/* Party continues */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-rose-200 rounded-full border-2 border-white"></div>

                <div className="flex-1 pl-8">
                  <div className="bg-rose-50/80 backdrop-blur-sm rounded-lg p-4 border border-rose-100">
                    <p className="text-sm text-gray-600 font-light text-center">
                      🎉 ¡La fiesta continúa hasta altas horas!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-green-50 shadow-sm mt-16">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-light mb-3 text-gray-700">Dress Code</h3>
              <Badge variant="secondary" className="text-lg px-4 py-2 font-light">
                {WEDDING_CONFIG.dressCode}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* RSVP Section */}
      <div className="mb-8 sm:mb-12 px-4">
        <RSVPForm />
      </div>

      {/* Interactive Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 px-4">
        <PhotoGallery />
        <MessagesSection />
      </div>

      {/* Notifications */}
      <NotificationManager />
    </div>
  )
}
