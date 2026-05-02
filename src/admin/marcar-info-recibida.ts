import { z } from 'zod'

export const marcarInfoRecibidaRequestSchema = z.object({}).strict()

export type MarcarInfoRecibidaRequest = z.infer<typeof marcarInfoRecibidaRequestSchema>
