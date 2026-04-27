import { z } from "zod"
import { calcularPropuestaRequestSchema } from "./calcular-propuesta.js"

export const modificarTerminosRequestSchema = calcularPropuestaRequestSchema

export type ModificarTerminosRequest = z.infer<typeof modificarTerminosRequestSchema>
