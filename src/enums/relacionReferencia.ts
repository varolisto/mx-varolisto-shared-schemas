export const RELACION_REFERENCIA = ["familiar", "trabajo", "amigo", "otro"] as const
export type RelacionReferencia = typeof RELACION_REFERENCIA[number]
