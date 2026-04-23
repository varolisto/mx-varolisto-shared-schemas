import { z } from "zod"

// TODO: definir schema de pago de cuota
export const pagoSchema = z.object({})

export type Pago = z.infer<typeof pagoSchema>
