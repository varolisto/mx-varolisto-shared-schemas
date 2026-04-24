import { z } from "zod"
import { solicitudSchema } from "../form"
import { ESTADO_SOLICITUD } from "../enums/estadoSolicitud"

/**
 * Schema del request del endpoint POST /api/solicitudes.
 * Idéntico al schema compuesto del formulario — punto de extensión futuro
 * si los dos se llegan a separar.
 */
export const crearSolicitudRequestSchema = solicitudSchema

export type CrearSolicitudRequest = z.infer<typeof crearSolicitudRequestSchema>

/**
 * Schema del response del endpoint POST /api/solicitudes.
 * Devuelve información mínima al cliente para confirmar recepción.
 */
export const crearSolicitudResponseSchema = z.object({
  folio: z.string().regex(/^VL-\d{6}-\d{4}$/),
  estado: z.enum(ESTADO_SOLICITUD),
  fechaCreacion: z.string().datetime(),
  tiempoEsperadoRespuesta: z.string(),
})

export type CrearSolicitudResponse = z.infer<typeof crearSolicitudResponseSchema>
