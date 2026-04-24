import { z } from "zod"
import { ESTADO_SOLICITUD } from "../enums/estadoSolicitud"
import { DESTINO_PRESTAMO } from "../enums/destinoPrestamo"
import { MOTIVO_RECHAZO } from "../enums/motivoRechazo"

export const solicitudDomainSchema = z.object({
  folio: z.string().regex(/^VL-\d{6}-\d{4}$/),
  montoSolicitado: z.number().min(2000).max(20000),
  plazoMeses: z.number().int().min(2).max(6),
  destino: z.enum(DESTINO_PRESTAMO),
  destinoOtro: z.string().nullable(),
  esPrimerCredito: z.boolean(),
  estado: z.enum(ESTADO_SOLICITUD).default("recibida"),
  motivoRechazo: z.enum(MOTIVO_RECHAZO).nullable().optional(),
  notaOperador: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
})

export type SolicitudDomain = z.infer<typeof solicitudDomainSchema>
