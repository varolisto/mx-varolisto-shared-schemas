export const MOTIVO_RECHAZO = [
  "score_insuficiente",
  "cuota_ingreso_excesiva",
  "referencias_no_confirmadas",
  "inconsistencia_documental",
  "otro",
] as const

export type MotivoRechazo = typeof MOTIVO_RECHAZO[number]
