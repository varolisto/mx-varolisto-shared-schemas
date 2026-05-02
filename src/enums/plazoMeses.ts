export const PLAZO_MESES = ['2', '3', '4', '5', '6'] as const
export type PlazoMeses = (typeof PLAZO_MESES)[number]
