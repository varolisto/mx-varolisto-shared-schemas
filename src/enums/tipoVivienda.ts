export const TIPO_VIVIENDA = ['propia', 'rentada', 'de_familiar'] as const

export type TipoVivienda = (typeof TIPO_VIVIENDA)[number]
