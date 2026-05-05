import { z } from 'zod'
import { FOLIO_REGEX } from '../constants.js'
import { ESTADO_SOLICITUD } from '../enums/estadoSolicitud.js'
import { solicitudSchema } from '../form/index.js'

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
  folio: z.string().regex(FOLIO_REGEX),
  estado: z.enum(ESTADO_SOLICITUD),
  fechaCreacion: z.string().datetime(),
  tiempoEsperadoRespuesta: z.string(),
})

export type CrearSolicitudResponse = z.infer<typeof crearSolicitudResponseSchema>
