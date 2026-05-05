import { z } from 'zod'
import { EMPLEADOR_MAX_LENGTH } from '../constants.js'
import { CANTIDAD_DEUDAS } from '../enums/cantidadDeudas.js'
import { TIPO_ACTIVIDAD } from '../enums/tipoActividad.js'

export const ingresoDomainSchema = z.object({
  tipoActividad: z.enum(TIPO_ACTIVIDAD),
  empleador: z.string().max(EMPLEADOR_MAX_LENGTH),
  antiguedadMeses: z.number().int().min(0),
  ingresoMensual: z.number().min(0),
  tieneDeudas: z.boolean(),
  rangoDeudas: z.enum(CANTIDAD_DEUDAS).nullable(),
  pagoMensualDeudas: z.number().min(0).nullable(),
})

export type IngresoDomain = z.infer<typeof ingresoDomainSchema>
