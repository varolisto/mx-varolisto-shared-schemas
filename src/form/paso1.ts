import { z } from "zod"
import { zStr } from "../helpers.js"
import { SEXO } from "../enums/sexo.js"
import { isValidRfc } from "../validators/rfc.js"
import { isValidCurp } from "../validators/curp.js"
import { isValidTelefonoMx } from "../validators/telefonoMx.js"

export const paso1Schema = z.object({
  nombre: zStr().min(2, "Mínimo 2 caracteres"),
  apellidoPaterno: zStr().min(2, "Mínimo 2 caracteres"),
  apellidoMaterno: zStr().min(2, "Mínimo 2 caracteres"),
  sexo: z.enum(SEXO, { error: () => "Selecciona una opción" }),
  fechaNacimiento: zStr("Selecciona una fecha")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido")
    .refine((val) => {
      const birth = new Date(val)
      const today = new Date()
      const age = today.getFullYear() - birth.getFullYear()
      const m = today.getMonth() - birth.getMonth()
      return age > 18 || (age === 18 && m >= 0)
    }, "Debes tener al menos 18 años"),
  curp: zStr()
    .length(18, "La CURP debe tener exactamente 18 caracteres")
    .refine((val) => val.length !== 18 || isValidCurp(val), "Formato de CURP inválido"),
  email: zStr().email({ error: "Correo electrónico inválido" }),
  rfc: z
    .string()
    .trim()
    .optional()
    .refine(
      (val: string | undefined) => !val || val.length === 12 || val.length === 13,
      "El RFC debe tener 12 o 13 caracteres"
    )
    .refine(
      (val: string | undefined) => !val || (val.length !== 12 && val.length !== 13) || isValidRfc(val),
      "Formato de RFC inválido"
    ),
  telefono: zStr()
    .refine((val) => val.length < 1 || isValidTelefonoMx(val), "Ingresa un teléfono válido de 10 dígitos"),
})

export type Paso1Data = z.infer<typeof paso1Schema>
