// TODO: definir tipos de pago (transferencia, efectivo, etc.)
export const TIPO_PAGO = [] as const

export type TipoPago = typeof TIPO_PAGO[number]
