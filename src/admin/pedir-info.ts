import { z } from 'zod'

export const pedirInfoRequestSchema = z.object({
  mensaje_para_operador: z.string().min(10).max(1000),
})

export type PedirInfoRequest = z.infer<typeof pedirInfoRequestSchema>
