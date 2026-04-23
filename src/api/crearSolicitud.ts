import { z } from "zod"

// TODO: definir schema del endpoint POST /solicitudes
export const crearSolicitudRequestSchema = z.object({})
export const crearSolicitudResponseSchema = z.object({})

export type CrearSolicitudRequest = z.infer<typeof crearSolicitudRequestSchema>
export type CrearSolicitudResponse = z.infer<typeof crearSolicitudResponseSchema>
