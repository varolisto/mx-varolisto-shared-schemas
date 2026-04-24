import { z } from "zod"

export const direccionDomainSchema = z.object({
  calle: z.string().max(120),
  numeroExt: z.string().max(20),
  numeroInt: z.string().max(20).nullable(),
  cp: z.string().length(5),
  colonia: z.string().max(120),
  municipio: z.string().max(120),
  estado: z.string().max(60),
  esVigente: z.boolean().default(true),
})

export type DireccionDomain = z.infer<typeof direccionDomainSchema>
