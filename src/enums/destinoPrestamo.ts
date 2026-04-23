export const DESTINO_PRESTAMO = [
  "liquidar_deuda",
  "capital_trabajo",
  "gasto_medico",
  "equipo_trabajo",
  "mejora_hogar",
  "educacion",
  "gasto_familiar",
  "viaje_evento",
  "otro",
] as const

export type DestinoPrestamo = typeof DESTINO_PRESTAMO[number]
