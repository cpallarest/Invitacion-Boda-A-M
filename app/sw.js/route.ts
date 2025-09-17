import type { NextRequest } from "next/server"

/**
 * Route Handler que sirve el Service Worker con el MIME Type adecuado.
 * Se mostrará en la URL  /sw.js
 */
export function GET(_req: NextRequest) {
  // --- código del Service Worker ---
  const swCode = `
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nueva notificación de la boda",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [100,50,100],
    data: { dateOfArrival: Date.now(), primaryKey: 1 },
    actions: [
      { action: "explore", title: "Ver detalles", icon: "/icon-192x192.png" },
      { action: "close",   title: "Cerrar",       icon: "/icon-192x192.png" }
    ]
  };
  event.waitUntil(self.registration.showNotification("Recordatorio de Boda", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
`

  return new Response(swCode, {
    status: 200,
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      // Desactiva el cacheo agresivo para recibir siempre la última versión.
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
