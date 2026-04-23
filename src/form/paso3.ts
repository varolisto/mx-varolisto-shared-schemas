import { z } from "zod"
import { zStr } from "../helpers"
import { TIPO_ACTIVIDAD } from "../enums/tipoActividad"
import { ANTIGUEDAD } from "../enums/antiguedad"
import { CANTIDAD_DEUDAS } from "../enums/cantidadDeudas"
import { MONTO_TOTAL_DEUDAS } from "../enums/montoTotalDeudas"

export const paso3Schema = z
  .object({
    tipoActividad: z.enum(TIPO_ACTIVIDAD, { error: () => "Selecciona una opción" }),
    nombreEmpleadorNegocio: zStr().min(2, "Mínimo 2 caracteres"),
    antiguedad: z.enum(ANTIGUEDAD, { error: () => "Selecciona una opción" }),
    ingresoMensual: z
      .number({ error: () => "Ingresa un ingreso válido" })
      .min(1000, "Mínimo $1,000"),
    tieneDeudas: z.enum(["si", "no"], { error: () => "Selecciona una opción" }),
    cantidadDeudas: z.enum(CANTIDAD_DEUDAS).optional(),
    montoTotalDeudas: z.enum(MONTO_TOTAL_DEUDAS).optional(),
    pagoMensualDeudas: z.number().min(0).optional(),
  })
  .refine(
    (data) =>
      data.tieneDeudas !== "si" || data.cantidadDeudas !== undefined,
    {
      message: "Indica cuántas deudas tienes",
      path: ["cantidadDeudas"],
    }
  )
  .refine(
    (data) =>
      data.tieneDeudas !== "si" || data.montoTotalDeudas !== undefined,
    {
      message: "Indica el monto total de tus deudas",
      path: ["montoTotalDeudas"],
    }
  )
  .refine(
    (data) =>
      data.tieneDeudas !== "si" || data.pagoMensualDeudas !== undefined,
    {
      message: "Indica tu pago mensual",
      path: ["pagoMensualDeudas"],
    }
  )

export type Paso3Data = z.infer<typeof paso3Schema>
