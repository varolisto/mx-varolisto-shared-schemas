import { z } from "zod"
import { zStr } from "../helpers.js"
import { validateClabe } from "../validators/clabe.js"
import { TIPO_ARCHIVO } from "../enums/tipoArchivo.js"

export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"] as const
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export const archivoDeclaradoSchema = z.object({
  tipoArchivo: z.enum(TIPO_ARCHIVO),
  nombreOriginal: z.string().min(1, "Nombre de archivo inválido").max(255),
  mimeType: z.string().min(1),
  tamanoBytes: z.number().int().positive(),
})

export type ArchivoDeclarado = z.infer<typeof archivoDeclaradoSchema>

export const paso5Schema = z.object({
  sessionUuid: z.uuid("sessionUuid debe ser un UUID válido"),
  archivosDeclarados: z
    .array(archivoDeclaradoSchema)
    .min(1, "Se requiere al menos 1 archivo")
    .max(5, "Máximo 5 archivos"),
  clabe: zStr()
    .refine(validateClabe, "CLABE inválida. Verifica que no sea el número de tu tarjeta."),
})

export type Paso5Data = z.infer<typeof paso5Schema>
