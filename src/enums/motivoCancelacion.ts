export const MOTIVO_CANCELACION = [
  'cliente_no_acepto_terminos',
  'cliente_no_responde',
  'cliente_solicito_otro_producto',
  'decision_operativa',
] as const

export type MotivoCancelacion = (typeof MOTIVO_CANCELACION)[number]
