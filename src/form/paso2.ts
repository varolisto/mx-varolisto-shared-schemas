import { z } from "zod"
import { PLAZO_MESES } from "../enums/plazoMeses"
import { DESTINO_PRESTAMO } from "../enums/destinoPrestamo"

export const paso2Schema = z
  .object({
    montoSolicitado: z
      .number({ error: () => "Ingresa un monto válido" })
      .min(2000, "Mínimo $2,000")
      .max(20000, "Máximo $20,000"),
    plazoMeses: z.enum(PLAZO_MESES, {
      error: () => "Selecciona un plazo",
    }),
    primerCredito: z.enum(["si", "no"], { error: () => "Selecciona una opción" }),
    destinoPrestamo: z.enum(DESTINO_PRESTAMO, { error: () => "Selecciona un destino" }),
    destinoOtro: z.string().optional(),
  })
  .refine(
    (data) =>
      data.destinoPrestamo !== "otro" ||
      (data.destinoOtro && data.destinoOtro.trim().length > 0),
    {
      message: "Describe el destino del préstamo",
      path: ["destinoOtro"],
    }
  )

export type Paso2Data = z.infer<typeof paso2Schema>
