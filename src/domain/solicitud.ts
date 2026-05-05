import { z } from 'zod'
import { FOLIO_REGEX, MONTO_MAX, MONTO_MIN, PLAZO_MAX, PLAZO_MIN } from '../constants.js'
import { DESTINO_PRESTAMO } from '../enums/destinoPrestamo.js'
import { ESTADO_SOLICITUD } from '../enums/estadoSolicitud.js'
import { MOTIVO_RECHAZO } from '../enums/motivoRechazo.js'

export const solicitudDomainSchema = z.object({
  folio: z.string().regex(FOLIO_REGEX),
  montoSolicitado: z.number().min(MONTO_MIN).max(MONTO_MAX),
  plazoMeses: z.number().int().min(PLAZO_MIN).max(PLAZO_MAX),
  destino: z.enum(DESTINO_PRESTAMO),
  destinoOtro: z.string().nullable(),
  esPrimerCredito: z.boolean(),
  estado: z.enum(ESTADO_SOLICITUD).default('recibida'),
  motivoRechazo: z.enum(MOTIVO_RECHAZO).nullable().optional(),
  notaOperador: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
})

export type SolicitudDomain = z.infer<typeof solicitudDomainSchema>
