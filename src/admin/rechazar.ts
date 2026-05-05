import { z } from 'zod'
import { NOTA_OPERADOR_MAX, NOTA_OPERADOR_MIN } from '../constants.js'
import { MOTIVO_RECHAZO } from '../enums/motivoRechazo.js'

export const rechazarRequestSchema = z.object({
  motivo: z.enum(MOTIVO_RECHAZO),
  nota_operador: z.string().min(NOTA_OPERADOR_MIN).max(NOTA_OPERADOR_MAX),
})

export type RechazarRequest = z.infer<typeof rechazarRequestSchema>
