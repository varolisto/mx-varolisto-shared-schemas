export const NUMERO_CREDITO = ['primer', 'segundo', 'tercero_mas'] as const

export type NumeroCredito = (typeof NUMERO_CREDITO)[number]
