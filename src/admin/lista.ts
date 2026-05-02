import { z } from 'zod'
import { ESTADO_SOLICITUD } from '../enums/estadoSolicitud.js'

export const solicitudResumenSchema = z.object({
  folio: z.string(),
  estado: z.enum(ESTADO_SOLICITUD),
  created_at: z.string().datetime(),
  solicitante_nombre_completo: z.string(),
  solicitante_curp: z.string(),
  monto_solicitado: z.number(),
  plazo_meses: z.number().int(),
})

export type SolicitudResumen = z.infer<typeof solicitudResumenSchema>

export const listaResponseSchema = z.object({
  solicitudes: z.array(solicitudResumenSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
})

export type ListaResponse = z.infer<typeof listaResponseSchema>
