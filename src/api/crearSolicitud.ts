import { z } from 'zod'
import { FOLIO_REGEX } from '../constants.js'
import { ESTADO_SOLICITUD } from '../enums/estadoSolicitud.js'
import { solicitudSchema } from '../form/index.js'
import { telemetriaSolicitudSchema } from '../form/telemetriaSolicitud.js'

/**
 * Schema del request del endpoint POST /api/solicitudes.
 * Combina el formulario público con un bloque opcional de telemetría
 * pasiva capturada por el sistema (Bloque 1.B del rediseño v7).
 */
export const crearSolicitudRequestSchema = solicitudSchema.and(
  z.object({ telemetria: telemetriaSolicitudSchema.optional() }),
)

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
