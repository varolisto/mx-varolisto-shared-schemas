import { z } from "zod"
import { PERFIL_RIESGO } from "../enums/perfilRiesgo.js"

/**
 * Variables automatizables al crear la solicitud: V2, V3, V4, V6, V8.
 * Las demás (V1, V5, V7) quedan en 0 hasta que el operador complete la revisión.
 */
export const scoringDomainSchema = z.object({
  v1Historial: z.number().int().min(0).max(25),
  v2CalidadIngreso: z.number().int().min(0).max(20),
  v3CuotaIngreso: z.number().int().min(0).max(15),
  v4DeudasActivas: z.number().int().min(0).max(15),
  v5GarantiaSocial: z.number().int().min(0).max(15),
  v6Antiguedad: z.number().int().min(0).max(10),
  v7Comportamiento: z.number().int().min(0).max(5),
  v8Motivo: z.number().int().min(0).max(5),
  total: z.number().int().min(0).max(100),
  perfil: z.enum(PERFIL_RIESGO).nullable(),
  calculadoAt: z.coerce.date().nullable().optional(),
})

export type ScoringDomain = z.infer<typeof scoringDomainSchema>
