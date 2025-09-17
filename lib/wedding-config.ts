// Configuración central de la boda (compartida por server & client)
export const WEDDING_CONFIG = {
  couple: {
    bride: "Andrea",
    groom: "Marcos",
  },
  date: new Date("2026-03-07T12:00:00"),
  venue: {
    ceremony: {
      name: "Ermita de Santa Bárbara",
      time: "12:00",
      mapUrl: "https://maps.app.goo.gl/evABBZbHdBSCSKAu8",
    },
    reception: {
      name: "El Coso",
      time: "14:00",
      mapUrl: "https://maps.app.goo.gl/o8usYVgF1HyxHHk39",
    },
  },
  dressCode: "Elegante casual - Colores pastel bienvenidos",
}
