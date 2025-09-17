// Configuración de Push Notifications
export const PUSH_CONFIG = {
  // Estas claves las obtienes de web-push o Firebase
  vapidKeys: {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "YOUR_VAPID_PUBLIC_KEY",
    privateKey: process.env.VAPID_PRIVATE_KEY || "YOUR_VAPID_PRIVATE_KEY",
  },
  // Email para contacto (requerido por VAPID)
  subject: "mailto:your-email@example.com",
}

// Tipos de notificaciones predefinidas
export const NOTIFICATION_TYPES = {
  REMINDER_3_MONTHS: {
    title: "¡Solo 3 meses para la boda! 💕",
    body: "Andrea y Marcos se casan en 3 meses. ¡Empieza a planificar tu asistencia!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: "wedding-reminder-3months",
  },
  REMINDER_1_MONTH: {
    title: "¡Un mes para la boda! 🌸",
    body: "La boda de Andrea y Marcos es en un mes. ¿Ya confirmaste tu asistencia?",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: "wedding-reminder-1month",
  },
  REMINDER_1_WEEK: {
    title: "¡Una semana para la boda! 💒",
    body: "Andrea y Marcos se casan en 7 días. ¿Ya tienes todo listo?",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: "wedding-reminder-1week",
  },
  REMINDER_1_DAY: {
    title: "¡Mañana es el gran día! 🎉",
    body: "La boda de Andrea y Marcos es mañana. ¡No olvides confirmar tu asistencia!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: "wedding-reminder-1day",
  },
  REMINDER_CEREMONY: {
    title: "La ceremonia comienza pronto ⛪",
    body: "La ceremonia en la Ermita de Santa Bárbara comienza en 1 hora",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: "ceremony-reminder",
  },
  REMINDER_RECEPTION: {
    title: "¡Hora de la fiesta! 🍾",
    body: "El banquete en El Coso está por comenzar",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: "reception-reminder",
  },
}
