export const TIPO_ACTIVIDAD = [
  "empleado_formal",
  "empleado_informal",
  "negocio_propio",
  "independiente",
  "otro",
] as const

export type TipoActividad = typeof TIPO_ACTIVIDAD[number]
