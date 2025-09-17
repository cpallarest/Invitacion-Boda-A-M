import { type NextRequest, NextResponse } from "next/server"
import webpush from "web-push"
import { PUSH_CONFIG } from "@/lib/push-config"

// Configurar web-push con tus claves VAPID
webpush.setVapidDetails(PUSH_CONFIG.subject, PUSH_CONFIG.vapidKeys.publicKey, PUSH_CONFIG.vapidKeys.privateKey)

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json()

    // Aquí guardarías la suscripción en tu base de datos (Supabase)
    // Por ahora solo la logueamos
    console.log("Nueva suscripción:", subscription)

    // En producción, guardar en Supabase:
    /*
    const { data, error } = await supabase
      .from('push_subscriptions')
      .insert([
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        }
      ])
    */

    return NextResponse.json({
      success: true,
      message: "Suscripción guardada correctamente",
    })
  } catch (error) {
    console.error("Error al guardar suscripción:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
