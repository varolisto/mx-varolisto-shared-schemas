import { z } from 'zod'

export const emitirPropuestaRequestSchema = z.object({}).strict()

export type EmitirPropuestaRequest = z.infer<typeof emitirPropuestaRequestSchema>

export const emitirPropuestaResponseSchema = z.object({
  archivo_id: z.string().uuid(),
  url_descarga: z.string().url(),
  expires_in: z.number().int(),
  generado_at: z.string().datetime(),
})

export type EmitirPropuestaResponse = z.infer<typeof emitirPropuestaResponseSchema>
