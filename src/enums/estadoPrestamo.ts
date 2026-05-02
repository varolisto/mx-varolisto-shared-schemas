export const ESTADO_PRESTAMO = [
  'activo',
  'atrasado',
  'moratorio',
  'cartera_vencida',
  'liquidado',
  'reestructurado',
  'suspendido_causa_mayor',
  'cancelado_incobrable',
  'en_investigacion_fraude',
  'anulado_fraude',
  'fuerza_mayor_regional',
] as const

export type EstadoPrestamo = (typeof ESTADO_PRESTAMO)[number]
