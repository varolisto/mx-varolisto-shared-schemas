import { z } from "zod"

// TODO: definir schema de referencia personal
export const referenciaSchema = z.object({})

export type Referencia = z.infer<typeof referenciaSchema>
