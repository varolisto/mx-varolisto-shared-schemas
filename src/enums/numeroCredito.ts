/** @deprecated Sin uso interno. Se eliminará en el siguiente major. */
export const NUMERO_CREDITO = ['primer', 'segundo', 'tercero_mas'] as const

/** @deprecated Sin uso interno. Se eliminará en el siguiente major. */
export type NumeroCredito = (typeof NUMERO_CREDITO)[number]
