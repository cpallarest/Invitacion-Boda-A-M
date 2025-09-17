import { type NextRequest, NextResponse } from "next/server"
import webpush from "web-push"
import { PUSH_CONFIG, NOTIFICATION_TYPES } from "@/lib/push-config"

webpush.setVapidDetails(PUSH_CONFIG.subject, PUSH_CONFIG.vapidKeys.publicKey, PUSH_CONFIG.vapidKeys.privateKey)

export async function POST(request: NextRequest) {
  try {
    const { type, customMessage } = await request.json()

    // Obtener todas las suscripciones de la base de datos
    // En producción, esto vendría de Supabase:
    /*
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
    */

    // Por ahora usamos suscripciones de ejemplo
    const subscriptions = [] // Aquí irían las suscripciones reales

    const notification = customMessage || NOTIFICATION_TYPES[type as keyof typeof NOTIFICATION_TYPES]

    if (!notification) {
      return NextResponse.json({ success: false, error: "Tipo de notificación no válido" }, { status: 400 })
    }

    // Enviar notificación a todas las suscripciones
    const promises = subscriptions.map(async (subscription: any) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          JSON.stringify(notification),
        )
      } catch (error) {
        console.error("Error enviando notificación:", error)
      }
    })

    await Promise.all(promises)

    return NextResponse.json({
      success: true,
      message: `Notificación enviada a ${subscriptions.length} suscriptores`,
    })
  } catch (error) {
    console.error("Error al enviar notificaciones:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
