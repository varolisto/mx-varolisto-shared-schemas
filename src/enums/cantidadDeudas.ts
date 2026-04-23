export const CANTIDAD_DEUDAS = ["sin_deudas", "una_deuda", "dos_deudas", "tres_o_mas"] as const
export type CantidadDeudas = typeof CANTIDAD_DEUDAS[number]
