import { z } from 'zod'
import { APELLIDO_MAX_LENGTH, NOMBRE_MAX_LENGTH } from '../constants.js'
import { SEXO } from '../enums/sexo.js'

export const solicitanteDomainSchema = z.object({
  curp: z.string().length(18),
  nombre: z.string().max(NOMBRE_MAX_LENGTH),
  apellidoPaterno: z.string().max(APELLIDO_MAX_LENGTH),
  apellidoMaterno: z.string().max(APELLIDO_MAX_LENGTH).nullable(),
  fechaNacimiento: z.coerce.date(),
  sexo: z.enum(SEXO),
  telefono: z.string().length(10),
  rfc: z.string().min(12).max(13).nullable(),
  correo: z.string().email().nullable(),
  fallecido: z.boolean().default(false),
  fallecidoAt: z.coerce.date().nullable().optional(),
})

export type SolicitanteDomain = z.infer<typeof solicitanteDomainSchema>
