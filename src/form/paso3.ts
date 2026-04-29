import { z } from "zod"
import { zStr } from "../helpers.js"
import { ANIOS_VIVIENDO } from "../enums/aniosViviendo.js"
import { TIPO_VIVIENDA } from "../enums/tipoVivienda.js"

export const paso3Schema = z.object({
  codigoPostal: zStr()
    .regex(/^\d{5}$/, "El CP debe tener 5 dígitos"),
  colonia: zStr("Selecciona una colonia").min(1, "Selecciona una colonia"),
  municipio: zStr().min(2, "Mínimo 2 caracteres"),
  estado: zStr().min(1, "Requerido").max(100),
  ciudad: z.string().trim().max(120).optional(),
  calle: zStr().min(2, "Mínimo 2 caracteres"),
  numeroExterior: zStr("Campo requerido").min(1, "Campo requerido"),
  numeroInterior: z.string().trim().optional(),
  aniosViviendo: z.enum(ANIOS_VIVIENDO, { error: () => "Selecciona una opción" }),
  tipoVivienda: z.enum(TIPO_VIVIENDA, { error: () => "Selecciona una opción" }),
})

export type Paso3Data = z.infer<typeof paso3Schema>
