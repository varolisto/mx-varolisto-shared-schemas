export const ESTADO_SOLICITUD = [
  'recibida',
  'en_revision',
  'pendiente_info',
  'aprobada',
  'rechazada',
  'cancelada',
] as const

export type EstadoSolicitud = (typeof ESTADO_SOLICITUD)[number]
