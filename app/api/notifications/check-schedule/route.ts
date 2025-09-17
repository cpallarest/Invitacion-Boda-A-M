import { type NextRequest, NextResponse } from "next/server"
import webpush from "web-push"
import { PUSH_CONFIG, NOTIFICATION_TYPES } from "@/lib/push-config"
import { getNotificationsToSend } from "@/lib/notification-scheduler"

webpush.setVapidDetails(PUSH_CONFIG.subject, PUSH_CONFIG.vapidKeys.publicKey, PUSH_CONFIG.vapidKeys.privateKey)

export async function GET(request: NextRequest) {
  try {
    // Verificar autorización (opcional - para seguridad)
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Obtener notificaciones que deben enviarse
    const notificationsToSend = getNotificationsToSend()

    if (notificationsToSend.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No hay notificaciones programadas para este momento",
      })
    }

    // Obtener todas las suscripciones de la base de datos
    // En producción, esto vendría de Supabase:
    /*
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
    */

    // Por ahora usamos un array vacío (reemplazar con datos reales)
    const subscriptions: any[] = []

    let totalSent = 0

    // Enviar cada tipo de notificación
    for (const notificationType of notificationsToSend) {
      const notification = NOTIFICATION_TYPES[notificationType as keyof typeof NOTIFICATION_TYPES]

      if (!notification) continue

      // Enviar a todas las suscripciones
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
          totalSent++
        } catch (error) {
          console.error("Error enviando notificación:", error)
          // Opcional: marcar suscripción como inválida si falla
        }
      })

      await Promise.all(promises)
    }

    return NextResponse.json({
      success: true,
      message: `Enviadas ${notificationsToSend.length} tipos de notificaciones a ${subscriptions.length} suscriptores`,
      notificationTypes: notificationsToSend,
      totalSent,
    })
  } catch (error) {
    console.error("Error en verificación de horarios:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
      },
      { status: 500 },
    )
  }
}
