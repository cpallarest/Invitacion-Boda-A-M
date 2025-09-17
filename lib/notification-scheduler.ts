import { WEDDING_CONFIG } from "@/lib/wedding-config"

// Función para calcular las fechas de los recordatorios
export function getNotificationSchedule() {
  const weddingDate = WEDDING_CONFIG.date
  const ceremonyTime = new Date(weddingDate)
  ceremonyTime.setHours(12, 0, 0, 0) // 12:00 ceremonia

  const receptionTime = new Date(weddingDate)
  receptionTime.setHours(14, 0, 0, 0) // 14:00 recepción

  return {
    // 3 meses antes (90 días)
    threeMonthsBefore: new Date(weddingDate.getTime() - 90 * 24 * 60 * 60 * 1000),

    // 1 mes antes (30 días)
    oneMonthBefore: new Date(weddingDate.getTime() - 30 * 24 * 60 * 60 * 1000),

    // 1 semana antes (7 días)
    oneWeekBefore: new Date(weddingDate.getTime() - 7 * 24 * 60 * 60 * 1000),

    // 1 día antes
    oneDayBefore: new Date(weddingDate.getTime() - 24 * 60 * 60 * 1000),

    // 1 hora antes de la ceremonia
    oneHourBeforeCeremony: new Date(ceremonyTime.getTime() - 60 * 60 * 1000),

    // Cuando comience la recepción
    receptionTime: receptionTime,
  }
}

// Función para verificar qué notificaciones deben enviarse
export function getNotificationsToSend() {
  const now = new Date()
  const schedule = getNotificationSchedule()
  const notifications = []

  // Verificar cada tipo de recordatorio
  if (shouldSendNotification(now, schedule.threeMonthsBefore)) {
    notifications.push("REMINDER_3_MONTHS")
  }

  if (shouldSendNotification(now, schedule.oneMonthBefore)) {
    notifications.push("REMINDER_1_MONTH")
  }

  if (shouldSendNotification(now, schedule.oneWeekBefore)) {
    notifications.push("REMINDER_1_WEEK")
  }

  if (shouldSendNotification(now, schedule.oneDayBefore)) {
    notifications.push("REMINDER_1_DAY")
  }

  if (shouldSendNotification(now, schedule.oneHourBeforeCeremony)) {
    notifications.push("REMINDER_CEREMONY")
  }

  if (shouldSendNotification(now, schedule.receptionTime)) {
    notifications.push("REMINDER_RECEPTION")
  }

  return notifications
}

// Función auxiliar para verificar si debe enviarse una notificación
function shouldSendNotification(now: Date, scheduledTime: Date): boolean {
  const timeDiff = Math.abs(now.getTime() - scheduledTime.getTime())
  // Enviar si estamos dentro de una ventana de 30 minutos
  return timeDiff <= 30 * 60 * 1000
}
