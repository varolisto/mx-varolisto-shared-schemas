export const CONCEPTO_CONDONABLE = ["moratorios", "interes_ordinario"] as const

export type ConceptoCondonable = typeof CONCEPTO_CONDONABLE[number]
