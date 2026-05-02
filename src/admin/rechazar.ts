import { z } from 'zod'
import { MOTIVO_RECHAZO } from '../enums/motivoRechazo.js'

export const rechazarRequestSchema = z.object({
  motivo: z.enum(MOTIVO_RECHAZO),
  nota_operador: z.string().min(10).max(1000),
})

export type RechazarRequest = z.infer<typeof rechazarRequestSchema>
