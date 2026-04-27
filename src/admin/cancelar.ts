import { z } from "zod"
import { MOTIVO_CANCELACION } from "../enums/motivoCancelacion.js"

export const cancelarRequestSchema = z.object({
  motivo: z.enum(MOTIVO_CANCELACION),
  nota_operador: z.string().min(10).max(1000),
})

export type CancelarRequest = z.infer<typeof cancelarRequestSchema>
