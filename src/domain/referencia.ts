import { z } from "zod"
import { RELACION_REFERENCIA } from "../enums/relacionReferencia.js"

export const referenciaDomainSchema = z.object({
  nombre: z.string().max(160),
  telefono: z.string().length(10),
  relacion: z.enum(RELACION_REFERENCIA),
  confirmada: z.boolean().default(false),
  confirmadaAt: z.coerce.date().nullable().optional(),
  notaConfirmacion: z.string().nullable().optional(),
})

export type ReferenciaDomain = z.infer<typeof referenciaDomainSchema>
