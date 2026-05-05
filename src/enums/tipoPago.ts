/** @deprecated Sin uso interno. Se eliminará en el siguiente major. */
export const TIPO_PAGO = [
  'cuota_regular',
  'cuota_con_excedente',
  'pago_parcial',
  'abono_capital',
  'liquidacion_total',
] as const

/** @deprecated Sin uso interno. Se eliminará en el siguiente major. */
export type TipoPago = (typeof TIPO_PAGO)[number]
