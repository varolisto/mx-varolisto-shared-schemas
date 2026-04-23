import { z } from "zod"

// TODO: definir schema del endpoint POST /cotizaciones
export const generarCotizacionRequestSchema = z.object({})
export const generarCotizacionResponseSchema = z.object({})

export type GenerarCotizacionRequest = z.infer<typeof generarCotizacionRequestSchema>
export type GenerarCotizacionResponse = z.infer<typeof generarCotizacionResponseSchema>
