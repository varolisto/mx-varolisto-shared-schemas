import { z } from 'zod'
import { TIPO_ARCHIVO } from '../enums/tipoArchivo.js'

export const adminUploadUrlRequestSchema = z.object({
  tipo_archivo: z.enum(TIPO_ARCHIVO),
  nombre_original: z.string().min(1).max(255),
  mime_type: z.string(),
  tamano_bytes: z.number().int().positive(),
})

export type AdminUploadUrlRequest = z.infer<typeof adminUploadUrlRequestSchema>

export const adminUploadUrlResponseSchema = z.object({
  uploadUrl: z.string().url(),
  storagePath: z.string(),
  archivoId: z.string().uuid(),
  expiresIn: z.number().int(),
})

export type AdminUploadUrlResponse = z.infer<typeof adminUploadUrlResponseSchema>
