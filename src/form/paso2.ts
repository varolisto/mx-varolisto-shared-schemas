import { z } from "zod"
import { PLAZO_MESES } from "../enums/plazoMeses.js"
import { DESTINO_PRESTAMO } from "../enums/destinoPrestamo.js"

export const paso2Schema = z.object({
  montoSolicitado: z
    .number({ error: () => "Ingresa un monto válido" })
    .min(2000, "Mínimo $2,000")
    .max(20000, "Máximo $20,000"),
  plazoMeses: z.enum(PLAZO_MESES, {
    error: () => "Selecciona un plazo",
  }),
  destinoPrestamo: z.enum(DESTINO_PRESTAMO, { error: () => "Selecciona un destino" }),
})

export type Paso2Data = z.infer<typeof paso2Schema>
