import { z } from "zod"
import { calcularPropuestaRequestSchema } from "./calcular-propuesta.js"

export const aprobarRequestSchema = calcularPropuestaRequestSchema

export type AprobarRequest = z.infer<typeof aprobarRequestSchema>
