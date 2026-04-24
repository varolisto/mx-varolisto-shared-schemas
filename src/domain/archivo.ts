import { z } from "zod"
import { TIPO_ARCHIVO } from "../enums/tipoArchivo.js"
import { ORIGEN_ARCHIVO } from "../enums/origenArchivo.js"

export const archivoDomainSchema = z.object({
  tipoArchivo: z.enum(TIPO_ARCHIVO),
  origen: z.enum(ORIGEN_ARCHIVO),
  storagePath: z.string().max(500),
  nombreOriginal: z.string().max(255).nullable(),
  tamanoBytes: z.number().int().positive(),
  mimeType: z.string().max(60),
  hashSha256: z.string().length(64).nullable().optional(),
})

export type ArchivoDomain = z.infer<typeof archivoDomainSchema>
