import { z } from "zod"
import { zStr } from "../helpers"
import { validateClabe } from "../validators/clabe"

export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"] as const
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export const paso5Schema = z.object({
  comprobantes: z
    .array(z.string().min(1, "Nombre de archivo inválido"))
    .min(2, "Se requieren al menos 2 comprobantes")
    .max(5, "Máximo 5 comprobantes"),
  clabe: zStr()
    .regex(/^\d{18}$/, "La CLABE debe tener 18 dígitos")
    .refine(validateClabe, "CLABE inválida. Verifica que no sea el número de tu tarjeta."),
})

export type Paso5Data = z.infer<typeof paso5Schema>
