import { z } from "zod"
import { TIPO_ARCHIVO } from "../enums/tipoArchivo.js"
import { TIPO_IDENTIFICACION } from "../enums/tipoIdentificacion.js"

export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"] as const
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export const archivoDeclaradoSchema = z.object({
  tipoArchivo: z.enum(TIPO_ARCHIVO),
  nombreOriginal: z.string().min(1, "Nombre de archivo inválido").max(255),
  mimeType: z.string().min(1),
  tamanoBytes: z.number().int().positive(),
})

export type ArchivoDeclarado = z.infer<typeof archivoDeclaradoSchema>

export const paso6Schema = z
  .object({
    sessionUuid: z.uuid("sessionUuid debe ser un UUID válido"),
    tipoIdentificacion: z.enum(TIPO_IDENTIFICACION, { error: () => "Selecciona un tipo de identificación" }),
    archivosDeclarados: z
      .array(archivoDeclaradoSchema)
      .min(1, "Se requiere al menos 1 archivo")
      .max(7, "Máximo 7 archivos"),
  })
  .refine(
    (data) => {
      const tipos = data.archivosDeclarados.map((a) => a.tipoArchivo)
      if (data.tipoIdentificacion === "ine") {
        return tipos.includes("ine_frente") && tipos.includes("ine_reverso")
      }
      if (data.tipoIdentificacion === "pasaporte") {
        return tipos.includes("pasaporte_principal")
      }
      return true
    },
    {
      message: "Debes subir la fotografía de tu identificación oficial",
      path: ["archivosDeclarados"],
    }
  )

export type Paso6Data = z.infer<typeof paso6Schema>
