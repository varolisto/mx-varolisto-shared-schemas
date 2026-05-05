import { z } from 'zod'
import { NOTA_OPERADOR_MAX, NOTA_OPERADOR_MIN } from '../constants.js'

export const pedirInfoRequestSchema = z.object({
  mensaje_para_operador: z.string().min(NOTA_OPERADOR_MIN).max(NOTA_OPERADOR_MAX),
})

export type PedirInfoRequest = z.infer<typeof pedirInfoRequestSchema>
