import { z } from 'zod'
import { NOTA_OPERADOR_MAX, NOTA_OPERADOR_MIN } from '../constants.js'
import { MOTIVO_CANCELACION } from '../enums/motivoCancelacion.js'

export const cancelarRequestSchema = z.object({
  motivo: z.enum(MOTIVO_CANCELACION),
  nota_operador: z.string().min(NOTA_OPERADOR_MIN).max(NOTA_OPERADOR_MAX),
})

export type CancelarRequest = z.infer<typeof cancelarRequestSchema>
