/** @deprecated Sin uso interno. Se eliminará en el siguiente major. */
export const TIPO_AJUSTE = ['condonacion_parcial', 'reverso_pago', 'extension_plazo'] as const

/** @deprecated Sin uso interno. Se eliminará en el siguiente major. */
export type TipoAjuste = (typeof TIPO_AJUSTE)[number]
