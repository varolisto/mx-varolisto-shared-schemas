import { z } from "zod"

// TODO: definir schema de ingreso del solicitante
export const ingresoSchema = z.object({})

export type Ingreso = z.infer<typeof ingresoSchema>
