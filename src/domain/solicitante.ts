import { z } from "zod"
import { SEXO } from "../enums/sexo"

export const solicitanteDomainSchema = z.object({
  curp: z.string().length(18),
  nombre: z.string().max(80),
  apellidoPaterno: z.string().max(60),
  apellidoMaterno: z.string().max(60).nullable(),
  fechaNacimiento: z.coerce.date(),
  sexo: z.enum(SEXO),
  telefono: z.string().length(10),
  rfc: z.string().min(12).max(13).nullable(),
  correo: z.string().email().nullable(),
  fallecido: z.boolean().default(false),
  fallecidoAt: z.coerce.date().nullable().optional(),
})

export type SolicitanteDomain = z.infer<typeof solicitanteDomainSchema>
