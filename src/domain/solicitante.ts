import { z } from "zod"

// TODO: definir schema de solicitante
export const solicitanteSchema = z.object({})

export type Solicitante = z.infer<typeof solicitanteSchema>
