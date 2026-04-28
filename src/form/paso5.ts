import { z } from "zod"
import { zStr } from "../helpers.js"
import { RELACION_REFERENCIA } from "../enums/relacionReferencia.js"
import { isValidTelefonoMx } from "../validators/telefonoMx.js"

export const paso5Schema = z
  .object({
    ref1Nombre: zStr().min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres").regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/, "Solo se permiten letras"),
    ref1Telefono: zStr()
      .refine(isValidTelefonoMx, "Ingresa un teléfono válido de 10 dígitos"),
    ref1Relacion: z.enum(RELACION_REFERENCIA, {
      error: () => "Selecciona una relación",
    }),
    ref1Email: z
      .string()
      .max(100, "Máximo 100 caracteres")
      .email("Correo inválido")
      .optional()
      .or(z.literal("")),
    ref2Nombre: zStr().min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres").regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/, "Solo se permiten letras"),
    ref2Telefono: zStr()
      .refine(isValidTelefonoMx, "Ingresa un teléfono válido de 10 dígitos"),
    ref2Relacion: z.enum(RELACION_REFERENCIA, {
      error: () => "Selecciona una relación",
    }),
    ref2Email: z
      .string()
      .max(100, "Máximo 100 caracteres")
      .email("Correo inválido")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.ref1Telefono !== data.ref2Telefono, {
    message: "El teléfono de la segunda referencia no puede ser igual al primero",
    path: ["ref2Telefono"],
  })

export type Paso5Data = z.infer<typeof paso5Schema>
