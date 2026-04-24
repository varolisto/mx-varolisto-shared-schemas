export const PERFIL_RIESGO = ["A", "B", "C", "D"] as const

export type PerfilRiesgo = typeof PERFIL_RIESGO[number]
