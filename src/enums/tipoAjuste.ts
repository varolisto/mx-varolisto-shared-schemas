export const TIPO_AJUSTE = [
  "condonacion_parcial",
  "reverso_pago",
  "extension_plazo",
] as const

export type TipoAjuste = typeof TIPO_AJUSTE[number]
