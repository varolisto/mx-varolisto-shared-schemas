export const ESTADO_CIVIL = ["soltero", "casado", "union_libre", "divorciado", "viudo"] as const

export type EstadoCivil = typeof ESTADO_CIVIL[number]
