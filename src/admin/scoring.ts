import { z } from "zod"

export const cerrarScoringRequestSchema = z.object({
  v5: z.number().int().min(0).max(15),
  v7: z.number().int().min(0).max(5),
  v2_override: z.object({
    nuevo_valor: z.number().int().min(0).max(20),
    justificacion: z.string().min(10).max(500),
  }).optional(),
})

export type CerrarScoringRequest = z.infer<typeof cerrarScoringRequestSchema>
