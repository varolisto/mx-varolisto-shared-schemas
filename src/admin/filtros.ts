import { z } from 'zod'
import { ESTADO_SOLICITUD } from '../enums/estadoSolicitud.js'

export const listaFiltrosSchema = z.object({
  estado: z.enum(ESTADO_SOLICITUD).optional(),
  desde: z.string().datetime().optional(),
  hasta: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(10).max(100).default(20),
})

export type ListaFiltros = z.infer<typeof listaFiltrosSchema>
