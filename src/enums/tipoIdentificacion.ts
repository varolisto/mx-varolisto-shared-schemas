export const TIPO_IDENTIFICACION = ['ine', 'pasaporte'] as const

export type TipoIdentificacion = (typeof TIPO_IDENTIFICACION)[number]
