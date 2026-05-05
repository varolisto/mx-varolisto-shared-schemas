import { z } from 'zod'
import { DIRECCION_NUMERO_MAX_LENGTH, DIRECCION_TEXTO_MAX_LENGTH } from '../constants.js'

export const direccionDomainSchema = z.object({
  calle: z.string().max(DIRECCION_TEXTO_MAX_LENGTH),
  numeroExt: z.string().max(DIRECCION_NUMERO_MAX_LENGTH),
  numeroInt: z.string().max(DIRECCION_NUMERO_MAX_LENGTH).nullable(),
  cp: z.string().length(5),
  colonia: z.string().max(DIRECCION_TEXTO_MAX_LENGTH),
  municipio: z.string().max(DIRECCION_TEXTO_MAX_LENGTH),
  estado: z.string().max(60),
  ciudad: z.string().max(DIRECCION_TEXTO_MAX_LENGTH).nullable(),
  esVigente: z.boolean().default(true),
})

export type DireccionDomain = z.infer<typeof direccionDomainSchema>
