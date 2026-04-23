export const MONTO_TOTAL_DEUDAS = ["menos_5k", "5k_15k", "15k_30k", "mas_30k"] as const
export type MontoTotalDeudas = typeof MONTO_TOTAL_DEUDAS[number]
